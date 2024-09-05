import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchArticleById } from "../api/spaceflightApi";
import { Article } from "../types/article";

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [article, setArticle] = useState<Article | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (!id) {
      setError("Invalid article ID");
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchArticleById(id)
      .then((data) => setArticle(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>No article found</div>;
  }

  return (
    <div className="article-detail">
      <h1>{article.title}</h1>
      {article.image_url && <img src={article.image_url} alt={article.title} />}
      <p>{new Date(article.published_at).toLocaleDateString()}</p>
      <p>{article.summary}</p>
      {article.url && (
        <a href={article.url} target="_blank" rel="noopener noreferrer">
          Read the full article
        </a>
      )}
    </div>
  );
};

export default ArticleDetail;
