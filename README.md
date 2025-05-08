# Auto Blog Publisher

AI 기반 자동 블로그 포스팅 시스템입니다. Google Sheets에서 키워드를 읽어와 SEO에 최적화된 블로그 포스트를 자동으로 생성하고 발행합니다.

## 주요 기능

- Google Sheets에서 키워드 자동 수집
- Google AI Studio를 활용한 SEO 최적화 콘텐츠 생성
- 자동 포스트 발행
- 반응형 웹 인터페이스
- GitHub Actions를 통한 자동화

## 기술 스택

- Next.js
- TypeScript
- Tailwind CSS
- Google Sheets API
- Google AI Studio
- GitHub Actions

## 설치 방법

1. 저장소 클론:
```bash
git clone https://github.com/nicejini/auto-blog-publisher.git
cd auto-blog-publisher
```

2. 의존성 설치:
```bash
npm install
```

3. 환경 변수 설정:
`.env.local` 파일을 생성하고 다음 변수들을 설정:
```env
GOOGLE_SHEETS_API_KEY=your_google_sheets_api_key
GOOGLE_SHEETS_ID=your_google_sheets_id
GOOGLE_AI_API_KEY=your_google_ai_api_key
```

4. 개발 서버 실행:
```bash
npm run dev
```

## 사용 방법

1. Google Sheets에 키워드 추가
2. GitHub Actions 워크플로우 실행 (자동 또는 수동)
3. 생성된 포스트 확인 및 관리

## 라이선스

MIT License 