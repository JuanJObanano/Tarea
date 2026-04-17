function Card({ titulo, descripcion }) {
  return (
    <article className="card">
      <h2>{titulo}</h2>
      <p>{descripcion}</p>
    </article>
  );
}

export default Card;