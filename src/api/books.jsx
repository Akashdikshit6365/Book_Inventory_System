const API_URL = "http://localhost:5000/books";

export const getBooks = async () => {
  const response = await fetch(API_URL);
  return response.json();
};
