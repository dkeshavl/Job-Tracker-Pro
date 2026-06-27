function StatsCard({ title, value }) {
  return (
    <div className="bg-[#111111] border border-gray-800 rounded-xl p-5 hover:border-gray-600 transition">
      <p className="text-gray-400 text-sm">
        {title}
      </p>

      <h2 className="text-3xl font-bold text-white mt-2">
        {value}
      </h2>
    </div>
  );
}

export default StatsCard;