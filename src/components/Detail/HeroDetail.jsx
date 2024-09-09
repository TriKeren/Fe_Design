const HeroDetail = () => {
    return (
        <section className="container mx-auto p-8">
            {/* Nama produk */}
            <div className="mb-6">
                <h1 className="text-3xl font-bold">Minimalist Furniture</h1>
                <p>Categori in Website</p>
            </div>

            {/* Konten utama */}
            <div className="flex flex-col lg:flex-row lg:space-x-8">
                {/* Gambar produk */}
                <div className="lg:w-2/3">
                    <img
                        src="/public/assets/images/furniture.png"
                        alt="Product"
                        className="w-full h-auto mb-4"
                    />
                    {/* Deskripsi produk */}
                    <div className="mt-4">
                        <h2 className="text-2xl font-semibold mb-2">Product Description</h2>
                        <p className="text-gray-600">
                            This is an amazing product that offers incredible features and
                            capabilities. It is designed to help you achieve your goals with
                            ease and efficiency. Whether youre looking to streamline your
                            work or enjoy entertainment, this product is the perfect
                            companion.
                        </p>
                    </div>
                </div>

                {/* Kotak teks dan button download */}
                <div className="lg:w-1/3 bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold mb-4">Get the Product Now!</h3>
                    <p className="text-gray-700 mb-6">
                        Download and start using the amazing features of this product today.
                    </p>
                    <button className="bg-blue-500 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out hover:bg-blue-600">
                        Download Now
                    </button>
                </div>
            </div>
        </section>
    );
}

export default HeroDetail;