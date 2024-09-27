const SkeletonCard = () => {
    return Array(6).fill(0).map((_, index) => (
        <div key={index} className="animate-pulse rounded-xl overflow-hidden shadow-lg flex flex-col">
          <div className="bg-gray-300 h-48 w-full"></div>
          <div className="px-4 py-4 flex justify-between">
            <div className="h-4 bg-gray-300 rounded w-2/4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          </div>
        </div>
      ));
}

export default SkeletonCard;