// Definir el componente de Mascotas Reportadas (sin elementos)
class AppReportedPetsEmpty extends HTMLElement {
  render() {
    this.innerHTML = `
      <style>
        .reported-pets-empty {
          padding: 2rem;
          text-align: center;
        }
        .reported-pets-empty h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .reported-pets-empty h2 {
          font-size: 1.25rem;
          color: #666;
          margin-bottom: 2rem;
        }
        .reported-pets-empty img {
          width: 100%;
          max-width: 300px;
          height: auto;
          margin-bottom: 2rem;
        }
        .reported-pets-empty button {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .reported-pets-empty button:hover {
          background-color: #0056b3;
        }
      </style>
      <div class="reported-pets-empty">
        <h1>Mascotas Reportadas</h1>
        <h2>No hay mascotas reportadas por el momento</h2>
        <img src="public/empty.png" alt="No hay mascotas reportadas"><br>
        <button id="publishButton">Publicar Reporte</button>
      </div>
    `;

    const publishButton = this.querySelector("#publishButton");
    publishButton!.addEventListener("click", () => {
      alert("Redirigiendo a Publicar Reporte (simulado)");
      // Aquí puedes agregar la lógica para redirigir a la pantalla de Publicar Reporte
    });
  }

  connectedCallback() {
    this.render();
  }
}

// Registrar el componente
customElements.define("app-reported-pets-empty", AppReportedPetsEmpty);
