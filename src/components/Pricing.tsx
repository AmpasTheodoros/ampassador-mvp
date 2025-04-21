"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const Pricing = () => {
  const { t } = useLanguage();

  const plans = [
    {
      nameKey: "starter",
      priceKey: "free",
      descriptionKey: "perfectForTrying",
      features: [
        "basicTemplates",
        "singleIndustry",
        "emailSupport",
        "basicReporting",
      ],
    },
    {
      nameKey: "pro",
      priceKey: "$49",
      periodKey: "month",
      descriptionKey: "bestForGrowing",
      features: [
        "allStarterFeatures",
        "allIndustryTemplates",
        "prioritySupport",
        "advancedReporting",
        "customBranding",
        "apiAccess",
      ],
      popular: true,
    },
    {
      nameKey: "enterprise",
      priceKey: "custom",
      descriptionKey: "forLargeOrganizations",
      features: [
        "allProFeatures",
        "dedicatedSupport",
        "customIntegration",
        "advancedSecurity",
        "slaGuarantee",
        "trainingSessions",
      ],
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("simpleTransparentPricing")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("startFreeUpgrade")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.nameKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-white rounded-xl p-8 shadow-lg border ${
                plan.popular ? "border-primary" : "border-gray-200"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-primary text-white text-sm font-medium px-3 py-1 rounded-full">
                    {t("mostPopular")}
                  </span>
                </div>
              )}
              
              <div className="text-center mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{t(plan.nameKey)}</h3>
                <div className="mb-2">
                  <span className="text-4xl font-bold text-gray-900">
                    {t(plan.priceKey)}
                  </span>
                  {plan.periodKey && (
                    <span className="text-gray-600 ml-1">{t(plan.periodKey)}</span>
                  )}
                </div>
                <p className="text-gray-600">{t(plan.descriptionKey)}</p>
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-gray-600">{t(feature)}</span>
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "default" : "outline"}
                className={`w-full ${
                  plan.popular ? "bg-primary hover:bg-primary-hover" : ""
                }`}
              >
                {plan.priceKey === "custom" ? t("contactSales") : t("getStarted")}
              </Button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;