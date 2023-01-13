$(window).ready(function(){
    $(window).scroll(function(){
        var winTop = $(window).scrollTop();
        var winH  = $(window).height();
        var winB = winTop + winH;
        var scrollEle = $('.scroll-event');
        
        scrollEle.each(function(){
            var eleY = ($(this).offset().top)+(winH/10)
            if(eleY<winB){
                $(this).addClass('on')
                $(this).removeClass('opac0')
            }else if(eleY>winTop){
                $(this).removeClass('on')
                $(this).addClass('opac0')
            }
        })
    })
})