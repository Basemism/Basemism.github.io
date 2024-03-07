gsap.registerPlugin(ScrollTrigger);
let revealAnimations = [];

// Scroll
const lenis = new Lenis({
  lerp: 0.07
});

lenis.on('scroll', ScrollTrigger.update)
gsap.ticker.add((time)=>{
  lenis.raf(time * 1000)
})

// Reveal
document.querySelectorAll('.reveal').forEach(text => {
  // Split text
  let splitText = new SplitType(text, {
    type: 'words'
  })

    // Animation
  const section = text.closest('section');
  gsap.from(splitText.words, {
    opacity: 0,
    ease: 'none',
    stagger: 1,
    duration: 2, // Adjust this value to make the animation faster
    scrollTrigger: {
      trigger: section,
      start: 'top top', 
      end: () => `+=${window.innerHeight * 3}px`,
      scrub: true,
      // markers: true,
      pin: true,
    }
  })

})


// Reveal animation
const setTextRevealAnimations = () => {
  document.querySelectorAll('.text-reveal').forEach(text => {
    // Split text
    let splitText = new SplitType(text);

    splitText.lines.forEach(line => {
      const lineWrapper = document.createElement('div');
      lineWrapper.classList.add('line-wrapper');
      text.insertAdjacentElement('beforeEnd', lineWrapper);
      lineWrapper.appendChild(line);
    })

    // Animation
    const section = text.closest('section');
    gsap.to(splitText.lines, {
      y: 0,
      ease: "power1.inOut",
      stagger: .15,
      scrollTrigger: {
        trigger: text,
        start: 'top bottom', 
        // markers: true,
        toggleActions: 'play reset play reset'
      }
    })
  });
}

setTextRevealAnimations();

// Handle resize
const resizeObserver = new ResizeObserver(
  debounce(([entry]) => {
    setTextRevealAnimations();
  }, 500)
)
resizeObserver.observe(document.body)