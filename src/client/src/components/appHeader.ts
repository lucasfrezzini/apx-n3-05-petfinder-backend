// Definir el componente del Header
class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: #333;
          color: white;
        }
        .menu {
          display: none;
          position: absolute;
          top: 60px;
          right: 1rem;
          background-color: #444;
          padding: 1rem;
          border-radius: 5px;
        }
        .menu a {
          display: block;
          color: white;
          text-decoration: none;
          margin: 0.5rem 0;
        }
        .menu-icon {
          cursor: pointer;
        }
        .menu.open {
          display: block;
        }
      </style>
      <header>
        <div class="logo">Logo</div>
        <div class="menu-icon" id="menuIcon">☰</div>
        <div class="menu" id="menu">
          <a href="#">Link 1</a>
          <a href="#">Link 2</a>
          <a href="#">Link 3</a>
        </div>
      </header>
    `;
  }

  connectedCallback() {
    const menuIcon = this.shadowRoot!.getElementById("menuIcon");
    const menu = this.shadowRoot!.getElementById("menu");

    menuIcon!.addEventListener("click", () => {
      menu!.classList.toggle("open");
    });
  }
}

customElements.define("app-header", AppHeader);
