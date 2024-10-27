function InclusionsList({ inclusions }) {
  return (
    <ul className="text-sm text-gray-800" aria-label="Inclusions list">
      {inclusions.map((inclusion, index) => (
        <li key={index} className="list-disc ml-4">
          {inclusion}
        </li>
      ))}
    </ul>
  );
}

export default InclusionsList;
