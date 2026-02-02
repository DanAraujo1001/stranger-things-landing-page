gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText);

// Scroll suave

const smoother = ScrollSmoother.create({
  smooth: 1.5,
  effects: true,
});

smoother.paused(true);

function animacoesPagina() {
  // Animações Seção Hero

  gsap.from(".hero", {
    opacity: 0,
    duration: 1,
  });

  gsap.from("picture:nth-child(2)", {
    y: 60,
    duration: 1,
  });

  gsap.from("picture:nth-child(1)", {
    y: -60,
    duration: 1,
  });

  // Animações Seção Cidades

  gsap.from(".cidade", {
    opacity: 0,
    filter: "blur(10px)",
    stagger: 0.3,
    scrollTrigger: {
      trigger: ".cidades",
      start: "0% 90%",
      end: "90% 80%",
      scrub: 1,
    },
  });

  // Animações Seção Agradecimento

  const mm = gsap.matchMedia();

  mm.add("(min-width: 1000px)", () => {
    gsap.from(".secaoAgradecimento ul li", {
      opacity: 0,
      y: 20,
      stagger: 0.3,
      filter: "blur(10px)",
      scrollTrigger: {
        trigger: ".secaoAgradecimento ul",
        start: "0% 80%",
        end: "100% 20%",
        scrub: 2,
      },
    });
  });

  // Animação Footer

  gsap.from("footer", {
    y: -200,
  });

  // Animação de Texto

  const grupoTextoSplit = document.querySelectorAll(".textoSplit");

  grupoTextoSplit.forEach((texto, index) => {
    const split = SplitText.create(texto, {
      type: "lines, words, chars",
      mask: "lines",
    });

    const configAnimacaoSplit = {
      opacity: 0,
      y: 40,
      stagger: 0.03,
      duration: 0.3,
    };

    gsap.from(split.chars, {});

    if (index === 0) {
      gsap.from(split.chars, configAnimacaoSplit);
    } else {
      gsap.from(split.chars, {
        ...configAnimacaoSplit,
        scrollTrigger: {
          trigger: texto,
          start: "0% 95%",
          end: "100% 85%",
          scrub: true,
        },
      });
    }
  });
}

// Animação do Preloader

const tl = gsap.timeline({
  onComplete() {
    smoother.paused(false);

    animacoesPagina();

    gsap.to("#preloader", {
      opacity: 0,
      display: "none",
    });
  },
});

tl.to("#preloader svg path", {
  duration: 1.5,
  strokeDashoffset: 0,
});
tl.to("#preloader svg path", {
  fill: "rgb(220, 12, 9)",
  duration: 0.5,
  strokeDashoffset: 0,
});
