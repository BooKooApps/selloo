"use client";

import { useState } from "react";
import Sidebar from "@/app/components/layout/sidebar";
import ProductSlider from "@/app/components/layout/slider";
import { FiSettings } from "react-icons/fi";

export default function ExperienceClient({
  isAdmin,
  user,
}: {
  isAdmin: boolean;
  user: {
    name: string;
    username: string;
    avatarUrl: string | null;
  };
}) {
  /* =========================
     DEV / SETUP STATE
  ========================= */
  const [isStoreSetup, setIsStoreSetup] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  /* =========================
     STORE DATA (DEV STATE)
  ========================= */
  const [storeTitle, setStoreTitle] = useState("Store Name");
  const [storeDescription, setStoreDescription] = useState(
    "Store Description"
  );

  const categories = [
    {
      title: "Daily Betting Tips",
      products: [
        {
          id: "1",
          name: "NBA Locks – Today",
          description: "High-confidence NBA picks powered by data models.",
          price: 9.99,
          currency: "USD",
        },
        {
          id: "2",
          name: "Soccer Accumulators",
          description: "Carefully selected multi-leg soccer bets.",
          price: 14.99,
          currency: "USD",
        },
      ],
    },
  ];

  return (
    <div className="min-h-screen text-white">
      {/* Sidebar ONLY after setup */}
      {isAdmin && isStoreSetup && <Sidebar user={user} />}

      <main
        className={`p-10 transition-all ${
          isAdmin && isStoreSetup ? "ml-64" : ""
        }`}
      >
        {/* ========================= */}
        {/* FIRST-TIME STORE SETUP */}
        {/* ========================= */}
        {isAdmin && !isStoreSetup && (
          <div className="max-w-5xl">
            <h1 className="text-4xl font-bold mb-4">
              Set up your store
            </h1>
            <p className="text-gray-400 mb-10">
              Let’s get your store ready for customers.
            </p>

            <div className="flex flex-col gap-8">
              <input
                value={storeTitle}
                onChange={(e) => setStoreTitle(e.target.value)}
                placeholder="Store title"
                className="bg-[#1f1f1f] px-6 py-5 text-3xl font-bold rounded-2xl border border-gray-700 focus:border-orange-500 outline-none"
              />

              <textarea
                value={storeDescription}
                onChange={(e) => setStoreDescription(e.target.value)}
                placeholder="Describe what you sell"
                rows={5}
                className="bg-[#1f1f1f] px-6 py-5 text-lg rounded-2xl border border-gray-700 focus:border-orange-500 outline-none resize-none"
              />

              <button
                onClick={() => setIsStoreSetup(true)}
                className="rounded-2xl bg-[#fa4616] px-8 py-5 text-lg font-semibold hover:bg-orange-500 transition"
              >
                Save & Continue
              </button>
            </div>
          </div>
        )}

        {/* ========================= */}
        {/* NORMAL STORE VIEW */}
        {/* ========================= */}
        {isStoreSetup && (
          <>
            {/* Store Header */}
            <header className="mb-10 flex items-start gap-6">
              <div className="flex-1 flex flex-col gap-3">
                {isAdmin && showSettings ? (
                  <>
                    <input
                      value={storeTitle}
                      onChange={(e) => setStoreTitle(e.target.value)}
                      className="bg-[#1f1f1f] w-full px-6 py-4 text-4xl font-bold rounded-xl border border-gray-600 focus:border-orange-500 outline-none"
                    />
                    <textarea
                      value={storeDescription}
                      onChange={(e) =>
                        setStoreDescription(e.target.value)
                      }
                      rows={3}
                      className="bg-[#1f1f1f] w-full px-6 py-4 rounded-xl border border-gray-600 focus:border-orange-500 outline-none resize-none"
                    />
                  </>
                ) : (
                  <>
                    <h1 className="text-4xl font-bold">
                      {storeTitle}
                    </h1>
                    <p className="text-gray-400 max-w-3xl">
                      {storeDescription}
                    </p>
                  </>
                )}
              </div>

              {isAdmin && (
                <button
                  onClick={() =>
                    setShowSettings(!showSettings)
                  }
                  className={`rounded-xl border p-3 transition ${
                    showSettings
                      ? "border-[#fa4616] text-[#fa4616]"
                      : "hover:bg-[#1f1f1f]"
                  }`}
                >
                  <FiSettings className="h-5 w-5" />
                </button>
              )}
            </header>

            {/* Admin Global Actions */}
            {isAdmin && showSettings && (
              <div className="mb-8 flex gap-4">
                <button className="rounded-xl bg-[#fa4616] px-6 py-3 font-semibold hover:bg-orange-500 transition">
                  + Create Category
                </button>
              </div>
            )}

            {/* Categories */}
            <div className="space-y-20">
              {categories.map((category) => (
                <section key={category.title}>
                  <div className="mb-6 flex items-center justify-between">
                    <h2 className="text-xl font-semibold">
                      {category.title}
                    </h2>

                    {isAdmin && showSettings && (
                      <button className="rounded-xl bg-[#fa4616] px-4 py-2 font-semibold hover:bg-orange-500 transition">
                        + Create Product
                      </button>
                    )}
                  </div>

                  <ProductSlider
                    products={category.products}
                    categoryName={category.title}
                  />
                </section>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
