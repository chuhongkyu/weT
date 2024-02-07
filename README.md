# We_T (OTT 경험 나눔 플랫폼)

우리들의 OTT We T 입니다.
We T는 사용자들이 다양한 OTT 플랫폼들의 콘텐츠를 공유하고 추천하는 플랫폼입니다.

---

### 기능 설명

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
기능
- 나만의 OTT 알아보기
    - O,X 질문
    - 플랫폼내 OTT 비율 차트
- 계시판
    - 카테고리 검색
    - 검색
    - 댓글
    - CRUD
        - 글쓰기
        - 읽기
        - 업데이트
        - 삭제
- 회원가입
    - 자체 회원가입
    - 로그인
    - OAuth 로그인
--- 
##Tools
nex.jt, mongoDB, recharts, tailwind
---
## 개선 사항

UX란
    - 사용자의 실수를 줄여줘야한다.
    - 글쓰기 페이지에서 브라우저의 뒤로가기를 실행시 경고창이 뜨게 변경함.

   

homepage[https://we-t-ott.vercel.app/]
