'use client';

import { motion } from "framer-motion";
import { Shield, ArrowRight, FileCheck, Clock } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const GetStarted = () => {
  const { t } = useLanguage();

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        {/* Benefits Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            {t("benefitsDriveResults")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-neutral-50 rounded-xl">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("guaranteedCompliance")}
              </h3>
              <p className="text-gray-600">
                {t("stayAhead")}
              </p>
            </div>
            <div className="p-6 bg-neutral-50 rounded-xl">
              <Clock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("saveHours")}
              </h3>
              <p className="text-gray-600">
                {t("automateTasks")}
              </p>
            </div>
            <div className="p-6 bg-neutral-50 rounded-xl">
              <FileCheck className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                {t("auditReady")}
              </h3>
              <p className="text-gray-600">
                {t("generateInstantly")}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Action Plan Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            {t("gettingStartedSimple")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                titleKey: "bookADemo",
                descriptionKey: "scheduleDemo"
              },
              {
                step: "2",
                titleKey: "quickSetup",
                descriptionKey: "configureHour"
              },
              {
                step: "3",
                titleKey: "goLive",
                descriptionKey: "startManaging"
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{t(item.titleKey)}</h3>
                  <p className="text-gray-600">{t(item.descriptionKey)}</p>
                  {index < 2 && (
                    <ArrowRight className="w-6 h-6 text-primary mt-4 hidden md:block" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GetStarted;