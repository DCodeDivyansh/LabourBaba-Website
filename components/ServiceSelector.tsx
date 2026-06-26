"use client";

import { useState } from "react";
import { Hammer, Wrench, Minus, Plus } from "lucide-react";

const services = [
  {
    title: "Labour",
    icon: Wrench,
  },
  {
    title: "Mason",
    icon: Hammer,
  },
];

type ServiceType = "Labour" | "Mason";

export default function ServiceSelector() {
  const [selectedService, setSelectedService] =
    useState<ServiceType>("Labour");

  const [workerCount, setWorkerCount] = useState(1);

  const increment = () => {
    setWorkerCount((prev) => prev + 1);
  };

  const decrement = () => {
    setWorkerCount((prev) => Math.max(1, prev - 1));
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <div>
        <h2 className="text-2xl font-bold text-[#1F2937]">
          Service Required
        </h2>

        <p className="text-gray-500 mt-1">
          Select one service and choose the number of workers.
        </p>
      </div>

      {/* Service Selection */}
      <div className="grid grid-cols-2 gap-4">
        {services.map((service) => {
          const Icon = service.icon;

          const active =
            selectedService === service.title;

          return (
            <button
              key={service.title}
              onClick={() =>
                setSelectedService(
                  service.title as ServiceType
                )
              }
              className={`
                rounded-2xl
                border
                p-5
                transition-all
                duration-300
                ${
                  active
                    ? "bg-[#FF5404] border-[#FF5404] text-white shadow-lg scale-[1.02]"
                    : "bg-white border-[#E2BFB0] hover:border-[#FF5404]"
                }
              `}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`
                    w-12
                    h-12
                    rounded-full
                    flex
                    items-center
                    justify-center
                    ${
                      active
                        ? "bg-white text-[#FF5404]"
                        : "bg-orange-100 text-[#FF5404]"
                    }
                  `}
                >
                  <Icon size={22} />
                </div>

                <h3 className="mt-3 font-semibold text-lg">
                  {service.title}
                </h3>
              </div>
            </button>
          );
        })}
      </div>

      {/* Worker Counter */}
      <div className="bg-white border border-[#E2BFB0] rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between">

          <div>
            <h3 className="font-semibold text-xl">
              {selectedService}
            </h3>

            <p className="text-gray-500 text-sm">
              Number of workers
            </p>
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={decrement}
              className="
                w-11
                h-11
                rounded-full
                border
                border-[#E2BFB0]
                flex
                items-center
                justify-center
                hover:bg-gray-100
              "
            >
              <Minus size={18} />
            </button>

            <span className="text-2xl font-bold w-8 text-center">
              {workerCount}
            </span>

            <button
              onClick={increment}
              className="
                w-11
                h-11
                rounded-full
                bg-[#FF5404]
                text-white
                flex
                items-center
                justify-center
                hover:bg-orange-600
              "
            >
              <Plus size={18} />
            </button>

          </div>
        </div>
      </div>

      {/* Summary */}
      <div className="rounded-2xl bg-orange-50 border border-orange-200 p-4">
        <h3 className="font-semibold text-[#FF5404]">
          Request Summary
        </h3>

        <div className="mt-3 flex justify-between">
          <span>Service</span>
          <span className="font-medium">
            {selectedService}
          </span>
        </div>

        <div className="mt-2 flex justify-between">
          <span>Workers Required</span>
          <span className="font-medium">
            {workerCount}
          </span>
        </div>
      </div>
    </div>
  );
}