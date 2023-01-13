const film = document.querySelector('#filmWrap')
const media = document.querySelector('#mediaWrap')

function addFilm(time,id,title,name){
    console.log("addFilm")
    var thisLI = document.createElement('li')
    var thisP1 = document.createElement('p')
    var thisP2 = document.createElement('p')
    var thisP3 = document.createElement('p')
    var thisDIV = document.createElement('div')
    thisLI.classList.add('figure-list')
    film.append(thisLI)
    thisLI.append(thisP1)
    thisLI.append(thisDIV)
    thisLI.append(thisP2)
    thisLI.append(thisP3)

    thisP1.classList.add('figure-playTime')
    thisP1.innerHTML = time
    thisDIV.classList.add('img')
    thisDIV.setAttribute('data-video-id',id)
    thisP2.innerHTML = title
    thisP2.classList.add('project-title')
    thisP3.classList.add('project-name')
    thisP3.innerHTML = name
}
function addMedia(time,id,name){
    var thisLI = document.createElement('li')
    var thisP1 = document.createElement('p')
    var thisP2 = document.createElement('p')
    var thisP3 = document.createElement('p')
    var thisDIV = document.createElement('div')
    thisLI.classList.add('figure-list')
    media.append(thisLI)
    thisLI.append(thisP1)
    thisLI.append(thisDIV)
    thisLI.append(thisP2)

    thisP1.classList.add('figure-playTime')
    thisP1.innerHTML = time
    thisDIV.classList.add('img')
    thisDIV.setAttribute('data-video-id',id)
    thisP2.classList.add('project-name')
    thisP2.innerHTML = name
}


// 여기 아래부터 추가하시면 됩니다.

//PC.. 여기 아래부터 추가하시면 됩니다.
/* 작성방법
film은 addFilm()
media는 addMedia()
를 먼저 작성합니다. 대소문자 구분해서 입력!!
film의 경우 순서대로
addFilm('플레이타임',동영상넘버,'회사이름','프로젝트이름')
입니다. 동영상넘버를 제외한 플레이탕,ㅁ회사이름,프로젝트 이름은 '따옴표'안에 입력해주세요.
동영상 넘버는 그대로 입력해주시면 됩니다.
각 항목 사이에 ,쉼표로 구분지어주세요.
배치순서에 따라 출력순서도 결정됩니다.
줄바꿈은<br>를 입력하시면 됩니다.
*/
/*
필름은 아래 양식따라 작성해주세요
addFilm('플레이타임','동영상아이디','회사명','프로젝트이름')

미디어는 아래 양식따라 작성해주세요
addMidea('플레이타임','동영상아이디','프로젝트명')

썸네일이미지 양식의 경우, 해당 동영상 아이디와 동일한 이름으로 해주셔야합니다.
파일 형식은 jpg로 저장해주세요.

필름썸네일
film_thumb_동영상아이디.jpg
미디어썸네일
media_thumb_동영상아이디.jpg

예시)
해당 동영상이 film-content고 아이디넘버가 123456789일 경우
film_thumb_1234565789.jpg
*/
/* brand content */
//#region 220523.SJM c5131b
addFilm('00:34',742575126,'카카오','카카오의 상상법')
addFilm('00:34',742575682,'넥슨','HIT2 디렉터 코멘터리')
addFilm('00:34',742575606,'네이버','당신을 위한 인문학 플레이리스트')
addFilm('00:34',712745591,'네이버','페이포인트-치킨편')
addFilm('00:27',712745613,'네이버','페이포인트-항공편')
addFilm('00:49',712745535,'네이버','Boost Camp')
addFilm('00:39',712745651,'레버','LEVEL UP WITH LEVER SEASON02')
addFilm('00:50',693344235,'레버','NEVER STOP, LEVER')
addFilm('00:46',693346720,'빗썸','BITHUME PEOPLE')
addFilm('00:50',693345819,'올리브영','I LOVE YOUNG OLIVEYOUNG')
addFilm('12:24',693346085,'네이버','Boost Camp Story')
addFilm('13:09',693346272,'매거진B','10 YEARS OF ARCHIVE DOCUMENTED')
addFilm('17:26',693348623,'넥슨','Maple Us :')
addFilm('01:47',519872421,'토스','FINTECH - <br>BEHIND THE SIMPLICITY')
addFilm('00:34',641752751,'엔씨소프트','HR PROMOTION')
addFilm('05:00',641752815,'넥슨','NEXON FOUNDATION PROMOTION')
addFilm('01:13',641753019,'교육부','LINC+')
addFilm('00:38',596357351,'매드업','LEVEL UP WITH LEVER')
addFilm('04:25',641753102,'데이원컴퍼니','We are:series')
addFilm('00:52',564473925,'토스','금융은 반드시')
addFilm('00:50',519872846,'토스','the WORK')
addFilm('00:22',564473301,'엔씨소프트','2021 NCSOFT SUMMER INTERN')
addFilm('04:51',519873709,'넥슨재단','BORDERLESS<br> PROMOTION')
addFilm('01:27',564473344,'네이버','NAVER AI NOW')
addFilm('04:16',564473428,'토스','SLASH21')
addFilm('06:12',519884447,'한국연구재단','LAB-SOCIETY')
addFilm('02:07',519884932,'광주비엔날레','MaytoDay')
addFilm('01:30',519884901,'국립현대미술관','덕수궁 야외프로젝트 – 빛, 소리, 풍경')
addFilm('04:46',641753289,'국립현대미술관','다원예술 2021 : 멀티버스')
addFilm('00:30',519884783,'국립아시아문화전당','UN・TACT')
addFilm('01:38',519874474,'엑소루브','X-OIL :<br> exoluve lubricant corporation')
addFilm('00:57',641753643,'셀럽라이브','E대리 광고 영상')
addFilm('00:15',519874401,'LG전자','LG DIOS')
addFilm('00:30',519874349,'코카콜라','Coca-Cola ZERO')
addFilm('03:24',519874168,'현대건설&현대엔지니어링','SMART CITY')
addFilm('01:30',519884305,'한국관광공사','열린관광지, 열다')
addFilm('00:30',519874441,'지마켓','GLOBAL<br> G-GENIE FOR U')

/* New media content */
//#region 220523.SJM
addMedia('00:43',712745590,'대한민국<br>제20대 대통령 취임식')
addMedia('01:00',519892745,'2020 세계유산축전, 경북')
addMedia('26:09',519893006,'전라감영, 빛의 초상화')
addMedia('12:30',519908128,'빛의 탈, 세계 탈')
addMedia('00:15',519899248,'LOOK-Second Sight')
addMedia('02:07',519872928,'BORDERLESS<br> Game Connect & Play')
