import React from "react";

export default function search() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const q = e.target.query.value;
    console.log(q);
  };
  return (
    <div className="search">
      <form onSubmit={handleSubmit}>
        <input type="text" name="query" placeholder="Search" />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
