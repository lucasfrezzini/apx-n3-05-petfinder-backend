import { isAuthenticated, dispatchAuthChange } from "../utils/auth";
import { navigateTo } from "../../main";
import { state } from "../../state";

// Definir el componente del Header
class AppHeader extends HTMLElement {
  render() {
    const isAuth = isAuthenticated();
    this.innerHTML = `
      <style>
        header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem;
          background-color: #333;
          color: white;
        }
        header a {
          color: white;
          text-decoration: none;
          margin: 15px
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
          font-size: 14px;
        }

        .menu-icon span {
          cursor: pointer;
          display: inline-block;
          font-size: 26px;
          margin-left: 10px
        }
        .menu.open {
          display: block;
        }
      </style>
      <header>
        <div class="logo">Petsitos</div>
        <div>
          <a href="/" data-link>Home</a>
          <a href="/mascotas-perdidas" data-link>Mascotas Perdidas</a>
        </div>
        <div class="menu-icon" id="menuIcon"><span>☰</span></div>
        <div class="menu" id="menu">
          ${isAuth ? this.getAuthLinks() : this.getNonAuthLinks()}
        </div>
      </header>
    `;
  }

  getAuthLinks() {
    return `
      <a href="/mascotas-perdidas" data-link>Mascotas Perdidas</a>
      <a href="/reportar-mascota" data-link>Reportar Mascota</a>
      <a href="/mis-datos" data-link>Mis datos</a>
      <a href="/cerrar-sesion" data-link>Cerrar Sesión</a>
    `;
  }

  getNonAuthLinks() {
    return `
      <a href="/iniciar-sesion" data-link>Iniciar Sesión</a>
      <a href="/registrarse" data-link>Registrarse</a>
    `;
  }

  setupEventListeners() {
    const menuIcon = this.querySelector("#menuIcon span")!;
    const menu = this.querySelector("#menu")!;

    menuIcon.addEventListener("click", () => {
      menu.classList.toggle("open");
    });

    // Cerrar el menú al hacer clic en un enlace
    const links = this.querySelectorAll(".menu a");
    links.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMenu();
      });
    });

    // Cerrar sesión
    const logoutLink = this.querySelector('a[href="/cerrar-sesion"]');

    if (logoutLink) {
      logoutLink.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        localStorage.removeItem("state");
        dispatchAuthChange();

        navigateTo("/");
        this.closeMenu();
      });
    }
  }

  closeMenu() {
    const menu = this.querySelector("#menu")!;
    menu.classList.remove("open");
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    // Escuchar cambios en el estado de autenticación
    window.addEventListener("auth-change", () => {
      this.render();
      this.setupEventListeners();
    });
  }
}

customElements.define("app-header", AppHeader);
