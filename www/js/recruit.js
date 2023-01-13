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

var sectSW= 0,
    scrollSW=0
setTimeout(function(){
    $('.sect1').addClass('on')
    scrollSW=1;
},600)
$('.recruit-choice li').click(function(){
    idx=$(this).index()+1;
    $('.recruit-choice li').removeClass('on')
    $(this).addClass('on')
    $('.sect').removeClass('on')
    $('.sect'+idx).addClass('on')
    sectSW = idx-1;
    console.log(sectSW)
    if(idx==3){
        setTimeout(function(){
            $('.scrollAnimation, .link-portfolio, .link-works, .link-language').addClass('white')
        },900)
        setTimeout(function(){
            $('.link-portfolio a img').attr({"src":"/img/ico_download.png"})
        },1120)
    }else{
        $('.scrollAnimation, .link-portfolio, .link-works, .link-language').removeClass('white')
        $('.link-portfolio a img').attr({"src":"/img/ico_download_black.png"})
    }
})
$('.sect3Wrap .classList').mouseenter(function(){
    $(this).addClass('on')
})
$('.sect3Wrap .classList').mouseleave(function(){
    $(this).removeClass('on')
})
function windowScroll(delta){
    if(scrollSW==1){
        scrollSW=0
        if(delta>0){
            if(1<=sectSW){
                sectSW--;
                console.log(sectSW)
                $('.recruit-choice li').removeClass('on')
                $('.recruit-choice li').eq(sectSW).addClass('on')
                $('.sect').removeClass('on')
                $('.sect').eq(sectSW).addClass('on')
            }
        }else if(delta<0){
            if(1>=sectSW){
                sectSW++;
                console.log(sectSW)
                $('.recruit-choice li').removeClass('on')
                $('.recruit-choice li').eq(sectSW).addClass('on')
                $('.sect').removeClass('on')
                $('.sect').eq(sectSW).addClass('on')
            }
        }
        if(sectSW==2){
            setTimeout(function(){
                $('.scrollAnimation, .link-portfolio, .link-works, .link-language').addClass('white')
            },1000)
            setTimeout(function(){
                $('.link-portfolio a img').attr({"src":"/img/ico_download.png"})
            },1220)
        }else{
            $('.scrollAnimation, .link-portfolio, .link-works, .link-language').removeClass('white')
            $('.link-portfolio a img').attr({"src":"/img/ico_download_black.png"})
        }
        setTimeout(function(){
            scrollSW=1;
        },1300)
    }
}
function trans0(i){
    if(i==1){
        $(".sect").addClass('trans0')//for window-scroll addClass
        $('.main .figure-container ul.figure-wrap li.figure-list').addClass('trans0')
    }else{
        $(".sect").removeClass('trans0')//for window-scroll removeClass
        $('.main .figure-container ul.figure-wrap li.figure-list').removeClass('trans0')
    }
}
$(window).on('mousewheel DOMMouseScroll',function(event, delta){
    trans0(0);
    windowScroll(delta);
});

})