# HSP 자가진단 테스트

27문항으로 알아보는 나의 감수성 지수. HSP(Highly Sensitive Person) 여부와 민감도 타입을 무료로 진단하는 서비스.

**타깃:** 한국어 서비스 · 여성 2030

---

## 기술 스택

- **프레임워크:** Next.js 14 (App Router)
- **언어:** TypeScript
- **스타일링:** Tailwind CSS
- **데이터베이스:** Firebase Firestore
- **차트:** Recharts
- **애니메이션:** Framer Motion
- **배포:** Vercel

---

## 로컬 실행 방법

### 1. 레포지토리 클론 & 의존성 설치

```bash
git clone https://github.com/your-username/hsp-test.git
cd hsp-test
npm install
```

### 2. 환경변수 설정

```bash
cp .env.local.example .env.local
```

`.env.local` 파일을 열고 각 항목을 입력하세요:

- **Firebase:** [Firebase 콘솔](https://console.firebase.google.com) → 프로젝트 설정 → 내 앱 → SDK 설정 및 구성
- **Kakao (선택):** [Kakao Developers](https://developers.kakao.com) → 내 애플리케이션 → JavaScript 키
- **AdSense (선택):** [Google AdSense](https://www.google.com/adsense) → 계정 → 게시자 ID

### 3. Firebase Firestore 보안 규칙 설정

Firebase 콘솔 → Firestore Database → 규칙 탭에서 아래 규칙 적용:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /hsp_results/{document} {
      allow write: if true;
      allow read: if false;
    }
  }
}
```

### 4. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 열기

---

## 배포 (Vercel)

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel

# 환경변수는 Vercel 대시보드 > Settings > Environment Variables에서 설정
```

---

## 프로젝트 구조

```
/app
  page.tsx          → 메인 랜딩
  /test/page.tsx    → 테스트 진행
  /result/page.tsx  → 결과 + 공유카드
/components
  QuestionCard.tsx  → 문항 카드 (슬라이드 애니메이션)
  ProgressBar.tsx   → 진행률 바
  ResultCard.tsx    → 공유용 결과 카드
  AdSlot.tsx        → Google AdSense 슬롯
/lib
  questions.ts      → 27문항 데이터
  scoring.ts        → 점수 계산 로직
  firebase.ts       → Firestore 초기화
```

---

## HSP 유형

| 점수 | 유형 | 설명 |
|------|------|------|
| 90~100점 | 깊은 바다형 HSP 🌊 | 매우 높은 감수성 |
| 70~89점 | 숲속 관찰자형 HSP 🌿 | 높은 감수성 + 균형 |
| 50~69점 | 반HSP형 🌤 | 상황별 민감도 |
| 0~49점 | 비HSP형 ☀️ | 유연한 적응력 |
