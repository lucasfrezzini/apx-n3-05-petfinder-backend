import { navigateTo } from "../../main";
import { state } from "../../state";
import { getFormData } from "../utils/forms";
import { dispatchAuthChange } from "../../src/utils/auth";

// Definir el componente de la pantalla de Registro
class AppModifyUserData extends HTMLElement {
  render() {
    const currentState = state.getState();
    const user: any = currentState.user;
    console.log(user);
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
        <h1>Datos personales</h1>
        <h2>Modifique los datos que desea actualizar</h2>
        <form id="registerForm">
          <label for="name">Nombre:</label>
          <input type="text" id="name" name="name" required value="${
            user!.name
          }">

          <label for="phone">Teléfono:</label>
          <input type="text" id="phone" name="phone" placeholder="223-2222222" value="${
            user!.phone
          }">

          <label for="address">Direccion</label>
          <input type="text" id="address" name="address" placeholder="Quimes Oeste, Buenos Aires" value="${
            user!.address
          }">

          <button type="submit">Actualizar datos personales</button>
          <p class="login-text"></p>
        </form>
      </div>
    `;

    const form = this.querySelector("#registerForm")! as HTMLFormElement;
    const alert = this.querySelector("p.login-text")! as HTMLParagraphElement;

    form.addEventListener("submit", async (event: Event) => {
      event.preventDefault();

      // Obtener los valores del formulario
      const formValues = getFormData(form);

      try {
        // updatear usuario
        const updateUser = await state.updateDataUser(formValues);

        // Guardar el usuario en el estado
        state.setState({ ...state.getState(), user: updateUser });

        alert.innerHTML = "Los cambios ya fueron efectuados 😎";
      } catch (error) {
        alert.innerHTML = "Hubo algun error. Vuelve a intentarlo 🫠";
        console.error("Submit", error);
      }
    });
  }

  connectedCallback() {
    this.render();
  }
}

// Registrar los componentes
customElements.define("app-modify-user", AppModifyUserData);
