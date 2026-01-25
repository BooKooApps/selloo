import ProductCard from "../cards/productcard";

type Product = {
  id: string;
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
};

type ProductCategoryProps = {
  title: string;
  products: Product[];
};

export default function ProductCategory({
  title,
  products,
}: ProductCategoryProps) {
  return (
    <section className="mb-14">
      {/* Category Header */}
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-white tracking-tight">
          {title}
        </h2>

        {/* Optional future action */}
        <button className="text-sm text-[#fa4616] hover:underline">
          View all
        </button>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  );
}
