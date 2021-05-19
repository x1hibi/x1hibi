/**
 * Display web page after this load all media and show handle animations and styles
 */

function loader(loadPage) {
    // when page is load 
    if(loadPage){
        document.getElementsByClassName('loader')[0].style.opacity="0"
        setTimeout(() => {
            document.getElementById("loader").style.display="none"
            document.getElementById("main").style.display="block"
            document.getElementById("fixedMenu").style.display="block"
            document.body.style.animation="gradient 2s ease-in-out 1.5s infinite alternate"
            stickyMenu=false
        }, 1510);
    }else{
        document.getElementById('startButton').style.display="block"
    }
}  
