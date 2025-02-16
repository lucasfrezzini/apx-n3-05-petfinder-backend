// Definir el componente de Reportar Mascota Vista
class AppFindPet extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
      <style>
        .report-pet {
          padding: 2rem;
          max-width: 400px;
          margin: 0 auto;
          text-align: center;
        }
        .report-pet h1 {
          font-size: 2rem;
          margin-bottom: 1rem;
        }
        .report-pet label {
          display: block;
          text-align: left;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        .report-pet input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
        }
        .report-pet button {
          width: 100%;
          padding: 0.75rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
        }
        .report-pet button:hover {
          background-color: #0056b3;
        }
      </style>
      <div class="report-pet">
        <h1>Información sobre la mascota</h1>
        <form id="reportForm">
          <label for="name">Tu nombre:</label>
          <input type="text" id="name" name="name" required>

          <label for="phone">Tu teléfono:</label>
          <input type="tel" id="phone" name="phone" required>

          <label for="location">¿Dónde lo viste?</label>
          <input type="text" id="location" name="location" required>

          <button type="submit">Enviar Información</button>
        </form>
      </div>
    `;
  }

  connectedCallback() {
    const form = this.shadowRoot!.getElementById("reportForm");
    form!.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Información enviada (simulado)");
      // Aquí puedes agregar la lógica de envío
    });
  }
}

// Registrar el componente
customElements.define("app-find-pet", AppFindPet);
