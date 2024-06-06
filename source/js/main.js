(function () {

  const ESC_KEY_CODE = 27;

  let loginBtn = document.querySelector(".sing-in");
  let loginBtnNav = document.querySelector(".main-navigation__item--sing-in");
  let popupRegistration = document.querySelector(".popup");
  let overlay = document.querySelector(".overlay");
  let menuButton = document.querySelector(".menu-button");
  let navigation = document.querySelector(".main-navigation");
  let languageIconElements = document.querySelectorAll('.language__img');

  let baseLink = 'img/sprite.svg#';

  let select = $('.js-example-basic-single').select2();


  function changeSelectValue(value) {
    select.val(value);
    select.trigger('change');
  }

  function setupSelectListener() {
    select.on('select2:select', function (e) {
      for (let i = 0; i < languageIconElements.length; i++) {
        let element = languageIconElements[i];
        let value = e.target.value;

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
