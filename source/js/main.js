
var loginBtn = document.querySelector(".sing-in");
var loginBtnNav = document.querySelector(".main-navigation__item--sing-in");
var popupRegistration = document.querySelector(".popup");
var overlay = document.querySelector(".overlay");
var menuButton = document.querySelector(".menu-button");
var navigation = document.querySelector(".main-navigation");
var escKeyCode = 27;

// var languageIcon = {
//   english: 'img/english.png',
//   germany: 'img/germany.png',
// };
//
// var icon = document.querySelector('.language img');

$('.js-example-basic-single').select2({
  // templateResult: formatState
});

// $eventSelect.on("change", function (e) {
//   console.log(e);
// });

///popup-form-registration

popupRegistration.classList.add("hide");
overlay.classList.add("hide");

loginBtn.addEventListener("click", function (e) {
  e.preventDefault();
  popupRegistration.classList.add("show");
  overlay.classList.add("show");
  popupRegistration.classList.remove("hide");
  overlay.classList.remove("hide");
});

loginBtnNav.addEventListener("click", function (e) {
  e.preventDefault();
  popupRegistration.classList.add("show");
  overlay.classList.add("show");
  popupRegistration.classList.remove("hide");
  overlay.classList.remove("hide");
});

if (overlay) {
  overlay.addEventListener("click", function (e) {
    e.preventDefault();
    popupRegistration.classList.add("hide");
    overlay.classList.add("hide");
    popupRegistration.classList.remove("show");
    overlay.classList.remove("show");
  });
}

document.addEventListener("keydown", function(e){
  if(e.keyCode === escKeyCode) {
    popupRegistration.classList.add("hide");
    overlay.classList.add("hide");
    popupRegistration.classList.remove("show");
    overlay.classList.remove("show");
  }
});

///toggle navigation

menuButton.addEventListener("click", function () {
  navigation.classList.toggle("show-menu")
});