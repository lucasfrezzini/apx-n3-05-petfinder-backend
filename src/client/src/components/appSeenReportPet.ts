// Definir el componente de Reportar Mascota Vista
import { state } from "../../state";
import { getFormData } from "../utils/forms";

class AppSeenReportPet extends HTMLElement {
  async connectedCallback() {
    const currentState = state.getState();
    const pet = await state.getPetById();

    this.render(pet);
  }

  render(pet: any) {
    this.innerHTML = `
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

        .report-pet h2 {
          margin: 1rem;
        }
        .report-pet label {
          display: block;
          text-align: left;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        .report-pet input, 
        .report-pet textarea {
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
        <h1>Reportá que viste a <strong style="color: green">${pet.name}</strong> por tu zona</h1>
        <img src="${pet.imageURL}" alt="${pet.name}">

        <form id="reportForm">
          <h2>Brindanos toda la informacion posible</h2>
          <label for="name">Tu nombre:</label>
          <input type="text" id="name" name="name" required>

          <label for="phone">Tu teléfono:</label>
          <input type="tel" id="phone" name="phone" required>

          <label for="moreInfo">¿Dónde lo viste?</label>
          <textarea name="moreInfo" rows="5" cols="30" placeholder="Toda la info que tengas es muy valiosa" required></textarea>

          <button type="submit">Enviar Información</button>
        </form>
      </div>
    `;

    const form = this.querySelector("#reportForm")! as HTMLFormElement;

    form.addEventListener("submit", async (event: Event) => {
      event.preventDefault();

      // Obtener los valores del formulario
      const formValues = getFormData(form);

      try {
        await state.createSeenReport(formValues, pet.id);

        alert("Ya hemos registrado tu reporte, gracias por ayudar 😎");
      } catch (error) {
        alert("Hubo algun error. Vuelve a intentarlo 🫠");
        console.error("Submit", error);
      }
    });
  }
}

// Registrar el componente
customElements.define("app-seen-pet", AppSeenReportPet);
