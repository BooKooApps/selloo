import Image from "next/image";

type ProductCardProps = {
  title: string;
  description: string;
  price: string;
  imageUrl?: string;
  onClick?: () => void;
};

export default function ProductCard({
  title,
  description,
  price,
  imageUrl,
  onClick,
}: ProductCardProps) {
  return (
    <div
      onClick={onClick}
      className="group cursor-pointer rounded-2xl p-4 bg-[#0b0b0b] border border-white/10 shadow-lg transition hover:border-[#fa4616]/50"
    >
      {/* Preview */}
      <div className="relative h-44 w-full bg-white overflow-hidden rounded-t-2xl">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-cover"
          />
        ) : (
         <div className="h-full w-full bg-gradient-to-br from-[#5a2414] via-[#3a160b] to-[#050505] flex items-center justify-center">
  <span className="text-xs text-gray-400 tracking-wide">
    Product Preview
  </span>
</div>

        )}
      </div>

      {/* Content */}
      <div className=" py-5 flex flex-col gap-3">
        {/* Creator */}
        <p className="text-xs text-gray-400">
          Selloo <span className="text-gray-500">by Creator</span>
        </p>

        {/* Title + Price */}
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold text-white leading-tight">
            {title}
          </h3>

          <span className="shrink-0 rounded-full bg-[#fa4616]/20 px-3 py-1 text-sm font-semibold text-[#fa4616]">
            {price}
          </span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-400 leading-relaxed line-clamp-3">
          {description}
        </p>

        {/* Features */}
        <ul className="mt-1 space-y-1 text-sm text-gray-300">
          <li>• Instant digital delivery</li>
          <li>• Lifetime access</li>
          <li>• Future updates included</li>
        </ul>

        {/* CTA */}
        <button className="mt-4 w-full rounded-lg bg-[#fa4616] py-2.5 text-sm font-semibold text-white transition hover:bg-[#ff5a2e]">
          Buy Now
        </button>
      </div>
    </div>
  );
}
