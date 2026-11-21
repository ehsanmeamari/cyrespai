(function loadTeamSection() {
  const container = document.getElementById("team-container");
  if (!container) return;

  fetch("team.html")
    .then((res) => {
      if (!res.ok) throw new Error("Failed to load team.html");
      return res.text();
    })
    .then((html) => {
      container.innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
    });
})();
