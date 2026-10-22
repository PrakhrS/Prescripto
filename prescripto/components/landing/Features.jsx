'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Pill, Clock, FileBarChart, Shield, Smartphone } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Prescription Upload",
      description: "Simply upload a photo of your medical prescription and let our AI extract all the critical information accurately",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Pill className="w-8 h-8" />,
      title: "Medicine Extraction",
      description: "Automatically identify medicine names from handwritten or printed prescriptions with high accuracy",
      color: "from-cyan-500 to-cyan-600"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Dosage & Frequency",
      description: "Extract precise dosage amounts and frequency schedules so you never miss or confuse your medication timing",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: <FileBarChart className="w-8 h-8" />,
      title: "Report Analysis",
      description: "Upload medical reports and receive AI-generated summaries that explain complex medical information in simple terms",
      color: "from-blue-600 to-cyan-600"
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your medical information is encrypted and processed with the highest security standards to protect your privacy",
      color: "from-indigo-500 to-blue-600"
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Easy Access",
      description: "Access your prescription history and report summaries anytime, anywhere from any device with internet connection",
      color: "from-cyan-600 to-teal-600"
    }
  ];

  return (
    <section className="py-20 bg-linear-to- from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.h2
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-600 bg-clip-text text-transparent mb-4"
          >
            Powerful AI-Driven Features
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Our platform combines advanced NLP technology and machine learning to deliver accurate prescription analysis
            and medical report summarization.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)"
              }}
              viewport={{ once: true }}
              className="group bg-white p-8 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 hover:border-blue-200"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className={`inline-flex p-4 rounded-lg bg-gradient-to-r ${feature.color} text-white mb-6`}
              >
                {feature.icon}
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 + 0.1 }}
                viewport={{ once: true }}
                className="text-xl font-semibold text-gray-900 mb-4"
              >
                {feature.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 + 0.15 }}
                viewport={{ once: true }}
                className="text-gray-600 leading-relaxed"
              >
                {feature.description}
              </motion.p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
