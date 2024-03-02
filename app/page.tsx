"use client";

import Pan from "@/components/Pan";
import { useState } from "react";

export default function Home() {
  const [totalBakedPancakes, setTotalBakedPancakes] = useState<number>(0);
  const [totalBurnedPancakes, setTotalBurnedPancakes] = useState<number>(0);

  const handleBakedPancakes = () => {
    setTotalBakedPancakes((prevCount) => prevCount + 1);
  };
  const handleBurnedPancakes = () => {
    setTotalBurnedPancakes((prevCount) => prevCount + 1);
  };

  return (
    <>
      <div className="flex gap-5 justify-center">
        <div className="text-green-500">
          <h2>Baked: {totalBakedPancakes}</h2>
        </div>
        <div className="text-red-500">
          <h2>Burned: {totalBurnedPancakes}</h2>
        </div>
      </div>

      <div className="grid grid-cols-5 gap-4 mt-5">
        {[...Array(10)].map((_, index) => (
          <Pan
            key={index}
            onBakedPancake={handleBakedPancakes}
            onBurnedPancake={handleBurnedPancakes}
          />
        ))}
      </div>
    </>
  );
}
