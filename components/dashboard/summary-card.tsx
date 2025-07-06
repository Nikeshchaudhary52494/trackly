export default function SummaryCard({
  title,
  value,
  note,
  color,
}: {
  title: string;
  value: string;
  note: string;
  color: string;
}) {
  return (
    <div
      className={`bg-white p-6 rounded-lg shadow-sm border-l-4 border-${color}`}
    >
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{note}</p>
    </div>
  );
}
