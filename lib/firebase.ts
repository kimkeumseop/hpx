import { initializeApp, getApps, type FirebaseApp } from 'firebase/app'
import { getFirestore, type Firestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

let app: FirebaseApp | null = null
let db: Firestore | null = null

/**
 * 환경변수가 설정되어 있을 때만 Firebase를 초기화합니다.
 * 개발 환경에서 .env.local이 없어도 앱이 크래시되지 않습니다.
 */
function getFirebaseApp(): FirebaseApp | null {
  if (!firebaseConfig.projectId) return null

  if (getApps().length === 0) {
    app = initializeApp(firebaseConfig)
  } else {
    app = getApps()[0]
  }
  return app
}

export function getDb(): Firestore | null {
  if (db) return db
  const firebaseApp = getFirebaseApp()
  if (!firebaseApp) return null
  db = getFirestore(firebaseApp)
  return db
}

/**
 * Firestore "hsp_results" 컬렉션에 결과를 저장합니다.
 * Firebase가 설정되지 않은 경우 조용히 건너뜁니다.
 */
export async function saveResult(data: {
  type: string
  score: number
  normalized: number
  timestamp: Date
}): Promise<void> {
  try {
    const firestore = getDb()
    if (!firestore) return

    const { collection, addDoc } = await import('firebase/firestore')
    await addDoc(collection(firestore, 'hsp_results'), data)
  } catch (err) {
    // 저장 실패는 사용자 경험에 영향을 주지 않도록 무시
    console.warn('Firestore 저장 실패 (사용자 경험에 영향 없음):', err)
  }
}
