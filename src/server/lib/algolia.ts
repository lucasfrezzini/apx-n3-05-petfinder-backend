import "dotenv/config";
import { algoliasearch } from "algoliasearch";

const API_ID = process.env.ALGOLIA_API_ID!;
const API_KEY = process.env.ALGOLIA_API_KEY!;

const client = algoliasearch(API_ID, API_KEY);
const indexName = "pets";

export async function uploadToAlgolia(lat: string, lng: string, id: number) {
  const _geoloc = {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  };

  // Add record to an index
  const { taskID } = await client.saveObject({
    indexName,
    body: {
      objectID: id,
      _geoloc,
    },
  });

  return taskID;
}

export async function updateInAlgolia(petId: string, data: any) {
  const response = await client.partialUpdateObject({
    indexName,
    objectID: petId,
    attributesToUpdate: { ...data },
  });
  return response;
}

export async function getNearInAlgolia(lat: number, lng: number) {
  const hits = await client.searchSingleIndex({
    indexName,
    searchParams: {
      query: "", // Consulta vacía para buscar todos los elementos
      aroundLatLng: `${lat},${lng}`,
      aroundRadius: 50000, // Radio en metros
    },
  });

  return hits;
}
