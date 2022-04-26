import "core-js/stable";
// Elements
const burger = document.querySelector(".burger__container");
const slideNav = document.querySelector(".slide__nav");
const exitIcon = document.querySelector(".exit-icon");
const singerimg = document.getElementById("singer-img");
// CountDown Elements
const countFin = document.getElementById("cntdwn-fin-text");
const timers = document.querySelectorAll("timer");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const mins = document.getElementById("mins");
const secs = document.getElementById("secs");
const countDownContainer = document.querySelector(".countdown");
// Slider Elements
const sliderContainer = document.querySelector(".slider");
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");
let curSlide = 0;
const maxSlide = slides.length;

// IMG Change (Maybe)

// SLIDER
if (sliderContainer) {
  // (Slide Functions)
  // current slide
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next Slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  // Previous Slide
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activeDot(curSlide);
  };

  // DOTS
  const createDots = function () {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  // Event delegation for dots
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activeDot(slide);
    }
  });

  // Applying and removing Active dot class
  const activeDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));
    //
    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  // Initalize function
  const init = function () {
    goToSlide(0);
    createDots();
    activeDot(0);
  };
  init();

  // (Events for slider)

  // Previous Slide button
  btnLeft.addEventListener("click", function () {
    prevSlide();
  });

  // Next slide button
  btnRight.addEventListener("click", function (e) {
    nextSlide();
  });

  // Keypress
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });
}

// Burger Animation
burger.addEventListener("click", function (e) {
  this.classList.add("ani");
  slideNav.style.width = "100%";
});

// Close Slider
exitIcon.addEventListener("click", function (e) {
  burger.classList.remove("ani");
  slideNav.style.width = "0%";
});

