$(document).ready(function(){
    // swiper=====================
/* word split============= */
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
// curtaincall on===========
setTimeout(function(){
    $('.curtainCall-white').addClass('on')
},100)

// translate-duration Initialization===========
function trans0(i){
    if(i==1){
        $(".sect").addClass('trans0')//for window-scroll addClass
        $('.curtain').addClass('trans0')
        $('.blackSquare').addClass('trans0')
        $('.main .figure-container ul.figure-wrap li.figure-list').addClass('trans0')
    }else{
        $(".sect").removeClass('trans0')//for window-scroll removeClass
        $('.curtain').removeClass('trans0')//for window-scroll removeClass
        $('.blackSquare').removeClass('trans0')//for window-scroll removeClass
        $('.main .figure-container ul.figure-wrap li.figure-list').removeClass('trans0')
    }
}
// work-choice===============================
var choiceSW =1;
$('ul.work-choice li').click(function(){
    var idx = $(this).index();
    scrollLock=0;
    if(choiceSW==1){
        choiceSW=0;
        $('ul.work-choice li').removeClass('on')
        $(this).addClass('on')
        if(idx==0){
            $('.mediaContent').removeClass('on show')
            $('.mediaContent').addClass('hide')
            $('.filmContent').removeClass('hide')
            $('.filmContent').addClass('show')
            $('.filmContent li.background-list').eq(0).addClass('on')
            setTimeout(function(){showWork=0;},1300)
        }else if(idx==1){
            $('.filmContent').removeClass('on show')
            $('.filmContent').addClass('hide')
            $('.mediaContent').removeClass('hide')
            $('.mediaContent').addClass('show')
            $('.mediaContent li.background-list').eq(0).addClass('on')
            setTimeout(function(){showWork=1;},1300)
        }
        setTimeout(function(){choiceSW=1;scrollLock=1},1300)
    }
})
// video-modal======================================
$('.figure-list .img').modalVideo({channel:'vimeo'});//from jquery-modal-video.min.js

$('.figure-list .img').mouseenter(function(){
    $('#magicMouseCursor').fadeOut(100)
    $('#magicPointer').css({"width":"88px","height":"88px"})
})
$('.figure-list .img').mouseleave(function(){
    $('#magicMouseCursor').fadeIn(100)
    $('#magicPointer').css({"width":"8px","height":"8px"})
})
// thumb=====================================
var workOpen =0;
var showWork = 1;
$('.thumb .figure').mouseenter(function(){$(this).addClass('on')})
$('.thumb .figure').mouseleave(function(){$(this).removeClass('on')})
$('.thumb .figure .figureTitle').click(function(){
    var thisFigure=$(this).closest('.thumb .figure').index();
    setTimeout(function(){
        workOpen=1
        scrollLock=1
        $('ul.work-choice').addClass('on')
    },1300)
    $('.content >.thumb').addClass('open')
    $('.mediaContent .background-list').eq(0).addClass('on')
    $('.mediaContent .title-list').eq(0).addClass('on')
    $('.mediaContent .figure-list').eq(0).addClass('on parallaxOn')
    $('.mediaContent .figure-list').eq(1).addClass('next')
    $('.filmContent .background-list').eq(0).addClass('on')
    $('.filmContent .title-list').eq(0).addClass('on')
    $('.filmContent .figure-list').eq(0).addClass('on parallaxOn')
    $('.filmContent .figure-list').eq(1).addClass('next')
    if(thisFigure==0){//brandFilm
        $('.filmContent').addClass('on')
        $('ul.work-choice li').eq(0).addClass('on')
        $('.thumb .figure1').addClass('selected')
        $('.thumb .figure2').addClass('non-selected')
        showWork = 0;
    }
    else if(thisFigure==1){//NewMedia
        $('.mediaContent').addClass('on')
        $('ul.work-choice li').eq(1).addClass('on')
        $('.thumb .figure2').addClass('selected')
        $('.thumb .figure1').addClass('non-selected')
        showWork = 1;
    }
})
// works=======================
var filmFigure = $('.main .filmContent .figure-container ul.figure-wrap li.figure-list'),
    filmFigureLength = filmFigure.length,

    mediaFigure = $('.main .mediaContent .figure-container ul.figure-wrap li.figure-list'),
    mediaFigureLength = mediaFigure.length;
function makeFigureSub(a,i){
    var backgroundFigure = $('<li/>',{class:"background-list"})
    var countList = $('<li/>',{class:"count-list"})
    var titleList = $('<li/>',{class:"title-list"})
    var imgName = $('.'+a+'Content li.figure-list').eq(i-1).find('.img').attr("data-video-id")
    var projectTitle = $('.'+a+'Content li.figure-list').eq(i-1).find('.project-title')
    var projectName = $('.'+a+'Content li.figure-list').eq(i-1).find('.project-name')
    var clientName = $('.'+a+'Content li.figure-list').eq(i-1).find('.client-name')

    // $('.filmContent ul.count-wrap-front').append(countList.clone())//clone count-front-number
    //$('.filmContent ul.count-wrap-back').append(countList.clone())//clone count-back-number
    $('.'+a+'Content .background-container ul.background-wrap').append(backgroundFigure.clone())//clone backgroundFigure
    $('.'+a+'Content .title-container ul.title-wrap').append(titleList.clone())
    $('.'+a+'Content .title-container ul.title-wrap li.title-list').eq(i-1).append(projectTitle)
    $('.'+a+'Content .title-container ul.title-wrap li.title-list').eq(i-1).append(projectName)
    $('.'+a+'Content .title-container ul.title-wrap li.title-list').eq(i-1).append(clientName)
    $('.'+a+'Content li.figure-list').eq(i-1).find('.img').append('<img src="img/'+a+'_thumb_' + imgName + '.jpg">')//figure img
    $('.'+a+'Content li.background-list').eq(i-1).append('<img src="img/'+a+'_thumb_' + imgName + '.jpg">')//bg img
    $('.'+a+'Content li.background-list').eq(i-1).append('<div class="black-filter"></div>')//bg black-filger
}
function makeFigure(a,b){//auto create figures
        for(i=1;i<=a;i++){//jpg file name control
            makeFigureSub('film',i)
        }
        for(i=1;i<=b;i++){//jpg file name control
            makeFigureSub('media',i)
        }
}
makeFigure(filmFigureLength, mediaFigureLength);

var sectSW=1,//Throttle switch
    filmNum=1,
    mediaNum=1;
    scrollLock=0,//scroll lock switch
    hamSW=1//Throttle switch

$('.btn-ham').click(function(){
    if(hamSW==1){
        hamSW=0;
        scrollLock=0;
        if(workOpen==1){
            $('ul.work-choice').removeClass('on')
        }
        setTimeout(function(){
            hamSW=2;
        },1300)
    }else if(hamSW==2){
        hamSW=0;
        scrollLock=1;
        if(workOpen==1){
            $('ul.work-choice').addClass('on')
        }
        setTimeout(function(){
            hamSW=1;
        },1300)
    }
})
/* scroll event=================================================== */
function workMove(a,subject){//film subject num = 1, media subject num = 0
    var figureIdx = a-1;
    if(subject==1){
        var content = $('.filmContent')
        var left = figureIdx*(100/filmFigureLength)
        var figure = filmFigure
    }else if(subject==2){
        var content = $('.mediaContent')
        var left = figureIdx*(100/mediaFigureLength)
        var figure = mediaFigure
    }
    content.find('ul.figure-wrap').css({"transform":"translate(-"+left+"%,0%)"});
    figure.removeClass('on')
    figure.removeClass('next')
    figure.removeClass('prev')
    figure.eq(figureIdx).addClass('on')
    figure.eq(figureIdx+1).addClass('next')
    figure.eq(figureIdx-1).addClass('prev')
    //title change
    content.find('ul.background-wrap li.background-list').removeClass('on')
    content.find('ul.background-wrap li.background-list').eq(figureIdx).addClass('on')
    content.find('ul.background-wrap li.background-list').removeClass('up')
    //bg-img change
    content.find('ul.title-wrap li.title-list').removeClass('on')
    content.find('ul.title-wrap li.title-list').eq(figureIdx).addClass('on')
    content.find('ul.title-wrap li.title-list').removeClass('up')
    content.find('ul.title-wrap li.title-list').eq(figureIdx - 1).addClass('up')
    //count-back change
    content.find('ul.count-wrap-back .count-list').removeClass('on')
    content.find('ul.count-wrap-back .count-list').eq(figureIdx).addClass('on')
    content.find('ul.count-wrap-back .count-list').removeClass('up')
    content.find('ul.count-wrap-back .count-list').eq(figureIdx - 1).addClass('up')
    //count-front change
    if(figureIdx==9 || figureIdx==8 || figureIdx==19 || figureIdx==18){
        var onIdx = figureIdx - 8
        var upIdx = figureIdx - 7
    content.find('ul.count-wrap-front .count-list').removeClass('on')
    content.find('ul.count-wrap-front .count-list').eq(onIdx).addClass('on')
    content.find('ul.count-wrap-front .count-list').removeClass('up')
    content.find('ul.count-wrap-front .count-list').eq(upIdx).addClass('up')
    }
    //bgc change color
    // $('.background-container').css({"background-color":"rgb("+SWColor[figureIdx]+")"})
}
/* window scroll */
function windowScroll(delta){
    if(scrollLock==1){
        if(showWork==0){
            if(sectSW==1){
                sectSW=0;
                if(delta>0){/* up */
                    if(2<=filmNum && filmNum<=filmFigureLength){
                        filmNum--;
                        workMove(filmNum,1);
                    }
                }else if(delta<0){/* down */
                    if(1<=filmNum && filmNum<=filmFigureLength-1){
                        filmNum++;
                        workMove(filmNum,1);
                    }
                }
                setTimeout(function(){
                    sectSW=1;
                },650)//Throttle-switch change
            }
        }else if(showWork==1){
            if(sectSW==1){
                sectSW=0;
                if(delta>0){/* up */
                    console.log('up')
                    if(2<=mediaNum && mediaNum<=mediaFigureLength){
                        mediaNum--;
                        workMove(mediaNum,2);
                    }
                }else if(delta<0){/* down */
                    console.log('down')
                    if(1<=mediaNum && mediaNum<=mediaFigureLength-1){
                        mediaNum++;
                        workMove(mediaNum,2);
                    }
                }
                setTimeout(function(){
                    sectSW=1;
                },650)//Throttle-switch change
            }
        }
    }
}
/* mobile scroll */
$(window).on('mousewheel DOMMouseScroll',function(event, delta){
    trans0(0);
    windowScroll(delta);
});
var startX = 1,
    startY = 1,
    endX = 1,
    endY = 1;
$(window).on('touchstart',function(event){
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

})