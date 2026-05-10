import { API_URL } from "./api";

export const createSession = async (
  hostId: string,
  title: string,
  question: string,
  options: string[],
) => {
  const response = await fetch(`${API_URL}/sessions`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      hostId,
      title,
      question,
      options,
    }),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not create session");
  }

  return data;
};

export const getSessionsByHost = async (hostId: string) => {
  const response = await fetch(`${API_URL}/sessions/host/${hostId}`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Could not get sessions");
  }

  return data;
};

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
    method: "PUT",
  });

  if (!response.ok) {
    throw new Error("Could not close session");
  }

  return response.json();
};
