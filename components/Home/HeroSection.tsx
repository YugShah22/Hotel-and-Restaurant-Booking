'use client';
import { motion } from 'framer-motion';

export default function HeroSection() {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className="relative text-center py-24 px-6 sm:px-10 lg:px-20 text-white bg-gradient-to-br from-[#1f1c2c] via-[#928dab] to-[#1f1c2c] overflow-hidden"
    >
      {/* Blurred luxury image overlay */}
      <div className="absolute inset-0 bg-[url('/image/leela.jpg')] bg-cover bg-center opacity-20 blur-sm"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.h1
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight text-shadow-lg"
        >
          BookMyMumbai
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 1 }}
          className="mt-6 text-xl sm:text-2xl font-light text-gray-200"
        >
          Book luxury hotels and fine dining experiences across Mumbai — curated for elegance and ease.
        </motion.p>

        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-10"
        >
          <a
            href="#hotels"
            className="inline-block relative px-8 py-4 font-semibold text-[#1f1c2c] bg-white rounded-full shadow-xl transition-all duration-500 hover:bg-gradient-to-r hover:from-yellow-400 hover:to-gold-400 hover:text-white hover:shadow-2xl group"
          >
            <span className="relative z-10">Explore Premium Stays</span>
            <span className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 opacity-0 group-hover:opacity-100 transition duration-500 blur-sm"></span>
          </a>
        </motion.div>
      </div>
    </motion.section>
  );
}