// CountDown Timer
if (countDownContainer) {
  function times() {
    const nowThen = new Date() - new Date(2022, 6, 29, 1);
    const days = Math.abs(Math.trunc(nowThen / (1000 * 60 * 60 * 24)));
    const hrs = Math.abs(
      Math.trunc((nowThen % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    );
    const mins = Math.abs(
      Math.trunc((nowThen % (1000 * 60 * 60)) / (1000 * 60))
    );
    const sec = Math.abs(Math.trunc((nowThen % (1000 * 60)) / 1000));
    countdownUI(days, hrs, mins, sec);
  }
  function countdownUI(d, h, m, s) {
    days.textContent = `${d}`;
    hours.textContent = `${h}`.padStart(2, 0);
    mins.textContent = `${m}`.padStart(2, 0);
    secs.textContent = `${s}`.padStart(2, 0);
  }
  const count = setInterval(function () {
    countdownUI();
    times();
  }, 1000);
  function finishedTimer() {
    if (new Date() === new Date(2022, 6, 29, 1)) {
      clearInterval(count);
      timers.forEach((e) => (e.style.display = "none"));
      countFin.style.display = "block";
    }
  }
  finishedTimer();
}

// LINE UP PAGE TABS
const lineUpSection = document.getElementById("lineups__section");
const lineupMain = document.querySelectorAll(".lineup__content");
const posterBtn = document.querySelectorAll(".poster--btn");

if (lineUpSection) {
  lineUpSection.addEventListener("click", function (e) {
    const clicked = e.target.closest(".poster--btn");
    if (!clicked) return;
    //
    lineupMain.forEach((c) => c.classList.remove("active__content"));
    posterBtn.forEach((b) => b.classList.remove("btn__active"));
    //
    document
      .querySelector(`.poster__content--${clicked.dataset.btn}`)
      .classList.add("active__content");
    clicked.classList.add("btn__active");
  });
}

// FAQS DROPDOWNS/ACCORDION
const faqsContainer = document.querySelector(".faqs__container");
const answers = document.querySelectorAll(".answer");
const dropIcon = document.querySelectorAll(".drop--btn");
const FaqBox = document.querySelectorAll(".faqs__box");

if (faqsContainer) {
  faqsContainer.addEventListener("click", function (e) {
    const clicked = e.target.closest(".faqs__box");
    if (!clicked) return;
    // dropIcon.forEach(i => ) will use for animation
    //
    const panel = clicked.nextElementSibling;
    if (panel.style.maxHeight) {
      panel.style.maxHeight = null;
    } else {
      document
        .querySelector(`.answer--${clicked.dataset.ans}`)
        .classList.toggle("active--answer");
    }
  });
}

// INFORMATIONS TAB
const infoBtnsCont = document.querySelector(".info__tabs");
const tabs = document.querySelectorAll(".tabs--btn");
const content = document.querySelectorAll(".info__pages");

if (infoBtnsCont) {
  infoBtnsCont.addEventListener("click", function (e) {
    const clicked = e.target.closest(".tabs--btn");
    if (!clicked) return;
    tabs.forEach((t) => t.classList.remove("active__info--btn"));
    content.forEach((c) => c.classList.remove("active__info--content"));
    //
    document
      .querySelector(`.info__content--${clicked.dataset.tab}`)
      .classList.add("active__info--content");
    clicked.classList.add("active__info--btn");
  });
}

// ACCOMODATION SLIDER (HOTEL SLIDER)
const hotelContent = document.querySelector(".hotel__content");
const accomoSlides = document.querySelectorAll(".accomo__slide");
const accomoDotsContainer = document.querySelector(".accomo__dots");
const accomoBtnLeft = document.querySelector(".accomo__btn--left");
const accomoBtnRight = document.querySelector(".accomo__btn--right");
const accomoSection = document.getElementById("accomodation__section");
let maxAccomo = accomoSlides.length;
let curAccomoSlide = 0;

if (hotelContent) {
  const goToS = function (slide) {
    accomoSlides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextS = function () {
    if (curAccomoSlide === maxAccomo - 1) {
      curAccomoSlide = 0;
    } else {
      curAccomoSlide++;
    }
    goToS(curAccomoSlide);
    AccomoDotActive(curAccomoSlide);
  };

  accomoBtnRight.addEventListener("click", function () {
    nextS();
  });

  const prevS = function () {
    if (curAccomoSlide === 0) {
      curAccomoSlide = maxAccomo - 1;
    } else {
      curAccomoSlide--;
    }
    goToS(curAccomoSlide);
    AccomoDotActive(curAccomoSlide);
  };

  accomoBtnLeft.addEventListener("click", function () {
    prevS();
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevS();
    e.key === "ArrowRight" && nextS();
  });

  const createAccomoDots = function () {
    accomoSlides.forEach((_, i) => {
      accomoDotsContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="accomo__dots--dot" data-accslide="${i}"></button>`
      );
    });
  };

  accomoDotsContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("accomo__dots--dot")) {
      const { accslide: slide } = e.target.dataset;
      goToS(slide);
      AccomoDotActive(slide);
    }
  });

  const AccomoDotActive = function (slide) {
    document
      .querySelectorAll(".accomo__dots--dot")
      .forEach((dot) => dot.classList.remove("accomo__dot--active"));
    //
    document
      .querySelector(`.accomo__dots--dot[data-accslide="${slide}"]`)
      .classList.add("accomo__dot--active");
  };

  const initAcc = function () {
    goToS(0);
    createAccomoDots(0);
    AccomoDotActive(0);
  };
  initAcc();
}

// ACCOMODATION SECTION (BNB SLIDER)!!!!

const bnbContent = document.querySelector(".bnb__content");
const bnbSlides = document.querySelectorAll(".bnb__slide");
const bnbDotsConatiner = document.querySelector(".bnb__dots");
const bnbBtnRight = document.querySelector(".bnb__btn--right");
const bnbBtnLeft = document.querySelector(".bnb__btn--left");
let maxBnb = bnbSlides.length;
let curBnbSide = 0;

if (bnbContent) {
  const goToBnb = function (slide) {
    bnbSlides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  const nextBnbSlide = function () {
    if (curBnbSide === maxBnb - 1) {
      curBnbSide = 0;
    } else {
      curBnbSide++;
    }
    goToBnb(curBnbSide);
    bnbDotsActive(curBnbSide);
  };
  const prevBnbSlide = function () {
    if (curBnbSide === 0) {
      curBnbSide = maxBnb - 1;
    } else {
      curBnbSide--;
    }
    goToBnb(curBnbSide);
    bnbDotsActive(curBnbSide);
  };

  bnbBtnLeft.addEventListener("click", function () {
    prevBnbSlide();
  });
  bnbBtnRight.addEventListener("click", function () {
    nextBnbSlide();
  });

  const CreateBnbDots = function () {
    bnbSlides.forEach((_, i) => {
      bnbDotsConatiner.insertAdjacentHTML(
        "beforeend",
        `<button class="bnb__dots--dot" data-bnbslide="${i}"></button>`
      );
    });
  };

  // DOT DELEGATION FUNCTION
  const dotDelegation = function (e) {
    if (e.target.classList.contains("bnb__dots--dot")) {
      const { bnbslide: slide } = e.target.dataset;
      goToBnb(slide);
      bnbDotsActive(slide);
    }
  };
  bnbDotsConatiner.addEventListener("click", dotDelegation);

  const bnbDotsActive = function (slide) {
    document
      .querySelectorAll(".bnb__dots--dot")
      .forEach((d) => d.classList.remove("bnb__dot--active"));
    //
    document
      .querySelector(`.bnb__dots--dot[data-bnbslide="${slide}"]`)
      .classList.add("bnb__dot--active");
  };

  const initBnb = function () {
    goToBnb(0);
    CreateBnbDots(0);
    bnbDotsActive(0);
  };
  initBnb();
}

// const lastD = document.querySelector(`.bnb__dots--dot[data-bnbslide="${5}"]`).style.display = "none";

// J.S Media queries

// (Might try combine the functions DRY)
// desktop to medium transition doesn't work (All others & transions work)
const lgeWidth = window.matchMedia("(min-width: 1000px)");
const medWidth = window.matchMedia("(min-width: 650px) and (max-width: 999px)");
const minWidth = window.matchMedia("(max-width: 649px)");

if (accomoSection) {
  function mediaQsMob(e) {
    if (e.matches) {
      maxBnb = bnbSlides.length;
      maxAccomo = accomoSlides.length;
      // Selecting/Deselecting Dots
      // HOTEL
      document.querySelector(
        `.accomo__dots--dot[data-accslide="${5}"]`
      ).style.display = "block";
      // BnB
      document.querySelector(
        `.bnb__dots--dot[data-bnbslide="${5}"]`
      ).style.display = "block";
    }
  }
  function mediaQsTab(e) {
    if (e.matches) {
      // maxBnb = bnbSlides.length;
      // maxAccomo = accomoSlides.length;
      maxBnb = bnbSlides.length - 1;
      maxAccomo = accomoSlides.length - 1;
      // Selecting/Deselecting Dots

      // HOTEL
      document.querySelector(
        `.accomo__dots--dot[data-accslide="${4}"]`
      ).style.display = "block";
      document.querySelector(
        `.accomo__dots--dot[data-accslide="${5}"]`
      ).style.display = "none";

      // BnB
      document.querySelector(
        `.bnb__dots--dot[data-bnbslide="${4}"]`
      ).style.display = "block";
      document.querySelector(
        `.bnb__dots--dot[data-bnbslide="${5}"]`
      ).style.display = "none";
    }
  }
  // retains these values when going though sizes (from desktop to medium) needs to go back to default value. middle function isn't firing when from desktop to middle transition
  function mediaQsDesk(e) {
    if (e.matches) {
      maxBnb = bnbSlides.length - 2;
      maxAccomo = accomoSlides.length - 2;
      // Selecting/Deselecting Dots
      // HOTEL
      document.querySelector(
        `.accomo__dots--dot[data-accslide="${4}"]`
      ).style.display = "none";
      document.querySelector(
        `.accomo__dots--dot[data-accslide="${5}"]`
      ).style.display = "none";
      // BnB
      document.querySelector(
        `.bnb__dots--dot[data-bnbslide="${4}"]`
      ).style.display = "none";
      document.querySelector(
        `.bnb__dots--dot[data-bnbslide="${5}"]`
      ).style.display = "none";
    }
  }

  minWidth.addEventListener("change", mediaQsMob);
  mediaQsMob(minWidth);

  medWidth.addEventListener("change", mediaQsTab);
  mediaQsTab(medWidth);

  lgeWidth.addEventListener("change", mediaQsDesk);
  mediaQsDesk(lgeWidth);
}
