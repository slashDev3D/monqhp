$(document).ready(function(){
    // mouse cursor=======================================
    options = {
        "cursorOuter": "circle-basic",
        "hoverEffect": "circle-move",
        "hoverItemMove": false,
        "defaultCursor": false,
        "outerWidth": 48,
        "outerHeight": 48
      }; 
       magicMouse(options);
// btn-ham=======================================
var cursorSW = 1;
$('html').mousemove(function(){
    if(cursorSW==1){
        cursorSW=0;
    //    $('#magicMouseCursor').addClass('appear')
       $('#magicPointer').addClass('appear')
    }
})
setTimeout(() => {
    $(".curtainCall .curtain .border").addClass("open")
}, 200);
});