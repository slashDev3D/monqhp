window.onpageshow =  function(event) {
    if (event.persisted) {//앞으로가기 및 뒤로가기로 접근할 경우 페이지 새로고침 실행
            location.reload();
    }
}

$(document).ready(function(){
    /* word split===================================== */
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
    /*video popup control============================================ */
    $('.videoPopup .videoPopupWrap .close').click(function(ev){
        $('.videoPopup .videoPopupWrap').css({"opacity":"0"})
        $('#video')[0].src += "&autoplay=0";
        ev.preventDefault();
        setTimeout(function(){
            $('.videoPopup').css({"right":"-100%"})
        },310)
    })
    $('.sect3 .sectWrap .videoContent .videoContainer').mouseenter(function(){
        $(this).addClass('on')
    })
    $('.sect3 .sectWrap .videoContent .videoContainer').mouseleave(function(){
        $(this).removeClass('on')
    })
    /* moreView btn==================================================== */
    $('.moreView a').on({
        mouseenter:function(){
            $(this).find('svg.plus').addClass('rtt180');
        },
        mouseleave:function(){
            $(this).find('svg.plus').removeClass('rtt180'); 
        }
    })
    /*sect Switch============= */
    var sectNum=1,//Throttle switch
        sectSW=1,//Throttle switch
        scrollLock=true,//scroll lock switch
        hamSW=1//Throttle switch
        
        function sectChange(a,b,c,d,e){
            if(a == 1){
                $(".sect1").addClass("init")
            }else {
                $(".sect1").removeClass("init")
            }
            $('.sect').removeClass('on')
            $('.sect'+a).addClass('on')
            $('.sect2').removeClass('showWithus')
            $('.sns-btn .cls-1').css({"fill":d});
            setTimeout(function(){
                $('.link-works a svg .cls-1').css({"fill":b});
                $('.link-works a p, .link-language a.on, .link-portfolio a').css({"color":b});
                $('.link-language a span').css({"background-color":b});
                // $('.link-portfolio a').css({"color":b});
                $('.scrollAnimation .ball ').css({"color":c});
                $('.scrollAnimation .point, .scrollAnimation .bar').css({"background-color":c});
                if(e==1){
                    $('.btn-ham .rel span').css({"background-color":"#000"});
                    $('.btn-ham .rel p').css({"color":"#000"});
                }else{
                    $('.btn-ham .rel span').css({"background-color":"#fff"});
                    $('.btn-ham .rel p').css({"color":"#fff"});
                }
            },700)
        }
        function trans0(i){
            if(i==1){
                $(".sect").addClass('trans0')//for window-scroll addClass
            }else{
                $(".sect").removeClass('trans0')//for window-scroll addClass
            }
        }
    
    /* scroll event=========== */
    function sectSwitching(sectNum){
        switch(sectNum){//changing info
            case 1:
                sectChange(1,"#fff","#fff","#fff",0);
                setTimeout(function(){
                    $('.link-portfolio a img').attr({"src":"/img/ico_download.png"})
                },700)
                break;
            case 2:
                sectChange(2,"#fff","#fff","#fff",0);
                setTimeout(function(){
                    $('.link-portfolio a img').attr({"src":"/img/ico_download.png"})
                },700)
                break;
            case 3:
                sectChange(3,"#000","#fff","#fff",0);
                $('.sect2').addClass('showWithus');
                $('.sect2').removeClass('off');
                setTimeout(function(){
                    $('.link-portfolio a img').attr({"src":"/img/ico_download_black.png"})
                },700)
                break;
            case 4:
                sectChange(4,"#000","#000","#000",1);
                $('.sect2').removeClass('showWithus');
                $('.sect2').addClass('off');
                setTimeout(function(){
                    $('.link-portfolio a img').attr({"src":"/img/ico_download_black.png"})
                },700)
                break;
            case 5:
                sectChange(5,"#000","#000","#000",1);
                setTimeout(function(){
                    $('.link-portfolio a img').attr({"src":"/img/ico_download_black.png"})
                },700)
                $('body>.content, .fixedContent').removeClass('on');
                setTimeout(function(){
                    $('.link-works, .link-portfolio').removeClass('off')
                },600)
                setTimeout(function(){
                    $('.curtainCall-white').removeClass('off')
                },1000)
                break;
            case 6:
                sectChange(5,"#000","#000","#000",0);
                setTimeout(function(){
                    $('.link-portfolio a img').attr({"src":"/img/ico_download_black.png"})
                },500)
                setTimeout(function(){
                    $('.link-works a p, .link-language a.on').css({"color":"#000"});
                    $('.link-language a span').css({"background-color":"#000"});
                    $('.link-portfolio a img').attr({"src":"/img/ico_download.png"})
                },701)
                $('body>.content, .fixedContent').addClass('on');
                $('.curtainCall-white').addClass('off')
                $('.link-works, .link-portfolio').addClass('off')
                break;  
        }
    }
    $('.btn-ham').click(function(){
        if(hamSW==1){
            hamSW=0;
            scrollLock=false;
            setTimeout(function(){
                $('.link-portfolio').removeClass('off')
                $('.link-works').removeClass('off')
                $('.link-portfolio a img').attr({"src":"/img/ico_download_black.png"})
            },300)
            $('.link-portfolio a').css({"color":"black"})
            $('.link-works a').css({"color":"black"})
            setTimeout(function(){
                hamSW=2;
            },1010)
        }else if(hamSW==2){
            hamSW=1;
            sectSwitching(sectNum)
            setTimeout(function(){
                scrollLock=true;
                console.log(sectNum)
            },900)
        }
    })
    /* scroll event for window=========== */
    function windowScroll(delta){
        trans0(0);
        if(scrollLock==true){
            if(sectSW==1){
                sectSW=0;
                if(delta>0){/* up */
                    if(2<=sectNum && sectNum<=6){
                        sectNum--;
                    }else{
                        sectSW=1;/*clean the Throttle-switch at 1st and last page */
                    }
                }else if(delta<0){/* down */
                    if(1<=sectNum && sectNum<=5){
                        sectNum++;
                    }else{
                        sectSW=1;/*clean the Throttle-switch at 1st and last page */
                    }
                }
                setTimeout(function(){
                    sectSW=1;
                },1500)//Throttle-switch change
                sectSwitching(sectNum);
            }
        }
    }
    function mobileScroll(startY,endY){
        trans0(0);
        if(scrollLock==true){
            if(sectSW==1){
                sectSW=0;
                if(startY-endY<50){/* up */
                    if(2<=sectNum && sectNum<=6){
                        sectNum--;
                    }else{
                        sectSW=1;/*clean the Throttle-switch at 1st and last page */
                    }
                }else if(endY-startY<50){/* down */
                    if(1<=sectNum && sectNum<=5){
                        sectNum++;
                    }else{
                        sectSW=1;/*clean the Throttle-switch at 1st and last page */
                    }
                }
                setTimeout(function(){
                    sectSW=1;
                },1500)//Throttle-switch change
                sectSwitching(sectNum)
            }
        }
    }
    var touchSW=1;

    var initSwitch = false;
    $(window).on('mousewheel DOMMouseScroll',function(event, delta){
        if(initSwitch == true){
            if(touchSW==1){
                windowScroll(delta)
                touchSW=1;
            }
        }
    });
    /* scroll event for mobile=========== */
    var startX = 1,
        startY = 1,
        endX = 1,
        endY = 1;
    $(window).on('touchstart',function(event){
        touchSW=0;
        startX = event.originalEvent.changedTouches[0].screenX;
        startY = event.originalEvent.changedTouches[0].screenY;
        console.log(startX , startY)
    })
    $(window).on('touchend',function(event){
        endX = event.originalEvent.changedTouches[0].screenX;
        endY = event.originalEvent.changedTouches[0].screenY;
        console.log(endX , endY)
    
        if(startY-endY>50){
            console.log('up')
           }else if(endY-startY>50){
            console.log('down')
           }
        if(startX-endX>50){
            console.log('left')
            windowScroll(-1);
           }else if(endX-startX>50){
            console.log('right')
            windowScroll(1);
           }
    })
    
    resizeSW = 1;
    $(window).on('resize',function(){
        if(resizeSW==1){
            resizeSW=0;
            trans0(1);//for window-scroll addClass
            setTimeout(function(){resizeSW=1},1000)
        }
    })
    $('.magic-hover').mouseenter(function(){
        $('#magicPointer').css({"width":"88px","height":"88px"})
    })
    $('.magic-hover').on({
        mouseenter:function(){$('#magicPointer').css({"width":"88px","height":"88px"})},
        mouseleave:function(){$('#magicPointer').css({"width":"8px","height":"8px"})},
    })
    $('#sect1popBtn').click(function(){
        $('.sect1__popup').addClass('off')
    })

    function videoClose(){
        initSwitch = true;
        $(".videoPopup").addClass("hide")
        $(".sect1").addClass("init")
    }
    $(".videoContent .close").click(function(){
        videoClose()
    })
    $(".videoPopupBg").click(function(){
        videoClose()
    })
});