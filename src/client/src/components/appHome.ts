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
        <img src="https://via.placeholder.com/400" alt="Imagen de inicio">
        <h1>Título Principal</h1>
        <h2>Subtítulo descriptivo</h2>
        <div class="buttons">
          <button class="primary">Botón 1</button>
          <button class="secondary">Botón 2</button>
        </div>
      </div>
    `;
  }
}

// Registrar los componentes
customElements.define("app-home", AppHome);
