// $.get("../components/menu.html", (data) => {$("#menu").prepend(data)})
var videoPlayer = new Vimeo.Player('myVideo');
function videoOpen(){
    console.log("hi")
    $("body").addClass("freeze")
    $(".videoPopup").removeClass("hide")
    setTimeout(()=>{
        videoPlayer.play()
        console.log("play")
    },100)
}
function videoClose(){
    videoPlayer.pause()
    videoPlayer.setCurrentTime(0)
    $("body").removeClass("freeze")
    $(".videoPopup").addClass("hide")
    $(".sect1").addClass("on")
}
$(".videoContent .close").click(function(){
    videoClose()
})
$(".videoContent > p").click(function(){
    videoClose()
})
const url = String(document.location.href);
const urlArr = ["index","work","recruit","contact"]
if(!url.includes("index")){
    videoClose()
}

const getAside = $.get("./components/aside.html", (data) => {$("#aside").prepend(data)})
getAside.then(()=>{
    urlArr.forEach( (thisUrl,idx) => {
        if(url.includes(thisUrl)) {
            $(".asideMenu .fake a").eq(idx).find("p").addClass("on")
            $(".asideMenu .real a").eq(idx).find("p").addClass("on")
        }
    })
    const gform01 = document.getElementById('gform01')
    const gform02 = document.getElementById('gform02')
    const formChangeButton = document.querySelectorAll(".form-title-button")
    formChangeButton.forEach( el => {
        el.addEventListener("click", e => {
            var thisIdx = el.getAttribute("data-number")
            if(thisIdx == 0){
                gform02.classList.remove("show")
                gform01.classList.add("show")
            }else if (thisIdx == 1){
                gform01.classList.remove("show")
                gform02.classList.add("show")
            }
            for(item of formChangeButton){
                item.classList.remove("on")
            }
            el.classList.add("on")
        })
    })
    // get all data in form and return object
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
        console.log("loaded")
          var forms = document.querySelectorAll("form.gform");
          for (var i = 0; i < forms.length; i++) {
            forms[i].addEventListener("submit", handleFormSubmit, false);
            forms[i].addEventListener("mouseenter",e=>{
                console.log("enter")
            })
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
const getNav = $.get("./components/nav.html", (data) => {$("#nav").prepend(data)})
getNav.then(()=>{
    var videoPlayer = new Vimeo.Player('myVideo');
function videoOpen(){
    console.log("hi")
    $("body").addClass("freeze")
    $(".videoPopup").removeClass("hide")
    setTimeout(()=>{
        videoPlayer.play()
        console.log("play")
    },100)
}
function videoClose(){
    videoPlayer.pause()
    videoPlayer.setCurrentTime(0)
    $("body").removeClass("freeze")
    $(".videoPopup").addClass("hide")
    $(".sect1").addClass("on")
}
    var hamSW = true;
    var asideSW = true;
    $('.navham').click(function(){
        if(hamSW){
            hamSW = false;
            setTimeout(function(){hamSW = true;},1000)
            videoClose()
            if(asideSW){
                asideSW = false;
                $('aside').addClass('on')
                $('.navham').addClass('black')
                $('body').addClass('hidden')
            }else if(!asideSW){
                asideSW = true;
                $('aside').removeClass('on')
                $('aside').removeClass('show')
                $('.aside--form').removeClass('show')
                $('.navham').removeClass('black')
                // $('.navham').removeClass('white')
                $('body').removeClass('hidden')
            }
        }
    })
    $("#contactBtn").click(function(){
        asideSW = false;
        $("aside").addClass("show")
        $(".aside--form").addClass("show")
        $(".navham").addClass("black")
        $("body").addClass("hidden")
        videoClose();
    })
    $("#brandFilm").click(function(){
        videoOpen();
    })
    if(url.includes("work")){
        $("#nav").addClass("white-scroll")
    }else if (url.includes("work") || url.includes("recruit") || url.includes("contact") ){
        $("#nav").removeClass("white-scroll")
    }
})