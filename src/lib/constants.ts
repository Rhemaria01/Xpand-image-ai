export const apiUrl =
  process.env.NODE_ENV === "production"
    ? "https://xpandi-ai-backend.onrender.com/"
    : "http://localhost:5000/";
