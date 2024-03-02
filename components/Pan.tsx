"use client";

import { useRef, useState } from "react";

enum PanState {
  EMPTY = "empty",
  POURING = "pouring",
  COOKING = "cooking",
  DONE = "done",
  BURNED = "burned",
}

interface Props {
  onBakedPancake: () => void;
  onBurnedPancake: () => void;
}

export default function Pan({ onBakedPancake, onBurnedPancake }: Props) {
  const [panStatus, setPanStatus] = useState<PanState>(PanState.EMPTY);

  const cookingTimeoutRef = useRef<number | null>(null);
  const doneTimeoutRef = useRef<number | null>(null);
  const burnedTimeoutRef = useRef<number | null>(null);

  const handlePanClick = () => {
    clearTimeouts();

    setPanStatus(PanState.POURING);

    if (panStatus === PanState.DONE) {
      onBakedPancake();
    }

    cookingTimeoutRef.current = window.setTimeout(() => {
      setPanStatus(PanState.COOKING);

      doneTimeoutRef.current = window.setTimeout(() => {
        setPanStatus(PanState.DONE);
      }, 5000);

      burnedTimeoutRef.current = window.setTimeout(() => {
        setPanStatus(PanState.BURNED);
        onBurnedPancake();
      }, 8000);
    }, 1000);
  };

  const clearTimeouts = () => {
    if (cookingTimeoutRef.current !== null) {
      clearTimeout(cookingTimeoutRef.current);
    }
    if (doneTimeoutRef.current !== null) {
      clearTimeout(doneTimeoutRef.current);
    }
    if (burnedTimeoutRef.current !== null) {
      clearTimeout(burnedTimeoutRef.current);
    }
  };

  const computePancake = (): string => {
    if (panStatus === PanState.POURING) {
      return "bg-yellow-100";
    }
    if (panStatus === PanState.COOKING) {
      return "bg-yellow-400";
    }
    if (panStatus === PanState.DONE) {
      return "bg-yellow-600";
    }
    if (panStatus === PanState.BURNED) {
      return "bg-orange-800";
    }
    return "bg-gray-400";
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div
        className={`
      rounded-full w-60 h-60 border-4 border-black
      cursor-pointer shadow-2xl
      ${computePancake()}
      `}
        onClick={handlePanClick}
      ></div>
      <div className="w-10 h-40 shadow-2xl mt-[-5px] bg-black rounded-md"></div>
    </div>
  );
}
