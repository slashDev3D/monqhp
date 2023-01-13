    const titleWord = document.querySelectorAll(".s1--title-p")
    titleWord.forEach( el => {
        let thisText = [...el.innerHTML]
        el.innerHTML = null;
        thisText.forEach( a => {
            let thisDiv = document.createElement("div")
            let thisSpan = document.createElement("span")
                thisSpan.innerHTML  = a === " " ? "&nbsp;" : a
                let thisSpan2 = document.createElement("span")
                thisSpan2.innerHTML  = a === " " ? "&nbsp;" : a
                thisDiv.append(thisSpan)
                thisDiv.append(thisSpan2)
                el.append(thisDiv)
        })
    })
    const s1 = document.querySelector(".s1")
    const s1foot = document.querySelector(".s1--foot")
    setTimeout(()=>{
        s1.classList.add("on")
    },10)
    setTimeout(()=>{
        s1foot.classList.add("on")
    },2000)
    const spans = document.querySelectorAll(".s1--title-p div span:last-child")
    window.addEventListener("resize", () => {
        for(item of spans){
            item.classList.add("duration0")
        }
    })
    function resizedw(){
        for(item of spans){
            item.classList.remove("duration0")
        }
    }
    var doit;
    window.onresize = function(){
        clearTimeout(doit)
        doit = setTimeout(resizedw, 300)
    }