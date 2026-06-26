"use client";

import { useMemo, useState } from "react";

import TopBar from "@/components/CommonHeader";
import WorkerCard from "@/components/CreateRequest/WorkerCard";
import RateInput from "@/components/CreateRequest/RateInput";
import LocationCard from "@/components/CreateRequest/LocationCard";
import BottomSummary from "@/components/CreateRequest/BottomSummary";

export default function NewRequestPage() {
  const [masonCount, setMasonCount] = useState(0);
  const [labourCount, setLabourCount] = useState(0);

  const [masonRate, setMasonRate] = useState("");
  const [labourRate, setLabourRate] = useState("");

  const masonPrice = Number(masonRate || 0);
  const labourPrice = Number(labourRate || 0);

  const totalWorkers = masonCount + labourCount;

  const totalPrice = useMemo(() => {
    return masonCount * masonPrice + labourCount * labourPrice;
  }, [
    masonCount,
    labourCount,
    masonPrice,
    labourPrice,
  ]);

  return (
    <main className="min-h-screen bg-[#FAFAFA] pb-40">

      <TopBar title={"Create Request"} />

      <div className="max-w-md mx-auto px-4 py-6 space-y-6">

        {/* Mason */}

        <WorkerCard
          title="Mason"
          subtitle="Skilled Construction"
          color="orange"
          count={masonCount}
          setCount={setMasonCount}
        />

        <RateInput
          title="Mason Rate (₹/day)"
          market="Market: ₹700-₹1000"
          value={masonRate}
          onChange={setMasonRate}
          placeholder="e.g. 800"
        />

        {/* Labour */}

        <WorkerCard
          title="Labour"
          subtitle="General Assistance"
          color="blue"
          count={labourCount}
          setCount={setLabourCount}
        />

        <RateInput
          title="Labour Rate (₹/day)"
          market="Market: ₹400-₹600"
          value={labourRate}
          onChange={setLabourRate}
          placeholder="e.g. 500"
        />

        {/* Total */}

        <div className="text-right">

          <p className="text-lg font-semibold text-neutral-700">

            Total Workers:
            <span className="ml-2 text-black">
              {totalWorkers}
            </span>

          </p>

        </div>

        {/* Location */}

        <div>

          <h2 className="text-3xl font-bold mb-5">

            Location

          </h2>

          <LocationCard />

        </div>

      </div>

      <BottomSummary total={totalPrice} />

    </main>
  );
}