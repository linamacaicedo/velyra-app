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

  if (!response.ok) {
    const errorData = await response.json();

    throw new Error(errorData.error || "Could not create session");
  }

  return response.json();
};

export const getSessionsByHost = async (hostId: string) => {
  const response = await fetch(`${API_URL}/sessions/host/${hostId}`);

  if (!response.ok) {
    throw new Error("Could not get sessions");
  }

  return response.json();
};

export const getDashboardStats = async (hostId: string) => {
  const response = await fetch(`${API_URL}/sessions/host/${hostId}/stats`);

  if (!response.ok) {
    throw new Error("Could not get dashboard stats");
  }

  return response.json();
};

export const getSessionById = async (sessionId: string) => {
  const response = await fetch(`${API_URL}/sessions/${sessionId}`);

  if (!response.ok) {
    throw new Error("Could not get session");
  }

  return response.json();
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
