import "./src/components/appLostPets";
import "./src/components/appFindPet";
import "./src/components/appPetReport";
import "./src/components/appHome";
import "./src/components/appHeader";
import "./src/components/appRegisterUser";
import "./src/components/appLoginUser";
import "./src/components/appReportedPetsEmpty";

import { checkAuth, isValidRoute } from "./src/utils/auth";

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

// Renderizar la página correspondiente
export const renderPage = (route: string) => {
  const mainContainer = document.getElementById("main")!;

  // Mostrar un loader mientras se carga la página
  mainContainer.innerHTML = `<div class="loader">Cargando...</div>`;

  // Simular una carga asíncrona (puedes reemplazar esto con la lógica real)
  setTimeout(() => {
    const component = routes[route] || "app-not-found"; // Componente por defecto si la ruta no existe
    mainContainer.innerHTML = `<${component}></${component}>`;
  }, 500); // Simular un retraso de 500ms
};

// Función para manejar la navegación
export function navigateTo(currentRoute: string) {
  let route = currentRoute;

  // Verificar si la ruta es válida y si el usuario está autenticado
  route = checkAuth(route);

  // Si la ruta no es válida, redirigir a la página de inicio
  if (!isValidRoute(route)) {
    route = "/";
  }

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
    const target = e.target as Element;
    const link = target.closest("[data-link]"); // Usar closest para manejar elementos anidados

    if (link) {
      e.preventDefault();
      const route = link.getAttribute("href");
      navigateTo(route!);
    }
  });
});

// Escuchar cambios en la historia (navegación con botones de atrás/adelante)
window.addEventListener("popstate", () => {
  renderPage(window.location.pathname);
});
