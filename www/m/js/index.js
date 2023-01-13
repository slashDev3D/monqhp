$(window).ready(function(){
    // word split==================================
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
    $(window).scroll(function(){
        var winH=$(window).height();
        var winT=$(window).scrollTop();
        var winB=winT+winH;
        // console.log(winB)
        var indexConT = $('.index-scroll-event');
        var delayT = $('.index-scroll-event-delay')
        var delayT2 = $('.index-scroll-event-delay2')
        var delayTT = delayT.offset().top;

        indexConT.each(function(){
            var thisY = $(this).offset().top
            var thisT = (winT+(winH/8))
            if(thisY<thisT){
                $(this).addClass('gone')
                $(this).removeClass('appear')
            }else if(thisY>thisT){
                $(this).removeClass('gone')
                $(this).removeClass('appear')
            }

            if(thisY<winB && thisY>thisT){
                $(this).addClass('appear')
            }
        })
        delayT.each(function(){
            var thisY = $(this).offset().top
            var thisT = (winT+(winH/3))
            if(winT<=100){
                $(this).removeClass('gone')
            }
            if(winT<thisY && thisY<thisT){
                $(this).addClass('gone')
                $(this).removeClass('appear')
            }else if(thisY<winT){
                $(this).removeClass('gone')
                $(this).addClass('appear')
            }
        })
        delayT2.each(function(){
            var thisY = $(this).offset().top
            var thisT = (winT+(winH/1.2))
            if(thisY<thisT){
                $(this).addClass('gone')
                $(this).removeClass('appear')
            }else if(thisY>thisT){
                $(this).removeClass('gone')
                $(this).removeClass('appear')
            }

            if(thisY<winB-600 && thisY>thisT){
                $(this).addClass('appear')
            }
        })

        var sect3T = ($('.sect3').offset().top) - winH;
        if(winT>sect3T){
            $('main').addClass('white')
            $("nav").removeClass("white-scroll")
            $('.navham').removeClass('white-scroll')
            $("nav").addClass("black-scroll")
            $('.navham').addClass('black-scroll')
        }else if(winT<sect3T){
            $('main').removeClass('white')
            $('.navham').addClass('white-scroll')
            $('nav').addClass('white-scroll')
            $('.navham').removeClass('black-scroll')
            $('nav').removeClass('black-scroll')
        }
        
    })
    $('#sect1popBtn').click(function(){
        $('.mob__popup').addClass('off')
    })
})