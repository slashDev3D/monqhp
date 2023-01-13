$(window).ready(function(){
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
    setTimeout(function(){$('.row').eq(0).addClass('on')},600)
    setTimeout(function(){$('.row').eq(1).addClass('on')},900)
    setTimeout(function(){$('.row').eq(2).addClass('on')},1200)
    setTimeout(function(){$('.row').eq(3).addClass('on')},1500)
    setTimeout(function(){$('.row').eq(4).addClass('on')},1800)
})