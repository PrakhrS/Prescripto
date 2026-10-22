'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, ScanSearch } from 'lucide-react';
import { useRouter } from 'next/navigation';

const Hero = () => {
    const router = useRouter();

  return (
    <section
      className="relative min-h-screen flex items-center justify-center bg-linear-to- from-blue-50 via-white to-cyan-50"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-400/30 mb-8"
          >
            <ScanSearch className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">AI-Powered Prescription Analysis</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight"
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              Decode Medical Prescriptions
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="block bg-linear-to- from-blue-600 to-cyan-500 bg-clip-text text-transparent"
            >
              With AI Precision
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-xl md:text-2xl text-gray-600 mb-10 max-w-4xl mx-auto leading-relaxed"
          >
            Upload your medical prescriptions and reports to instantly extract medicines, dosages, and frequencies.
            Get AI-generated summaries that make medical information easy to understand.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <motion.button
            onClick={() => router.push("/upload-prescription")}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 shadow-xl hover:shadow-2xl cursor-pointer"
            >
              Upload Prescription
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
              >
                <ArrowRight className="w-5 h-5" />
              </motion.div>
            </motion.button>

            <motion.button
            onClick={() => router.push("/analyze-report")}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="group bg-white hover:bg-gray-50 text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center gap-2 cursor-pointer"
            >
              <FileText className="w-5 h-5" />
              Analyze Report
            </motion.button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:bg-white transition-all duration-300 shadow-md"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.4 }}
                className="text-3xl font-bold text-blue-600 mb-2"
              >
                99%
              </motion.div>
              <div className="text-gray-700">Accuracy Rate</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:bg-white transition-all duration-300 shadow-md"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.45 }}
                className="text-3xl font-bold text-blue-600 mb-2"
              >
                &lt;5s
              </motion.div>
              <div className="text-gray-700">Processing Time</div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-200 hover:bg-white transition-all duration-300 shadow-md"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
                className="text-3xl font-bold text-blue-600 mb-2"
              >
                24/7
              </motion.div>
              <div className="text-gray-700">Available Access</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        >
          <div className="w-6 h-10 border-2 border-blue-600/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-blue-600/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
