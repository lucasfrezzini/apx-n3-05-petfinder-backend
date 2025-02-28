// Definir el componente de Mascotas Reportadas (sin elementos)
import { navigateTo } from "../../main";
import { state } from "../../state";

class AppUserPets extends HTMLElement {
  async render() {
    const pets = await state.getUserPets();
    this.innerHTML = `
      <style>
        .reported-pets-empty {
          padding: 2rem;
          text-align: center;
        }
        .reported-pets-empty h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .reported-pets-empty h2 {
          font-size: 1.25rem;
          color: #666;
          margin-bottom: 2rem;
        }
        .reported-pets-empty img {
          width: 100%;
          max-width: 300px;
          height: auto;
          margin-bottom: 2rem;
        }
        .reported-pets-empty button {
          padding: 0.75rem 1.5rem;
          font-size: 1rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .reported-pets-empty button:hover {
          background-color: #0056b3;
        }
          .lost-pets {
          padding: 2rem;
          text-align: center;
        }
        .lost-pets h1 {
          font-size: 2rem;
          margin-bottom: 0.5rem;
        }
        .lost-pets h2 {
          font-size: 1.25rem;
          color: #666;
          margin-bottom: 2rem;
        }
        .cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1rem;
          padding: 1rem;
        }
        .card {
          border: 1px solid #ccc;
          border-radius: 10px;
          overflow: hidden;
          text-align: center;
          background-color: #f9f9f9;
        }
        .card img {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        .card h3 {
          font-size: 1.5rem;
          margin: 1rem 0;
        }
        .card p {
          font-size: 1rem;
          color: #555;
          margin: 0.5rem 0;
        }
        .card button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          width: 80%;
          margin: 1rem auto;
          padding: 0.75rem;
          background-color: #007bff;
          color: white;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
          cursor: pointer;
        }
        .card button:hover {
          background-color: #0056b3;
        }
      </style>
      ${pets.length > 0 ? this.getFullPets(pets) : this.getEmptyPets()}
    `;

    const cards = this.querySelectorAll(".card")!;
    cards.forEach((pet) => {
      const button = pet.querySelector("button");
      button!.addEventListener("click", (e) => {
        e.preventDefault();
        state.setEditPet(pet.id);
        navigateTo(`/modify-pet`);
      });
    });
  }

  getFullPets(pets: any) {
    return `
      <div class="lost-pets">
        <h1>Mis Mascotas Perdidas</h1>
        <h2>Estas son tus mascotas reportadas</h2>
        <div class="cards">
        ${pets
          .map(
            (pet: any) => `
            <div class="card" id="${pet.id}">
              <img src="${pet.imageURL}" alt="${pet.name}">
              <h3>${pet.name}</h3>
              <p>Se perdió en ${pet.location}</p>
              <button>
                <span>✍🏼</span> Editar
              </button>
            </div>
          `
          )
          .join("")}
        </div>
      </div>
      `;
  }

  getEmptyPets() {
    return `
    <div class="reported-pets-empty">
      <h1>Mascotas Reportadas</h1>
      <h2>No hay mascotas reportadas por el momento</h2>
      <img class="mx-auto" src="public/empty.png" alt="No hay mascotas reportadas"><br>
      <button id="publishButton">Publicar Reporte</button>
    </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}

// Registrar el componente
customElements.define("app-user-pets", AppUserPets);
