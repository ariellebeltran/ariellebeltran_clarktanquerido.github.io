// First slideshow
let slideIndex0 = 1;
showSlides0(slideIndex0);

// Next/previous controls
function plusSlides0(n) {
    showSlides0(slideIndex0 += n);
}

// Thumbnail image controls
function currentSlide0(n) {
    showSlides0(slideIndex0 = n);
}

function showSlides0(n) {
    let i;
    let slides0 = document.getElementsByClassName("mySlides0");
    let dots0 = document.getElementsByClassName("vis3AllGenres");
    if (n > slides0.length) { slideIndex0 = 1 }
    if (n < 1) { slideIndex0 = slides0.length }
    for (i = 0; i < slides0.length; i++) {
        slides0[i].style.display = "none";
    }
    for (i = 0; i < dots0.length; i++) {
        dots0[i].className = dots0[i].className.replace(" active", "");
    }
    slides0[slideIndex0 - 1].style.display = "block";
    dots0[slideIndex0 - 1].className += " active";
}