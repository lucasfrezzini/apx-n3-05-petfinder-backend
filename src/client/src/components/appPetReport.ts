// Definir el componente de Reporte de Mascota
import { getFormData } from "../utils/forms";
import { initMap } from "../utils/forms";
import { initDropzone } from "../utils/forms";
import { state } from "../../state";

class AppPetReport extends HTMLElement {
  render() {
    this.innerHTML = `
        <style>
          .pet-report {
            padding: 2rem;
            max-width: 600px;
            margin: 0 auto;
            text-align: center;
          }
          .pet-report h1 {
            font-size: 2rem;
            margin-bottom: 0.5rem;
          }
          .pet-report h2 {
            font-size: 1.25rem;
            color: #666;
            margin-bottom: 2rem;
          }
          .pet-report label {
            display: block;
            text-align: left;
            margin-bottom: 0.5rem;
            font-weight: bold;
          }
          .pet-report input.inputForm,
          .pet-report select,
          .pet-report textarea {
            width: 100%;
            padding: 0.75rem;
            margin-bottom: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 1rem;
          }
          .pet-report .map-container {
            height: 300px;
            margin-bottom: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
          }
          .pet-report button {
            padding: 0.75rem 1.5rem;
            margin: 0.5rem;
            font-size: 1rem;
            border: none;
            border-radius: 5px;
            cursor: pointer;
          }
          .pet-report button.save {
            background-color: #007bff;
            color: white;
          }
          .pet-report button.found {
            background-color: #28a745;
            color: white;
          }
          .pet-report button.delete {
            background-color: #dc3545;
            color: white;
          }
        </style>
        <div class="pet-report">
          <h1>Reportar Mascota Perdida</h1>
          <h2>Proporciona toda la información de tu mascota</h2>
          <form id="petForm">
            <label for="name">Nombre de la mascota:</label>
            <input class="inputForm" type="text" id="name" name="name" required>

            <label for="age">Edad:</label>
            <input class="inputForm" type="number" id="age" name="age" required>

            <label for="size">Tamaño:</label>
            <select id="size" name="size" required>
              <option value="small">Pequeño</option>
              <option value="medium">Mediano</option>
              <option value="large">Grande</option>
            </select>

            <label for="type">Tipo de mascota:</label>
            <select id="type" name="type_pet" required>
              <option value="dog">Perro</option>
              <option value="cat">Gato</option>
            </select>

            <label for="image">Subir imagen:</label>
            <div id="dropzone" class="dropzone"></div>
            <br>
            <label for="location">Ubicación:</label>
            <div class="map-container" id="map"></div>
          
            <input class="inputForm" type="text" id="location" name="location" placeholder="Ubicación encontrada..." required>

            <button type="submit" class="save">Guardar</button>
            <button type="button" class="found">Reportar como Encontrado</button>
            <button type="button" class="delete">Eliminar Reporte</button>
          </form>
        </div>
      `;
  }

  connectedCallback() {
    this.render();

    // Inicializar Dropzone
    initDropzone();

    // Inicializar Mapbox
    initMap();

    const form = this.querySelector("#petForm") as HTMLFormElement;
    form!.addEventListener("submit", (e) => {
      e.preventDefault();
      const currentState = state.getState();
      console.log("Estado actual user:", currentState);
      const { id } = currentState.user!;

      // Obtener los valores del formulario
      const formValues = getFormData(form);
      state.createNewReport(formValues, id);
      console.log("Valores del formulario:", formValues);
    });

    const foundButton = this.querySelector(".found");
    foundButton!.addEventListener("click", () => {
      alert("Mascota reportada como encontrada (simulado)");
      // Aquí puedes agregar la lógica para marcar como encontrado
    });

    const deleteButton = this.querySelector(".delete");
    deleteButton!.addEventListener("click", () => {
      alert("Reporte eliminado (simulado)");
      // Aquí puedes agregar la lógica para eliminar el reporte
    });
  }
}

// Registrar el componente
customElements.define("app-pet-report", AppPetReport);
