// Check if the user is authenticated
export const isAuthenticated = () => {
  return localStorage.getItem("token") !== null;
};

// Return to the login page if the user is not authenticated
export const checkAuth = (route: string) => {
  if (!isAuthenticated()) {
    switch (route) {
      case "/":
        break;
      case "/mascotas-perdidas":
        break;
      case "/iniciar-sesion":
        break;
      default:
        route = "/registrarse";
        break;
    }
  }
  return route;
};
