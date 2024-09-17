const SkeletonCard = () => {
    return (
        <div className="bg-gray-300 animate-pulse h-[400px] rounded-2xl">
            <div className="w-full h-[300px] bg-gray-200 rounded-t-2xl"></div>
            <div className="px-3 py-4">
                <div className="h-6 bg-gray-200 w-3/4 mb-2 rounded"></div>
                <div className="h-6 bg-gray-200 w-1/4 rounded"></div>
            </div>
        </div>
    );
}

export default SkeletonCard;