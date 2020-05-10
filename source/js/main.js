(function () {

  var ESC_KEY_CODE = 27;

  var loginBtn = document.querySelector(".sing-in");
  var loginBtnNav = document.querySelector(".main-navigation__item--sing-in");
  var popupRegistration = document.querySelector(".popup");
  var overlay = document.querySelector(".overlay");
  var menuButton = document.querySelector(".menu-button");
  var navigation = document.querySelector(".main-navigation");
  var languageIconElements = document.querySelectorAll('.language__img');

  var baseLink = 'img/sprite.svg#';

  var select = $('.js-example-basic-single').select2();


  function changeSelectValue(value) {
    select.val(value);
    select.trigger('change');
  }

  function setupSelectListener() {
    select.on('select2:select', function (e) {
      for (let i = 0; i < languageIconElements.length; i++) {
        var element = languageIconElements[i];
        var value = e.target.value;

        element.setAttribute('xlink:href', baseLink + value);
        changeSelectValue(value)
      }
    });
  }



///popup-form-registration

  function setupFormListeners() {
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
      if(e.keyCode === ESC_KEY_CODE) {
        popupRegistration.classList.add("hide");
        overlay.classList.add("hide");
        popupRegistration.classList.remove("show");
        overlay.classList.remove("show");
      }
    });
  }

///toggle navigation

  function setupNavigationListeners() {
    menuButton.addEventListener("click", function () {
      navigation.classList.toggle("show-menu")
    });
  }

  setupSelectListener();
  setupFormListeners();
  setupNavigationListeners();
}());