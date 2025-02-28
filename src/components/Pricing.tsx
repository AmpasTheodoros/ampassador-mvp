"use client";

import { Check } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for trying out Ampassador",
    features: [
      "Basic compliance templates",
      "Single industry coverage",
      "Email support",
      "Basic reporting",
    ],
  },
  {
    name: "Pro",
    price: "$49",
    period: "/month",
    description: "Best for growing companies",
    features: [
      "All Starter features",
      "All industry templates",
      "Priority support",
      "Advanced reporting",
      "Custom branding",
      "API access",
    ],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations",
    features: [
      "All Pro features",
      "Dedicated support",
      "Custom integration",
      "Advanced security",
      "SLA guarantee",
      "Training sessions",
    ],
  },
];

const Pricing = () => {
  return (
    <section className="py-16 md:py-20 bg-white" id="pricing">
    <div className="max-w-6xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-lg text-gray-600">
          Start free, upgrade when you need to
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
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
                  Most Popular
                </span>
              </div>
            )}
            
            <div className="text-center mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
              <div className="mb-2">
                <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                {plan.period && (
                  <span className="text-gray-600 ml-1">{plan.period}</span>
                )}
              </div>
              <p className="text-gray-600">{plan.description}</p>
            </div>

            <ul className="space-y-4 mb-8">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="text-gray-600">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant={plan.popular ? "default" : "outline"}
              className={`w-full ${
                plan.popular ? "bg-primary hover:bg-primary-hover" : ""
              }`}
            >
              {plan.price === "Custom" ? "Contact Sales" : "Get Started"}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  );
};

export default Pricing;