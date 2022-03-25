// concerne le menu du header pour les écrans en dessous de 900px
function menu() {
    var acc = document.getElementsByClassName("accordion");
    //var bandeau = document.querySelector("[class='bandeau-sous-menu']")
    var i;
    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
        panel.style.display = "none";
        //bandeau.style.color = 'green';
        //bandeau.style.display = "none";
        //bandeau.style.height = "0px";
        } else {
        panel.style.display = "block";
        //bandeau.style.color = 'red';
        //bandeau.style.display = "none";
        //bandeau.style.height = "25px";
        }
    });
    }
    //var acc = document.getElementsByClassName("accordion");
    //var i;
    for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("mouseover", function() {
        this.classList.toggle("active");
        var panel = this.nextElementSibling;
        if (panel.style.display === "block") {
        panel.style.display = "none";
        } else {
        panel.style.display = "block";
        }
    });
    }
    var menuSvg = document.getElementById("svg-menu");

    menuSvg.addEventListener("click", function() {
        //menuSvg[0].addEventListener("click", function() {

        //this.classList.toggle("active");
        var menu = document.getElementById("menu");
        if (menu.style.display === "block") {
        menu.style.display = "none";
        } else {
        menu.style.display = "block";
        }
    });

    var btnAccueil = document.getElementById("btn-contact");
    btnAccueil.addEventListener("click", function(e) {
        window.location.href = "./contact.php";
    })
}
