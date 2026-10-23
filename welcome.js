const ja = document.querySelector('#ja');
const nee = document.querySelector('#nee');

ja.addEventListener('click', function() {
    const oldersixteen = true; 
     if (oldersixteen) {
        window.location.href = "seasons.html";
     } else {
        window.location.href = "access-denied.html";
     }
})



nee.addEventListener('click', function() {
    const oldersixteen = false;
    if (oldersixteen) {
        window.location.href = "seasons.html";
    } else {
        window.location.href = "access-denied.html";
    }
})

