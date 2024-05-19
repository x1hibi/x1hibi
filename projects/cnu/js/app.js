/* NOTES: S= Initial Slide  NS=next slide SS=show slide CS = Current Slide*/
var  S = 1;
showSlides(S);

function plusSlides(n) {
  showSlides(S += n);
}

function currentSlide(n) {
  showSlides(S = n);
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("Slide");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {S = 1}    
  if (n < 1) {S = slides.length}
  for (i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
      dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[S-1].style.display = "block";  
}
    

