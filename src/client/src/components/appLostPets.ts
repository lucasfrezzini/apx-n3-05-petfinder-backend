import { navigateTo } from "../../main";
import { state } from "../../state";
// Definir el componente de Mascotas Perdidas
export class AppLostPets extends HTMLElement {
  render() {
    this.innerHTML = `
      <style>
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
      <div class="lost-pets">
        <h1>Mascotas Perdidas</h1>
        <h2>Ayuda a encontrar a estas mascotas</h2>
        <div class="cards">
        </div>
      </div>
    `;
  }

  async generateCards() {
    const pets = (await state.findPets()) as any;
    const cards = pets
      .map(
        (pet: any) => `
        <div class="card" id="${pet.id}">
          <img src="${pet.imageURL}" alt="${pet.name}">
          <h3>${pet.name}</h3>
          <p>Se perdió en ${pet.location}</p>
          <button>
            <span>📢</span> Reportar
          </button>
        </div>
      `
      )
      .join("");

    this.querySelector(".cards")!.innerHTML = cards;
  }

  async connectedCallback() {
    this.render();
    await this.generateCards();

    const cards = this.querySelectorAll(".card");

    cards.forEach((pet) => {
      const button = pet.querySelector("button");
      button!.addEventListener("click", (e) => {
        e.preventDefault();
        const currentState = state.getState();
        currentState.seenPet.id = pet.id;
        console.log(currentState);
        navigateTo(`/avistaje-mascota`);
      });
    });
  }
}

// Registrar el componente
customElements.define("app-lost-pets", AppLostPets);
