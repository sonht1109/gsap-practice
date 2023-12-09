gsap.registerPlugin(ScrollTrigger);

const FRAME_COUNT = 65;
let currentFrame = 0;
const obj = {
  frame: 0,
};

const canvas = document.getElementById("hero-lightpass");
const image = document.getElementById("ex");

const h1 = document.querySelector(".hero-lookup h1");

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
  canvas.width = window.innerWidth;
  canvas.height = canvas.width / ratio;
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
  ctx.drawImage(img, 0, 0, canvas.clientWidth, canvas.clientHeight);
};

images[0].onload = render;

window.onresize = () => {
  render();
};

gsap.to(obj, {
  frame: FRAME_COUNT,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    scrub: 1,
  },
  onUpdate: render,
});
