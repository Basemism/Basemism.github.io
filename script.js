gsap.registerPlugin(ScrollTrigger);

const lenis = new Lenis({
  lerp: 0.07
});

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

const sections = document.querySelectorAll('.section .inner');
sections?.forEach(section => {
  gsap.to(section, {
    yPercent: 100,
    ease: 'none',
    scrollTrigger: {
      trigger: section,
      start: 'bottom bottom',
      end: 'bottom top',
      scrub: true
    }
  })
})