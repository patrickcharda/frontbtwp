//slider page accueil

var wrap = document.querySelector('.wrap');
var items = document.querySelector(".items");
var itemCount = document.querySelectorAll('.item').length;
var scroller = document.querySelector('.scroller');
var pos = 0;
//var transform = modernizr.prefixed('transform');

/*
function setTransform() {
  items.style["transform"] = 'translate3d(' + (-pos * items.offsetWidth) + 'px,0,0)';
}

function prev() {
  pos = Math.max(pos - 1, 0);
  setTransform();
}

function next() {
  pos = Math.min(pos + 1, itemCount - 1);
  setTransform();
}

window.addEventListener('resize', setTransform);
*/
