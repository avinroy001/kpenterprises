const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "").trim();

function buildEndpoint(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  if (!API_BASE_URL) return normalizedPath;
  return `${API_BASE_URL.replace(/\/+$/, "")}${normalizedPath}`;
}

export async function submitLead(payload) {
  const response = await fetch(buildEndpoint("/api/leads"), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok || !data.ok) {
    throw new Error(data.message || "Unable to submit form right now.");
  }

  return data;
}
