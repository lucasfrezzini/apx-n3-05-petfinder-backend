// import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
// import mapboxgl from "mapbox-gl";
// import mapboxSdk from "@mapbox/mapbox-sdk";

import "mapbox-gl/dist/mapbox-gl.css";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";

// Definir el componente de Reporte de Mascota
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
            <input class="inputForm" type="file" id="image" name="image" accept="image/*" required>

            <label for="location">Ubicación:</label>
            <div class="map-container" id="map"></div>
            <div class="search-form">
              <input name="q" type="search" />
              <button type="button" class="btnSearch">Buscar</button>
            </div>
          
            <input class="inputForm" type="text" id="location" name="location" placeholder="Buscar ubicación..." required>

            <button type="submit" class="save">Guardar</button>
            <button type="button" class="found">Reportar como Encontrado</button>
            <button type="button" class="delete">Eliminar Reporte</button>
          </form>
        </div>
      `;

    // Inyectar estilos de Mapbox en el Shadow DOM
    // this.initMapbox();
  }

  connectedCallback() {
    this.render();
    // Inicializar Mapbox

    const map = this.initMap();

    this.initSearchForm(async function (firstResult: any) {
      const marker = new mapboxgl.Marker()
        .setLngLat(firstResult.geometry.coordinates)
        .addTo(map);

      const [lng, lat] = firstResult.geometry.coordinates;
      const urlComerciosCerca = `/comercios-cerca-de?lat=${lat}&lng=${lng}`;
      const response = await fetch(urlComerciosCerca);
      const data = await response.json();

      data.forEach((comercio: any) => {
        const { name, _geoloc } = comercio;
        const marker = new mapboxgl.Marker()
          .setLngLat({ lng: _geoloc.lng, lat: _geoloc.lat })
          .setPopup(new mapboxgl.Popup().setHTML(`<h1>${name}</h1>`))
          .addTo(map);
      });

      map.setCenter(firstResult.geometry.coordinates);
      map.setZoom(14);
    });

    const form = this.querySelector("#petForm");
    form!.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Reporte guardado (simulado)");
      // Aquí puedes agregar la lógica para guardar el reporte
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

  // initMapbox() {
  //   // Cargar Mapbox
  //   // mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN; // Reemplaza con tu token de Mapbox

  //   mapboxgl.accessToken =
  //     "pk.eyJ1IjoidGFub2RldmVsb3BlciIsImEiOiJjbTYzdXoxY3YxZzFzMmxvdW9oN3EwZ3p6In0.5rPl_irsXaZzKAt1lMg-iw";
  //   const map = new mapboxgl.Map({
  //     container: this.querySelector("#map") as HTMLElement,
  //     style: "mapbox://styles/mapbox/streets-v12",
  //     center: [-58.3816, -34.6037], // Coordenadas de Buenos Aires
  //     zoom: 12,
  //   }) as any;

  //   // Añadir geocoder
  //   const geocoder = new MapboxGeocoder({
  //     accessToken: mapboxgl.accessToken!,
  //     mapboxgl: mapboxgl as any,
  //     marker: true,
  //     reverseGeocode: true,
  //     placeholder: "Try: -40, 170",
  //     zoom: 5,
  //   });

  //   map.addControl(geocoder);

  //   this.querySelector("#location")!.appendChild(geocoder.onAdd(map));

  //   // Guardar ubicación seleccionada
  //   geocoder.on("result", (e: any) => {
  //     const locationInput = this.querySelector("#location") as HTMLInputElement;
  //     locationInput.value = e.result.place_name;
  //   });
  // }

  initMap() {
    mapboxgl.accessToken = this.MAPBOX_TOKEN;
    return new mapboxgl.Map({
      container: "map",
      style: "mapbox://styles/mapbox/navigation-night-v1",
    });
  }

  initSearchForm(callback: any) {
    const mapboxClient = mapboxSdk({ accessToken: this.MAPBOX_TOKEN });

    const btnSearch = this.querySelector(".btnSearch")!;
    console.log("Form map", btnSearch);
    btnSearch.addEventListener("click", async (e) => {
      const form = this.querySelector('input[name="q"]')! as HTMLInputElement;
      console.log("Form", form.value);
      // Upgrading methods in 2025
      const response = await mapboxClient.geocoding
        .forwardGeocode({
          query: form.value,
          autocomplete: true,
          limit: 1,
        })
        .send();

      if (
        !response ||
        !response.body ||
        !response.body.features ||
        !response.body.features.length
      ) {
        console.error("Invalid response:");
        console.error(response);
        return;
      }
      // get the first result for now
      const feature = await response.body.features[0];
      callback(feature);
    });
  }
}

// Registrar el componente
customElements.define("app-pet-report", AppPetReport);
