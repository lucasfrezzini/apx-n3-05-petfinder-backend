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
        <p class="login-text">¿Ya tienes una cuenta? <a href="#">Iniciar sesión</a></p>
      </div>
    `;

    const form = this.querySelector("#registerForm");
    form!.addEventListener("submit", (e) => {
      e.preventDefault();
      alert("Registro exitoso (simulado)");
      // Aquí puedes agregar la lógica de registro
    });
  }

  connectedCallback() {
    this.render();
  }
}

// Registrar los componentes
customElements.define("app-register-user", AppRegisterUser);
