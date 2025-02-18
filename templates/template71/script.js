function openForm() {
  document.getElementById("popupForm").style.display = "flex";
}
function closeForm() {
  document.getElementById("popupForm").style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  let modal = document.getElementById('popupForm');
  if (event.target == modal) {
    closeForm();
  }
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

const recommendBlock = document.querySelector('.recommend_ads');
const recommentBlockCloser = document.querySelector('.close_recommend_ads');

function checkCookie(){
   if(getCookie('recommend')){
       recommendBlock.classList.add('disabled');
   }else{
       recommendBlock.classList.remove('disabled');
   }
}
checkCookie();


recommentBlockCloser.addEventListener('click', function(){
		setTimeout(function(){
      recommendBlock.classList.remove('disabled');
    }, 7 * 24 * 60 * 60 * 1000)
    var d = new Date();
    d.setTime(d.getTime() + (7 * 24 * 60 * 60 * 1000));
    var expires = "; expires=" + d.toGMTString();
    document.cookie = "recommend=1" + expires + "; path=/";
    recommendBlock.classList.add('disabled');
})