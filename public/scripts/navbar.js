let checkbox = document.querySelector("#openSidebarMenu");
let main = document.querySelector("#main");
let sidebarMenu = document.querySelector("#sidebarMenu");

checkbox.addEventListener("click", function (event) {
  if (checkbox.checked) {
    if (window.matchMedia("(max-width: 479px)").matches) {
      main.style.display = "none";
      sidebarMenu.style.width = "100%";
    } else {
      main.style.display = "inline-block";
      sidebarMenu.style.width = "230px";
    }
    if (
      window.matchMedia("(min-width: 480px) and (max-width: 599px)").matches
    ) {
      main.style.marginLeft = "50%";
    } else if (
      window.matchMedia("(min-width: 600px) and (max-width: 767px)").matches
    ) {
      main.style.marginLeft = "45%";
    } else if (
      window.matchMedia("(min-width: 768px) and (max-width: 799px)").matches
    ) {
      main.style.marginLeft = "35%";
    } else if (
      window.matchMedia("(min-width: 800px) and (max-width: 991px)").matches
    ) {
      main.style.marginLeft = "30%";
    } else if (
      window.matchMedia("(min-width: 992px) and (max-width: 1024px)").matches
    ) {
      main.style.marginLeft = "25%";
    } else if (
      window.matchMedia("(min-width: 1025px) and (max-width: 1199px)").matches
    ) {
      main.style.marginLeft = "25%";
    } else if (window.matchMedia("(min-width: 1200px)").matches) {
      main.style.marginLeft = "15%";
    }
  } else {
    main.style.marginLeft = "0px";
    if (window.matchMedia("(max-width: 479px)").matches) {
      main.style.display = "inline-block";
      sidebarMenu.style.width = "230px";
    }
  }
});

window.addEventListener(
  "resize",
  function (event) {
    if (checkbox.checked) {
      if (window.matchMedia("(max-width: 479px)").matches) {
        main.style.display = "none";
        sidebarMenu.style.width = "100%";
      } else {
        main.style.display = "inline-block";
        sidebarMenu.style.width = "230px";
      }
      if (
        window.matchMedia("(min-width: 480px) and (max-width: 599px)").matches
      ) {
        main.style.marginLeft = "50%";
      } else if (
        window.matchMedia("(min-width: 600px) and (max-width: 767px)").matches
      ) {
        main.style.marginLeft = "45%";
      } else if (
        window.matchMedia("(min-width: 768px) and (max-width: 799px)").matches
      ) {
        main.style.marginLeft = "35%";
      } else if (
        window.matchMedia("(min-width: 800px) and (max-width: 991px)").matches
      ) {
        main.style.marginLeft = "30%";
      } else if (
        window.matchMedia("(min-width: 992px) and (max-width: 1024px)").matches
      ) {
        main.style.marginLeft = "25%";
      } else if (
        window.matchMedia("(min-width: 1025px) and (max-width: 1199px)").matches
      ) {
        main.style.marginLeft = "25%";
      } else if (window.matchMedia("(min-width: 1200px)").matches) {
        main.style.marginLeft = "15%";
      }
    } else {
      main.style.marginLeft = "0px";
      if (window.matchMedia("(max-width: 479px)").matches) {
        main.style.display = "inline-block";
        sidebarMenu.style.width = "230px";
      }
    }
  },
  true
);
