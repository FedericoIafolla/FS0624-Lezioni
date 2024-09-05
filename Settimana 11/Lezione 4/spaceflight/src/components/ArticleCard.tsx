import React from "react";
import { Link } from "react-router-dom";
import { Article } from "../types/article";

interface ArticleCardProps {
  article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
  return (
    <div className="article-card">
      <Link to={`/articles/${article.id}`}>
        <img src={article.image_url} alt={article.title} />
        <h2>{article.title}</h2>
      </Link>
      <p>{article.summary}</p>
    </div>
  );
};

export default ArticleCard;
