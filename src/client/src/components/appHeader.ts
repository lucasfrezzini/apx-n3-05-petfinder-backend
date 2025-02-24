import { isAuthenticated } from "../utils/auth";
import { navigateTo } from "../../main";

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
        <div class="logo">Petsitos</div>
        <div class="menu-icon" id="menuIcon">☰</div>
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
      <a href="/cerrar-sesion" data-link>Cerrar Sesión</a>
    `;
  }

  getNonAuthLinks() {
    return `
      <a href="/" data-link>Inicio</a>
      <a href="/iniciar-sesion" data-link>Iniciar Sesión</a>
      <a href="/registrarse" data-link>Registrarse</a>
    `;
  }

  setupEventListeners() {
    const menuIcon = this.querySelector("#menuIcon")!;
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
        this.dispatchAuthChange(); // Notificar el cambio de autenticación
        navigateTo("/");
        this.closeMenu();
      });
    }
  }

  closeMenu() {
    const menu = this.querySelector("#menu")!;
    menu.classList.remove("open");
  }

  dispatchAuthChange() {
    // Disparar un evento personalizado para notificar el cambio de autenticación
    const event = new CustomEvent("auth-change");
    window.dispatchEvent(event);
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
