let fontSize = 16; // Ukuran font default dalam piksel

function addTask() {
  const input = document.getElementById("newTask");
  const taskText = input.value.trim();
  if (taskText === "") return;

  const li = document.createElement("li");

  const span = document.createElement("span");
  span.className = "task-text";
  span.textContent = taskText;
  span.addEventListener("click", () => editTask(span));

  const closeBtn = document.createElement("span");
  closeBtn.className = "close";
  closeBtn.innerHTML = "&times;";
  closeBtn.onclick = () => deleteTask(li);

  li.appendChild(span);
  li.appendChild(closeBtn);
  document.getElementById("taskList").appendChild(li);

  input.value = "";
  applyFontSize();
}

function deleteTask(element) {
  element.remove();
}

function editTask(span) {
  const currentText = span.textContent;
  const input = document.createElement("input");
  input.type = "text";
  input.className = "edit-input";
  input.value = currentText;

  input.onblur = () => {
    span.textContent = input.value.trim() || currentText;
    span.style.display = "block";
    input.remove();
  };

  input.onkeydown = (e) => {
    if (e.key === "Enter") {
      input.blur();
    }
  };

  span.style.display = "none";
  span.parentNode.insertBefore(input, span);
  input.focus();
}

// --- Fitur Pengaturan (Settings) ---
document.addEventListener("DOMContentLoaded", () => {
  // Ganti warna latar
  document
    .getElementById("bg-color-select")
    ?.addEventListener("change", function () {
      document.body.style.backgroundColor = this.value || "white";
    });

  // Ganti font
  document
    .getElementById("font-style-select")
    ?.addEventListener("change", function () {
      document.body.style.fontFamily = this.value || "sans-serif";
    });

  // Perbesar font
  document
    .getElementById("font-size-increase")
    ?.addEventListener("click", () => {
      fontSize += 2;
      applyFontSize();
    });

  // Perkecil font
  document
    .getElementById("font-size-decrease")
    ?.addEventListener("click", () => {
      if (fontSize > 10) {
        fontSize -= 2;
        applyFontSize();
      }
    });

  // Tambahkan di akhir file dom.js (atau setelah fungsi addTask)
  document.addEventListener("DOMContentLoaded", function () {
    const toggleBtn = document.getElementById("dark-mode-toggle");
    if (toggleBtn) {
      toggleBtn.addEventListener("click", function () {
        document.body.classList.toggle("dark-mode");
        console.log("Dark mode toggled. Body class:", document.body.className);
      });
    }
  });
});

function applyFontSize() {
  document.body.style.fontSize = fontSize + "px";
}
