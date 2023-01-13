$(document).ready(function(){
    //파라미터로 미디어 타입 결정 후 가져오기
    const urlParams = new URLSearchParams(window.location.search)
    const workType = urlParams.get("type");//해당 타입의 컨텐츠만 생성하도록 값을 지정합니다 예)film, brand
    //intro에 쓰일 텍스트문구 생성
    var introp1text = ""
    var introp1text2 = ""
    var introp2text = ""
    var introp2text2 = ""
    console.log(workType)
    if(workType == "film") {

        $(".introTitleHead .fake").text("new Media")
        $(".introTitleHead .real").text("new Media")
        introp1text = $("<span>기술과 환경의 조화를 콘텐츠로 구현</span>")
        introp1text2 = $("<span>기술과 환경의 조화를 콘텐츠로 구현</span>")
        introp2text = $("<span>프로젝트 맵핑을 통한 미디어 파사드 및 전시 체험 실감 콘텐츠 등 <br>새로운 기술과 환경을 반영한 미디어 콘텐츠를 제작합니다.</span>")
        introp2text2 = $("<span>프로젝트 맵핑을 통한 미디어 파사드 및 전시 체험 실감 콘텐츠 등 <br>새로운 기술과 환경을 반영한 미디어 콘텐츠를 제작합니다.</span>")
    } else if (workType == "brand") {

        $(".introTitleHead .fake").text("brand Content")
        $(".introTitleHead .real").text("brand Content")
                introp1text = $("<span>숏폼부터 롱폼까지 형식과 <br>내용의 다양성을 결과물로 도출</span>")
        introp1text2 = $("<span>숏폼부터 롱폼까지 형식과 <br>내용의 다양성을 결과물로 도출</span>")
        introp2text = $("<span>기업 및 기관의 브랜드 필름, 홍보영상과 C.F 등 숏폼 형태부터 <br>브랜드 다큐멘터리 형식의 롱폼 형태의 영상 콘텐츠를 제작합니다.</span>")
        introp2text2 = $("<span>기업 및 기관의 브랜드 필름, 홍보영상과 C.F 등 숏폼 형태부터 <br>브랜드 다큐멘터리 형식의 롱폼 형태의 영상 콘텐츠를 제작합니다.</span>")
    }
    const $introTitleP1Fake = $(".introTitle .p1 .fake")
    const $introTitleP1Real = $(".introTitle .p1 .real")
    const $introTitleP2Fake = $(".introTitle .p2 .fake")
    const $introTitleP2Real = $(".introTitle .p2 .real")
    //intro에 쓰일 텍스트문구 집어넣기
    introp1text.appendTo($introTitleP1Real)
    introp1text2.appendTo($introTitleP1Fake)
    introp2text.appendTo($introTitleP2Real)
    introp2text2.appendTo($introTitleP2Fake)

    var figureList
        ,figureTextList
        ,figureBgList
        ,figureListLength = 0
        ,figureIndex = 0
        ,figureListAfter
        ,figureBgListAfter
        ,figureTextListAfter
        ,figureListAfterLength = figureListLength
    const filmWrap = document.querySelector('#filmWrap')
    const filmTitleWrap = document.querySelector('#filmTitleWrap')
    const filmBgWrap = document.querySelector('#filmBgWrap')


    //요소만드는 펑션
    const makeEl = (elType,elClass,elText,elAppend) => {
        let thisEl = document.createElement(elType)
        if(elClass !== undefined){
            thisEl.classList.add(elClass)
        }
            thisEl.innerHTML = elText !== undefined ? elText : null
            elAppend.append(thisEl)
    }
    //만든 요소를 선언해주는 펑션
    const declareEl = (elType,elClass) => {
        let thisEl = document.createElement(elType)
        if(elClass !== undefined){
            thisEl.classList.add(elClass)
        }
            return thisEl
    }

    //sub 타입 메뉴를 만들기 위한 array 선언
    const subMenuArr = [];
    //컨텐츠 만드는 펑션
    const addFigure = (data) => {
        console.log(data)
        let title = data[0]
            ,name = data[1]
            ,time = data[2]
            ,date = data[3]
            ,member_pd = data[4]
            ,member_cd = data[5]
            ,id = data[6]
            ,type = data[8]
            ,subtype = data[9]
        var imgUrl = ''
            if(workType === type){
                // console.log(id)
                //#region 슬라이드용 썸네일 생성
                let $thisDiv = $(`<div class='img' data-video-id='${id}' data-mouse data-mouse-text="play"></div>`)
                let thisThumbLi = declareEl("li","figure-list")
                thisThumbLi.setAttribute("data-subtype",type)
                $thisDiv.appendTo(thisThumbLi)
                $thisDiv.modalVideo({channel:'vimeo'})
            
                makeEl("p","figure-playTime",time,thisThumbLi)

                let thisImg = declareEl("img")
                    // thisImg.setAttribute('src',`/img/${workType}_thumb_${id}.jpg`)
                    $thisDiv.append(thisImg)
                    filmWrap.append(thisThumbLi)
                //#endregion 슬라이드용 썸네일 생성
                //#region 슬라이드용 텍스트 생성
                let thisTextLi = declareEl("li","title-list")
                    thisTextLi.setAttribute("data-subtype",subtype)
                    makeEl("p","project-title",title,thisTextLi)
                    makeEl("p","project-name",name,thisTextLi)
                    makeEl("p","project-date",date,thisTextLi)
                    makeEl("p","project-staff","STAFF",thisTextLi)
                    makeEl("p","project-member-pd","PD : " + member_pd,thisTextLi)
                    makeEl("p","project-member-cd","CD : " + member_cd,thisTextLi)
                filmTitleWrap.append(thisTextLi)
                //#endregion 슬라이드용 텍스트 생성
                //#region 슬라이드용 BG 생성
                let thisBgLi = declareEl("li","background-list")
                    thisBgLi.setAttribute("data-subtype",subtype)
                    // thisBgLi.style.backgroundImage = `url('/img/${type}_thumb_${id}.jpg')`
                    filmBgWrap.append(thisBgLi)
                makeEl("div","black-filter",undefined,thisBgLi)

                $.ajax({
                    type: "GET",
                    url:`https://vimeo.com/api/v2/video/${id}.json`,
                    dataType: "json",
                    success:function(data){
                        imgUrl = data[0].thumbnail_large
                        thisImg.setAttribute('src',imgUrl)
                        thisBgLi.style.backgroundImage = `url(${imgUrl})`
                    }
                })
                //#endregion 슬라이드용 BG 생성

            }
    }

    const getSheetData = async () => {
        const sheetId = '1H75owSrphevvaRn2WSgDFnMPloZC0_jSIoUHqaQmAn0';
        const base = `https://docs.google.com/spreadsheets/d/${sheetId}/gviz/tq?`;
        const sheetName = 'film';
        const query = encodeURIComponent('Select *')
        const url = `${base}&sheet=${sheetName}&tq=${query}`

        const response = await fetch(url);
        data = await response.text();
        parsed = JSON.parse(data.substring(47).slice(0, -2))

        let items = parsed.table.rows.map(({ c }) => cleanRow(c));
        //   .map(([name, branch, typeMid, typeSmall, address, building, lon, lat]) => ({ name, branch, typeMid, typeSmall, address, building, lon, lat }))
        items.forEach(function(item){
            var this_company;
            // if(item[8] == "film"){
            //     this_company = item[0]
            // } else if (item[8] == "brand"){
            //     this_company = null;
            // }
            let this_data = [
                item[0],//company name
                item[1],//title
                item[2],//time
                item[3],//date
                item[4],//pd-name
                item[5],//cd-name
                item[6],//video-id
                item[7],//empty
                item[8],//type
                item[9],//sub-type
            ]
            addFigure(this_data)
        })
        figureList = document.querySelectorAll(".figure-list")
        figureTextList = document.querySelectorAll(".title-list")
        figureBgList = document.querySelectorAll(".background-list")
        figureListAfter = document.querySelectorAll(".figure-list")
        figureTextListAfter = document.querySelectorAll(".title-list")
        figureBgListAfter = document.querySelectorAll(".background-list")
        figureListLength = figureList.length
        figureListAfterLength = figureListLength
        figureList[0].classList.add("on")
        figureTextList[0].classList.add("on")
        figureBgList[0].classList.add("on")
        figureList[1].classList.add("next")
        //aside에 서브메뉴 넣기
        subMenuArr.push(data[8])
        console.log(subMenuArr)
        const depth2menuLink = document.querySelectorAll(".depth2Menu--link")
        const subMenuArrSet = new Set(subMenuArr)
        
        subMenuArrSet.forEach((el)=>{
                let thisEl = declareEl("div","depth2Menu--link-sub")
                    thisEl.setAttribute("data-subtype-name",el)
                    thisEl.innerHTML = el
                    thisEl.addEventListener('click', ()=> {
                        for(i = 0; i<figureList.length; i++){
                            
                            let aType = figureList[i].getAttribute("data-subtype")

                            figureList[i].classList.remove("hide")
                            figureTextList[i].classList.remove("hide")
                            figureBgList[i].classList.remove("hide")

                            figureList[i].classList.add("figure-list-active")
                            figureTextList[i].classList.add("title-list-active")
                            figureBgList[i].classList.add("background-list-active")

                            if(aType !== el){
                                figureList[i].classList.add("hide")
                                figureTextList[i].classList.add("hide")
                                figureBgList[i].classList.add("hide")
                                figureList[i].classList.remove("figure-list-active")
                                figureTextList[i].classList.remove("title-list-active")
                                figureBgList[i].classList.remove("background-list-active")
                            }
                        }

                        figureListAfter = document.querySelectorAll(".figure-list-active")
                        figureTextListAfter = document.querySelectorAll(".title-list-active")
                        figureBgListAfter = document.querySelectorAll(".background-list-active")
                        figureListAfterLength = figureListAfter.length

                        figureIndex = 0;
                        figureListAfter.forEach(function(el, index){
                            figureListAfter[index].classList.remove("on")
                            figureTextListAfter[index].classList.remove("on")
                            figureBgListAfter[index].classList.remove("on")
                            el.style.transform = `translate(${(index - figureIndex)*100}%,0)`
                            index<figureIndex ? el.style.opacity = 0 : el.style.opacity = 1
                        })

                                                
                        figureListAfter[0].classList.add("on")
                        figureTextListAfter[0].classList.add("on")
                        figureBgListAfter[0].classList.add("on")
                        figureListAfter[1].classList.add("next")
                    })
                    if(workType === "film"){
                        depth2menuLink[1].append(thisEl)
                        depth2menuLink[1].classList.add("on")
                    } else if (workType === "brand") {
                        depth2menuLink[0].append(thisEl)
                        depth2menuLink[0].classList.add("on")
                    }
        })
        const depth2MenuSub = document.querySelectorAll(".depth2Menu--link-sub")
        depth2MenuSub.forEach(el => {
            el.addEventListener("click", a => {
                for(let item of depth2MenuSub){
                    item.classList.remove("on")
                }
                el.classList.add("on")
            })
        })
        return items
    };
    const cleanRow = (row) => {
    // row = [null,{v:'123'},null,{v:'hello'}]
        function replaceNull(item) {
      if (item == null) {return { v: '' }}
      return item
        }
        data = row.map((item) => replaceNull(item)).map((item) => item.v)
        return data
    }
    getSheetData()
    //#endregion get data
    //#region word split=============
    var words = $('.wordSplit');
    var wordArray = [];

    for (var i=0; i<words.length; i++) {
        splitLetters(words[i]);
    }
    function splitLetters(word) {
    var content = word.innerHTML;
    word.innerHTML = '';
    var letters = [];
    for (var i = 0; i < content.length; i++) {
        var letter = document.createElement('span');
            letter.className = 'letter';
            letter.innerHTML = content.charAt(i);
            if(workType == "film") {
                if(3 < i){
                    letter.classList.add("roman")
                }
            }else if (workType == "brand") {
                if(5 < i){
                    letter.classList.add("roman")
                }
            }
            word.appendChild(letter);
        letters.push(letter);
    }

    wordArray.push(letters);
    }
    //#endregion word split=============
    var workScrollingDelay = true;
    var workScrollingDelayTime = 200;
    
    function workScrolling(delta){
    if(workScrollingDelay == true){
        workScrollingDelay = false;
        if(delta < 0){figureIndex < figureListAfterLength - 1 ? figureIndex ++ : figureIndex;}
        else {figureIndex > 0 ? figureIndex-- : figureIndex;}

        figureListAfter.forEach(function(el, index){
            figureListAfter[index].classList.remove("on")
            figureTextListAfter[index].classList.remove("on")
            figureBgListAfter[index].classList.remove("on")
            el.style.transform = `translate(${(index - figureIndex)*100}%,0)`
            index<figureIndex ? el.style.opacity = 0 : el.style.opacity = 1
        })
        figureListAfter[figureIndex].classList.add("on")
        figureTextListAfter[figureIndex].classList.add("on")
        figureBgListAfter[figureIndex].classList.add("on")

        setTimeout(()=>{
            workScrollingDelay = true;
        },workScrollingDelayTime)
    }
    }

    $(window).on("mousewheel",function(e){
        workScrolling(e.originalEvent.wheelDelta)
    })
    $('.figure-list .img').modalVideo({channel:'vimeo'});//from jquery-modal-video.min.js
    $('.figure-list .img').mouseenter(function(){
        $('#magicMouseCursor').fadeOut(100)
        $('#magicPointer').css({"width":"88px","height":"88px"})
    })
    $('.figure-list .img').mouseleave(function(){
        $('#magicMouseCursor').fadeIn(100)
        $('#magicPointer').css({"width":"8px","height":"8px"})
    })

    setTimeout(()=>{$(".depth2Menu--wrap").addClass("open")},2600)
    setTimeout(() => {$('.curtainCall-white').addClass('on') },100)
    setTimeout(() => { document.querySelector(".intro").style.display = "none"; },3000)
    setTimeout(() => { document.querySelector(".curtainCall").style.display = "none";},3000)
})  