
var imgAni = document.querySelectorAll('.abacus-img')[0];
var imgAni2 = document.querySelectorAll('.cloud-img')[0];
var textAni = document.querySelector('.programer-text');

imgAni.addEventListener("mouseenter",function(){ 

 
    imgAni.src = "images/abacus.gif";
    imgAni.classList.add("abacusAni");

    setTimeout(function(){ 
        imgAni.classList.remove("abacusAni");
        imgAni.src = "images/abacus.gif";

    }, 3000); 
});

imgAni2.addEventListener("mouseenter",function(){ 

 
    imgAni2.src = "images/hacker.gif";
    imgAni2.classList.add("cloudAni");

    setTimeout(function(){ 
        imgAni2.classList.remove("cloudAni");
        imgAni2.src = "images/hacker.gif";

    }, 3000); 
});


