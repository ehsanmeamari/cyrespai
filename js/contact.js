(function initPartnershipForm() {
  const form = document.getElementById("partnership-form");
  const statusEl = document.getElementById("form-status");
  if (!form || !statusEl) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const org = document.getElementById("org-name").value.trim();
    const track = document.getElementById("partner-type").value;
    statusEl.textContent = `Thank you${org ? ", " + org : ""}. Your "${track}" inquiry draft is ready—connect this form to your preferred email/endpoint to receive submissions.`;
    form.reset();
  });
})();
