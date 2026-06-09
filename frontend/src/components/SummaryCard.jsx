function SummaryCard({
  title,
  students,
}) {
  const isPresent = title.toLowerCase() === "present";

  return (
    <section className={`summary-card ${isPresent ? "present" : "absent"}`}>
      <div className="summary-card-header">
        <h3 className="summary-card-title">{title}</h3>

        <span className="summary-count">{students.length}</span>
      </div>

      <ul className="summary-list">
        {students.map((item) => (
          <li key={item.id} className="summary-list-item">
            {item.Student?.name}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default SummaryCard;