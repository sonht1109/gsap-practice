import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
}

gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 65;
const obj = {
  frame: 0,
};

const canvas = document.getElementById("hero-lightpass");
const scrollContainer = document.querySelector(".sticky-container");
const heroLookup = document.querySelector(".hero-lookup");
const heroContents = document.querySelectorAll(".hero-content");

/**
 * @type CanvasRenderingContext2D
 */
const ctx = canvas.getContext("2d");

const imageUrl = (index) => `./images/${index.toString().padStart(4, "0")}.png`;

const images = Array.from({ length: FRAME_COUNT }).map((_, i) => {
  const img = new Image();
  img.src = imageUrl(i);
  return img;
});

const render = () => {
  const img = images[obj.frame];
  const ratio = img.naturalWidth / img.naturalHeight;
  canvas.width = Math.max(window.innerWidth, 734);
  canvas.height = canvas.width / ratio;
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
};

images[0].onload = () => {
  render();
  gsap
    .timeline()
    .fromTo(
      canvas,
      { opacity: 0, scale: 0.7 },
      { opacity: 1, duration: 0.2, delay: 0.4 }
    )
    .to(
      canvas,
      { opacity: 1, scale: 1, duration: 1, ease: "power1.out" },
      "+=0.2"
    )
    .fromTo(
      heroLookup,
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1 },
      "-=100%"
    );
};

window.onresize = () => {
  render();
};

gsap.to(obj, {
  frame: FRAME_COUNT - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: true,
  },
  onUpdate: render,
});

const tlCanvas = gsap.timeline({
  scrollTrigger: {
    scrub: true,
    trigger: scrollContainer,
  },
});

tlCanvas.to(canvas, {
  scale: 1.2,
  duration: 1,
});

const tlHeroContent = gsap
  .timeline({
    scrollTrigger: {
      scrub: true,
      trigger: scrollContainer,
    },
  })
  .to(
    heroLookup,
    {
      scale: 1.1,
      duration: 1,
    },
    0
  )
  .to(
    heroLookup,
    {
      scale: 1.2,
      opacity: 0,
      duration: 0.4,
    },
    ">"
  );

heroContents.forEach((target, i) => {
  tlHeroContent.fromTo(
    target,
    { opacity: 0, scale: 1 },
    { opacity: 1, duration: 0.4, scale: 1.2 },
    "+=1"
  );
});
