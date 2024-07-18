// Scrolling Effect

     $(window).on("scroll",function(){
    if ($(window).scrollTop()){
        $('.navbar').addClass('blue');
    }
    else{
        $('.navbar').removeClass('blue');
    }
    
    
});