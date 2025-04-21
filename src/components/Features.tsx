'use client';

import { motion } from "framer-motion";
import { Shield, FileCheck, Bell, BarChart, Zap, Lock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Features = () => {
  const { t } = useLanguage();

  const features = [
    {
      icon: Shield,
      titleKey: "smartCompliance",
      descriptionKey: "aiCompliance",
    },
    {
      icon: FileCheck,
      titleKey: "readyTemplates",
      descriptionKey: "industryTemplates",
    },
    {
      icon: Bell,
      titleKey: "realTimeAlerts",
      descriptionKey: "stayUpdated",
    },
    {
      icon: BarChart,
      titleKey: "auditReports",
      descriptionKey: "generateReports",
    },
    {
      icon: Zap,
      titleKey: "fastSetup",
      descriptionKey: "getStartedMinutes",
    },
    {
      icon: Lock,
      titleKey: "dataSecurity",
      descriptionKey: "enterpriseSecurity",
    },
  ];

  return (
    <div className="py-20 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {t("everythingForCompliance")}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            {t("powerfulFeatures")}
          </motion.p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border border-gray-100"
            >
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-blue-700" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t(feature.titleKey)}
              </h3>
              <p className="text-gray-600">{t(feature.descriptionKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;