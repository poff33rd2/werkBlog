(function () {
  var switchRoot = document.querySelector("[data-framework-switch]");
  if (!switchRoot) return;

  var buttons = switchRoot.querySelectorAll("[data-framework-choice]");
  var panels = document.querySelectorAll("[data-framework-panel]");
  if (!buttons.length || !panels.length) return;

  var setChoice = function (choice) {
    buttons.forEach(function (button) {
      var active = button.getAttribute("data-framework-choice") === choice;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", active ? "true" : "false");
    });

    panels.forEach(function (panel) {
      var isMatch = panel.getAttribute("data-framework-panel") === choice;
      panel.hidden = !isMatch;
    });

    var activePanel = document.querySelector('[data-framework-panel="' + choice + '"]');
    var actions = activePanel ? activePanel.querySelector(".code-card__actions") : null;
    if (actions) {
      switchRoot.classList.add("framework-switch--in-card");
      switchRoot.hidden = false;
      actions.appendChild(switchRoot);
    }

    // Re-run code-card overflow logic after panel visibility changes.
    window.requestAnimationFrame(function () {
      window.dispatchEvent(new Event("resize"));
    });
  };

  buttons.forEach(function (button) {
    button.addEventListener("click", function () {
      setChoice(button.getAttribute("data-framework-choice"));
    });
  });

  var activeButton = switchRoot.querySelector(".framework-switch__btn.is-active");
  var initialChoice = activeButton
    ? activeButton.getAttribute("data-framework-choice")
    : buttons[0].getAttribute("data-framework-choice");
  setChoice(initialChoice);
})();
