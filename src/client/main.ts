import "./src/components/appLostPets";
import "./src/components/appFindPet";
import "./src/components/appPetReport";
import "./src/components/appHome";
import "./src/components/appHeader";
import "./src/components/appRegisterUser";
import "./src/components/appLoginUser";
import "./src/components/appReportedPetsEmpty";

import { checkAuth } from "./src/utils/auth";

// Definir las rutas de la aplicación
const routes: { [key: string]: string } = {
  "/": "app-home", // Pantalla de inicio
  "/registrarse": "app-register-user", // Pantalla de registro
  "/iniciar-sesion": "app-login-user", // Pantalla de inicio de sesión
  "/mascotas-perdidas": "app-lost-pets", // Pantalla de mascotas perdidas
  "/reportar-mascota": "app-find-pet", // Pantalla para reportar mascota vista
  "/reporte-mascota": "app-pet-report", // Pantalla de reporte de mascota (dueño)
  "/mascotas-reportadas": "app-reported-pets-empty", // Pantalla de mascotas reportadas (vacía)
};

// Función para renderizar la página según la ruta
function renderPage(route: keyof typeof routes) {
  const mainContainer = document.getElementById("main");
  const component = routes[route];

  if (component) {
    // Limpiar el contenedor principal
    mainContainer!.innerHTML = `<${component}></${component}>`;
  } else {
    // Página no encontrada (404)
    mainContainer!.innerHTML = `<h1>404 - Página no encontrada</h1>`;
  }
}

// Función para manejar la navegación
export function navigateTo(currentRoute: string) {
  let route = currentRoute;
  // Verificar si el usuario está autenticado para reescribir la ruta
  route = checkAuth(route);

  // Actualizar la URL en el navegador
  history.pushState({}, route, window.location.origin + route);

  // Renderizar la página correspondiente
  renderPage(route);
}

// Escuchar el evento de carga inicial
window.addEventListener("load", () => {
  // Renderizar la página inicial según la ruta actual
  let route = window.location.pathname;

  // Verificar si el usuario está autenticado para reescribir la ruta
  route = checkAuth(route);

  renderPage(route);

  // Escuchar clics en los enlaces de la aplicación
  document.body.addEventListener("click", (e) => {
    if ((e.target as Element).matches("[data-link]")) {
      e.preventDefault();
      const route = (e.target as Element).getAttribute("href");
      navigateTo(route!);
    }
  });
});

// Escuchar cambios en la historia (navegación con botones de atrás/adelante)
window.addEventListener("popstate", () => {
  renderPage(window.location.pathname);
});
