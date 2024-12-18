// First slideshow
let slideIndex_pvis3 = 1;
showSlides_pvis3(slideIndex_pvis3);

// Next/previous controls
function plusSlides_pvis3(n) {
    showSlides_pvis3(slideIndex_pvis3 += n);
}

// Thumbnail image controls
function currentSlide_pvis3(n) {
    showSlides_pvis3(slideIndex_pvis3 = n);
}

function showSlides_pvis3(n) {
    let i;
    let slides_pvis3 = document.getElementsByClassName("mySlides_pvis3");
    // let dots_pvis3 = document.getElementsByClassName("vis3AllGenres");
    if (n > slides_pvis3.length) { slideIndex_pvis3 = 1 }
    if (n < 1) { slideIndex_pvis3 = slides_pvis3.length }
    for (i = 0; i < slides_pvis3.length; i++) {
        slides_pvis3[i].style.display = "none";
    }
    for (i = 0; i < dots_pvis3.length; i++) {
        dots_pvis3[i].className = dots_pvis3[i].className.replace(" active", "");
    }
    slides_pvis3[slideIndex_pvis3 - 1].style.display = "block";
    dots_pvis3[slideIndex_pvis3 - 1].className += " active";
}