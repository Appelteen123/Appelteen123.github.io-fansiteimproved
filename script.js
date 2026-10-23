const cube = document.querySelector("#cube");
const fx = document.querySelector("#fx");

if (cube) {
  cube.addEventListener("click", function() {
    cube.style.backgroundColor = "yellow";
    cube.style.transform = "rotate(45deg)";
  });
}

if (fx) {
  fx.addEventListener("mouseover", function() {
    fx.innerHTML = "Click to watch the AHS webpage on FX!";
  });

  fx.addEventListener("mouseout", function() {
    fx.innerHTML = "Watch on FX";
  });
}

const initCarousel = (carouselSelector, trackSelector) => {
  const carousel = document.querySelector(carouselSelector);
  if (!carousel) return;

  const cards = [...carousel.querySelectorAll(`${trackSelector} > div`)].filter((card) => card.className);
  const previousButton = carousel.querySelector(".cast-arrow--previous");
  const nextButton = carousel.querySelector(".cast-arrow--next");
  let activeIndex = 0;

  const showCard = (index) => {
    activeIndex = (index + cards.length) % cards.length;
    cards.forEach((card, cardIndex) => {
      card.classList.toggle("cast-card--active", cardIndex === activeIndex);
    });
  };

  previousButton.addEventListener("click", () => showCard(activeIndex - 1));
  nextButton.addEventListener("click", () => showCard(activeIndex + 1));
  showCard(activeIndex);
};

initCarousel(".season-carousel", ".season-track");
initCarousel(".cast-carousel", ".cast-track");

const introModal = document.querySelector("#intro-modal");
const introVideo = introModal?.querySelector(".intro-modal__video");
const introChoices = introModal?.querySelector("[data-intro-choices]");

const openIntro = (videoPath) => {
  if (!introModal || !introVideo) return;
  introVideo.src = videoPath;
  introVideo.hidden = false;
  if (introChoices) introChoices.hidden = true;
  introModal.hidden = false;
};

document.querySelectorAll(".intro-button").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.hasAttribute("data-season-ten")) {
      if (introChoices) introChoices.hidden = false;
      if (introVideo) {
        introVideo.pause();
        introVideo.removeAttribute("src");
        introVideo.load();
        introVideo.hidden = true;
      }
      if (introModal) introModal.hidden = false;
      return;
    }
    openIntro(button.dataset.video);
  });
});

introModal?.querySelectorAll("[data-video]").forEach((button) => {
  button.addEventListener("click", () => openIntro(button.dataset.video));
});

introModal?.querySelectorAll("[data-close-intro]").forEach((button) => {
  button.addEventListener("click", () => {
    introVideo?.pause();
    if (introVideo) introVideo.removeAttribute("src");
    introModal.hidden = true;
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && introModal && !introModal.hidden) {
    introVideo?.pause();
    if (introVideo) introVideo.removeAttribute("src");
    introModal.hidden = true;
  }
});