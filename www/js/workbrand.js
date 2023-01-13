$(document).ready(function(){
    //#region get data
    const urlQuery = window.location.search
    const urlParams = new URLSearchParams(urlQuery)
    const workType = urlParams.get("type");//해당 타입의 컨텐츠만 생성하도록 값을 지정합니다 예)film, brand
    var figureList;
    var figureTextList;
    var figureBgList;
    var figureListLength = 0;
    var figureIndex = 0;
    const filmWrap = document.querySelector('#filmWrap')
    const filmTitleWrap = document.querySelector('#filmTitleWrap')
    const filmBgWrap = document.querySelector('#filmBgWrap')
    const media = document.querySelector('#mediaWrap')

    function addfigure(time,id,title,name,type){
        if(type === workType){
            //#region 슬라이드용 썸네일 생성
            var thisThumbLi = document.createElement('li')
            thisThumbLi.classList.add('figure-list')
            var thisP1 = document.createElement('p')
            thisP1.classList.add('figure-playTime')
            thisP1.innerHTML = time
            thisThumbLi.append(thisP1)
    
            var $thisDiv = $(`<div class='img' data-video-id='${id}'></div>`)
            $thisDiv.appendTo(thisThumbLi)
            $thisDiv.mouseenter(function(){
                $('#magicMouseCursor').fadeOut(100)
                $('#magicPointer').css({"width":"88px","height":"88px"})
            })
            $thisDiv.mouseleave(function(){
                $('#magicMouseCursor').fadeIn(100)
                $('#magicPointer').css({"width":"8px","height":"8px"})
            })
            $thisDiv.modalVideo({channel:'vimeo'})
    
            var thisImg = document.createElement("img")
            thisImg.setAttribute('src',`/img/${workType}_thumb_${id}.jpg`)
            $thisDiv.append(thisImg)
            // thisDIV.append(thisImg)
            filmWrap.append(thisThumbLi)
            //#endregion 슬라이드용 썸네일 생성
            //#region 슬라이드용 텍스트 생성
            var thisTextLi = document.createElement("li")
            thisTextLi.classList.add("title-list")
            var thisP2 = document.createElement('p')
            thisP2.classList.add('project-title')
            thisP2.innerHTML = title
            thisTextLi.append(thisP2)
            var thisP3 = document.createElement('p')
            thisP3.classList.add('project-name')
            thisP3.innerHTML = name
            thisTextLi.append(thisP3)
            filmTitleWrap.append(thisTextLi)
            //#endregion 슬라이드용 텍스트 생성
            //#region 슬라이드용 BG 생성
            var thisBgLi = document.createElement("li")
                thisBgLi.classList.add("background-list")
                thisBgLi.style.backgroundImage = `url('/img/${workType}_thumb_${id}.jpg')`
                filmBgWrap.append(thisBgLi)
            // var thisBgLiImg = document.createElement("img")
            //     thisBgLiImg.setAttribute('src',`/img/film_thumb_${id}.jpg`)
            //     thisBgLi.append(thisBgLiImg)
            var thisBgFilter = document.createElement("div")
                thisBgFilter.classList.add("black-filter")
                thisBgLi.append(thisBgFilter)
            //#endregion 슬라이드용 BG 생성
        } else {
            return
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
        console.log(items)
        //   .map(([name, branch, typeMid, typeSmall, address, building, lon, lat]) => ({ name, branch, typeMid, typeSmall, address, building, lon, lat }))
        items.forEach(function(item){
            let this_type = item[8]
                ,this_title = item[1]
                ,this_time = item[2]
                ,this_video = item[6]
                ,this_company
            if(this_type === "film"){
                this_company = item[0]
            } else if (this_type === "brand"){
                this_company = null;
            }
            addfigure(this_time, this_video, this_company, this_title, this_type)
        })
            figureList = document.querySelectorAll(".figure-list")
            figureTextList = document.querySelectorAll(".title-list")
            figureBgList = document.querySelectorAll(".background-list")
            figureListLength = figureList.length
            figureTextListLength = figureTextList.length
            figureBgListLength = figureBgList.length
            figureList[0].classList.add("on")
            figureTextList[0].classList.add("on")
            figureBgList[0].classList.add("on")
            figureList[1].classList.add("next")

            return items
    };
    function cleanRow(row) {
    // row = [null,{v:'123'},null,{v:'hello'}]
        function replaceNull(item) {
      if (item == null) {return { v: '' }}
      return item
        }
        data = row.map((item) => replaceNull(item)).map((item) => item.v)
        return data
    }
    let user = getSheetData()
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
        if(delta < 0){figureIndex < figureListLength - 1 ? figureIndex ++ : figureIndex;}
        else {figureIndex > 0 ? figureIndex-- : figureIndex;}

        figureList.forEach(function(el, index){
            el.classList.remove("on")
            figureTextList[index].classList.remove("on")
            figureBgList[index].classList.remove("on")
            el.style.transform = `translate(${(index - figureIndex)*100}%,0)`
            index<figureIndex ? el.style.opacity = 0 : el.style.opacity = 1
        })
        figureList[figureIndex].classList.add("on")
        figureTextList[figureIndex].classList.add("on")
        figureBgList[figureIndex].classList.add("on")

        setTimeout(()=>{
            workScrollingDelay = true;
        },workScrollingDelayTime)
    }
    }

    // curtaincall on===========
    setTimeout(function(){
    $('.curtainCall-white').addClass('on')
    },100)
    setTimeout(function(){
        // $(".curtainCall").css("display:none")
        document.querySelector(".curtainCall").style.display = "none";
        document.querySelector(".intro").style.display = "none";
    },3000)
    $(window).on("mousewheel",function(e){
        workScrolling(e.originalEvent.wheelDelta)
    })
    window.addEventListener("resize",function(){
        console.log("re")
    })


    $('.figure-list .img').modalVideo({channel:'vimeo'});//from jquery-modal-video.min.js

    $('.figure-list .img').click(function(){
        console.log("hi")
    })
    $('.figure-list .img').mouseenter(function(){
        $('#magicMouseCursor').fadeOut(100)
        $('#magicPointer').css({"width":"88px","height":"88px"})
    })
    $('.figure-list .img').mouseleave(function(){
        $('#magicMouseCursor').fadeIn(100)
        $('#magicPointer').css({"width":"8px","height":"8px"})
    })
})