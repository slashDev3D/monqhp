$(window).ready(function(){
    var winH
    var sect1Top
    var sect2Top
    setTimeout(function(){
        winH = $(window).height();
        sect1Top = $('.sect1').offset().top;
        sect2Top = $('.sect2').offset().top;
    },50)
    var words = $('.wordSplit');
    var wordArray = [];
    
    // scroll-event add=========================================
$(window).scroll(function(){
    var winTop = $(window).scrollTop();
    var winBot = winTop + winH;
    var toptop = $('.intro').offset().top
    var minusH = winH/3
    // console.log("this is" + toptop)
    // console.log("bot is" + winBot)
    function mainBg(a){//main background-color change
        if(a==1){
            $('main').removeClass('black')
            $('main').addClass('white')
            $('nav').addClass('black-scroll')
            $('nav').removeClass('white-scroll')
            $('.guide-nav-bar li').addClass('black')
            $('.guide-nav-bar li').removeClass('white')
            $('.navham').addClass('black-scroll')
            $('.navham').removeClass('white-scroll')
            $('.mainTitle .small').removeClass('black')
        }else if(a==0){
            $('main').removeClass('white')
            $('main').addClass('black')
            $('nav').addClass('white-scroll')
            $('nav').removeClass('black-scroll')
            $('.guide-nav-bar li').addClass('white')
            $('.guide-nav-bar li').removeClass('black')
            $('.navham').addClass('white-scroll')
            $('.navham').removeClass('black-scroll')
            $('.mainTitle .small').addClass('black')
        }
    }
    if(0<=winBot && winBot<sect1Top+minusH){
        mainBg(1)
        $('.guide-nav-bar li').removeClass('on')
        $('.guide-nav-bar li').eq(0).addClass('on')
        $('.sect1 .small').css({"opacity":"1"})
        $('main .mainHeader').css({"opacity":"1"})
    }else if(sect1Top+minusH<=winBot && winBot<sect2Top+minusH){
        mainBg(0)
        $('.whiteTape').css({"background-color":"black"})
        $('.guide-nav-bar li').removeClass('on')
        $('.guide-nav-bar li').eq(1).addClass('on')
        $('.sect1 .small').css({"opacity":"1"})
        $('main .mainHeader').css({"opacity":"0"})
    }else if(sect2Top+minusH<=winBot){
        mainBg(1)
        $('.whiteTape').css({"background-color":"white"})
        $('.guide-nav-bar li').removeClass('on')
        $('.guide-nav-bar li').eq(2).addClass('on')
        $('.sect1 .small').css({"opacity":"0"})
    }
})
$(window).resize(function(){
    winH = $(window).height();
    sect1Top = $('.sect1').offset().top;
    sect2Top = $('.sect2').offset().top;
})
    // word split event add=========================================
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
// guide-nav-bar=========================================    

    $('.guide-nav-bar li').click(function(){
        idx = $(this).index();
        $('.guide-nav-bar li').removeClass('on')
        $(this).addClass('on')
        if(idx==0){
            $(window).scrollTop(0)
        }else if(idx==1){
            $(window).scrollTop(sect1Top-200)
        }else if(idx==2){
            $(window).scrollTop(sect2Top-200)
        }
    })

})