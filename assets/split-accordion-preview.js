(function () {
  var roots = document.querySelectorAll("[data-split-preview]");
  if (!roots.length) return;

  roots.forEach(function (root) {
    if (root.dataset.splitPreviewBound === "true") return;
    root.dataset.splitPreviewBound = "true";

    var triggers = root.querySelectorAll("[data-split-trigger]");
    var panels = root.querySelectorAll("[data-split-panel]");
    var icons = root.querySelectorAll("[data-split-icon]");
    if (!triggers.length || !panels.length) return;

    var setOpen = function (index) {
      panels.forEach(function (panel, panelIndex) {
        var isOpen = panelIndex === index;
        panel.classList.toggle("is-open", isOpen);
      });

      icons.forEach(function (icon, iconIndex) {
        icon.textContent = iconIndex === index ? "−" : "+";
      });
    };

    triggers.forEach(function (trigger, index) {
      trigger.addEventListener("click", function () {
        var panel = panels[index];
        var isOpen = panel.classList.contains("is-open");
        setOpen(isOpen ? -1 : index);
      });
    });

    setOpen(0);
  });
})();
