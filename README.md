# Smit
<img width="1920" alt="스밋_표지 3_1" src="https://github.com/user-attachments/assets/02ef7e41-4bbd-4eaf-8671-25aa71394fd4">

## 🔗 배포 링크
https://smit-8y5a.vercel.app/<br/>
<br/>

## 📖 목차
1. [프로젝트 소개](#-프로젝트-소개)
2. [팀소개](#-팀소개)
3. [역할 분담](#-역할-분담)
4. [개발 환경](#-개발-환경)
5. [주요기능](#-주요기능)
6. [개발기간](#%EF%B8%8F-개발기간)
7. [기술스택](#%EF%B8%8F-기술스택)
8. [서비스 구조](#-서비스-구조)
9. [와이어프레임](#-와이어프레임)
10. [프로젝트 파일 구조](#-프로젝트-파일-구조)
11. [Trouble Shooting](#-trouble-shooting)
12. [Project Remind & 프로젝트 소감](#-project-remind--프로젝트-소감)
<br/><br/>

## 👨‍🏫 프로젝트 소개
"나만의 스터디 그룹을 온라인에서 만들어보세요! <br>
우리 서비스에서는 함께 공부하며 성적을 올리고, 점수를 얻어서 스터디 그룹의 랭킹을 올릴 수 있습니다. 스밋으로 함께 공부하는 재미를 새롭게 경험해보세요! <br>
스밋(Smit)은 온라인에서 손쉽게 스터디 그룹을 만들고, 실시간으로 그룹원들의 공부현황을 확인하며, 학습 시간을 관리할 수 있는 플랫폼입니다.  <br>
그룹의 학습 점수를 확인하고, 랭킹으로 성과를 비교하여 학습 동기를 강화할 수 있습니다. <br><br>

### 기존 스터디의 문제 <br>
1. 기존 스터디 서비스의 문제  <br>
현재 상용화된 서비스된 스터디의 특화된 도구들을 제공하기에는 부족하다. <br>
한 기능 차중되어 있는 느낌 (일정은, 일정만, 기록은 기록만, 모집은 모집만) <br>

### 우리 서비스의 차별점

- 모집과 관리를 동시에 할 수 있다.
- 스터디 그룹 랭킹을 도입해 스터디 팀원의 참여를 유도한다.
- 일정 관리, 스터디 기록, 그룹 일정 공유 등

<br/>

## 👨‍👩‍👧‍👦 팀소개
<div align="center">

| **강수진 Reader** | **정수희 SubReader** | **김태현** | **설하영** | **홍승우** | **이재은** | **하예림** |
| :------: |  :------: | :------: | :------: | :------: | :------: | :------: |
| [<img src="https://avatars.githubusercontent.com/u/175091912?v=4" height=150 width=150> <br/> @Kang-1230](https://github.com/@Kang-1230) | [<img src="https://avatars.githubusercontent.com/u/175583374?v=4" height=150 width=150> <br/> @doo1b](https://github.com/doo1b) | [<img src="https://avatars.githubusercontent.com/u/76766459?v=4" height=150 width=150> <br/> @derek0k](https://github.com/derek0k) | [<img src="https://avatars.githubusercontent.com/u/163470732?v=4" height=150 width=150> <br/> @hadooni](https://github.com/hadooni) | [<img src="https://avatars.githubusercontent.com/u/64956234?v=4" height=150 width=150> <br/> @SeungwooHong97](https://github.com/SeungwooHong97) | [<img src="https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/profile_img/default" height=150 width=150> <br/> @jaeunE](https://sprinkle-sunspot-9a8.notion.site/Notion-24198d23f09c4288bdd4b0b08a28de77) | [<img src="https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/profile_img/default" height=150 width=150> <br/> @yerimHa]() |
| **Fe-Developer** | **Fe-Developer** | **Fe-Developer** | **Fe-Developer** | **Fe-Developer** | **Designer** | **Designer** |

</div>

<br>


## 🤙 역할 분담
### 🍊강수진 

- **UI**
    - 페이지 : 로그인, 회원가입, 내 스터디 탭
    - 공통 컴포넌트 : 사용자 프로필
- **기능**
    -  회원가입, 로그인, API로그인(카카오톡, 구글) , 내가 방장인 스터디, 내가 가입한 스터디 , 신청한 스터디, 방장 이동,
    -  가입 대기자 승인 , 거절 
<br>

### 😎정수희 

- **UI**
    - 페이지 : 마이페이지, 스터디 페이지 - 타이머 설정(집중 스터디) , 스터디 페이지 - 출석율, 일일 스터디 달성률 등 통계
    - 공통 컴포넌트 : 버튼 , 버튼 뱃지 , Like 버튼 
- **기능**
    - 사용자 정보 변경, 회원 탈퇴 기능 , 마이페이지-본인이 작성한 게시글 불러오기, 모집글 좋아요 기능, 그룹 페이지 타이머,
    - 출석율 , 달성률 등 컴포넌트트

<br> 

### 👻김태현 

- **UI**
    - 페이지 : 메인 페이지 , 내 스터디 탭, 랭킹 탭
    - 공통 컴포넌트 : 헤더
- **기능**
    - 스터디 검색, 신청할 수 있는 스터디, 방장인 스터디, 가입한 스터디 , 메인화면 이미지 캐러셀,
    - 인기 스터디, 최근 스터디(최신 순, 인기 순, 댓글 순 정렬 가능), 직업, 카테고리 별 정렬 기능 , 내 스터디의 그룹 순위 기능
<br>

### 🐬설하영

- **UI**
    - 페이지 : 스터디 모집글 상세 페이지 , 그룹페이지 - 회고록 컴포넌트 , 일정 기록 캘린더 컴포넌트,
    - 공통 컴포넌트 : 데이트 Picker, 시간 Picker, bottom sheet UI
- **기능**
    - 스터디 모집글 상세 페이지, 수정 , 삭제 , 토글 버튼 추가, 상세 페이지 공유 기능 , 댓글 수정 모드, 댓글 기능, 댓글 이미지 출력
    - 댓글 수정 날짜 업데이트 , 댓글 리스트 컴포넌트로 분리, 그룹 페이지에 회고록 기능, 그룹 페이지 캘린더 기능

<br>

### ❤️홍승우

- **UI**
    - 페이지 : 스터디 생성 페이지, 스터디 모집글 생성 페이지, 스터디 모집글 수정 페이지 , 스터디 그룹 페이지 (스터디 정보 표시,
    - 스터디 그룹 내 구성원 프로필 표시)
    - 공통 컴포넌트 : 스터디 생성 시 직업 태그 , 분야 카테고리 태그 모달창 컴포넌트 
- **기능**
    - 스터디 생성 , 스터디 모집글 생성, 스터디 모집글 수정, 스터디 그룹 페이지 내 스터디 정보 및 구성원 프로필 표시
<br>

### 😁이재은 && 하예림 (Design)
모바일 UI, 데스크탑 UI
-모집, 스터디, 랭킹, MY, 스터디룸, 모집글/스터디 작성, 로그인, 디자인 시스템/ 컴포넌트 제작, 와이어 프레임 제작
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


## 💁 주요기능

### 🏠 홈(모집)
![image](https://github.com/user-attachments/assets/ae176ccf-09ee-489b-87f8-cdf26af400fc)

- 플로팅 버튼을 눌러 언제든지 나만의 스터디 그룹을 만들고, 모집글을 작성할 수 있습니다. <br>
-  상단 Nav Bar의 검색 아이콘 기능을 통해 나에게 필요한 스터디를 효율적으로 찾아볼 수 있습니다. <br>
-  관심 있는 모집 공고에 ‘좋아요’를 누르거나 의견을 댓글로 남길 수 있습니다. <br>
- 상단 캐러셀을 통해 스터디와 관련된 다양한 이벤트를 확인할 수 있습니다. <br>
- 인기 스터디를 통해 최근 가장 많은 관심수를 받는 스터디가 무엇인지 탐색할 수 있습니다. <br> 
- 카테고리 칩을 통해 원하는 주제와 관련된 스터디만 필터링해 볼 수 있습니다. 칩을 클릭하면 바텀 시트가 올라옵니다. <br>


### 📝 모집글 작성
****![image](https://github.com/user-attachments/assets/690c89cb-2054-487f-96e7-a9300b178f9d)

- 스터디원들을 모으기 위한 모집글을 작성할 수 있습니다. <br> 
- 카테고리 바를 클릭하면 바텀시트가 올라오며, 이때 스터디 시작 예정일과 모집글을 작성할 스터디를 선택할 수 있습니다. <br>
- 스터디 그룹의 모집인원 및 태그가 모집글에도 동일하게 적용됩니다. <br>
- 모집글에 작성할 내용의 byte 제한은 없습니다. <br>
- 게시된 모집글에는 댓글, 찜, 공유, 가입 신청 기능을 사용할 수 있습니다. <br>
- 댓글에는 답글을 달 수 있으며, 폴딩형식으로 답글을 표시하거나 감출 수 있습니다. <br>
- 게시글을 찜하면 마이페이지에서 찜한 리스트를 모아볼 수 있습니다. <br>
- 공유하기 버튼을 누르면 해당 게시글의 URL이 복사되었다는 토스트 모달이 뜹니다. <br>
- 신청하기 버튼을 누르면 각오 한 마디를 적을 수 있는 텍스트 필드가 포함된 모달이 뜹니다. <br>

### 🏫 스터디
![image](https://github.com/user-attachments/assets/cf87b04a-f38a-4a3a-a6c4-fca98a9ec0dc)


- 참여 중인 모든 스터디 리스트를 한눈에 확인하고 관리할 수 있는 페이지입니다.
- 상단 캘린더를 통해 스터디 일정을 직관적으로 관리할 수 있습니다. 캘린더 아이콘을 클릭하면 월간 캘린더 팝업이 나옵니다.
- 캘린더에서 일정 또는 스터디 리스트를 클릭하여 스터디 룸에 바로 접속할 수 있습니다.
- 가입 신청한 스터디의 리스트를 한 눈에 볼 수 있습니다.
- 방장은 생성한 스터디 그룹의 설정을 수정하고, 구성원 관리를 할 수 있습니다.
- 스터디원 관리 탭에서 스터디 가입을 신청한 사람들의 대기 리스트와 스터디에 속해 있는 멤버들 리스트를 볼 수 있으며, 이곳에서 멤버 강퇴와 방장 권한 넘기기가 가능합니다.
- 스터디 편집 탭에서는 한 줄 설명, 오픈채팅방 링크, 스터디 인원수 설정 및 태그 수정이 가능하고, 해당 스터디를 삭제하는 기능이 있습니다.


### 🧑‍🎓 스터디 룸
![image](https://github.com/user-attachments/assets/8efe99b0-4532-48e1-90ce-69d67d302ad8)

- 팀원들과 함께 스터디를 진행하는 메인 페이지입니다.
- 사전 등록된 스터디 일정과 시간을 한눈에 확인할 수 있습니다.
- 데일리 플래너에 오늘의 스터디 목표를 설정하여 효율적으로 학습을 계획할 수 있습니다.
- 스톱워치 기능을 통해 순공 시간을 측정하고, 공부 시간 달성률을 확인할 수 있습니다
- 출석률과 공부 시간 달성 인원을 볼 수 있으며, 이는 스터디 그룹의 점수로 반영됩니다.
- 캘린더를 통해 다음 스터디 일정을 보고 쉽게 다음 일정을 계획할 수 있습니다.
- 회고록을 통해 하루의 학습 내용을 되돌아보고 성찰할 수 있습니다.
- 오픈채팅방 링크를 통해 팀원들과 즉시 소통할 수 있습니다.
- 팀원의 프로필 이미지를 클릭하면 팀원의 공부시간 달성률과 공부 계획을 확인할 수 있습니다.

### 🥇 랭킹
![image](https://github.com/user-attachments/assets/b533a2af-3d62-49ec-b2cd-d5cb69e761cd)

- 주간 스터디 랭킹을 보여줍니다.
- 스터디 랭킹을 클릭하면 스터디 그룹 프로필을 볼 수 있습니다.
- i 아이콘을 클릭하면 랭킹의 기준에 대한 정보 표시 모달이 뜹니다.



### 🙋 로그인/ 회원가입 
![image](https://github.com/user-attachments/assets/a9c68220-f0df-468d-8c9e-8106f33f6221)


- 스밋의 로그인 화면입니다.
- 이메일과 비밀번호를 입력할 수 있으며, 자동 로그인 체크가 가능합니다.
- 카카오톡, 구글 계정을 통한 소셜 로그인이 가능합니다.
- 회원가입에서 닉네임 유효성 검사를 진행하며, 통과하지 못한 경우 경고 문구가 입력창 하단에 표시됩니다.
- 회원가입이 완료된 후, 메인 홈 화면으로 이동하며 회원가입 축하 모달이 뜹니다.

## ⏲️ 개발기간

2024.10.18(금) ~ 2024.11.21(목)<br/>
<br/>

## 📚️ 기술스택
![image](https://github.com/user-attachments/assets/d2ebc2be-050f-417b-8d42-22ea5e639122)

### ✔️ Language
![js](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![html](https://img.shields.io/badge/HTML-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![css](https://img.shields.io/badge/CSS-1572B6?&style=for-the-badge&logo=css3&logoColor=white)
![nextdotjs](https://img.shields.io/badge/Next.js-000000?&style=for-the-badge&logo=Next.js&logoColor=white)
![typescript](https://img.shields.io/badge/typescript-3178C6?&style=for-the-badge&logo=typescript&logoColor=white)

### ✔️ Version Control

![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)

### ✔️ IDE
![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?style=for-the-badge&logo=Visual%20Studio%20Code&logoColor=white)

### ✔️ Framework
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![React_Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### ✔️ Deploy
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

### ✔️ DBMS
![Supabase](https://img.shields.io/badge/Jsx-666666?style=for-the-badge)

### ✔️ State
![TanStack Query](https://img.shields.io/badge/TanStack_Query-666666?style=for-the-badge)<br/>

### ✔️ Linters

![eslint](https://img.shields.io/badge/eslint-3A33D1?style=for-the-badge&logo=eslint&logoColor=white)
![prettier](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

### ✔️ Design

![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)

## 🎨 서비스 구조


## 🎨 와이어프레임
	
### 홈 / 알림/ 검색
![image](https://github.com/user-attachments/assets/923c95ca-b7dd-47e4-8b65-f50daa7ef194)

### 모집글 작성 + 스터디 그룹 생성 + 모집글 수정 + 스터디 수정 
![image](https://github.com/user-attachments/assets/491f8290-daab-4b01-b94e-1b2eb484ac66)

### 내 스터디, 스터디 그룹 
![image](https://github.com/user-attachments/assets/85479de6-c49a-4160-911f-09f25d03c50b)

### 랭킹 페이지 
![image](https://github.com/user-attachments/assets/9ee3a6c1-6c0f-496f-8372-07eb3d61951f)


### 로그인 / 회원가입
![image](https://github.com/user-attachments/assets/b4195ac5-26ee-486a-8b85-c0ec6966ec6d)


### 마이 페이지
![image](https://github.com/user-attachments/assets/45641419-70b6-47e0-9b3b-3291cb1e1bf7)

<br/>

## 📦 프로젝트 파일 구조
src  
│  
├── middleware.ts  
│  
├── app  
│   ├── error.tsx  
│   ├── layout.tsx  
│   ├── not-found.tsx  
│   ├── page.tsx  
│   │  
│   ├── api  
│   │   └── delete-user  
│   │       └── route.ts  
│   │  
│   ├── event  
│   │   └── page.tsx  
│   │  
│   ├── login  
│   │   └── page.tsx  
│   │  
│   ├── mypage  
│   │   ├── page.tsx  
│   │   └── components  
│   │       ├── DeleteUserButton.tsx  
│   │       ├── EditProfile.tsx  
│   │       ├── MyLikePosts.tsx  
│   │       ├── MyPostCard.tsx  
│   │       ├── MyPostList.tsx  
│   │       └── UserProfile.tsx  
│   │  
│   ├── post  
│   │   └── [id]  
│   │       ├── page.tsx  
│   │       ├── components  
│   │       │   ├── ApplyStudy.tsx  
│   │       │   ├── CommentListItem.tsx  
│   │       │   ├── ContentsEdit.tsx  
│   │       │   ├── DetailComments.tsx  
│   │       │   ├── DetailContents.tsx  
│   │       │   ├── EditButton.tsx  
│   │       │   ├── LikeCount.tsx  
│   │       │   ├── OpenStudyProfile.tsx  
│   │       │   ├── ReplyComment.tsx  
│   │       │   └── ShareStudy.tsx  
│   │       └── hooks  
│   │           └── useComments.ts  
│   │  
│   ├── ranking  
│   │   ├── page.tsx  
│   │   └── components  
│   │       ├── Avatar.tsx  
│   │       ├── QuestionModal.tsx  
│   │       ├── RankingCard.tsx  
│   │       ├── RankingModal.tsx  
│   │       └── RankingModalOverlay.tsx  
│   │  
│   ├── signup  
│   │   └── page.tsx  
│   │  
│   ├── study  
│   │   ├── page.tsx  
│   │   ├── components  
│   │   │   ├── ApplyUserIncludeManagerProfileImgList.tsx  
│   │   │   ├── ApplyUserProfileImgList.tsx  
│   │   │   ├── GroupCalendar.tsx  
│   │   │   ├── MyStudyList.tsx  
│   │   │   ├── PersonalMemoItem.tsx  
│   │   │   ├── PersonalMemos.tsx  
│   │   │   ├── SavedCalender.tsx  
│   │   │   ├── UserJoinedStudy.tsx  
│   │   │   ├── UserOwnStudy.tsx  
│   │   │   └── WeekCalendar.tsx  
│   │   └── [id]  
│   │       ├── page.tsx  
│   │       ├── components  
│   │       │   ├── AttendanceRate.tsx  
│   │       │   ├── CreateEventForm.tsx  
│   │       │   ├── EventList.tsx  
│   │       │   ├── EventListItem.tsx  
│   │       │   ├── GroupRate.tsx  
│   │       │   ├── ManagedMemberList.tsx  
│   │       │   ├── MemberImg.tsx  
│   │       │   ├── SelectTime.tsx  
│   │       │   ├── StudyChat.tsx  
│   │       │   ├── StudyInfo.tsx  
│   │       │   ├── StudyStateBox.tsx  
│   │       │   ├── StudyTime.tsx  
│   │       │   ├── Timer.tsx  
│   │       │   ├── UserRate.tsx  
│   │       │   └── WaitApplyList.tsx  
│   │       └── hooks  
│   │           ├── useCalendar.ts  
│   │           └── usePersonalMemo.ts  
│   │       └── manage  
│   │           └── page.tsx  
│   │       └── [date]  
│   │           └── page.tsx  
│   │  
│   └── write  
│       ├── page.tsx  
│       └── components  
│           ├── Dropdown.tsx  
│           ├── SelectDate.tsx  
│           ├── StudyModal.tsx  
│           └── WriteModal.tsx  
│       └── study  
│           └── page.tsx  
│  
├── components  
│   ├── common  
│   │   ├── BackButton.tsx  
│   │   ├── Badge.tsx  
│   │   ├── Button.tsx  
│   │   ├── Footer.tsx  
│   │   ├── Header.tsx  
│   │   ├── LikeButton.tsx  
│   │   ├── MenuItem.tsx  
│   │   ├── Modal.tsx  
│   │   ├── ModalOverlay.tsx  
│   │   ├── ScrollPicker.tsx  
│   │   ├── SelectDateModal.tsx  
│   │   ├── SquarePostCard.tsx  
│   │   ├── TitleInput.tsx  
│   │   └── ValidateInput.tsx  
│   ├── home  
│   │   ├── Banner.tsx  
│   │   ├── Category.tsx  
│   │   ├── FeaturedPosts.tsx  
│   │   ├── FilterablePosts.tsx  
│   │   ├── MultiCarousel.tsx  
│   │   ├── OccupancyCounter.tsx  
│   │   └── PostCard.tsx  
│   ├── providers  
│   │   └── QueryClientProvider.tsx  
│   └── ui  
│       ├── button.tsx  
│       ├── calendar.tsx  
│       ├── CustomButton.tsx  
│       └── icons  
│           ├── AlertFillIcon.tsx  
│           ├── AlertIcon.tsx  
│           └── ArrowLeft.tsx  
│  
├── hooks  
│   ├── useApplyStudyList.ts  
│   ├── useLikePost.ts  
│   ├── useModalOpen.ts  
│   ├── usePostsQuery.ts  
│   ├── useStudy.ts  
│   ├── useStudyManager.ts  
│   ├── useTimerQuery.ts  
│   └── useUserProfile.ts  
│  
├── lib  
│   └── utils.ts  
│  
├── service  
│   ├── posts.ts  
│   └── study.ts  
│  
├── styles  
│   └── globals.css  
│  
├── types  
│   └── PersonalMemo.ts  
│  
└── utils  
    ├── calculateScore.ts  
    ├── convertDate.ts  
    ├── getTime.ts  
    └── supabase  
        ├── client.ts  
        ├── server.ts  
        ├── supabase-client.ts  
        └── supabase-server.ts  



## 💥 Trouble Shooting

### 핵심 코드<회원가입,로그인,로그아웃> - 강수진

supabase에서 제공하는 로직을 이용하여 회원가입, 로그인, 로그아웃을 구현하였음. insert,update,delete 함수가 모두 사용되었고 tanstackQuery를 통해 useEffect 사용으로 인한 오류를 방지할 목적으로 최소화하며 작성하였음.
```
"use client";

import supabase from "../../utils/supabase/client";
import { FormEvent, useEffect, useState } from "react";
import RectangleSighUpBack from "../../../public/icons/RectangleLoginBack.svg";
import Image from "next/image";
import BackButton from "@/components/common/BackButton";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verifyPassword, setVerifyPassword] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [gender, setGender] = useState<"male" | "female">();

  const [passwordMessage, setPasswordMessage] = useState("");

  useEffect(() => {
    if (verifyPassword) {
      if (password === verifyPassword) {
        setPasswordMessage("");
        setIsPasswordValid(true);
      } else {
        setPasswordMessage("비밀번호가 동일하지 않습니다.");
        setIsPasswordValid(false);
      }
    }
  }, [password, verifyPassword]);

  const preventDuplication = () => {
    alert("사용 가능한 닉네임입니다.")
  }


  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPasswordValid) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 모든 필드 검증
    if (!email || !password || !name || !nickName || !birthDate) {
      alert("모든 필드를 입력해주세요.");
      return;
    }

    try {
      // 이메일 중복 체크
      const { data: existingUser } = await supabase
        .from("user")
        .select("email")
        .eq("email", email)
        .single();

      if (existingUser) {
        alert("이미 존재하는 이메일입니다.");
        return;
      }

      // auth 회원가입
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: email,
        password: password,
      });

      console.log("authdata:", authData);

      if (authError) throw authError;
      if (!authData.user) throw new Error("User data is missing");

      try {
        // user 테이블에 정보 저장
        const { error: insertError } = await supabase
          .from("user")
          .insert({
            id: authData.user.id,
            user_name: name,
            name: nickName,
            birth_date: birthDate,
            email: email,
            study_time: 0,
          })
          .select();

        if (insertError) {
          // 실패 시 auth 데이터 정리 시도
          await supabase.auth.signOut();
          console.error("Full Insert Error:", insertError);
          throw new Error(
            `사용자 정보 저장에 실패했습니다: ${insertError.message}`,
          );
        }

        // 성공
        alert("회원가입이 완료되었습니다!");
        await supabase.auth.signOut(); // 성공해도 일단 로그아웃
        window.location.href = "/login";
      } catch (error) {
        // user 테이블 저장 실패 시
        await supabase.auth.signOut();
        throw error;
      }
    } catch (error) {
      console.error("Full SignUp Error:", error);
      await supabase.auth.signOut();

      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("회원가입 중 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  };

  return ( ... 
  );
}
```
#### 문제상황 <SQL 코드 구현 시의 문제> - 강수진 
auth와 public user 테이블을 연결하기 위해 SQL 트리거를 작성하였는데,
```jsx
{"component":"api","error":"failed to close prepared statement: ERROR: current transaction is aborted, commands ignored until end of transaction block (SQLSTATE 25P02): ERROR: relation \"public.buddies\" does not exist (SQLSTATE 42P01)","level":"error","method":"POST","msg":"500: Database error saving new user","path":"/signup","referer":"http://localhost:3000/","remote_addr":"49.142.42.60","request_id":"8d6ae64c90b43280-ICN","time":"2024-10-22T16:35:16Z"}
```
이런 데이터베이스 오류가 발생.

#### 해결 방법, 개선 사항 
-검색해보니 supabase 로그를 확인하는 법이 있어서 로그를 확인하고 에러 메시지를 확인했다. 

-트리거, 평션이 이미 있는 게 문제인 것을 확인

-트리거, 펑션을 다 삭제

- 삭제가 또 안돼서 검색을 통해 drop function을 하고 

다시 SQL 트리거를 돌려 보니 연결이 잘 됐다.



### 핵심 코드< 커스텀 스크롤 선택 컴포넌트 > - 설하영

스크롤해서 옵션을 선택할 수 있는 선택 컴포넌트 입니다.
props로 선택할 옵션의 배열과 스크롤 이벤트 핸들러, 현재 선택된 아이템을 보여줄 상태를 내려주어 사용할 수 있습니다. 
```
"use client";

interface ScrollPickerProps {
  options: string[]; // 선택 옵션 배열
  handleScroll: (e: React.UIEvent<HTMLDivElement>) => void; // 스크롤 이벤트 핸들러
  selectedItem: string; // 현재 선택된 아이템
}

const ScrollPicker = ({
  options,
  handleScroll,
  selectedItem,
}: ScrollPickerProps) => {
  return (
    <div className="h-[140px] relative w-16">
      <div
        className={`absolute pointer-events-none  ${
          options.length > 0 && options[0].length < 5
            ? "w-10 top-[50px] right-[14px]"
            : "w-[50px] top-[50px] right-[8.5px]"
        }  h-10 w-10 border-y-2`}
      />
      <div
        className="h-full overflow-auto scrollbar-hide snap-y snap-mandatory overscroll-contain py-[60px]"
        onScroll={handleScroll}
      >
      {/* 각 옵션 아이템 렌더링, 선택된 아이템은 진한 검정색, 나머지는 회색으로 표시 */}
        {options.map((item) => (
          <div
            key={item}
            className={`h-[40px] flex items-center justify-center snap-center
        ${
          selectedItem === item
            ? "text-black font-medium mt:border-solid"
            : "text-gray-400"
        }`}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScrollPicker;
```

#### 🚨 문제 상황 <부모-자식 댓글 삭제 시 외래키 제약조건 문제> - 설하영
 
- 부모 댓글이 삭제 상태이고 마지막 답글을 삭제할 때, 부모 댓글도 함께 삭제되어야 함 

- 하지만 답글만 삭제되고 부모 댓글 삭제 함수가 실행되지 않는 현상 발생

### 🔍 원인 분석

- 콘솔 로그와 에러 메시지를 통한 디버깅 결과, 데이터베이스의 참조 무결성(Foreign Key Constraint) 문제 확인

- 자식 댓글(답글)이 부모 댓글의 comment_id를 외래키로 참조하고 있는 상태

- 답글이 완전히 삭제되기 전에 부모 댓글을 삭제하려고 시도하여 제약조건을 위배하였음

### ✅ 해결 방법

- 답글 삭제 뮤테이션의 ‘onSuccess’ 콜백으로 부모 댓글 삭제 로직을 이동

- 답글이 성공적으로 삭제된 후 부모 댓글 삭제가 실행되도록 순서 변경

**핵심 코드< 커스텀 스크롤 선택 컴포넌트 >**스크롤해서 옵션을 선택할 수 있는 선택 컴포넌트 입니다.props로 선택할 옵션의 배열과 스크롤 이벤트 핸들러, 현재 선택된 아이템을 보여줄 상태를 내려주어 사용할 수 있습니다.



### 핵심 코드 - 정수희
useEffect, setInterval을 사용한 타이머 기능

- 초기 렌더링시 현재 스케쥴이 있는지 확인하고 있는 경우 timer 테이블에 저장된 데이터를 바탕으로 경과 시간을 set함.
그 후, 1분마다 초기화를 진행하여 일정을 최신화 하도록 설정
- 타이머 재생 상태가 변경될 때마다 타이머를 컨트롤하는 useEffect 실행
재생 중일때 경과시간을 계산하는 인터벌을 1초마다 실행하여 ui 반영
현재 일정 시간이 종료 되었을 때 종료 로직을 실행하여 랭킹에 반영될 점수를 계산하고 모달 띄움
```
 // 현재 일정 찾기 및 초기화 effect
  useEffect(() => {
	// 초기화 함수
    const initializeTimer = () => {
	  // 현재 시간에 해당하는 일정이 있는지 찾기
      const current = todaySchedules.find(
        (schedule) =>
          schedule.start_time <= getTime(new Date()) &&
          getTime(new Date()) < schedule.end_time,
      );
		// 시간과 맞는 일정이 있는 경우 현재 스케쥴에 저장하고
      if (current) {
        setCurrentSchedule(current);
        // 지금 시간이 캘린더에 등록되어 있는 시간 사이인지 한 번 더 확인
        const isValid = checkTimeRange(current);
        setIsWithinTimeRange(isValid);

		// 유저가 사용하던 타이머가 있고, 재생 상태가 아니라면
		// 일시정지 상태라면
        if (timerState && !timerState.is_running) {
	        // 테이블에 저장된 경과 시간을 바로 세팅
          setTime(timerState.accumulated_time);
        }
      } else {
	      // 현재 시간에 맞는 일정이 없다면 싹 다 초기화
        setCurrentSchedule(null);
        setTime(0);
        setIsWithinTimeRange(false);
      }
    };

    initializeTimer();
    // 그리고 이걸 1분마다 실행해서 계속해서 일정이 최신화 될 수 있도록
    const interval = setInterval(initializeTimer, 60000);
    // 언마운트시 인터벌 정리해주기
    return () => clearInterval(interval);
    // 오늘의 일정, 타이머가 있을 때 실행됨
  }, [todaySchedules, timerState]);


  // 타이머 종료 시간 체크
  useEffect(() => {
	  // 현재 일정이 없으면 무시
    if (!currentSchedule) return;

    // 스케줄 종료 시간 체크
    const scheduleEndCheck = setInterval(async () => {
      const now = getTime(new Date());

      // 현재 시간이 스케줄 종료 시간을 지났는지 체크
      if (now >= currentSchedule.end_time) {
        // 1. 타이머가 실행 중이었다면 정지
        if (timerState?.is_running) {
          handlePause();
        }

        // 2. 스케줄 종료 처리 및 점수 계산
        await handleScheduleEnd(currentSchedule);

        // 3. 상태 초기화
        setCurrentSchedule(null);
        setIsWithinTimeRange(false);
        setTime(0);
        setEndModalOpen(true);

		// 그리고 인터벌 해제
        clearInterval(scheduleEndCheck);
      }
    }, 1000);
	// 언마운트시 해제
    return () => clearInterval(scheduleEndCheck);
  }, [currentSchedule]);

  // 타이머 실행 중일 때
  useEffect(() => {
  // 범위가 아니거나, 현재 스케쥴이 없거나, 타이머가 재생중이 아닐 때는 무시
    if (!isWithinTimeRange || !currentSchedule || !timerState?.is_running)
      return;

	// 오늘 일정 있고 재생중일때 시간 계산해서 경과시간 set 해주기
    const timerInterval = setInterval(() => {
      const totalElapsed = calculateElapsedTime(
        timerState.last_start,
        timerState.accumulated_time,
      );
      setTime(totalElapsed);
    }, 1000);


	// 언마운트시 정리
    return () => clearInterval(timerInterval);
    // 재생상태 변경될 때마다 실행
  }, [timerState?.is_running, currentSchedule, isWithinTimeRange]);
  ```

  
#### 문제상황 <setInterval 을 사용한 타이머 기능 구현 중의 트러블 슈팅> - 정수희
useEffect를 사용해 첫 페이지 렌더링시 경과 시간을 세팅하고 타이머 재생 상태를 추적하여 interval을 실행하고 1초마다 렌더하여 ui를 업데이트 하는 방식으로 접근

#### 해결 방법, 개선 사항 
하지만 시작을 누르면 타이머가 9시간이 늘어나는 현상 발생 UTC 시간 변환 차이인가 싶어 시간 사용 시 같은 형식을 사용하도록 변환을 진행했으나 똑같이 발생함. 경과시간 계산식을 변경하면 일시정지 했을 때 9시간이 늘어나거나 시작 눌렀을 때 -9시간이 됨

시간이 오가는 모든 시점에 console 사용하여 출력했더니 하나의 useEffect 내에서 초기화와 타이머 실행이 동시에 컨트롤 되고 있어서 발생한 문제로 보임

useEffect를 분리하여 첫 렌더시 초기화와 타이머 재생 상태에 따른 interval을 따로 세팅했더니 재생, 일시정지 시에 9시간씩 차이나는 건 해결됨

하지만 시작을 누르고 새로고침을 했을 때 (타이머가 재생 상태인 채로 초기화 진행시) 9시간씩 늘어나는 문제 발견됨

똑같이 console 찍어서 디버깅 시도했으나 문제 지점을 찾지 못했음

더이상 로직에서 수정할 수가 없어서 DB 확인했더니 last_start 컬럼이 no time zone으로 설정되어 있었음 time zone 형식으로 변경하니 해결됨

노타임존으로 설정되어있던 컬럼
![image](https://github.com/user-attachments/assets/94eae5e6-5c66-4ede-86d3-0070fc8115e0)
디버깅 시도
![image](https://github.com/user-attachments/assets/a2a80b1c-7fb9-40f5-a6f6-96699495ec22)





### 핵심 기능 및 코드 - 김태현
위 코드는 keyword를 기준으로 두 가지 조건으로 게시물을 검색하는 코드이고, 첫 번째는 study.study_category에 keyword가 포함된 게시물을 찾고, 두 번째는 post_name에 keyword가 포함된 게시물을 찾는 방식입니다. 그리고 두 검색 결과를 합친 후, 중복된 게시물은 study_id를 기준으로 제거하고, 그 후에는 category에 맞게 정렬해서 결과를 반환하는 코드입니다.
```
export async function fetchAllStudyKeywords(
  keyword: string,
): Promise<PostWithRelations[]> {
  const serverClient = createClient();
  // or 로 바꿀예정
  const { data: studyCategoryPosts } = await serverClient
    .from("post")
    .select(`*, study(*), user(*)`)
    .contains("study.study_category", [`${keyword}`])
    .not("study", "is", null);
  const { data: postNamePosts } = await serverClient
    .from("post")
    .select(`*, study(*), user(*)`)
    .like("post_name", `%${keyword}%`);
  if (!postNamePosts || !studyCategoryPosts) {
    throw new Error("Failed to retrieve studys");
  }
  const uniquePosts = Array.from(
    new Map(
      [...postNamePosts, ...studyCategoryPosts].map((post) => [
        post.study_id,
        post,
      ]),
    ).values(),
  );
  return uniquePosts;
}
```


#### 문제상황 <웹뷰와 모바일 환경에서의 클릭 이벤트 미발생 버그> - 김태현
웹뷰에서는 클릭 이벤트가 정상적으로 동작하는데, 모바일 환경에서 클릭 이벤트가 발생하지 않는 버그를 발견했습니다. 화면을 축소하면 반응하지 않았고, 그 원인을 도무지 파악할 수 없었습니다.


#### 해결 방법, 개선 사항 
relative 포지셔닝을 해당 요소에 적용한 후, 클릭 이벤트가 정상적으로 처리되기 시작했습니다. 모바일에서 클릭 이벤트가 발생하지 않았던 이유가 요소의 레이아웃이나 다른 요소와의 겹침 문제 때문이었습니다.  relative를 적용함으로써 요소의 위치가 조정되어 클릭 가능한 영역이 확장되고, 이벤트가 제대로 처리되었습니다.



### 핵심 코드 및 기능 - 홍승우
스터디 모집글 페이지에서 스터디 모집글 수정 페이지를 따로 생성하여 처리하지 않고, 수정과 생성을 하나의 페이지에서 모두 할 수 있도록 
 useSearchParams() 훅을 이용하여 post_id를 url에서 query하여 가져온 후 분기 처리하여 생성과 수정이 이루어지도록 구현하였습니다.
```
"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Tables } from "../../../database.types";
import { usePublicUser } from "@/hooks/useUserProfile";
import { useMutation } from "@tanstack/react-query";
import {
  fetchUserStudyInfo,
  insertPostWrite,
  updatePostWrite,
} from "@/utils/supabase/supabase-client";
import { useRouter, useSearchParams } from "next/navigation";
import WriteModal from "./components/WriteModal";
import Image from "next/image";
import Xmedium from "../../../public/icons/XMedium.svg";
import Check from "../../../public/icons/Check.svg";
import stroke from "../../../public/icons/Next.svg";
import { fetchPostStudyInfo, fetchStudyInfo } from "@/utils/supabase/supabase-server";

import SelectDate from "./components/SelectDate";

type study = {
  id: string;
  name: string;
};

export default function Write() {
  return (
  <Suspense fallback={<div>로딩 중입니다. 잠시만 기다려주십시오..</div>}>
    <WriteContent></WriteContent>
  </Suspense>
  );
}

 function WriteContent() {
  //유저 가져오기
  const { data: user } = usePublicUser();
  
  const router = useRouter();
  const params = useSearchParams();
  const post_id = Number(params.get('post'));

  // 전송 시 필요한 인자값 - 데이터 관련 정리 필요
  const [title, setTitle] = useState<string>("");
  const [contents, setContents] = useState<string>("");
  const [startDay, setStartDay] = useState<string>("");

  // 모달 모드 상태관리 - 모달 공용 컴포넌트 사용
  const [modalMode, setModalMode] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Date 모달 상태관리
  const [isDateOpen, setIsDateOpen] = useState<boolean>(false);

  const [study, setStudy] = useState<study>({
    id: "",
    name: "",
  });

  // 가져온 스터디 그룹 데이터
  const [studyGroup, setStudyGroup] = useState<
    Tables<"study">[] | null | undefined
  >(null);

  // 가져온 스터디 하나의 데이터
  const [studyInfo, setStudyInfo] = useState<Tables<"study">>();

  // 스터디 모집글 생성
  const { mutate: createPost } = useMutation({
    mutationFn: async() => {
      if(post_id) {
        await updatePostWrite(user?.id ?? "", study.id, contents, title, startDay,post_id);
      } else {
        await insertPostWrite(user?.id ?? "", study.id, contents, title, startDay);
      }
    },
    onSuccess: (data) => {
      if(post_id) {
        router.replace(`/post/${post_id}`);
      } else {
        router.replace(`/post/${data}`);   
      }

    },

    onError: () => {
      if(post_id) {
        alert("스터디 모집글을 수정하지 못했습니다.");
      } else {
        alert("스터디 모집글을 생성하지 못했습니다.");
      }
      
    },
  });


  // 스터디 그룹 가져오기 모달
  const { mutate: getStudy } = useMutation({
    mutationFn: () => fetchUserStudyInfo(user?.id),
    onSuccess: (data) => {
      setStudyGroup(data);
      if (data && data.length > 0) {
        setModalMode("group");
        setIsModalOpen(true);
      }
    },
    onError: () => {
      alert("생성한 스터디 그룹을 가져오지 못했습니다.");
    },
  });

    // 작성 취소 버튼 클릭 시
    const handleModalClose = () => {
      if (title) {
        setModalMode("close");
        setIsModalOpen(true);
      } else {
        router.replace("/");
      }
    };
  

  // 선택한 스터디 객체가 바뀔 때마다 스터디 데이터 가져옴
  useEffect(() => {
    const getStudyInfo = async () => {
      const data = await fetchStudyInfo(study.id);
      if (data) {
        setStudyInfo(data);
      }
    };

    getStudyInfo();
  }, [study]);


  // 페이지 첫 접근 시 postID 존재 시 말이 달라짐 - 한번만 실행해서 값을 가져오자
  useEffect(() => {
    if (post_id) {
      const fetchPostData = async () => {
        const data = await fetchPostStudyInfo(post_id);
        if (data) {
          setTitle(data.post_name || "");
          setStartDay(data.study_startday || "");
          setContents(data.post_contents || "");
          setStudy({ id: data.study_id, name: data.study.study_name });
        }
      };
      fetchPostData();
    }
  }, [post_id]);
  
  return (
    <div className="flex flex-col w-full items-center">
      <div className="body-16-m flex flex-col w-full items-center">
        <div className="flex justify-between ... w-full text-2xl items-center p-5">
          <Image
            src={Xmedium}
            alt="selectBtn"
            width={0}
            onClick={() => handleModalClose()}
          />
          <p className="body-16-s text-black ">{post_id ? "모집글 수정" : "모집글 쓰기"}</p>
          <Image
            src={Check}
            alt="selectBtn"
            width={0}
            onClick={() => createPost()}
          />
        </div>

        <div className="w-10/12 mb-4">
          <p className="text-black">
            제목 <span className="text-primary-50">*</span>
          </p>
          <input
            className="p-3 rounded-2xl w-full my-3 bg-secondary-50 body-16-m placeholder-secondary-300"
            value={title}
            maxLength={20}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 작성해주세요"
          />
        </div>

        <div className="flex items-center justify-between w-10/12 border text-secondary-700 border-gray-300 rounded-2xl mb-4">
          <p className="p-3">시작 예정일</p>
          <div className="flex">
            <p
              className="text-secondary-300 body-16-m px-3"
              onClick={() => setIsDateOpen(true)}
            >
              {startDay !== "" ? startDay : "0000년 00월 00일"}
            </p>
            <Image src={stroke} alt="selectBtn" width={0} className="mr-3" />
          </div>
        </div>

        <div className="flex flex-col items-center w-10/12 border text-secondary-700 border-gray-300 rounded-2xl mb-5">
          <div className="flex items-center justify-between w-full">
            <p className="p-3">
              스터디 그룹 <span className="text-primary-50">*</span>
            </p>
            <div className="flex">
              <p
                className="text-secondary-300 body-16-m px-3"
                onClick={() => getStudy()}
              >
                {study.id !== "" ? "선택됨" : " 선택해주세요"}
              </p>
              <Image src={stroke} alt="selectBtn" width={0} className="mr-3" />
            </div>
          </div>

          {study.id !== "" ? (
            <div className="w-11/12 flex-col rounded-2xl bg-tertiary-75 justify-center h-fit m-4">
              <div className="flex items-center m-4">
                <Image
                  src={
                    studyInfo?.study_imgurl ||
                    "https://nkzghifllapgjxacdfbr.supabase.co/storage/v1/object/public/study_img/default"
                  }
                  alt="img"
                  width={100}
                  height={100}
                  className="object-full rounded-xl border aspect-square w-1/4 h-1/4"
                />
                <p className="mx-2 text-secondary-800 body-16-s">
                  {studyInfo?.study_name}
                </p>
              </div>
              <div className="flex w-full justify-start">
                <p className="bg-tertiary-300 text-white rounded-full ... px-3 py-1 caption overflow-hidden text-ellipsis whitespace-nowrap flex items-center ml-4 mb-4">
                  {studyInfo?.study_category[0]}
                </p>

                {studyInfo?.study_category[1] ? (
                  <p className="bg-primary-50 text-white rounded-full px-3 py-1 caption overflow-hidden text-ellipsis whitespace-nowrap flex items-center ml-1 mb-4">
                    {studyInfo?.study_category[1]}
                  </p>
                ) : null}

                {studyInfo?.study_category[2] ? (
                  <p className="bg-primary-50 text-white rounded-full px-3 py-1 caption overflow-hidden text-ellipsis whitespace-nowrap flex items-center ml-1 mb-4">
                    {studyInfo?.study_category[2]}
                  </p>
                ) : null}

                {studyInfo?.study_category[3] ? (
                  <p className="bg-primary-50 text-white rounded-full px-3 py-1 caption overflow-hidden text-ellipsis whitespace-nowrap flex items-center ml-1 mb-4">
                    {studyInfo?.study_category[3]}
                  </p>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>

        <div className="w-10/12 h-[50vh]">
          <div className="flex justify-between">
            <p className="text-slate-700 p-2">
              내용 <span className="text-primary-50">*</span>
            </p>
          </div>
          <textarea
            className="p-4 rounded-2xl w-full bg-gray-100 placeholder-secondary-300 h-[80%]" // textarea 높이
            value={contents}
            maxLength={500}
            onChange={(e) => setContents(e.target.value)}
            placeholder="내용을 작성해주세요."
          />
        </div>
      </div>

      <WriteModal
        isModalOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={(studyId, studyName) => {
          setStudy({ id: studyId, name: studyName });
          setIsModalOpen(false);
        }}
        modalMode={modalMode}
        studyGroup={studyGroup}
      />

      {isDateOpen && (
        <SelectDate
          onConfirm={(date: string) => {
            setStartDay(date);
            setIsDateOpen(false);
          }}
          onClose={() => {
            setIsModalOpen(false);
            setIsDateOpen(false);
          }}
          mode="date"
        />
      )}
    </div>
  );
}

```

#### 문제상황 <스터디 모집글 수 기능 구현 중 useSearchParams() boundary 오류> - 홍승우
client 컴포넌트에서 import { useRouter, useSearchParams } from "next/navigation";를 통하여 
useSearchParams()를 사용하려 하였을 때 , useSearchParams() should be wrapped in a suspense boundary 에러가
개발 환경에서는 에러가 발생하지 않았었는데, 빌드 과정에서 에러가 발생 

#### 해결 방법, 개선 사항 
공식 문서를 확인하여 보니, https://nextjs.org/docs/messages/missing-suspense-with-csr-bailout
Reading search parameters through useSearchParams() without a Suspense boundary will opt the entire page into client-side rendering. This could cause your page to be blank until the client-side JavaScript has loaded.
=> Suspense Boundary 없이 useSearchParams() 를 통해 검색 파라미터를 읽게 되면 ex) 나의 경우에는 
모집글 수정과 모집글 생성을 같은 페이지에서 처리하기 위해서 수정 시에는 "/write?post=34(post_id)" , 생성 시 에는 "/write"로 처리하였음
=> 즉슨 useSearchParams()를 통하여   const post_id = Number(params.get('post')); 로 사용하게 되면 , post_id인 34번 값만 가져오는 것이 가능
=> Suspense Boundary 없이 useSearchParams() 을 사용하여 검색 파라미터를 읽게 되면, 전체 페이지가 CSR렌더링을 선택하게 됨. 이로 인해 
클라이언트 자바스크립트가 로드 될 때까지 비어있을 수 있다.
=> 이 비어있는 상황 때문에 에러가 나는 것으로, Suspense를 넣어주게 되면, 클라이언트 사이드 렌더링으로 인식하게 됨
=>
 function WriteContent() {} 으로 메인 페이지를 함수로 빼고, 이를 Export 하는 함수 컴포넌트에서 
 ```
 export default function Write() {
  return (
  <Suspense fallback={<div>로딩 중입니다. 잠시만 기다려주십시오..</div>}>
    <WriteContent></WriteContent>
  </Suspense>
  );
}
```
위와 같이 처리하면서 , 오류 해결 진행하였습니다.

## 🗨 Project Remind & 프로젝트 소감
#### 강수진(Leader, Fe Developer)
이제 반 왔지만 다들 너무너무 고생하셨습니다!! 팀원들 전원이 적극적이고 열심히 해 주셔서 큰 스코프 프로젝트를 여기까지 완성할 수 있었다고 생각합니다 부족하지 않은 리더였지만 여러분이 너무 잘해주셔서 더욱 진심으로 팀 작업 수행했습니다 최종까지 화이팅해서 다들 좋은 결과 얻어가면 좋겠습니다!! LOVE 2조... REAL LOVE...

#### 정수희(Sub-Leader, Fe Developer)
큰 스코프의 프로젝트를 진행하면서 스스로의 한계를 느껴볼 수 있었습니다. 아직 공부가 더 필요하겠지만, 최종 프로젝트를 통해 내가 많이 늘었구나 하고 느낄 수 있어서 뿌듯했습니다! 매번 웃으면서 분위기 좋게 이끌어가준 수진 리더님 최고고 힘들어도 웃으면서 프로젝트 진행한 우리 2조 팀원분들 짱입니다

#### 김태현(Fe Developer)
처음에는 TanStack Query, Supabase, TypeScript 세 가지 기술 스택이 겹치면서 학습에 대한 갈피를 잡기가 어려웠습니다. 하지만 공용 컴포넌트를 만들어가며 이 세 가지 기술을 점차 이해하게 되었고, 팀원들과 협력하여 밤을 새며 납기일을 맞춰가는 과정이 힘들지만 매우 유익했습니다. 특히 좋은 팀원들과 함께 일하면서 문제를 해결해나가는 경험이 매우 소중했고, 성장할 수 있는 시간이였습니다!

#### 설하영(Fe Developer)
이전에 학습한 기술들을 실제 프로젝트에 종합적으로 적용하면서 많이 성장했다는걸 느낄 수 있었습니다. 특히 팀원들과의 뛰어난 협업 덕분에 힘들지만 즐겁게 개발을 할 수 있었습니다. 2조 최고~!

#### 홍승우(Fe Developer)
기획 단계부터 시작하여 2주하고도 6일이라는 시간이 흘렀습니다. <br>
한 단계, 한 단계 트러블 슈팅과 문제를 해결해나가며, 디자이너분들, 팀원분들과 협업하며, 진심으로 좋은 에너지를 느꼇던 시간이었던 것 같습니다. 
팀원들 모두가 적극적으로 작업에 집중하여, 1차 기간이지만, 나름대로 꼭 필요하다고 생각하는 MVP 기능들이 잘 개발되었다고 생각되어집니다. 
이번 1차 프로젝트 기간동안의 경험을 통해서 어떤 부분이 부족한지에 대해 객관적으로 파악하고, 여태까지 배운 것들을 사용하여, 성장할 수 있었던 시간이었던 거 같습니다. 
<br>


#### 이재은(Designer)
개발자분들과의 첫 협업으로 미숙한 부분도 있었지만, 많은 배려 덕분에 즐겁게 작업할 수 있었습니다. 이번 부트캠프를 통해 디자인이 실제로 구현되는 과정을 이해하게 되었고, 다방면에서 성장할 좋은 기회가 되었습니다. 최종 프로젝트가 끝날때까지 최선을 다해 멋진 결과를 함께 만들어나가고 싶습니다!

#### 하예림(Designer)
개발자분들과의 협업은 처음이었는데 너무 좋은 분들을 만나서 소중한 경험을 한 것 같습니다!!! 개발자와 디자이너의 언어가 이렇게 다른 줄 상상도 못했어요... 그래도 이번 부트캠프에서 디자인을 실제로 구현하는 과정을 깊이 이해할 수 있었습니다! 디자인 의도와 기술적 제약 사이에서 조율하는 과정이 많았고, 덕분에 디자인이 사용자 경험에 어떻게 더 잘 녹아들 수 있는지 고민하는 계기가 된 것 같아요. 프로젝트는 아직 끝나진 않았지만, 이번 협업을 통해 디자인을 더 넓은 시각에서 보게 된 것 같아 기쁩니다!!! 강인한 2조 전사들 최고:주황색_하트: 최고의 개발자들이다~!!!
