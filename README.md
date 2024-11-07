# Smit
<img width="1920" alt="스밋_표지 3_1" src="https://github.com/user-attachments/assets/02ef7e41-4bbd-4eaf-8671-25aa71394fd4">

## 🔗 배포 링크
https://parkfinder.fujiikaze.kr/<br/>
<br/>

## 📖 목차
1. [프로젝트 소개](#-프로젝트-소개)
2. [팀소개](#-팀소개)
3. [개발 환경](#-개발-환경경)
4. [주요기능](#-주요기능)
5. [개발기간](#%EF%B8%8F-개발기간)
6. [기술스택](#%EF%B8%8F-기술스택)
7. [서비스 구조](#-서비스-구조)
8. [와이어프레임](#-와이어프레임)
9. [API 명세서](#-api-명세서)
10. [프로젝트 파일 구조](#-프로젝트-파일-구조)
11. [Trouble Shooting](#-trouble-shooting)
12. [Project Remind & 프로젝트 소감](#-project-remind--프로젝트-소감)
<br/><br/>

## 👨‍🏫 프로젝트 소개
"나만의 스터디 그룹을 온라인에서 만들어보세요! <br>
우리 서비스에서는 함께 공부하며 성적을 올리고, 점수를 얻어서 스터디 그룹의 랭킹을 올릴 수 있습니다. 스밋으로 함께 공부하는 재미를 새롭게 경험해보세요! <br>
스밋(Smit)은 온라인에서 손쉽게 스터디 그룹을 만들고, 실시간으로 그룹원들의 공부현황을 확인하며, 학습 시간을 관리할 수 있는 플랫폼입니다.  <br>
그룹의 학습 점수를 확인하고, 랭킹으로 성과를 비교하여 학습 동기를 강화할 수 있습니다. <br><br>

기존 스터디의 문제 <br>
1. 기존 스터디 서비스의 문제  <br>
현재 상용화된 서비스된 스터디의 특화된 도구들을 제공하기에는 부족하다. <br>
한 기능 차중되어 있는 느낌 (일정은, 일정만, 기록은 기록만, 모집은 모집만) <br>

<br/>

## 👨‍👩‍👧‍👦 팀소개
<div align="center">

| **강수진** | **정수희** | **김태현** | **설하영** | **홍승우** | **이재은** | **하예림** |
| :------: |  :------: | :------: | :------: | :------: | :------: | :------: |
| [<img src="https://avatars.githubusercontent.com/u/175091912?v=4" height=150 width=150> <br/> @Kang-1230](https://github.com/@Kang-1230) | [<img src="https://avatars.githubusercontent.com/u/175583374?v=4" height=150 width=150> <br/> @doo1b](https://github.com/doo1b) | [<img src="https://avatars.githubusercontent.com/u/163470732?v=4" height=150 width=150> <br/> @derek0k](https://github.com/derek0k) | [<img src="https://avatars.githubusercontent.com/u/76766459?v=4" height=150 width=150> <br/> @hadooni](https://github.com/hadooni) | [<img src="https://avatars.githubusercontent.com/u/64956234?v=4" height=150 width=150> <br/> @SeungwooHong97](https://github.com/SeungwooHong97) | [<img src="https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/profile_img/default" height=150 width=150> <br/> @jaeunE](https://sprinkle-sunspot-9a8.notion.site/Notion-24198d23f09c4288bdd4b0b08a28de77) | [<img src="https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/profile_img/default" height=150 width=150> <br/> [@yerimHa]()] |

</div>

<br>


## 💖 개발 환경

- Front : HTML, React, tailwind, tanstack , react-dom
- Back-end : Supabase
- 버전 및 이슈관리 : Github, Github Issues, Github Project
- 협업 툴 : Zep , Notion, Figma , Slack
- 서비스 배포 환경 : Vercel
- 디자인 : [Figma](https://www.figma.com/design/8IgDv9JsSc29IeBZ3Q1yjr/Smit?node-id=385-1922&node-type=canvas&t=jBqUpxdUOD5leCGG-0)
- [커밋 컨벤션](https://teamsparta.notion.site/Github-Rules-1232dc3ef514814daa22e94f405396ff)
- [코드 컨벤션](https://teamsparta.notion.site/Code-Convention-1232dc3ef51481fcacc0f457c91851ab)
- [프로젝트 컨벤션](https://teamsparta.notion.site/Project-Convention-1232dc3ef5148188a392c477efb12ec7)
<br>


## 💜 주요기능

### 홈(모집)
![image](https://github.com/user-attachments/assets/5dc900ee-c71b-4d80-87e0-4ebaecf7a4cb)
![image](https://github.com/user-attachments/assets/20d960aa-b006-4523-a928-5cc9f3f46ace)
![image](https://github.com/user-attachments/assets/e9e8b737-de35-4538-8f8b-50e9be3bd833)
- 플로팅 버튼을 눌러 언제든지 나만의 스터디 그룹을 만들고, 모집글을 작성할 수 있습니다. <br>
-  상단 Nav Bar의 검색 아이콘 기능을 통해 나에게 필요한 스터디를 효율적으로 찾아볼 수 있습니다. <br>
-  관심 있는 모집 공고에 ‘좋아요’를 누르거나 의견을 댓글로 남길 수 있습니다. <br>
- 상단 캐러셀을 통해 스터디와 관련된 다양한 이벤트를 확인할 수 있습니다. <br>
- 인기 스터디를 통해 최근 가장 많은 관심수를 받는 스터디가 무엇인지 탐색할 수 있습니다. <br> 
- 카테고리 칩을 통해 원하는 주제와 관련된 스터디만 필터링해 볼 수 있습니다. 칩을 클릭하면 바텀 시트가 올라옵니다. <br>
gif 추가 부탁

### 모집글 작성
![image](https://github.com/user-attachments/assets/aa91f767-f5c0-499b-9a5f-eaf99b2170c8)
![image](https://github.com/user-attachments/assets/2e33ffdb-1107-4b4c-8c4e-d229b0b3752a)
![image](https://github.com/user-attachments/assets/fbe45ffe-5cb0-4ac2-b6c3-2a98e6757eff)

- 스터디원들을 모으기 위한 모집글을 작성할 수 있습니다. <br> 
- 카테고리 바를 클릭하면 바텀시트가 올라오며, 이때 스터디 시작 예정일과 모집글을 작성할 스터디를 선택할 수 있습니다. <br>
- 스터디 그룹의 모집인원 및 태그가 모집글에도 동일하게 적용됩니다. <br>
- 모집글에 작성할 내용의 byte 제한은 없습니다. <br>
- 게시된 모집글에는 댓글, 찜, 공유, 가입 신청 기능을 사용할 수 있습니다. <br>
- 댓글에는 답글을 달 수 있으며, 폴딩형식으로 답글을 표시하거나 감출 수 있습니다. <br>
- 게시글을 찜하면 마이페이지에서 찜한 리스트를 모아볼 수 있습니다. <br>
- 공유하기 버튼을 누르면 해당 게시글의 URL이 복사되었다는 토스트 모달이 뜹니다. <br>
- 신청하기 버튼을 누르면 각오 한 마디를 적을 수 있는 텍스트 필드가 포함된 모달이 뜹니다. <br>

### 스터디
![image](https://github.com/user-attachments/assets/a29fc90d-9a48-4909-b645-86ab899f4db0)
![image](https://github.com/user-attachments/assets/bc84faab-b507-4bad-b515-b15f5064006b)
![image](https://github.com/user-attachments/assets/5eeeee82-b0ac-43ed-8064-36f39f9b53c9)


- 참여 중인 모든 스터디 리스트를 한눈에 확인하고 관리할 수 있는 페이지입니다.
- 상단 캘린더를 통해 스터디 일정을 직관적으로 관리할 수 있습니다. 캘린더 아이콘을 클릭하면 월간 캘린더 팝업이 나옵니다.
- 캘린더에서 일정 또는 스터디 리스트를 클릭하여 스터디 룸에 바로 접속할 수 있습니다.
- 가입 신청한 스터디의 리스트를 한 눈에 볼 수 있습니다.
- 방장은 생성한 스터디 그룹의 설정을 수정하고, 구성원 관리를 할 수 있습니다.
- 스터디원 관리 탭에서 스터디 가입을 신청한 사람들의 대기 리스트와 스터디에 속해 있는 멤버들 리스트를 볼 수 있으며, 이곳에서 멤버 강퇴와 방장 권한 넘기기가 가능합니다.
- 스터디 편집 탭에서는 한 줄 설명, 오픈채팅방 링크, 스터디 인원수 설정 및 태그 수정이 가능하고, 해당 스터디를 삭제하는 기능이 있습니다.


### 주요 기능 4
gif 추가 부탁

### 주요 기능 5
gif 추가 부탁 


### 주차장 즐겨찾기

## ⏲️ 개발기간

2024.10.18(금) ~ 2024.11.21(목)<br/>
<br/>

## 📚️ 기술스택
![image](https://github.com/user-attachments/assets/d2ebc2be-050f-417b-8d42-22ea5e639122)

### ✔️ Language
![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![html](https://img.shields.io/badge/HTML-239120?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS-239120?&style=for-the-badge&logo=css3&logoColor=white)
![Next.js](https://img.shields.io/badge/Jsx-666666?style=for-the-badge)
![TypeScript](https://img.shields.io/badge/Jsx-666666?style=for-the-badge)

### ✔️ Version Control

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### ✔️ IDE
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)

### ✔️ Framework
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React_Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Next.js](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### ✔️ Deploy
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Glitch](https://img.shields.io/badge/Glitch-2800ff?style=for-the-badge&logo=glitch&logoColor=white)

### ✔️ DBMS
![Supabase](https://img.shields.io/badge/Jsx-666666?style=for-the-badge)

### ✔️ State

![Zustand](https://img.shields.io/badge/Zustand-666666?style=for-the-badge)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-666666?style=for-the-badge)<br/>

### ✔️ Linters

![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

### ✔️ Design

![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

### ✔️ API

## 🧱 서비스 구조


## 🎨 와이어프레임

<details>
  <summary><b>Park Finder 와이어프레임</b></summary>

![image](https://github.com/user-attachments/assets/8238b91c-d199-47f1-b0eb-b11d35ee850a)
![image](https://github.com/user-attachments/assets/be62e9c1-7e58-4bcb-b7ac-dc0c74ae32ab)
![image](https://github.com/user-attachments/assets/91b07d77-f0d2-4a6d-a068-2c1f45eed93a)
![image](https://github.com/user-attachments/assets/663913f7-d12a-42ee-9a5f-00cffd315bdb)

</details>
<br/>

## 📋 API 명세서

서버 API_URL : https://moneyfulpublicpolicy.co.kr/<br/>

<details>
  <summary><b>API 명세서</b></summary>
<br/>
	
**회원가입**
```
Request
Method → POST
URL PATH →  /register
Body ⬇️​
JSON
{
  "id": "유저 아이디",
  "password": "유저 비밀번호",
  "nickname": "유저 닉네임"
}
​
Response
{
  "message": "회원가입 완료",
  "success": true
}
```

**로그인**

```
Request
Method → POST
URL PATH →  /login
Body ⬇️​
JSON
{
  "id":"유저 아이디",
  "password": "유저 비밀번호"
}
​
Query string ⬇️ (선택)
accessToken 유효시간 조정을 위한 query string
/login?expiresIn=10m

// 유효시간을 10분인 accessToken 요청
​
Response
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImFiY2FiYyIsImlhdCI6MTcwMDgxNDQyMCwiZXhwIjoxNzAwODE4MDIwfQ.8hWOHHEzDPzumnqCU7jyoi3zFhr-HNZvC7_pzBfOeuU",
  "userId": "유저 아이디",
  "success": true,
  "avatar": "프로필 이미지",
  "nickname": "유저 닉네임"
}
```

**회원정보 확인**

```
Request
Method → GET
URL PATH →  /user
Header ⬇️​
{
  "Authorization": "Bearer AccessToken"
}
​
Response
{
  "id": "사용자 아이디",
  "nickname": "사용자 닉네임",
  "avatar": null,
  "success": true
}
```

**프로필 변경**

```
Request
Method → PATCH
URL PATH →  /profile
Header ⬇️​
{
  "Authorization": "Bearer AccessToken"
}
​
Body ⬇️​
FORM
{
  "avatar": [이미지파일],
  "nickname": "변경할 닉네임"
}
​
Response
{
  "avatar": "변경된 이미지 URL",
  "nickname": "변경된 닉네임",
  "message": "프로필이 업데이트되었습니다.",
  "success": true
}
```

</details>
	
### Comment Api
서버 API_URL : https://moneyfulpublicpolicy.co.kr/
<details>
  <summary><b>Comment Api</b></summary>
<br/>
	
**댓글 확인**
```
Request
Method → GET
URL PATH
```

**댓글 추가**

```
Request
Method → POST
URL PATH / comment + createdAt: new Date().toISOString()
```

**댓글 삭제**

```
Method → DELETE
URL PATH + ${id}
```

**댓글 수정**

```
Method → PATCH
URL PATH + ${id}
text(변경할 댓글),
createdAt: new Date().toISOString()
```

</details>
<br />

## 📦 프로젝트 파일 구조

<details>
  <summary><b>Smit 프로젝트 구조</b></summary>
📦src
 ┣ 📂app
 ┃ ┣ 📂api
 ┃ ┃ ┗ 📂delete-user
 ┃ ┃ ┃ ┗ 📜route.ts
 ┃ ┣ 📂event
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂login
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂mypage
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜DeleteUserButton.tsx
 ┃ ┃ ┃ ┣ 📜EditProfile.tsx
 ┃ ┃ ┃ ┣ 📜MyLikePosts.tsx
 ┃ ┃ ┃ ┣ 📜MyPostCard.tsx
 ┃ ┃ ┃ ┣ 📜MyPostList.tsx
 ┃ ┃ ┃ ┗ 📜UserProfile.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂post
 ┃ ┃ ┗ 📂[id]
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┣ 📜ApplyStudy.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CommentListItem.tsx
 ┃ ┃ ┃ ┃ ┣ 📜DetailComments.tsx
 ┃ ┃ ┃ ┃ ┣ 📜DetailContents.tsx
 ┃ ┃ ┃ ┃ ┣ 📜EditButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜LikeCount.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ReplyComment.tsx
 ┃ ┃ ┃ ┃ ┗ 📜ShareStudy.tsx
 ┃ ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┃ ┗ 📜useComments.ts
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂ranking
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜Avatar.tsx
 ┃ ┃ ┃ ┣ 📜QuestionModal.tsx
 ┃ ┃ ┃ ┣ 📜RankingCard.tsx
 ┃ ┃ ┃ ┣ 📜RankingModal.tsx
 ┃ ┃ ┃ ┗ 📜RankingModalOverlay.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂signup
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂study
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜ApplyUserIncludeManagerProfileImgList.tsx
 ┃ ┃ ┃ ┣ 📜ApplyUserProfileImgList.tsx
 ┃ ┃ ┃ ┣ 📜GroupCalendar.tsx
 ┃ ┃ ┃ ┣ 📜MyStudyList.tsx
 ┃ ┃ ┃ ┣ 📜PersonalMemoItem.tsx
 ┃ ┃ ┃ ┣ 📜PersonalMemos.tsx
 ┃ ┃ ┃ ┣ 📜SavedCalender.tsx
 ┃ ┃ ┃ ┣ 📜UserJoinedStudy.tsx
 ┃ ┃ ┃ ┣ 📜UserOwnStudy.tsx
 ┃ ┃ ┃ ┗ 📜WeekCalendar.tsx
 ┃ ┃ ┣ 📂[id]
 ┃ ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┃ ┣ 📜AttendanceRate.tsx
 ┃ ┃ ┃ ┃ ┣ 📜BackButton.tsx
 ┃ ┃ ┃ ┃ ┣ 📜CreateEventForm.tsx
 ┃ ┃ ┃ ┃ ┣ 📜EventList.tsx
 ┃ ┃ ┃ ┃ ┣ 📜EventListItem.tsx
 ┃ ┃ ┃ ┃ ┣ 📜GroupRate.tsx
 ┃ ┃ ┃ ┃ ┣ 📜ManagedMemberList.tsx
 ┃ ┃ ┃ ┃ ┣ 📜RateGroupBox.tsx
 ┃ ┃ ┃ ┃ ┣ 📜SelectTime.tsx
 ┃ ┃ ┃ ┃ ┣ 📜StudyInfo.tsx
 ┃ ┃ ┃ ┃ ┣ 📜Timer.tsx
 ┃ ┃ ┃ ┃ ┣ 📜UserRate.tsx
 ┃ ┃ ┃ ┃ ┗ 📜WaitApplyList.tsx
 ┃ ┃ ┃ ┣ 📂hooks
 ┃ ┃ ┃ ┃ ┣ 📜useCalendar.ts
 ┃ ┃ ┃ ┃ ┗ 📜usePersonalMemo.ts
 ┃ ┃ ┃ ┣ 📂manage
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┣ 📂[date]
 ┃ ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📂write
 ┃ ┃ ┣ 📂components
 ┃ ┃ ┃ ┣ 📜Dropdown.tsx
 ┃ ┃ ┃ ┣ 📜SelectDate.tsx
 ┃ ┃ ┃ ┣ 📜StudyModal.tsx
 ┃ ┃ ┃ ┗ 📜WriteModal.tsx
 ┃ ┃ ┣ 📂study
 ┃ ┃ ┃ ┗ 📜page.tsx
 ┃ ┃ ┗ 📜page.tsx
 ┃ ┣ 📜error.tsx
 ┃ ┣ 📜layout.tsx
 ┃ ┣ 📜not-found.tsx
 ┃ ┗ 📜page.tsx
 ┣ 📂components
 ┃ ┣ 📂common
 ┃ ┃ ┣ 📜Badge.tsx
 ┃ ┃ ┣ 📜Button.tsx
 ┃ ┃ ┣ 📜Footer.tsx
 ┃ ┃ ┣ 📜Header.tsx
 ┃ ┃ ┣ 📜LikeButton.tsx
 ┃ ┃ ┣ 📜MenuItem.tsx
 ┃ ┃ ┣ 📜Modal.tsx
 ┃ ┃ ┣ 📜ModalOverlay.tsx
 ┃ ┃ ┣ 📜ScrollPicker.tsx
 ┃ ┃ ┣ 📜SelectDateModal.tsx
 ┃ ┃ ┣ 📜SquarePostCard.tsx
 ┃ ┃ ┣ 📜TitleInput.tsx
 ┃ ┃ ┗ 📜ValidateInput.tsx
 ┃ ┣ 📂home
 ┃ ┃ ┣ 📜Banner.tsx
 ┃ ┃ ┣ 📜Category.tsx
 ┃ ┃ ┣ 📜FeaturedPosts.tsx
 ┃ ┃ ┣ 📜FilterablePosts.tsx
 ┃ ┃ ┣ 📜MultiCarousel.tsx
 ┃ ┃ ┣ 📜OccupancyCounter.tsx
 ┃ ┃ ┗ 📜PostCard.tsx
 ┃ ┣ 📂providers
 ┃ ┃ ┗ 📜QueryClientProvider.tsx
 ┃ ┗ 📂ui
 ┃ ┃ ┣ 📂icons
 ┃ ┃ ┃ ┣ 📜AlertFillIcon.tsx
 ┃ ┃ ┃ ┣ 📜AlertIcon.tsx
 ┃ ┃ ┃ ┗ 📜EditIcon.tsx
 ┃ ┃ ┣ 📜button.tsx
 ┃ ┃ ┣ 📜calendar.tsx
 ┃ ┃ ┗ 📜CustomButton.tsx
 ┣ 📂hooks
 ┃ ┣ 📜useApplyStudyList.ts
 ┃ ┣ 📜useLikePost.ts
 ┃ ┣ 📜useModalOpen.ts
 ┃ ┣ 📜usePostsQuery.ts
 ┃ ┣ 📜useStudy.ts
 ┃ ┣ 📜useTimer.ts
 ┃ ┣ 📜useTimerQuery.ts
 ┃ ┗ 📜useUserProfile.ts
 ┣ 📂lib
 ┃ ┗ 📜utils.ts
 ┣ 📂service
 ┃ ┣ 📜posts.ts
 ┃ ┗ 📜study.ts
 ┣ 📂styles
 ┃ ┗ 📜globals.css
 ┣ 📂types
 ┃ ┗ 📜PersonalMemo.ts
 ┣ 📂utils
 ┃ ┣ 📂supabase
 ┃ ┃ ┣ 📜client.ts
 ┃ ┃ ┣ 📜server.ts
 ┃ ┃ ┣ 📜supabase-client.ts
 ┃ ┃ ┗ 📜supabase-server.ts
 ┃ ┣ 📜convertDate.ts
 ┃ ┗ 📜getTime.ts
 ┗ 📜middleware.tsk
```

</details>
<br/>

## 💥 Trouble Shooting
#### 문제상황


#### 해결 방법, 개선 사항


### 2. 댓글 수정 시 UI 반응성 저하
#### 문제상황


#### 해결 방법


#### 개선 사항

<br/><br />

## 🗨 Project Remind & 프로젝트 소감
#### 강수진(Leader, Fe Developer)


#### 정수희(Sub-Leader, Fe Developer)


#### 김태현(Fe Developer)


#### 설하영(Fe Developer)


#### 홍승우(Fe Developer)


#### 이재은(Designer)


#### 하예림(Designer)
