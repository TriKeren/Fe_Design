import data from '/public/assets/json/product.json'; // Pastikan jalur JSON benar

const PremiumCategory = () => {
    // Filter hanya produk dengan opsi 'premium'
    const premiumProducts = data.products.filter(product => product.options === 'premium');

    return ( 
        <div className="max-w-screen-xl mx-auto p-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {premiumProducts.map(({ id, name, image, price, options }) => (
                    <div key={id} className="bg-white shadow-2xl border rounded-2xl overflow-hidden">
                        <img src={image} alt={name} className="w-full h-auto p-3" />
                        <div className="px-3 mb-4">
                            <p className="text-[24px] font-normal mb-4">{name}</p>
                            <div className="flex justify-between items-center text-[20px]">
                                <p className="font-bold text-black">{options}</p>
                                <p className="font-semibold text-blue-600">{price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
 
export default PremiumCategory;
