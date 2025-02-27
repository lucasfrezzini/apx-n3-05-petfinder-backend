const API_URL = "http://localhost:3000/api";

export async function fetchApi(
  endpoint: string,
  method: string,
  body?: object,
  token?: string,
  errorMessage?: string
) {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}/${endpoint}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const responseData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseData.message || errorMessage || "Error en la solicitud"
    );
  }

  return responseData;
}
