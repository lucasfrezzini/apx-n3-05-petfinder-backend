// Propósito: Funciones de autenticación y autorización

// Definir rutas públicas y privadas
const publicRoutes = ["/", "/iniciar-sesion", "/registrarse"];
const privateRoutes = [
  "/mascotas-perdidas",
  "/reportar-mascota",
  "/reporte-mascota",
  "/mascotas-reportadas",
];

// Verificar si el usuario está autenticado
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");

  if (!token) return false;

  const payload = JSON.parse(atob(token.split(".")[1])); // Decodificar el payload del JWT
  if (payload.exp && payload.exp < Date.now() / 1000) {
    localStorage.removeItem("token"); // Eliminar el token expirado
    return false; // Token expirado
  }

  return true;
};

// Verificar autenticación y redirigir si es necesario
export const checkAuth = (route: string) => {
  const isAuth = isAuthenticated();

  // Si la ruta es privada y el usuario no está autenticado, redirigir a /iniciar-sesion
  if (privateRoutes.includes(route) && !isAuth) {
    return "/iniciar-sesion";
  }

  // Si la ruta es pública y el usuario está autenticado, redirigir a /mascotas-perdidas (o una ruta por defecto)
  // if (publicRoutes.includes(route) && isAuth && route !== "/") {
  //   return "/mascotas-perdidas";
  // }

  return route;
};

// Verificar si la ruta es válida
export const isValidRoute = (route: string) => {
  const allRoutes = [...publicRoutes, ...privateRoutes];
  return allRoutes.includes(route);
};

export function dispatchAuthChange() {
  // Disparar un evento personalizado para notificar el cambio de autenticación
  const event = new CustomEvent("auth-change");
  window.dispatchEvent(event);
}
