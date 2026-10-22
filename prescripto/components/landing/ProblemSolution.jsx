'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Eye, Clock, Target, Sparkles, Zap } from 'lucide-react';

const ProblemSolution = () => {
  const problems = [
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Illegible Handwriting",
      description: "Doctor's handwriting on prescriptions is often difficult to read, leading to confusion about medicine names and dosages"
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: "Medication Errors",
      description: "Misreading prescriptions can result in taking wrong medicines or incorrect dosages, posing serious health risks"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Complex Reports",
      description: "Medical reports are filled with technical jargon that's overwhelming and time-consuming for patients to understand"
    }
  ];

  const solutions = [
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Smart Extraction",
      description: "Advanced NLP models accurately extract medicine names, dosages, and frequency from prescriptions with high precision"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Instant Summaries",
      description: "AI-powered summarization converts complex medical reports into clear, easy-to-understand summaries for patients"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Clear Information",
      description: "Structured output presents all critical medication details in an organized, accessible format for patient safety"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50 to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 bg-clip-text text-transparent mb-4"
          >
            From Confusion to Clarity
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Reading medical prescriptions shouldn't be a puzzle. Our AI platform makes healthcare information accessible to everyone.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-red-600 mb-8 flex items-center gap-3"
            >
              <AlertTriangle className="w-8 h-8" />
              Common Challenges
            </motion.h3>
            <div className="space-y-6">
              {problems.map((problem, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.2 + index * 0.05 }}
                  whileHover={{ scale: 1.02, x: 5 }}
                  viewport={{ once: true }}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-xl shadow-md border-l-4 border-red-400 hover:shadow-lg hover:bg-white transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="text-red-500 mt-1"
                    >
                      {problem.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-lg">{problem.title}</h4>
                      <p className="text-gray-600">{problem.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
          >
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-2xl md:text-3xl font-bold text-blue-600 mb-8 flex items-center gap-3"
            >
              <Target className="w-8 h-8" />
              Our Solution
            </motion.h3>
            <div className="space-y-6">
              {solutions.map((solution, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.25 + index * 0.05 }}
                  whileHover={{ scale: 1.02, x: -5 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm p-6 rounded-xl shadow-md border-l-4 border-blue-400 hover:shadow-lg hover:from-blue-50 hover:to-cyan-50 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="text-blue-600 mt-1"
                    >
                      {solution.icon}
                    </motion.div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2 text-lg">{solution.title}</h4>
                      <p className="text-gray-600">{solution.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
