$(document).ready(function(){
document.querySelectorAll('.btn').forEach(button => button.innerHTML = '<div><span>' + button.textContent.trim().split('').join('</span><span>') + '</span></div>');
$('.mainBox a').mouseenter(function(){
    $(this).addClass('on')
    $(this).find('img').attr({"src":"./img/ico_download_black.png"})
})
$('.mainBox a').mouseleave(function(){
    $(this).removeClass('on')
    $(this).find('img').attr({"src":"./img/ico_download.png"})
})
})