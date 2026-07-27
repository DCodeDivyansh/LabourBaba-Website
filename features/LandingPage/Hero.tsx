"use client";

import { motion } from "framer-motion";
import { ArrowRight, MapPin } from "lucide-react";

const title = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.08,
        },
    },
};

const word = {
    hidden: {
        opacity: 0,
        y: 30,
    },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
        },
    },
};

export default function Hero() {
    return (
        <section className="relative overflow-hidden">

            {/* Background */}
            <div className="absolute inset-0 -z-10">

                <motion.div
                    animate={{
                        x: [0, 50, 0],
                        y: [0, 30, 0],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                    }}
                    className="absolute -top-24 -left-16 h-64 w-64 rounded-full bg-orange-200 blur-3xl opacity-30"
                />

                <motion.div
                    animate={{
                        x: [0, -40, 0],
                        y: [0, -40, 0],
                    }}
                    transition={{
                        duration: 12,
                        repeat: Infinity,
                    }}
                    className="absolute right-0 top-20 h-52 w-52 rounded-full bg-blue-200 blur-3xl opacity-30"
                />
            </div>

            <div className="max-w-md mx-auto px-6 py-20">

                {/* Floating Pin */}

                

                {/* Heading */}

                <motion.h1
                    variants={title}
                    initial="hidden"
                    animate="show"
                    className="text-center text-5xl font-extrabold leading-tight"
                >
                    <motion.span variants={word}>Find </motion.span>

                    <motion.span variants={word}>Trusted </motion.span>

                    <motion.span
                        variants={word}
                        className="text-orange-500"
                    >
                        Workers
                    </motion.span>

                    <br />

                    <motion.span variants={word}>Near </motion.span>

                    <motion.span variants={word}>You </motion.span>

                    <motion.span variants={word}>in </motion.span>

                    <motion.span
                        variants={word}
                        className="text-orange-500"
                    >
                        Minutes
                    </motion.span>
                </motion.h1>

                {/* Subtitle */}

                <motion.p
                    initial={{
                        opacity: 0,
                        y: 20,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: .8,
                    }}
                    className="mt-8 text-center text-gray-500 text-lg leading-8"
                >
                    Connect with verified professionals and hire skilled workers
                    instantly anywhere in your city.
                </motion.p>

                {/* CTA */}

                {/* Stats */}

                <motion.div
                    initial={{
                        opacity: 0,
                        y: 40,
                    }}
                    animate={{
                        opacity: 1,
                        y: 0,
                    }}
                    transition={{
                        delay: 1.1,
                    }}
                    className="mt-14 flex justify-between rounded-2xl bg-white p-5 shadow-lg"
                >
                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-orange-500">
                            10K+
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Workers
                        </p>
                    </div>

                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-orange-500">
                            4.9★
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Rating
                        </p>
                    </div>

                    <div className="text-center">
                        <h3 className="text-2xl font-bold text-orange-500">
                            24/7
                        </h3>
                        <p className="text-gray-500 text-sm">
                            Support
                        </p>
                    </div>
                </motion.div>

                {/* Scroll Indicator */}

                <motion.div
                    animate={{
                        y: [0, 10, 0],
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 1.6,
                    }}
                    className="mt-12 flex justify-center"
                >
                    <div className="flex h-12 w-7 justify-center rounded-full border-2 border-orange-400">
                        <motion.div
                            animate={{
                                y: [0, 18, 0],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 1.6,
                            }}
                            className="mt-2 h-2 w-2 rounded-full bg-orange-500"
                        />
                    </div>
                </motion.div>

            </div>
        </section>
    );
}