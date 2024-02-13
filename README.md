# We T (OTT 경험 나눔 플랫폼)

프로덕션 - (http://ott-we-t.com/)

우리들의 OTT We T 입니다.
We T는 사용자들이 다양한 OTT 플랫폼들의 콘텐츠를 공유하고 추천하는 플랫폼입니다.

---
## 구축 상태

- Oracle VM Ubuntu 가상 머신 환경
- MongoDB를 사용하여 데이터베이스를 구축
- Docker 활용
- NEXT.js로 API와 프론트엔드를 구축.
- 가비아 - 도메인
- velog: 기록 Docker설정(https://velog.io/@hongkyu_mr_chu/Docker-NEXT.js)
- velog: 기록 CI/CD설정(https://velog.io/@hongkyu_mr_chu/Docker-Git-Actions)
---

## 기능 설명

| 기능 | 설명 |
| --- | --- |
| 게시글 리스트 조회 | getStaticProps 함수를 활용하여 데이터베이스로부터 게시글 목록을 가져오고, 이 데이터 중 category 속성을 기준으로 프론트엔드에서 동적으로 카테고리별로 게시글을 필터링하여 보여주는 로직을 구현한 것입니다. |
| 나만의 OTT 알아보기 | 플랫폼내에 게시글의 OTT 카테고리 비율을 rechart 라이브러리로 차트로 구현하였습니다. 질문을 통해 유저에게 알맞는 OTT플랫폼을 비율로 확인시켜주고 추천 해줍니다.  |
| 글쓰기 CRUD | /api/new, /api/delete, /api/edit 게시글 작성, 삭제, 수정 기능을 만들었습니다. react-quill 라이브러리로 에디터 작성 효과적으로 추가하였습니다. |
| 댓글 | /api/comment/new 댓글 작성 |
| OAuth 로그인 | NextAuth 라이브러리로GoogleProvider를 사용하여 Google OAuth 인증을 구현했습니다. session을 사용하며 JWT를 30일 동안 클라이언트 측에서 보관합니다. |
| 회원가입, 로그인 | NextAuth라이브러리로CredentialsProvider를 사용하여 로컬 자격 증명을 통한 로그인 기능을 구현했습니다. session을 사용하며 JWT를 30일 동안 클라이언트 측에서 보관합니다. |

---

## 리팩토링 브랜치 (2023 01 02)

주요 수정 부분
- 로컬 회원가입, 로컬 로그인 추가
- scss => tailwind 로 변경
---

## Tools
nex.jt, mongoDB, recharts, tailwind

---
## 개발하며 겪은 문제들
- Velog - 블로그 - (https://velog.io/@hongkyu_mr_chu/dangerousSlysetInnerHTML-did-not-match)
---
## ~~앞으로 해결해야할 문제 504~~

- 최근 프로젝트를 Vercel에 배포하게 되면 로컬 로그인, 로컬 회원가입이 504 Gateway Timeout 오류를 반환하였습니다. 
이 문제의 근본적인 원인을 파악하기 위해 여러 실험을 진행했습니다. Vercel의 무료 플랜과 관련된 자원 제한이 주요 원인 중 하나로 추정되었습니다. 실제로 Vercel Pro 플랜으로 업그레이드 한 후, 문제가 해결되었습니다.
Vercel: [Serverless functions have a timeout of only 10 seconds](https://vercel.com/pricing) (300 seconds if you upgrade to pro plan)
그래서 자체 서버를 구축하여 데이터베이스 요청의 처리 속도와 효율성을 향상시키는 것입니다. 서버리스 아키텍처의 편리함에도 불구하고, 제한된 리소스와 고정된 환경은 때로 예상치 못한 성능 문제를 야기할 수 있음을 깨달았습니다.

2024.02.09 Oracle 서버로 배포
---
