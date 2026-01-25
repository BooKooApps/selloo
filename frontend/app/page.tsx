import { Button } from "@whop/react/components";
import Link from "next/link";
import ProductSlider from "./components/layout/slider";

export default function Page() {
  const categories = [
    {
      title: "Daily Betting Tips",
      products: [
        {
          id: "1",
          title: "NBA Locks – Today",
          description: "High-confidence NBA picks powered by data models.",
          price: "$9.99",
        },
        {
          id: "2",
          title: "Soccer Accumulators",
          description: "Carefully selected multi-leg soccer bets.",
          price: "$14.99",
        },
        {
          id: "5",
          title: "Tennis Tips",
          description: "Daily expert tennis predictions.",
          price: "$7.99",
        },
        {
          id: "6",
          title: "MLB Hot Picks",
          description: "Top MLB picks to win your bets.",
          price: "$8.99",
        },
        {
          id: "9",
          title: "MLB Hot Picks",
          description: "Top MLB picks to win your bets.",
          price: "$8.99",
        },
        {
          id: "10",
          title: "MLB Hot Picks",
          description: "Top MLB picks to win your bets.",
          price: "$8.99",
        },
        {
          id: "11",
          title: "MLB Hot Picks",
          description: "Top MLB picks to win your bets.",
          price: "$8.99",
        },
      ],
    },
    {
      title: "Premium Packages",
      products: [
        {
          id: "3",
          title: "Weekly VIP Picks",
          description: "All premium picks for the entire week.",
          price: "$39.99",
        },
        {
          id: "4",
          title: "Monthly Elite Access",
          description: "Full access to every tip and strategy.",
          price: "$99.99",
        },
        {
          id: "7",
          title: "Season Pass",
          description: "All bets and insights for the entire season.",
          price: "$299.99",
        },
        {
          id: "8",
          title: "Exclusive Live Picks",
          description: "Live betting picks with real-time updates.",
          price: "$49.99",
        },
      ],
    },
  ];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 space-y-24">
      {/* Header */}
      <div className="max-w-2xl mx-auto rounded-3xl bg-gray-a2 p-6 border border-gray-a4">
        <div className="text-center mt-6 mb-10">
          <h1 className="text-3xl font-bold text-gray-12 mb-4">
            Welcome to Your Whop App
          </h1>
          <p className="text-gray-10">
            Learn how to build your application on our docs
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            href="https://docs.whop.com/apps"
            target="_blank"
            className="w-full"
          >
            <Button variant="classic" size="4" className="w-full">
              Developer Docs
            </Button>
          </Link>
        </div>
      </div>

      {/* Product Sliders */}
      {categories.map((category) => {
        const sliderProducts = category.products.map((product) => ({
          id: product.id,
          name: product.title,
          description: product.description,
          price: Number(product.price.replace("$", "")),
        }));

        return (
          <section key={category.title} className="max-w-7xl mx-auto">
            <h2 className="mb-6 text-2xl font-bold text-white">
              {category.title}
            </h2>

            <ProductSlider
              products={sliderProducts}
              categoryName={category.title}
            />
          </section>
        );
      })}
    </div>
  );
}
