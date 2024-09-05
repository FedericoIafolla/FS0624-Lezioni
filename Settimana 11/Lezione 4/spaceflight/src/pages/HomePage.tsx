import React from "react";
import ArticleList from "../components/ArticleList";

const HomePage: React.FC = () => {
  return (
    <div className="homepage">
      <h1>Spaceflight News</h1>
      <ArticleList />
    </div>
  );
};

export default HomePage;
