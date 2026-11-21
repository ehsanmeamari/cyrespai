(function initConceptualFlow() {
  const steps = Array.from(document.querySelectorAll("#flow-steps .flow-step"));
  if (!steps.length) return;
  let current = 0;

  setInterval(() => {
    steps.forEach((el, idx) => {
      el.classList.toggle("active-step", idx === current);
    });
    current = (current + 1) % steps.length;
  }, 2200);
})();
