const Skeleton = () => (
    <section className="container mx-auto p-4 lg:p-8">
        <div className="mb-6">
            <div className="h-8 bg-gray-300 rounded w-3/4 mb-2 animate-shimmer bg-[length:800px_104px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
            <div className="h-4 bg-gray-300 rounded w-1/4 animate-shimmer bg-[length:800px_104px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
        </div>

        <div className="flex flex-col lg:flex-row lg:space-x-8">
            <div className="lg:w-2/3">
                <div className="bg-gray-300 h-64 w-full mb-4 animate-shimmer bg-[length:800px_104px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
                <div className="mt-4">
                    <div className="h-6 bg-gray-300 rounded w-2/3 mb-2 animate-shimmer bg-[length:800px_104px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2 animate-shimmer bg-[length:800px_104px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
                </div>
            </div>

            <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg mt-4 lg:mt-0">
                <div className="h-6 bg-gray-300 rounded w-2/3 mb-4 animate-shimmer bg-[length:800px_104px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-2 animate-shimmer bg-[length:800px_104px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
                <div className="h-4 bg-gray-300 rounded w-full mb-4 animate-shimmer bg-[length:800px_104px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>

                <div className="h-12 bg-gray-300 rounded-lg animate-shimmer bg-[length:800px_104px] bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300"></div>
            </div>
        </div>
    </section>
);

export default Skeleton;
