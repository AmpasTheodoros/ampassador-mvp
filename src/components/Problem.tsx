'use client';

import { motion } from "framer-motion";
import { AlertCircle, Bug, ShieldAlert } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Problem = () => {
  const { t } = useLanguage();

  const problems = [
    {
      icon: AlertCircle,
      titleKey: "complexComplianceRequirements",
      descriptionKey: "navigatingRegulations",
    },
    {
      icon: Bug,
      titleKey: "timeConsumingProcesses",
      descriptionKey: "hoursSpent",
    },
    {
      icon: ShieldAlert,
      titleKey: "riskNonCompliance",
      descriptionKey: "facingPenalties",
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("challengesFacing")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("understandCompliance")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {problems.map((problem, index) => (
            <motion.div
              key={problem.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg border border-gray-100"
            >
              <div className="h-12 w-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                <problem.icon className="w-6 h-6 text-[#2563EB]" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {t(problem.titleKey)}
              </h3>
              <p className="text-gray-600">{t(problem.descriptionKey)}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Problem;