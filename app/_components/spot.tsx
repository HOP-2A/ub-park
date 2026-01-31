export function Spot({ available, avatar }) {
  if (avatar) {
    return (
      <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow">
        <img src={avatar} alt="User" className="w-full h-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={`w-8 h-8 rounded-full ${
        available ? "bg-green-500" : "bg-gray-400"
      }`}
    />
  );
}
