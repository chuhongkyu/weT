# We_T

우리들의 OTT We T 입니다.

다채로운 OTT들의 비교 분석을 유저들이 나눌 수 있는 놀이터 입니다.

- 계시판
    - 카테고리 검색
    - 검색
    - CRUD
        - 글쓰기
        - 읽기
        - 업데이트
        - 삭제
- 회원가입
    - 자체 회원가입
    - 로그인
    - OAuth 로그인

mongoDB

1. 3-tier architecture
    - 유저가 작성한 글을 DB에 바로 저장 시키지 않고 중간 프로그램(서버)을 둠.


2. npm run build 시 일어나는 일들
    - ○ static rendering(default)
    - λ (람다 기호) dynamic rendering(유저가 페이지 접속마다 html 새로 만들어서 보내줌)
    - ● automatically generated as static HTML + JSON

    ```
    export const dynamic = 'force-dynamic'
    export const dynamic = 'force-static'
    ```