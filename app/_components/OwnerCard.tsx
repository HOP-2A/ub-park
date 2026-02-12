import { placetype } from "../page";

type OwnerCardProps = {
  place: placetype;
};
export const OwnerCard = ({ place }: OwnerCardProps) => {
  return (
    <div>
      <div className="p-6 border-b border-blue-50">
        <div className="flex items-center gap-3 mb-3">
          <div
            className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 
                            flex items-center justify-center shadow-lg"
          >
            <span className="text-white text-xl">📍</span>
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-800">{place.name}</h3>
          </div>
        </div>
      </div>
      <div className="p-6 space-y-4">
        <div className="flex items-start gap-2 text-sm text-gray-600">
          <span>📌</span>
          <span>{place.address}</span>
        </div>

        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-xs text-gray-500 mb-1">Parking Spots</p>
          <p className="text-2xl font-bold text-blue-600">
            {/* {place.parkings?.length || 0} */}
          </p>
        </div>
      </div>

      <div className="px-6 pb-6">
        <button
          className="w-full bg-gradient-to-r from-blue-600 to-blue-500 
                             text-white font-medium py-3 rounded-lg
                             hover:from-blue-700 hover:to-blue-600
                             transition-all duration-300 shadow-md hover:shadow-lg"
        >
          View Details →
        </button>
      </div>
    </div>
  );
};
