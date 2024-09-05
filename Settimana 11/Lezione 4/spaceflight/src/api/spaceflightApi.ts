// src/api/spaceflightApi.ts
import { Article } from "../types/article";

const API_URL = "https://api.spaceflightnewsapi.net/v4/articles";

export const fetchArticles = async (): Promise<Article[]> => {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error("Failed to fetch articles");
  }

  const data = await response.json();

  // Assicurati che la risposta contenga una proprietà 'results' che è un array di articoli
  if (!data.results || !Array.isArray(data.results)) {
    throw new Error("Unexpected response format");
  }

  return data.results as Article[];
};

export const fetchArticleById = async (id: string): Promise<Article> => {
  const response = await fetch(`${API_URL}/${id}`);
  if (!response.ok) {
    throw new Error(`Failed to fetch article with id: ${id}`);
  }

  const data = await response.json();

  if (!data || typeof data !== "object" || !data.id) {
    throw new Error("Unexpected response format");
  }

  return data as Article;
};
