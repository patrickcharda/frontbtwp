// concerne le menu-header pr les affichages supérieurs à 900px

function menuinit() {
  var divmenus = document.getElementsByClassName("divmenu");
  var i;

  for (i=1; i<=divmenus.length;i++) {
    let divmenuid = 'div-menu'+i;
    let menutitleid = 'menutitle'+i; 
    let menutitle = document.getElementById(menutitleid);
    let ulid = 'ul'+i;
    let ul = document.getElementById(ulid);
    let divMenu = document.getElementById(divmenuid);
    divMenu.style.backgroundColor = "rgb(236, 236, 236)";
    divMenu.style.color = "#353535";
    menutitle.style.fontWeight="400";

    divMenu.addEventListener('mouseover', function(e) {

      divMenu.style.backgroundColor="#353535";
      divMenu.style.color="#ECECEC";
      menutitle.style.fontWeight="600";
      
    })
    divMenu.addEventListener('mouseout', function(e) {
      divMenu.style.backgroundColor="#ECECEC";
      divMenu.style.color="#353535";
      menutitle.style.fontWeight="400";
    })
    divMenu.addEventListener('click', function(e) {
      ul.classList.toggle('open')
    })
  }
}

