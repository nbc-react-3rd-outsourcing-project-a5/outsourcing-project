# outsourcing-project 프로젝트 

### 프로젝트 명 : Winter Wonderland Guide
### 프로젝트 소개 
: 지도 api를 활용하며 전국에 개최 중(및 개최 예정)인 크리스마스 및 겨울 축제에 대한 정보를 안내하는 사이트 입니다. 

### 페이지 구성

윈터 원더랜드 가이드 이동하기 https://outsourcing-project-psi.vercel.app/

#### Home page
  : 카르셀을 이용한 홈 배너, 인기축제, 진행중인 축제와 진행 예정인 축제로 분류하여 배치하였습니다.
또한, 내 주변축제 버튼을 누르면 축제를 검색할 수 있는 폼과 지도가 나옵니다. 지도는 현재 위치를 알려주고 날짜와 지역 선택하여 검색하면 조건에 맞는 축제가 목록에 나오고 지도에 마커로 표시됩니다. 마커 클릭 시 모달이 뜨고 자세히 보기 버튼을 클릭하면 축제 상세페이지로 이동합니다.
  ![Home](https://github.com/nbc-react-3rd-outsourcing-project-a5/outsourcing-project/assets/120929861/5ae9a821-a5d1-4324-a91a-d5e19e858d63)

#### Detail page
: 축제명, 축제 개최일자, 축제 세부 설명 및 사진, 축제의 위치 등의 정보를 담고있는 페이지 입니다. 
![outsourcing-project-detail](https://github.com/nbc-react-3rd-outsourcing-project-a5/outsourcing-project/assets/120929861/24631c73-5318-4e96-8c3c-88ac854f6955)


#### Auth page
: 일반 회원과 업체 회원으로 분류하여, 일반 회원의 경우 사이트 내에서 댓글 기능을 이용할 수 있고 업체회원의 경우 축제를 등록할 수 있습니다.
![Login](https://github.com/nbc-react-3rd-outsourcing-project-a5/outsourcing-project/assets/120929861/17a1de1d-0142-4041-950b-dc3d4e91da48)


#### Festival Registration page
: 업체 회원만 축제를 등록할 수 있으며, 축제 등록 시에는 업체명, 축제 개최일자, 축제명, 축제 주소 와 설명 등을 입력해야 합니다.
![축제 등록](https://github.com/nbc-react-3rd-outsourcing-project-a5/outsourcing-project/assets/120929861/173c71a3-e1f5-4101-9f78-361376f6c444)



#### Search page
: 설정한 기간과 지역을 토대로 필터링한 결과를 지도에 표시하고 지도에 오버레이된 창을 누르면 상세페이지로 이동합니다. 또한 필터링 초기화를 통해 검색 결과를 초기화 할 수 있습니다.
![outsourcing-project-psi vercel app_search(desktop) (1)](https://github.com/nbc-react-3rd-outsourcing-project-a5/outsourcing-project/assets/120929861/b9c6a7ed-e116-4387-89fb-7cfc66dd7410)


### 기술 스택 및 사용 라이브러리
- React
- Redux 
- Redux toolkit
- Styled Component
- Firebase
- Firebase storage
- Firebase Auth
- React Carousel
- uuid
- react-datepicker
- react-kakao-maps-sdk
- axios


### 프로젝트 구조

```
📦: src
 ┣ 📂: assets
 ┣ 📂: components
 ┣ 📂: data
 ┣ 📂: fb
 ┣ 📂: hooks
 ┣ 📂: pages
 ┃ ┣ 📂: Auth
 ┃ ┣ 📂: Detail
 ┃ ┣ 📂: FestivalRegistration
 ┃ ┣ 📂: Home
 ┃ ┣ 📂: Search
 ┃ ┗ 📂: User
 ┣ 📂: redux
 ┃ ┣ 📂: config
 ┃ ┗ 📂: modules
 ┣ 📂: shared
 ┣ 📂: style
 ┣ 📂: utils
 ┣ 📜: App.jsx
 ┣ 📜: App.test.jsx
 ┣ 📜: fonts.jsx
 ┗ 📜: index.jsx
```

### 필수 구현 사항
```
- ✅: 지도 API 사용 (카카오맵)
- ✅: 상태관리 라이브러리는 RTK를 사용
- ✅: Redux Thunk 사용
- ✅: firebase 사용
```
#### 홈 화면 UI 구현 (Create, Read)
```
- ✅: 축제 배너 슬라이드
- ✅: 인기 축제 슬라이드
- ✅: 진행중, 진행 예정 축제 필터링 리스트
```
#### detail 상세 화면 UI 구현
```
- ✅: 해당 축제 컨텐츠 설명과 이미지 자세히 보기
- ✅: 해당 축제 관련 이미지 슬라이드
- ✅: 해당 축제 오시는 길 지도 위치 표시
```
#### 로그인/회원가입 UI 구현
##### 일반회원 로그인/ 회원가입
```
- ✅: 로그인 시 디테일 페이지에서 후기 작성 가능
```
##### 업체회원 로그인/ 회원가입
```
- ✅: 로그인 시 축제 등록하기 페이지에서 축제 등록 가능
```
#### 내 주변 축제 UI 구현
```
- ✅: 내 주변 축제 지도에서 확인 가능
- ✅: 널짜, 지역 필터링 폼을 통해 축제 검색 가능
```
#### 축제 등록하기 UI 구현
```
- ✅: 업체 정보와 축제 정보 등록 가능
- ✅: 축제 위치 지도에서 마커 표시
```

### 선택 구현 사항
#### 무한스크롤
```
- ❌: 무한스크롤 구현 (Intersection Observer API (Web API)를 사용해보기)
```
#### Optimistic Update 적용해보기
```
- ❌: React Query의 Optimistic Update 적용해보기
```
#### 로그인 회원가입 기능 구현
```
-✅: firebase Auth 를 사용하여, 로그인 회원가입 기능 구현
```
#### 후기 댓글 기능
```
- ✅: 축제 해당 상세 페이지에 댓글 기능 구현
```


