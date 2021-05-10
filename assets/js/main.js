// ==========================  SHOW MENU =============================//

const ShowMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId);

  // Validate that variable exist
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      // We add the show-menu class to the div with nav__menu class
      nav.classList.toggle("show-menu");
    });
  }
};

ShowMenu("nav-toggle", "nav-menu");

// ==========================  REMOVE MENU MOBILE =============================//

const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");

  //When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}

navLink.forEach((n) => n.addEventListener("click", linkAction));

// ==========================  SCROLL SECTIONS ACTIVE LINK =============================//

const sections = document.querySelectorAll("section[id]");

function scrollActive() {
  const scrollY = window.pageYOffset;

  sections.forEach((current) => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop - 50;
    sectionId = current.getAttribute("id");

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      document
        .querySelector(".nav__manu a[href*=" + sectionId + "]")
        .classList.add("active-link");
    } else {
      document
        .querySelector(".nav__manu a[href*=" + sectionId + "]")
        .classList.remove("active-link");
    }
  });
}

// ==================== SHOW SCROLL TOP =========================//

function scrollTop() {
  const scrollTop = document.getElementById("scroll-top");
  //When th scroll is higher than 560 viewporrt heigh, add the show-scroll class to the tag with scroll
  if (this.scrollY >= 200) scrollTop.classList.add("show-scroll");
  else scrollTop.classList.remove("show-scroll");
}

window.addEventListener("scroll", scrollTop);

// ========================== DARK LIGHT THEME ================================//

const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "bx-sun";

// buttons class active for different theme and download different CV
const downloadDarkResumeButton = document.getElementById(
  "home__button-movil-dark"
);
const downloadLightResumeButton = document.getElementById(
  "home__button-movil-light"
);
const homeButtonMovilActive = "home__button-movil-active";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("seleceted-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "bx-moon" : "bx-sun";

// We validate if the user previously chose a topic
if (selectedTheme) {
  //If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark theme
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "bx-moon" ? "add" : "remove"](
    iconTheme
  );
}
//Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  //Add or remove the dark/icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);

  // ================================ DOWNLOAD = PDF ON MOBILE ==================================//
  downloadDarkResumeButton.classList.toggle(homeButtonMovilActive);
  downloadLightResumeButton.classList.toggle(homeButtonMovilActive);

  //We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

// ======================= DEFAULT THEME DARK ==================================
function defaultTheme() {
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
}
// window.onload = defaultTheme();

// ================== REDUCE THE SIZE AND PRINT ON AN A4 SHEET ==================//
function scaleCv() {
  document.body.classList.add("scale-cv");
}
// ================== REMOVE THE SIZE WHEN THE CV IS DOWNLOADED ==================//
function removeScale() {
  document.body.classList.remove("scale-cv");
}

// ================================ GENERATE PDF ==================================//
// PDF generated area
let areaCv = document.getElementById("area-cv");

let resumeButton = document.getElementById("resume-button");

// Html2pdf option
let opt = {
  margin: 0,
  filename: "Tomasz Stanisz - Resume.pdf",
  image: { type: "jpeg", quality: 0.98 },
  html2canvas: { scale: 4 },
  jsPDF: { format: "a4", orientation: "portrait" },
};

// Function t call areaCv and Html2Pdf options
function generateResume() {
  console.log("generateResume functions");
  html2pdf(areaCv, opt);
}

// When the button is clicked, it exectutes the three functions
resumeButton.addEventListener("click", () => {
  // 1. THe class .scale-cv is added to the body, where it reduces the size
  scaleCv();

  // 2. The PDF is generated
  generateResume();

  // 3. The .scale-cv class is removed from the body after 5 seconds to return to normal view

  setTimeout(removeScale, 1000);
});
