import { navigateTo } from "../../main";
import { state } from "../../state";

// Definir el componente de la pantalla de Registro
class AppMyData extends HTMLElement {
  render() {
    const currentState = state.getState();
    const email = currentState.user!.email;
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
        <h1>Mis Datos</h1>
        <div id="registerForm">
          <button type="button" id="data">Modificar datos personales</button><br><br>
          <button type="button" id="pass">Modificar contraseña</button>
        </div>
        <p class="login-text">👤 ${email} <br><br><a href="/iniciar-sesion">Cerrar sesión</a></p>
      </div>
    `;

    const dataBtn = this.querySelector("#data")! as HTMLButtonElement;
    const passBtn = this.querySelector("#pass") as HTMLButtonElement;

    dataBtn.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("/modify-data");
    });

    passBtn.addEventListener("click", (e) => {
      e.preventDefault();
      navigateTo("/modify-pass");
    });
  }

  connectedCallback() {
    this.render();
  }
}

// Registrar los componentes
customElements.define("app-my-data", AppMyData);
