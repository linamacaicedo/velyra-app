import { API_URL } from "./api";

export const getSessionByCode = async (code: string) => {
  const response = await fetch(`${API_URL}/sessions/code/${code}`);

  if (!response.ok) {
    throw new Error("Session not found");
  }

  return response.json();
};

export const getSessionResults = async (sessionId: string) => {
  const response = await fetch(`${API_URL}/sessions/${sessionId}/results`);

  if (!response.ok) {
    throw new Error("Could not get results");
  }

  return response.json();
};

export const closeSession = async (sessionId: string) => {
  const response = await fetch(`${API_URL}/sessions/${sessionId}/close`, {
    method: "PUT"
  });

  if (!response.ok) {
    throw new Error("Could not close session");
  }

  return response.json();
};