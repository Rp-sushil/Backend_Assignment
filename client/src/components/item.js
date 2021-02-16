import React from "react";

export default function item({ title, description, imgurl }) {
  return (
    <article className="article" key={title}>
      <a href={imgurl}>
        <h3>{article.title}</h3>
      </a>
      <p>{description}</p>
      <img src={image} width="200px" height="200px" />
    </article>
  );
}
