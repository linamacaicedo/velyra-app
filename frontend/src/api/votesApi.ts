import { API_URL } from "./api";

export const createVote = async (
  sessionId: string,
  optionId: string,
  voterName: string
) => {
  const response = await fetch(`${API_URL}/votes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      sessionId,
      optionId,
      voterName
    })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Could not register vote");
  }

  return response.json();
};