"use client";

import AnimatedSection from "./AnimatedSection";
import { ShieldCheck, Zap, SlidersHorizontal } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Verified",
    text: "Every professional undergoes strict background and skill verification.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    text: "Get matched with nearby workers in minutes.",
  },
  {
    icon: SlidersHorizontal,
    title: "Radically Simple",
    text: "Manage scheduling and payments from one dashboard.",
  },
];

export default function Features() {
  return (
    <AnimatedSection>

      <section className="max-w-md mx-auto bg-orange-100 rounded-3xl p-6 mt-16">

        <h2 className="text-4xl font-extrabold text-center mb-14">
          The LabourBaba Solution
        </h2>

        <div className="space-y-6">

          {features.map((item, index) => {

            const Icon = item.icon;

            return (

              <AnimatedSection key={index}>

                <div className="bg-white rounded-2xl p-8 shadow">

                  <div className="w-16 h-16 rounded-xl bg-orange-100 flex items-center justify-center mx-auto">

                    <Icon className="text-orange-500"/>

                  </div>

                  <h3 className="text-xl font-bold text-center mt-5">

                    {item.title}

                  </h3>

                  <p className="text-gray-500 mt-3 text-center">

                    {item.text}

                  </p>

                </div>

              </AnimatedSection>

            );

          })}

        </div>

      </section>

    </AnimatedSection>
  );
}