// Definir el componente de la pantalla Home
class AppHome extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        .home {
          text-align: center;
          padding: 2rem;
        }
        .home img {
          width: 100%;
          max-width: 400px;
          height: auto;
        }
        .home h1 {
          font-size: 2rem;
          margin: 1rem 0;
        }
        .home h2 {
          font-size: 1.5rem;
          color: #666;
        }
        .home .buttons {
          margin-top: 2rem;
          display: flex;
          justify-content: center;
          // en direccion de columna
          flex-direction: column;
        }
        .home button {
          padding: 0.75rem 1.5rem;
          margin: 0.5rem;
          font-size: 1rem;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .home button.primary {
          background-color: #007bff;
          color: white;
        }
        .home button.secondary {
          background-color: #6c757d;
          color: white;
        }
      </style>
      <div class="home">
        <h1>Bienvenido a Petfinder</h1>
        <h2>Descripcion de la App</h2>
        <div class="buttons">
          <button class="primary">Dar mi ubicacion actual</button>
          <button class="secondary">Como funciona Pet Finder?</button>
        </div>
      </div>
    `;
  }
}

// Registrar los componentes
customElements.define("app-home", AppHome);
