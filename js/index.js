let flag=0;

 let slideShow = () =>{
     let num;
    let slides = document.getElementsByClassName("slide");
     let dots = document.getElementsByClassName("dot");
     for( num = 0; num < slides.length; num++){
         slides[num].style.display = "none";
     }
      flag++;
     if(flag > slides.length){
         flag = 1
      }
      for(num = 0; num < dots.length; num++){
         dots[num].className = dots[num].className.replace(" active" , "");
      }
      slides[flag - 1].style.display = "block";
      dots[flag - 1].className += " active";
      setTimeout(slideShow, 4000);
 }
 slideShow();

