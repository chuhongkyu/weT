# Node.js의 공식 이미지를 기반으로 설정
FROM node:alpine

# 작업 디렉토리 설정
WORKDIR /app

# 애플리케이션 의존성 파일 복사
# package.json과 package-lock.json을 복사합니다.
COPY package*.json ./

# 패키지 설치
RUN npm install

# 애플리케이션 소스 복사
COPY . .

# Next.js 앱 빌드
RUN npm run build

# 앱 실행
CMD ["npm", "start"]