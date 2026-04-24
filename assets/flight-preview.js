(function () {
  var root = document.querySelector("[data-flight-preview]");
  if (!root) return;

  var menuButton = root.querySelector("[data-preview-menu]");
  var drawer = root.querySelector("[data-preview-drawer]");
  if (!menuButton || !drawer) return;

  menuButton.addEventListener("click", function () {
    drawer.classList.toggle("is-open");
    menuButton.textContent = drawer.classList.contains("is-open") ? "Close" : "Menu";
  });
})();
