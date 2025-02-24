import { navigateTo } from "../../main";
import { state } from "../../state";
import { getFormData } from "../utils/forms";

// Definir el componente de la pantalla de Registro
class AppRegisterUser extends HTMLElement {
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
        <h1>Registrarse</h1>
        <h2>Crea una cuenta para comenzar</h2>
        <form id="registerForm">
          <label for="name">Nombre:</label>
          <input type="text" id="name" name="name" required>

          <label for="email">Correo electrónico:</label>
          <input type="email" id="email" name="email" required>

          <label for="password">Contraseña:</label>
          <input type="password" id="password" name="password" required>

          <label for="confirmPassword">Confirmar contraseña:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" required>

          <button type="submit">Registrarse</button>
        </form>
        <p class="login-text">¿Ya tienes una cuenta? <a href="/iniciar-sesion">Iniciar sesión</a></p>
      </div>
    `;

    const form = this.querySelector("#registerForm")! as HTMLFormElement;

    form.addEventListener("submit", async (event: Event) => {
      event.preventDefault();

      // Obtener los valores del formulario
      const formValues = getFormData(form);

      if (formValues.password !== formValues.confirmPassword) {
        alert("Las contraseñas no coinciden");
        return;
      }

      try {
        // registrar usuario
        const newUser = await state.signup(formValues);
        // loguear usuario
        const { email, password } = formValues;
        const userToken = await state.login(
          email as string,
          password as string
        );
        // Guardar el usuario en el estado
        localStorage.setItem("token", userToken.token);
        state.setState({ ...state.getState(), user: newUser.newUser });
        // Redirigir al usuario a la pantalla de inicio
        //! Definir a que pantallas se redirige al usuario o ver si se puede hacer de manera dinámica
        navigateTo("/mascotas-perdidas");
      } catch (error) {
        console.error("Submit", error);
      }
    });
  }

  connectedCallback() {
    this.render();
  }
}

// Registrar los componentes
customElements.define("app-register-user", AppRegisterUser);
