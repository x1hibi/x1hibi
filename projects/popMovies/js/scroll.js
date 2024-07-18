
//function for navbar
$(window).on("scroll",function(){
    if ($(window).scrollTop()){
        $('.dnavbar').addClass('blue');
    }
    else{
        $('.dnavbar').removeClass('blue');
    }
    
});

