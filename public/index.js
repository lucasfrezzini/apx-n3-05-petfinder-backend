// Upgrading for Mapbox v3.9.3 (2025) and Mapbox SDK (2025)
const MAPBOX_TOKEN =
  "pk.eyJ1IjoidGFub2RldmVsb3BlciIsImEiOiJjbTYzdXoxY3YxZzFzMmxvdW9oN3EwZ3p6In0.5rPl_irsXaZzKAt1lMg-iw";
const mapboxClient = mapboxSdk({ accessToken: MAPBOX_TOKEN });

function initMap() {
  mapboxgl.accessToken = MAPBOX_TOKEN;
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/navigation-night-v1",
  });
}

function initSearchForm(callback) {
  const form = document.querySelector(".search-form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Upgrading methods in 2025
    const response = await mapboxClient.geocoding
      .forwardGeocode({
        query: e.target.q.value,
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

(function () {
  window.map = initMap();
  initSearchForm(async function (firstResult) {
    const marker = new mapboxgl.Marker()
      .setLngLat(firstResult.geometry.coordinates)
      .addTo(map);

    const [lng, lat] = firstResult.geometry.coordinates;
    const urlComerciosCerca = `/comercios-cerca-de?lat=${lat}&lng=${lng}`;
    const response = await fetch(urlComerciosCerca);
    const data = await response.json();

    data.forEach((comercio) => {
      const { name, _geoloc } = comercio;
      const marker = new mapboxgl.Marker()
        .setLngLat({ lng: _geoloc.lng, lat: _geoloc.lat })
        .setPopup(new mapboxgl.Popup().setHTML(`<h1>${name}</h1>`))
        .addTo(map);
    });

    map.setCenter(firstResult.geometry.coordinates);
    map.setZoom(14);
  });
})();
