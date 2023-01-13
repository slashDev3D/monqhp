const body = document.getElementsByTagName("BODY")[0];
var videoPlayer = new Vimeo.Player('myVideo');
function videoOpen(){
    videoPlayer.play()
    $("body").addClass("freeze")
    $(".videoPopup").removeClass("hide")
}
function videoClose(){
    $("body").removeClass("freeze")
    $(".videoPopup").addClass("hide")
    $(".sect1").addClass("on")
    videoPlayer.pause()
    videoPlayer.setCurrentTime(0)
}
$(".videoContent .close").click(function(){
    videoClose()
})
$(".videoPopupBg").click(function(){
    videoClose()
})

const url = String(document.location.href);
const urlArr = ["work","recruit","contact","workdetail"]
urlArr.forEach((el) => {
    if(url.includes(el)){
        videoClose()
    }
})

const getMenu = $.get("../components/menu.html", (data) => {$("#menu").prepend(data)})
getMenu.then(()=>{
    const brandIndex = document.getElementById("brandIndex")
    const filmIndex = document.getElementById("filmIndex")
    var brandCount = 0;
    var filmCount = 0;
    function cleanRow(row) {
        function replaceNull(item) {
      if (item == null) {return { v: '' }}
      return item
        }
        data = row.map((item) => replaceNull(item)).map((item) => item.v)
        return data
    }
    const getBrandDataIndex = async () => {
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
            if(item[8] === "brand"){
                brandCount = brandCount + 1
            }else if(item[8] === "film"){
                filmCount = filmCount + 1
            }
        })
        // brandIndex.innerHTML = brandCount
        // filmIndex.innerHTML = filmCount
        brandIndex.innerHTML = "new"
        filmIndex.innerHTML = "new"
            return items
    };
    getBrandDataIndex()
})
const getAside = $.get("../components/aside.html", (data) => {$("#aside").prepend(data)})
getAside.then(()=>{
    var hamSW1=1,//throttle switch
    hamSW2=1;
    $('.menu .menuContainer .menuWrap li').eq(1).find('p').text('works')
    $('.btn-ham').on({
        mouseenter:function(){
            $(this).addClass('on')
        },
        mouseleave:function(){
            $(this).removeClass('on')
        },
        click:function(){
            if(hamSW1==1){//throttle function
            if(hamSW2==1){
                hamSW1=0;//throttle go
                hamSW2=0
                $('.recruit-choice').removeClass('on')
                $('.menu').addClass('on')
                $('.btn-ham').addClass('activate');
                $('.btn-ham').find('span').addClass('black')
                $('.btn-ham').find('p').addClass('black')
                $('.link-portfolio a').addClass('black')
                $('.link-works a p').addClass('black')
                $('.link-works a svg .cls-1').addClass('black')
                $('.link-language a.on').addClass('black')
                $('.link-language a span').addClass('black')
                $('.sns-btn').addClass('black')
                // $('#magicMouseCursor').css({"border" : "1px solid #c40c1a"})
                setTimeout(function(){
                    $('.btn-ham').find('span').addClass('activate')
                    $('.btn-ham').find('p').addClass('activate')
                    $(".link-portfolio img").attr("src","/img/ico_download_black.png")
                },300)
                setTimeout(function(){hamSW1=1;},1000)//throttle back

            }else if(hamSW2==0){
                hamSW1=0;//throttle go
                hamSW2=1;
                $('.menu').removeClass('on')
                $('.btn-ham').find('span').removeClass('activate')
                $('.btn-ham').find('p').removeClass('activate')
                $('.sns-btn').removeClass('black')
                setTimeout(function(){
                    $('.btn-ham').removeClass('activate');
                },300)
                setTimeout(function(){
                    // $('#magicMouseCursor').css({"border" : "1px solid #dddddd"})
                    $('.recruit-choice').addClass('on')
                    $('.link-portfolio a').removeClass('black')
                    $('.link-language a.on').removeClass('black')
                    $('.btn-ham').find('span').removeClass('black')
                    $('.btn-ham').find('p').removeClass('black')
                    $('.link-works a p').removeClass('black')
                    $('.link-works a svg .cls-1').removeClass('black')
                    $('.link-language a span').removeClass('black')
                    $(".link-portfolio img").attr("src","/img/ico_download.png")
                },600)
                setTimeout(function(){
                    hamSW1=1;//throttle back
                },1000)
            }
        }
        }
    })

    $('.sns-btn, .sns-btn ul.sns li a, .link-works a').mouseenter(function(){
        $(this).addClass('on')
    })
    $('.sns-btn, .sns-btn ul.sns li a, .link-works a').mouseleave(function(){
        $(this).removeClass('on')
    })

    const $depth2Menu = $("#depth2Menu")
    const $workBrandLinkEl = $(`<div class="depth2Menu--link"><a href="/workdetail.html?type=brand"><p>brand content</p><span></span></a></div>`)
    const $workfilmLinkEl = $(`<div class="depth2Menu--link"><a href="/workdetail.html?type=film"><p>new media</p><span></span></a></div>`)
    // const $contactLinkEl = $(`<div class="depth2Menu--link"><a href="/contact.html"><p>ask project</p><span></span></a></div>`)
    // const $coworkLinkEl = $(`<div class="depth2Menu--link"><a href="/cowork.html"><p>company register</p><span></span></a></div>`)
    const asideHref = String(window.location.href)
    if(asideHref.indexOf("workdetail") !== -1){
        const urlParams = new URLSearchParams(window.location.search)
        const workType = urlParams.get("type");
        $depth2Menu.append($workBrandLinkEl)
        $depth2Menu.append($workfilmLinkEl)
    }else if (asideHref.indexOf("contact") !== -1 || asideHref.indexOf("cowork") !== -1){
        // $depth2Menu.append($contactLinkEl)
        // $depth2Menu.append($coworkLinkEl)
    }else{
       null;
    }
    console.log(asideHref)

})
const getRightBtn = $.get("../components/rightBtn.html", (data) => {$("#rightBtn").prepend(data)})
getRightBtn.then(()=>{
    const contactOpenBtn = document.getElementById("contactOpenBtn")
    const contactPopup = document.getElementById("contactPopup")
    var contactOpenSW = true;
    contactOpenBtn.addEventListener("click",(el) => {
        if(contactOpenSW == true){
            contactOpenSW = false
            if(body.classList.contains("rightPopShow")){
                body.classList.remove("rightPopShow")
            } else {
                body.classList.add("rightPopShow")
            }
            setTimeout(()=>{contactOpenSW = true;},600)
        } else {
            return
        }
    })
})
const getRightPopup = $.get("../components/rightPopup.html", (data) => {$("#rightPopup").prepend(data)})
getRightPopup.then(()=>{
    const rightPopClose = document.getElementById("rightPopClose")
    const rightPopProjectRequest = document.getElementById("rightPopProjectRequest")
    const rightPopProjectRequestForm = document.getElementById("rightPopProjectRequestForm")
    const rightPopCompanyRegister = document.getElementById("rightPopCompanyRegister")
    const rightPopCompanyRegisterForm = document.getElementById("rightPopCompanyRegisterForm")
    const rightPopFormContainer = document.getElementById("rightPopFormContainer")
    const rightPopFormBack = document.querySelector(".rightPop--form-back")
    rightPopClose.addEventListener('click', ()=> {
        body.classList.remove("rightPopShow")
        rightPopCompanyRegisterForm.classList.add("show")
        rightPopProjectRequestForm.classList.remove("show")
        rightPopFormContainer.classList.remove("show")
        rightPopFormBack.classList.remove("show")
    })
    rightPopProjectRequest.addEventListener("click",() => {
        rightPopCompanyRegisterForm.classList.remove("show")
        rightPopProjectRequestForm.classList.add("show")
        rightPopFormContainer.classList.add("show")
        rightPopFormBack.classList.add("show")
    })
    rightPopCompanyRegister.addEventListener("click",() => {
        rightPopProjectRequestForm.classList.remove("show")
        rightPopCompanyRegisterForm.classList.add("show")
        rightPopFormContainer.classList.add("show")
        rightPopFormBack.classList.add("show")
    })
    rightPopFormBack.addEventListener("click", () => {
        rightPopFormBack.classList.remove("show")
        rightPopFormContainer.classList.remove("show")
    })

    function getFormData(form) {
        var elements = form.elements;
        var honeypot;
    
        var fields = Object.keys(elements).filter(function(k) {
          if (elements[k].name === "honeypot") {
            honeypot = elements[k].value;
            return false;
          }
          return true;
        }).map(function(k) {
          if(elements[k].name !== undefined) {
            return elements[k].name;
          // special case for Edge's html collection
          }else if(elements[k].length > 0){
            return elements[k].item(0).name;
          }
        }).filter(function(item, pos, self) {
          return self.indexOf(item) == pos && item;
        });
    
        var formData = {};
        fields.forEach(function(name){
          var element = elements[name];
          
          // singular form elements just have one value
          formData[name] = element.value;
    
          // when our element has multiple items, get their values
          if (element.length) {
            var data = [];
            for (var i = 0; i < element.length; i++) {
              var item = element.item(i);
              if (item.checked || item.selected) {
                data.push(item.value);
              }
            }
            formData[name] = data.join(', ');
          }
        });
    
        // add form-specific values into the data
        formData.formDataNameOrder = JSON.stringify(fields);
        formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
        formData.formGoogleSendEmail
          = form.dataset.email || ""; // no email by default
    
        return {data: formData, honeypot: honeypot};
      }
    
      function handleFormSubmit(event) {  // handles form submit without any jquery
        event.preventDefault();           // we are submitting via xhr below
        var form = event.target;
        var formData = getFormData(form);
        var data = formData.data;
      //로딩중입니다 창 띄우기
      const $loadingPopup = document.getElementById("loadingPopup")
      $loadingPopup.classList.add("show")
        // If a honeypot field is filled, assume it was done so by a spam bot.
        if (formData.honeypot) {
          return false;
        }
    
        disableAllButtons(form);
        var url = form.action;
        var xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        // xhr.withCredentials = true;
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4 && xhr.status === 200) {//data send success then...
              form.reset();
              if(!alert("문의가 접수되었습니다.")) document.location.reload()
            }
        };
        // url encode form data for sending as post data
        var encoded = Object.keys(data).map(function(k) {
            return encodeURIComponent(k) + "=" + encodeURIComponent(data[k]);
        }).join('&');
        xhr.send(encoded);
      }
      
      function loaded() {
        // bind to the submit event of our form
        console.log("sucec")
        var forms = document.querySelectorAll("form.gform");
        for (var i = 0; i < forms.length; i++) {
          forms[i].addEventListener("submit", handleFormSubmit, false);
        }
      };
      loaded()
    
      function disableAllButtons(form) {
        var buttons = form.querySelectorAll("button");
        for (var i = 0; i < buttons.length; i++) {
          buttons[i].disabled = true;
        }
      }
})
const getPortfolio = $.get("./components/Portfolio.html", (data) => {$("#linkPortfolio").prepend(data)})
getPortfolio.then(()=>{
    document.getElementById('brandFilmPlay').addEventListener("click", e => {
        videoOpen()
    })
})