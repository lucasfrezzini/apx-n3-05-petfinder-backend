import Dropzone from "dropzone";
import mapboxgl from "mapbox-gl";
import "dropzone/dist/dropzone.css";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGFub2RldmVsb3BlciIsImEiOiJjbTYzdXoxY3YxZzFzMmxvdW9oN3EwZ3p6In0.5rPl_irsXaZzKAt1lMg-iw";

export function getFormData(form: HTMLFormElement) {
  // Crear un objeto FormData
  const formData = new FormData(form);

  // Convertir FormData a un objeto JavaScript
  const formValues: { [key: string]: string | boolean } = {};
  formData.forEach((value, key) => {
    // Verificar si el valor es un checkbox o radio
    const inputElement = form.elements.namedItem(key) as HTMLInputElement;
    if (
      inputElement &&
      (inputElement.type === "checkbox" || inputElement.type === "radio")
    ) {
      formValues[key] = inputElement.checked;
    } else {
      formValues[key] = value.toString();
    }
  });

  return formValues;
}

export function initMap() {
  mapboxgl.accessToken = MAPBOX_TOKEN;

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
    // Verifica si hay resultados
    if (data.features.length > 0) {
      const context = data.features[0].context;

      // Busca la ciudad (place) o el barrio (neighborhood) en el contexto
      const city = context.find((item: any) =>
        item.id.startsWith("place")
      )?.text;
      const region = context.find((item: any) =>
        item.id.startsWith("region")
      )?.text;

      // Devuelve la ciudad o el barrio, según lo que esté disponible
      return `${city ? city + ", " : ""}${region}`;
    } else {
      return "No encontrada";
    }
  }

  // Agrega un marcador al hacer clic
  map.on("click", async (e) => {
    const { lng, lat } = e.lngLat;

    // Muestra la latitud y longitud en la consola
    // Aquí puedes hacer lo que necesites con el dataURI, como guardarlo en un campo oculto del formulario
    const hiddenInputLat = document.createElement("input");
    hiddenInputLat.type = "hidden";
    hiddenInputLat.name = "lat";
    hiddenInputLat.value = lat.toString();

    const hiddenInputLng = document.createElement("input");
    hiddenInputLng.type = "hidden";
    hiddenInputLng.name = "lng";
    hiddenInputLng.value = lng.toString();

    const mapContainer = document.getElementById("map") as HTMLDivElement;
    mapContainer.appendChild(hiddenInputLng);
    mapContainer.appendChild(hiddenInputLat);

    // Obtén la dirección en texto
    const address = await getAddress(lng, lat);
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

export function initDropzone() {
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

          // Aquí puedes hacer lo que necesites con el dataURI, como guardarlo en un campo oculto del formulario
          const hiddenInput = document.createElement("input");
          hiddenInput.type = "hidden";
          hiddenInput.name = "imageDataURI";
          hiddenInput.value = dataURI;
          document.getElementById("dropzone")?.appendChild(hiddenInput);
        };

        reader.readAsDataURL(file); // Lee el archivo como dataURI
      });

      // this.on("success", function (file, response) {
      //   console.log("Archivo subido con éxito:", response);
      // });

      this.on("removedfile", function (file) {
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
