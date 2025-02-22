// Definir el componente de Reporte de Mascota
import { getFormData } from "../utils/forms";
import Dropzone from "dropzone";
import mapboxgl from "mapbox-gl";
import "dropzone/dist/dropzone.css";
import "mapbox-gl/dist/mapbox-gl.css";

class AppPetReport extends HTMLElement {
  MAPBOX_TOKEN =
    "pk.eyJ1IjoidGFub2RldmVsb3BlciIsImEiOiJjbTYzdXoxY3YxZzFzMmxvdW9oN3EwZ3p6In0.5rPl_irsXaZzKAt1lMg-iw";

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
            <select id="type" name="type" required>
              <option value="dog">Perro</option>
              <option value="cat">Gato</option>
            </select>

            <label for="image">Subir imagen:</label>
            <div id="dropzone" class="dropzone"></div>

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

  initMap() {
    mapboxgl.accessToken = this.MAPBOX_TOKEN;

    const map = new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/outdoors-v12",
      // Coordenadas de la Ciudad de Buenos Aires
      center: [-58.37723, -34.61315],
      zoom: 8,
    });

    // Variable para almacenar el marcador actual
    let currentMarker: mapboxgl.Marker | undefined;

    // Función para obtener la dirección a partir de las coordenadas
    async function getAddress(lng: number, lat: number): Promise<string> {
      const response = await fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json?access_token=${mapboxgl.accessToken}`
      );
      const data = await response.json();

      // La dirección está en la propiedad `place_name` del primer resultado
      return data.features[0].place_name;
    }

    // Agrega un marcador al hacer clic
    map.on("click", async (e) => {
      const { lng, lat } = e.lngLat;

      // Muestra la latitud y longitud en la consola
      console.log(`Latitud: ${lat}, Longitud: ${lng}`);

      // Obtén la dirección en texto
      const address = await getAddress(lng, lat);
      console.log("Dirección:", address);
      const locationInput = document.getElementById(
        "location"
      ) as HTMLInputElement;
      locationInput.value = address;

      // Elimina el marcador anterior si existe
      if (currentMarker) {
        currentMarker.remove();
      }

      // Crea un nuevo marcador en la posición del clic
      currentMarker = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(
          new mapboxgl.Popup().setHTML(`<strong>Dirección:</strong> ${address}`)
        )
        .addTo(map);

      // Abre el popup automáticamente
      currentMarker.togglePopup();
    });
  }

  initDropzone() {
    const myDropzone = new Dropzone("#dropzone", {
      url: "/falsa",
      autoProcessQueue: false, // No subir automáticamente
      paramName: "file", // Nombre del parámetro que contendrá el archivo
      maxFiles: 1, // Número máximo de archivos que se pueden subir
      acceptedFiles: "image/*", // Tipos de archivos aceptados
      addRemoveLinks: true, // Mostrar enlaces para eliminar archivos
      dictDefaultMessage: "Arrastra una imagen aquí o haz clic para subirla", // Mensaje por defecto

      init: function () {
        this.on("addedfile", function (file) {
          const reader = new FileReader();

          reader.onload = function (e) {
            const dataURI = e.target?.result as string; // Obtén el dataURI
            console.log("dataURI de la imagen:", dataURI);

            // Aquí puedes hacer lo que necesites con el dataURI, como guardarlo en un campo oculto del formulario
            const hiddenInput = document.createElement("input");
            hiddenInput.type = "hidden";
            hiddenInput.name = "imageDataURI";
            hiddenInput.value = dataURI;
            document.getElementById("dropzone")?.appendChild(hiddenInput);
          };

          reader.readAsDataURL(file); // Lee el archivo como dataURI
        });

        this.on("success", function (file, response) {
          console.log("Archivo subido con éxito:", response);
        });

        this.on("removedfile", function (file) {
          console.log("Archivo eliminado");
          // Elimina el campo oculto si se elimina la imagen
          const hiddenInput = document.querySelector(
            "input[name='imageDataURI']"
          );
          if (hiddenInput) {
            hiddenInput.remove();
          }
        });
      },
    });
  }

  connectedCallback() {
    this.render();

    // Inicializar Dropzone
    this.initDropzone();

    // Inicializar Mapbox
    this.initMap();

    const form = this.querySelector("#petForm") as HTMLFormElement;
    form!.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Reporte guardado (simulado)");
      // Aquí puedes agregar la lógica para guardar el reporte
      // Obtener los valores del formulario
      const formValues = getFormData(form);
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
