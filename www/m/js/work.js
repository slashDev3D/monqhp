$(window).ready(function(){
    const film = document.getElementById('filmWrap')
    const media = document.getElementById('mediaWrap')
    
    function addFilm(id,title,name){
        let thisLI = document.createElement('div')
            thisLI.classList.add('slide')
            film.append(thisLI)
            let thisDIV = document.createElement('div')
            thisDIV.classList.add('img')
            thisDIV.setAttribute('data-video-id',id)
            thisLI.append(thisDIV)
            let thisP1 = document.createElement('p')
            thisP1.innerHTML = title
            thisLI.append(thisP1)
            let thisP2 = document.createElement('p')
            thisP1.classList.add('project-title')
            thisP2.classList.add('project-name')
            thisP2.innerHTML = name
            thisLI.append(thisP2)
    }
    function addMedia(id,name){
        var thisLI = document.createElement('li')
        var thisP = document.createElement('p')
        var thisDIV = document.createElement('div')
        thisLI.classList.add('slide')
        thisLI.append(thisDIV)
        media.append(thisLI)
        thisLI.append(thisP)
    
        thisDIV.classList.add('img')
        thisDIV.setAttribute('data-video-id',id)
        thisP.classList.add('project-name')
        thisP.innerHTML = name
    }
    const cleanRow = (row) => {
        // row = [null,{v:'123'},null,{v:'hello'}]
            function replaceNull(item) {
          if (item == null) {return { v: '' }}
          return item
            }
            data = row.map((item) => replaceNull(item)).map((item) => item.v)
            return data
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
        items.forEach(function(item){
            if(item[8] === "brand") {
                console.log("branded")
                addFilm(item[6],item[0],item[1])
            } else if (item[8] == "film") {
                console.log("film")
                addMedia(item[6],item[1])
            }
        })
        $('.mainThumb .slideWrap .slide .img').modalVideo({channel:'vimeo'});//from jquery-modal-video.min.js
  
        var filmFigure = $('.main .film-container .mainThumb .slide')
        var filmFigureLength = filmFigure.length
        
        var mediaFigure = $('.main .media-container .mainThumb .slide')
        var mediaFigureLength = mediaFigure.length;
        function makeFigureSub(a,i){
            var titleList = $('<li/>',{class:"title-list"})
            var swiperList = $('<div/>',{class:"swiper-slide"})
            var projectTitle = $('.'+a+'-container .slideWrap .slide').eq(i-1).find('.project-title')
            var projectName = $('.'+a+'-container .slideWrap .slide').eq(i-1).find('.project-name')
            var clientName = $('.'+a+'-container .slideWrap .slide').eq(i-1).find('.client-name')
            var imgName = $('.'+a+'-container .slideWrap .slide').eq(i-1).find('.img').attr("data-video-id")
      
            $('.'+a+'-container ul.title-wrap').append(titleList.clone())
            $('.'+a+'-container .swiper-wrapper').append(swiperList.clone())
            $('.'+a+'-container ul.title-wrap li.title-list').eq(i-1).append(projectTitle)
            $('.'+a+'-container ul.title-wrap li.title-list').eq(i-1).append(projectName)
            $('.'+a+'-container ul.title-wrap li.title-list').eq(i-1).append(clientName)
            $.ajax({
                type: "GET",
                url:`https://vimeo.com/api/v2/video/${imgName}.json`,
                dataType: "json",
                success:function(data){
                    imgUrl = data[0].thumbnail_large
                    // thisImg.setAttribute('src',imgUrl)
                    // thisBgLi.style.backgroundImage = `url(${imgUrl})`
                    $('.'+a+'-container .mainThumb .slide').eq(i-1).css({"background-image":`url(${imgUrl})`})//figure img
                    $('.'+a+'-container .thumb-swiper .swiper-slide').eq(i-1).css({"background-image":`url(${imgUrl})`})//figure img
                }
            })
        }
        function makeFigure(a,b){
                for(i=1;i<=a;i++){
                  makeFigureSub('film',i)
                }
                for(i=1;i<=b;i++){
                  makeFigureSub('media',i)
                }
                $('.film-container .title-list').eq(0).addClass('on')
                $('.media-container .title-list').eq(0).addClass('on')
        }
        
        makeFigure(filmFigureLength, mediaFigureLength);
      
          var filmSwiper2 = new Swiper('.film-container .thumb-swiper', {
            slidesPerView: 3,//show contents in slide
            spaceBetween: 15,//margin
            centeredSlides: true,//focuse to center the activated content
            slideToClickedSlide:true,//get to center the clicked content
            breakpoints: {
              700: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1023: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
            },
          });
          var mediaSwiper2 = new Swiper('.media-container .thumb-swiper', {
            slidesPerView: 3,//show contents in slide
            spaceBetween: 15,//margin
            centeredSlides: true,//focuse to center the activated content
            slideToClickedSlide:true,//get to center the clicked content
            breakpoints: {
              700: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1023: {
                slidesPerView: 5,
                spaceBetween: 40,
              },
            },
          });
          $('.main .film-container .mainThumb .slide').eq(0).addClass('on')
          $('.main .media-container .mainThumb .slide').eq(0).addClass('on')
          function swiperChange(a,idx){
            $('.main .'+a+'-container .mainThumb .slide').removeClass('on')
            $('.main .'+a+'-container .mainThumb .slide').eq(idx).addClass('on')
            $('.main .'+a+'-container .title-container .title-list').removeClass('on')
            $('.main .'+a+'-container .title-container .title-list').eq(idx).addClass('on')
          }
          filmSwiper2.on('slideChange, click', function () {
              var idx= filmSwiper2.activeIndex;
              swiperChange('film',idx)
          });
          mediaSwiper2.on('slideChange, click', function () {
              var idx= mediaSwiper2.activeIndex;
              swiperChange('media',idx)
          }); 
          $('.swipping li').click(function(){
              idx = $(this).index()
              $('.container').removeClass('on')
              $('.container').eq(idx).addClass('on')
              $('.swipping li').removeClass('on')
              $(this).addClass('on')
          })

    }
    getSheetData()
})