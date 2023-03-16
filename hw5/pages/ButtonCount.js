class ButtonCount extends HTMLElement {
  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: "open" });
    const buttonElement = document.createElement("button");
    shadowRoot.appendChild(buttonElement);

    // Now, create the button
    let clickCount = 0;
    buttonElement.textContent = "Times Clicked: " + clickCount;
    buttonElement.addEventListener("click", () => {
      clickCount++;
      buttonElement.textContent = "Times Clicked: " + clickCount;
    });
  }
}

customElements.define("button-count", ButtonCount);
