export default function Card({ card }) {
    return (
      <div className="w-24 h-36 bg-white rounded-xl shadow-lg text-black p-2 flex flex-col justify-between">
        <div className="text-xs text-gray-600">{card.type.toUpperCase()}</div>
        <div className="text-sm font-bold text-center">{card.name}</div>
      </div>
    );
  }