(function initZkDemo() {
  const boardEl = document.getElementById("zk-board");
  const statusEl = document.getElementById("zk-status");
  const logEl = document.getElementById("zk-proof-log");
  const resetBtn = document.getElementById("reset-demo-btn");

  if (!boardEl || !statusEl || !logEl || !resetBtn) return;

  let secretIndex = Math.floor(Math.random() * 64);
  let lastSelected = null;

  function pseudoHash(input) {
    let h = 2166136261;
    for (let i = 0; i < input.length; i++) {
      h ^= input.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    return "0x" + (h >>> 0).toString(16).padStart(8, "0") + "9f4a2c10";
  }

  function renderBoard() {
    boardEl.innerHTML = "";
    for (let i = 0; i < 64; i++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "zk-cell";
      btn.textContent = i + 1;
      btn.setAttribute("aria-label", `Grid cell ${i + 1}`);

      if (lastSelected === i) {
        btn.classList.add(i === secretIndex ? "verified" : "selected");
      }

      btn.addEventListener("click", () => {
        lastSelected = i;
        const found = i === secretIndex;
        const proofToken = pseudoHash(`zkp:${i}:${found}:${secretIndex}`);

        renderBoard();

        if (found) {
          statusEl.innerHTML = `<strong style="color:#34d399;">Proof Validated:</strong> Target condition satisfied at query #${i + 1} without exposing the secret map layout.`;
        } else {
          statusEl.innerHTML = `<strong style="color:#60a5fa;">Proof Validated:</strong> Query #${i + 1} is not the hidden target; zero-knowledge commitment remains intact.`;
        }

        logEl.textContent =
          `query_cell: #${i + 1}\n` +
          `target_matched: ${found}\n` +
          `zk_proof_digest: ${proofToken}\n` +
          `secret_map_disclosed: false`;
      });

      boardEl.appendChild(btn);
    }
  }

  resetBtn.addEventListener("click", () => {
    secretIndex = Math.floor(Math.random() * 64);
    lastSelected = null;
    statusEl.textContent = "A new hidden target has been placed. Select a cell to verify with zero knowledge.";
    logEl.textContent = "proof_status: reset_new_commitment\nsecret_coordinates_exposed: false";
    renderBoard();
  });

  renderBoard();
})();
