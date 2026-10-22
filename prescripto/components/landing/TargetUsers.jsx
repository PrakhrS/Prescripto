'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Users, Stethoscope, UserCheck, Heart } from 'lucide-react';

const TargetUsers = () => {
  const users = [
    {
      icon: <Users className="w-12 h-12" />,
      title: "General Patients",
      description: "Anyone who struggles to read doctor's handwriting or understand complex medical prescriptions and reports",
      benefits: ["Easy understanding", "No medical knowledge needed", "Quick results"]
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: "Elderly Care",
      description: "Seniors who need clear medication instructions and simplified medical information for better health management",
      benefits: ["Large text output", "Simple explanations", "Medication reminders"]
    },
    {
      icon: <UserCheck className="w-12 h-12" />,
      title: "Caregivers",
      description: "Family members and professional caregivers managing medications for others who need organized information",
      benefits: ["Track multiple prescriptions", "Share with family", "Medication history"]
    },
    {
      icon: <Stethoscope className="w-12 h-12" />,
      title: "Healthcare Workers",
      description: "Nurses and pharmacists who need to quickly verify prescription details and communicate clearly with patients",
      benefits: ["Fast verification", "Clear documentation", "Patient education"]
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900">
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
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent mb-4"
          >
            Built for Everyone in Healthcare
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            viewport={{ once: true }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            NLP Prescripto serves patients, caregivers, and healthcare professionals,
            making medical information accessible to all.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {users.map((user, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{
                scale: 1.05,
                y: -10,
                backgroundColor: "rgba(30, 58, 138, 0.6)"
              }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-gray-800/80 to-blue-900/80 p-8 rounded-xl border border-gray-700 transition-all duration-300 group hover:border-blue-500/50"
            >
              <motion.div
                whileHover={{ scale: 1.2, rotate: 360 }}
                transition={{ duration: 0.6 }}
                className="text-blue-400 mb-6"
              >
                {user.icon}
              </motion.div>
              <motion.h3
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 + 0.1 }}
                viewport={{ once: true }}
                className="text-xl font-semibold text-white mb-4"
              >
                {user.title}
              </motion.h3>
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: index * 0.05 + 0.15 }}
                viewport={{ once: true }}
                className="text-gray-300 mb-6 leading-relaxed"
              >
                {user.description}
              </motion.p>
              <div className="space-y-2">
                {user.benefits.map((benefit, benefitIndex) => (
                  <motion.div
                    key={benefitIndex}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 + 0.2 + benefitIndex * 0.03 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-2"
                  >
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: benefitIndex * 0.2 }}
                      className="w-2 h-2 bg-blue-400 rounded-full"
                    />
                    <span className="text-sm text-gray-400">{benefit}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TargetUsers;
