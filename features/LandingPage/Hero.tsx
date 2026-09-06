"use client";

import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative overflow-hidden">

            <div className="absolute inset-0 -z-10 pointer-events-none">
                <div className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-orange-200 blur-3xl opacity-30" />
                <div className="absolute right-0 top-20 h-52 w-52 rounded-full bg-blue-200 blur-3xl opacity-30" />
            </div>

            <div className="max-w-md mx-auto px-6 py-20">

                <motion.h1
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-center text-5xl font-extrabold leading-tight"
                >
                    Find Trusted{" "}
                    <span className="text-orange-500">Workers</span>
                    <br />
                    Near You in{" "}
                    <span className="text-orange-500">Minutes</span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.08 }}
                    className="mt-8 text-center text-gray-500 text-lg leading-8"
                >
                    Connect with verified professionals and hire skilled workers
                    instantly anywhere in your city.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.16 }}
                    className="mt-14 flex justify-between rounded-2xl bg-white p-5 shadow-lg"
                >
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-orange-500">10K+</h3>
                        <p className="text-gray-500 text-sm">Workers</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-orange-500">4.9★</h3>
                        <p className="text-gray-500 text-sm">Rating</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-orange-500">24/7</h3>
                        <p className="text-gray-500 text-sm">Support</p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
}