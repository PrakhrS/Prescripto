'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Droplet, Brain, FileText, Upload, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function AnalyzeReportPage() {
  const reportTypes = [
    {
      icon: <Droplet className="w-16 h-16" />,
      title: "Blood Report Summarization",
      description: "Upload your blood test reports to get an AI-generated summary with key findings, abnormal values, and easy-to-understand explanations",
      features: ["Complete blood count analysis", "Biochemistry panel summary", "Abnormal value highlighting", "Health indicators"],
      color: "from-red-500 to-rose-600",
      bgGradient: "from-red-50/80 to-rose-50/80",
      borderColor: "border-red-400",
      hoverBg: "hover:from-red-50 hover:to-rose-50",
      route: "/analyze-report/blood"
    },
    {
      icon: <Brain className="w-16 h-16" />,
      title: "MRI Report Summarization",
      description: "Upload your MRI scan reports to receive a simplified summary explaining findings, anatomical details, and clinical impressions in plain language",
      features: ["Anatomical findings summary", "Clinical impressions", "Technical terms simplified", "Key observations"],
      color: "from-blue-500 to-cyan-600",
      bgGradient: "from-blue-50/80 to-cyan-50/80",
      borderColor: "border-blue-400",
      hoverBg: "hover:from-blue-50 hover:to-cyan-50",
      route: "/analyze-report/mri"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-cyan-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium mb-8 group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.15 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 backdrop-blur-sm rounded-full border border-blue-400/30 mb-6"
          >
            <FileText className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-900">AI-Powered Report Analysis</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6"
          >
            Choose Your{' '}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              Report Type
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Select the type of medical report you want to analyze. Our AI will provide a comprehensive summary
            in simple, easy-to-understand language.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {reportTypes.map((type, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02, y: -5 }}
              className="group"
            >
              <Link href={type.route}>
                <div className={`bg-gradient-to-br ${type.bgGradient} backdrop-blur-md rounded-2xl p-8 border-2 ${type.borderColor} ${type.hoverBg} transition-all duration-300 shadow-lg hover:shadow-2xl h-full`}>
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className={`inline-flex p-4 rounded-xl bg-gradient-to-r ${type.color} text-white mb-6 shadow-lg`}
                  >
                    {type.icon}
                  </motion.div>

                  <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    {type.title}
                  </h2>

                  <p className="text-gray-700 mb-6 leading-relaxed">
                    {type.description}
                  </p>

                  <div className="space-y-3 mb-8">
                    {type.features.map((feature, featureIndex) => (
                      <motion.div
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 + index * 0.1 + featureIndex * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <Sparkles className="w-4 h-4 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className={`w-full bg-gradient-to-r ${type.color} text-white px-6 py-4 rounded-lg font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group-hover:shadow-xl`}
                  >
                    <Upload className="w-5 h-5" />
                    Upload {type.title.split(' ')[0]} Report
                  </motion.button>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="bg-white/80 backdrop-blur-sm rounded-xl p-8 border border-gray-200 max-w-4xl mx-auto shadow-md">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              How It Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl">1</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Upload Report</h4>
                <p className="text-gray-600 text-sm">Choose your report type and upload the file</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl">2</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Analysis</h4>
                <p className="text-gray-600 text-sm">Our AI processes and analyzes your report</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold text-xl">3</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Get Summary</h4>
                <p className="text-gray-600 text-sm">Receive a clear, easy-to-understand summary</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}