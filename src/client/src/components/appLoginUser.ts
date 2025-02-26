import { navigateTo } from "../../main";
import { dispatchAuthChange } from "../../src/utils/auth";
import { state } from "../../state";
import { getFormData } from "../utils/forms";

// Definir el componente de la pantalla de Registro
class AppLoginUser extends HTMLElement {
  render() {
    this.innerHTML = `
      <style>
        .register {
          padding: 2rem;
          max-width: 400px;
          margin: 0 auto;
          text-align: center;
        }
        .register h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .register h2 {
          font-size: 1.25rem;
          color: #666;
          margin-bottom: 2rem;
        }
        .register label {
          display: block;
          text-align: left;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        .register input {
          width: 100%;
          padding: 0.75rem;
          margin-bottom: 1rem;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 1rem;
        }
        .register button {
          width: 100%;
          padding: 0.75rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
        }
        .register button:hover {
          background-color: #0056b3;
        }
        .register .login-text {
          margin-top: 1rem;
          font-size: 0.9rem;
        }
        .register .login-text a {
          color: #007bff;
          text-decoration: none;
        }
        .register .login-text a:hover {
          text-decoration: underline;
        }
      </style>
      <div class="register">
        <h1>Iniciar Sesión</h1>
        <h2>Ingresa tus datos para comenzar</h2>
        <form id="registerForm">

          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" name="email" required>

          <label for="password">Contraseña:</label>
          <input type="password" id="password" name="password" required>

          <button type="submit">Iniciar sesión</button>
        </form>
        <p class="login-text">¿No tienes una cuenta aún? <a href="/registrarse">Crear cuenta</a></p>
      </div>
    `;

    const registerLink = this.querySelector('a[href="/registrarse"]')!;
    registerLink.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("/registrarse");
    });

    const form = this.querySelector("#registerForm")! as HTMLFormElement;
    form.addEventListener("submit", async (event: Event) => {
      event.preventDefault();

      // Obtener los valores del formulario
      const formValues = getFormData(form);

      try {
        // loguear usuario
        const { email, password } = formValues;
        const newToken = await state.login(email as string, password as string);
        // Guardar el token en el estado para tener acceso
        localStorage.setItem("token", newToken);
        // Notificar el cambio de autenticación
        dispatchAuthChange();
        // Obtener el id del usuario
        const id = await state.getUserId(email as string);
        // Obtener los datos del usuario
        const user = await state.getUserData(id);
        // Guardar los datos del usuario en el estado
        state.setState({ ...state.getState(), user });

        // Redirigir al usuario a la pantalla de inicio o reportes si correpsponde
        const currentState = state.getState();
        if (currentState.seenPet.id) {
          navigateTo(`/avistaje-mascota`);
        } else {
          navigateTo("/mascotas-perdidas");
        }
      } catch (error) {
        alert("Error al iniciar sesión");
        console.error("Submit", error);
      }
    });
  }

  connectedCallback() {
    this.render();
  }
}

// Registrar los componentes
customElements.define("app-login-user", AppLoginUser);
