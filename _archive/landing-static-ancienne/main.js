(function () {
  document.getElementById("year").textContent = String(new Date().getFullYear());

  document.querySelectorAll(".faq-item").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var expanded = btn.getAttribute("aria-expanded") === "true";
      var panel = btn.nextElementSibling;
      if (!panel || !panel.classList.contains("faq-panel")) return;

      document.querySelectorAll(".faq-item").forEach(function (other) {
        if (other !== btn) {
          other.setAttribute("aria-expanded", "false");
          var p = other.nextElementSibling;
          if (p && p.classList.contains("faq-panel")) p.hidden = true;
        }
      });

      btn.setAttribute("aria-expanded", expanded ? "false" : "true");
      panel.hidden = expanded;
    });
  });

  var loadBtn = document.getElementById("loadMoreT");
  if (loadBtn) {
    loadBtn.addEventListener("click", function () {
      document.querySelectorAll(".hidden-testimonial").forEach(function (el) {
        el.classList.add("is-visible");
      });
      loadBtn.style.display = "none";
    });
  }
})();
