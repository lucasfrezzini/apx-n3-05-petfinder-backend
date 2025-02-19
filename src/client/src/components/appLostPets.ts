import sampleDog from "../../../../public/dog.jpeg";

// Definir el componente de Mascotas Perdidas
export class AppLostPets extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot!.innerHTML = `
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
          ${this.generateCards()}
        </div>
      </div>
    `;
  }

  generateCards() {
    const pets = [
      {
        name: "Roco",
        location: "Buenos Aires",
        image: sampleDog,
      },
      {
        name: "Luna",
        location: "Córdoba",
        image: sampleDog,
      },
      {
        name: "Toby",
        location: "Rosario",
        image: sampleDog,
      },
      {
        name: "Mia",
        location: "Mendoza",
        image: sampleDog,
      },
      {
        name: "Max",
        location: "La Plata",
        image: sampleDog,
      },
      {
        name: "Bella",
        location: "Mar del Plata",
        image: sampleDog,
      },
    ];

    return pets
      .map(
        (pet) => `
        <div class="card">
          <img src="${pet.image}" alt="${pet.name}">
          <h3>${pet.name}</h3>
          <p>Se perdió en ${pet.location}</p>
          <button>
            <span>📢</span> Reportar
          </button>
        </div>
      `
      )
      .join("");
  }
}

// Registrar el componente
customElements.define("app-lost-pets", AppLostPets);
