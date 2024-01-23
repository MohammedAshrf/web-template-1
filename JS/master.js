//*** Tasks:
// - Task for myself: make the image disapear when you click on any thing around, but it, done.
// - Elzero Task: Scrolling header,done.

// ***Elzero notes
// - The design is not good because he was designing it actualy
//   at the same time of coding, so you may improve it.
// - there're a lot of things can be summed, maybe done.

//* Check if there's local Storage color-option
let mainColor = localStorage.getItem("color_option");

if (mainColor !== null) {
  //* Get the color from the local storage
  document.documentElement.style.setProperty("--r--color", mainColor);
  //* Remove active from any colorsList item
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    //* Add active class on element with data-color ===localStorage item
    if (element.dataset.color === mainColor) {
      element.classList.add("active");
    }
  });
}

//* Switch colors
const colorSet = document.querySelectorAll(".colors-list li");

colorSet.forEach((li) => {
  li.addEventListener("click", (e) => {
    document.documentElement.style.setProperty(
      "--r--color",
      e.target.dataset.color
    );
    //* Set color_option in local storage
    localStorage.setItem("color_option", e.target.dataset.color);

    handelingActive(e);
  });
});

//* Random Background option
let backgroundOption = true;
//* Variable to control the background interval
let backgroundInterval;
//* Check if there's local Storage color-option
let mainImage = localStorage.getItem("backgrounImage_option");

if (mainImage !== null) {
  // console.log(typeof mainImage);
  //* Remove active class
  document.querySelectorAll(".random-backgrounds span").forEach((element) => {
    element.classList.remove("active");
  });
  //* The condition of the backgroundOption value + active class
  if (mainImage === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else if (mainImage === "false") {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}

//* Switch colors
const backgroundSet = document.querySelectorAll(".random-backgrounds span");

backgroundSet.forEach((span) => {
  span.addEventListener("click", (e) => {
    handelingActive(e);

    //* background condition
    if (e.target.dataset.background === "randomize") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("backgrounImage_option", true);
    } else if (e.target.dataset.background === "stop-randomizing") {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("backgrounImage_option", false);
    }
  });
});

//* Spin class on i element in gear-icon
document.querySelector(".gear-icon i").onclick = function () {
  this.classList.toggle("fa-spin");
  document.querySelector(".settings-box").classList.toggle("open");
};

//* Get landingPage Element
let landingPage = document.querySelector(".landing-page");

//* Create Array from images
let imgsArray = [
  "image-1.jfif",
  "image-2.jpg",
  "image-3.jpg",
  "image-4.png",
  "image-5.jpg",
  "image-6.jpg",
];

//* Variable to randomize imgs
function randomizeImgs() {
  //* set random timer to change the background
  backgroundInterval = setInterval(() => {
    let randomNumber = Math.floor(Math.random() * imgsArray.length);
    landingPage.style.backgroundImage =
      `url("imgs/` + imgsArray[randomNumber] + `")`;
    landingPage.style.backgroundSize = "cover";
  }, 1000);
}
randomizeImgs();

//* Select skills selector
let ourSkills = document.querySelector(".our-skills");

//* Using BOM and its methods
window.onscroll = function () {
  //* Skills offset top
  let skillsOffsetTop = ourSkills.offsetTop;
  //* Skills outer height
  let skillsOuterHeight = ourSkills.offsetHeight;
  //* Window height
  let windowHeight = this.innerHeight;
  // console.log(windowHeight);

  //* Window scroll top
  let windowScrollTop = this.scrollY;
  // console.log(windowScrollTop);

  if (windowScrollTop > skillsOffsetTop + skillsOuterHeight - windowHeight) {
    let allSkills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allSkills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
  //* fixed header when scrolling
  let header = document.querySelector("header");
  if (windowScrollTop > 100) {
    // console.log("good");
    header.classList.add("fixed");
  } else if (windowScrollTop < 100) {
    header.classList.remove("fixed");
  }
};
//* Create Overlay + Popub when click on image
let ourGallery = document.querySelectorAll(".our-gallery img");

//* creating X span
let closeButton = document.createElement("span"),
  closeButtonText = document.createTextNode("X");
closeButton.className = "close-button";

ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    //* Creating the overlay
    let overlay = document.createElement("div");
    overlay.className = "popup-overlay";
    //* appending overlay
    document.body.appendChild(overlay);
    //* Creating tho popup box
    let popupBox = document.createElement("div"),
      popupImage = document.createElement("img");
    //* Creating heading with appending the alt text of the image
    if (img.alt !== null) {
      let imgHeading = document.createElement("h3");
      popupBox.className = "popup-box";
      let headingText = document.createTextNode(img.alt);
      popupBox.appendChild(imgHeading);
      imgHeading.appendChild(headingText);
    }
    //=> popupImage.src = e.target.src;
    popupImage.src = img.src;
    popupBox.appendChild(popupImage);
    document.body.appendChild(popupBox);
    popupBox.appendChild(closeButton);
    closeButton.appendChild(closeButtonText);
    //* Close popup with close button and clicking on the overlay
    overlay.addEventListener("click", (e) => {
      overlay.remove();
      closeButton.remove();
      popupBox.remove();
    });
  });
});

//* Select all bullets + menu links
const allBullets = document.querySelectorAll(".nav-bullets .bullet");
const menuLinks = document.querySelectorAll(".menu a");

//* create nav function
function navFunction(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      document.querySelector(e.target.dataset.scroll).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
navFunction(allBullets);
navFunction(menuLinks);

//* find active class, delete it and put it on the selected element
function handelingActive(ev) {
  //* Remove active from any children and add to clicked one
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  ev.target.classList.add("active");
}

//* display or hide the bulelts
let bulletsSpan = document.querySelectorAll(".display-bullets span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletsLocalStorage = localStorage.getItem("bullets_option");

if (bulletsLocalStorage !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletsLocalStorage === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".display-bullets .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".display-bullets .no").classList.add("active");
  }
}

bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "display") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets_option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets_option", "none");
    }
    handelingActive(e);
  });
});

//* Reset Button
document.querySelector(".reset-options").onclick = function () {
  // localStorage.clear();
  localStorage.removeItem("color_option");
  localStorage.removeItem("backgrounImage_option");
  localStorage.removeItem("bullets_option");
  window.location.reload();
};

//* Toggle toggle-menu
let menuOpen = document.querySelector(".menu-container .menu");
let toggleMenu = document.querySelector(".menu-container .toggle-menu");

toggleMenu.onclick = function (e) {
  //* Stop propagation
  e.stopPropagation();
  this.classList.toggle("active");
  menuOpen.classList.toggle("open");
};

//* remove active and open class when click on any place but the menu
document.onclick = (e) => {
  if (e.target !== toggleMenu && e.target !== menuOpen) {
    //* Check if menu is opened
    if (menuOpen.classList.contains("open")) {
      toggleMenu.classList.toggle("active");
      menuOpen.classList.toggle("open");
    }
  }
};

//* Stop propagation for menuOpen
menuOpen.onclick = (e) => {
  e.stopPropagation();
};
