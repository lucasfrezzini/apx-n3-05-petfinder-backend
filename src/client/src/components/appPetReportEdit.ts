// Definir el componente de Reporte de Mascota
import { getFormData } from "../utils/forms.js";
import { initMap } from "../utils/forms.js";
import { initDropzone } from "../utils/forms.js";
import { state } from "../../state.js";

class AppPetEditReport extends HTMLElement {
  async render(pet: any) {
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
          <h1>Editar Mascota Perdida</h1>
          <h2>Aqui esta toda la información de tu mascota</h2>
          <form id="petForm">
            <label for="name">Nombre de la mascota:</label>
            <input class="inputForm" type="text" id="name" name="name" required value="${
              pet!.name
            }">

            <label for="age">Edad:</label>
            <input class="inputForm" type="number" id="age" name="age" required value="${
              pet!.age
            }">

            <label for="size">Tamaño:</label>
            <select id="size" name="size" required>
              <option ${
                pet.size === "small" ? "selected" : ""
              } value="small">Pequeño</option>
              <option ${
                pet.size === "medium" ? "selected" : ""
              } value="medium">Mediano</option>
              <option ${
                pet.size === "large" ? "selected" : ""
              } value="large">Grande</option>
            </select>

            <label for="type">Tipo de mascota:</label>
            <select id="type" name="type_pet" required>
              <option ${
                pet.type_pet === "dog" ? "selected" : ""
              } value="dog">Perro</option>
              <option ${
                pet.type_pet === "cat" ? "selected" : ""
              } value="cat">Gato</option>
            </select>

            <label for="image">Imagen de la mascota:</label>
            <p class="text-left">Imagen actual</p>
            <img src="${pet.imageURL}" alt="${pet.name}" width="200px" /><br>
            <p class="text-left">Ingrese la nueva imagen</p>
            <div id="dropzone" class="dropzone"></div>
            <br>
            <label for="location">Ubicación:</label>
            <div class="map-container" id="map">
            <input type="hidden" name="lat" value="${pet.lat}">
            <input type="hidden" name="lng" value="${pet.lng}">
            </div>
          
            <input class="inputForm" type="text" id="location" name="location" placeholder="Ubicación encontrada..." required value="${
              pet!.location
            }">

            <button type="submit" class="save">Guardar</button>
            <button type="button" class="found">Reportar como Encontrado</button>
            <button type="button" class="delete">Eliminar Reporte</button>
          </form>
        </div>
      `;
  }

  async connectedCallback() {
    const currentState = state.getState();

    const pet = await state.getPetById(currentState.editPet!);

    await this.render(pet);

    // Inicializar Dropzone
    initDropzone();

    // Inicializar Mapbox
    initMap();

    const form = this.querySelector("#petForm") as HTMLFormElement;
    form!.addEventListener("submit", async (e) => {
      try {
        e.preventDefault();

        // Obtener los valores del formulario
        const formValues = getFormData(form);

        await state.updatePetReport(formValues, pet.id);
        alert("Reporte credo con exito");
      } catch (error) {
        alert("Error al crear el report");
        console.error("Submit", error);
      }
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
customElements.define("app-modify-pet", AppPetEditReport);
