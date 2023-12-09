import gsap, { Power0 } from "gsap";

const COUNT = 20;

const container = document.querySelector("#container");

const init = () => {
  for (let i = 0; i < COUNT; i++) {
    setTimeout(() => {
      draw(i);
    }, 50 * i);
  }
};

const draw = (i) => {
  const span = document.createElement("span");
  span.classList.add("light");

  container.append(span);

  gsap.set(span, {
    top: gsap.utils.random(0, container.getBoundingClientRect().height),
    left: gsap.utils.random(0, container.getBoundingClientRect().width),
    scale: gsap.utils.random(0.8, 1.2, 0.1),
    opacity: 0,
  });

  const tl = gsap.timeline({
    pause: true,
    onComplete: () => {
      span.remove();
      draw(i);
    },
  });

  tl.to(span, {
    opacity: gsap.utils.random(0.1, 0.2),
    duration: 0.3,
  });
  tl.to(
    span,
    {
      x: gsap.utils.random(-100, 100),
      y: gsap.utils.random(-100, 100),
      duration: gsap.utils.random(5, 7, 0.2),
      ease: Power0.easeNone,
    },
    -0.3
  );
  tl.to(
    span,
    {
      opacity: 0,
      duration: 0.3,
    },
    ">-0.3"
  );

  tl.play();
};

init();
