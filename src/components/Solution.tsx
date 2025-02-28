"use client";

import { motion } from "framer-motion";
import { Shield, Zap, CheckCircle } from "lucide-react";
import { Button } from "./ui/button";

const Solution = () => {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Your Complete Compliance Solution
              </h2>
              <p className="text-lg text-gray-600">
                Ampassador transforms complex compliance requirements into simple,
                automated processes. Our AI-powered platform handles everything from
                documentation to real-time monitoring.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Shield className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Automated Compliance
                    </h3>
                    <p className="text-gray-600">
                      Our AI handles the heavy lifting, monitoring regulations and
                      updating your compliance status automatically.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Zap className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Quick Implementation
                    </h3>
                    <p className="text-gray-600">
                      Get started in minutes with our guided setup process and
                      industry-specific templates.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-gray-900">
                      Always Audit-Ready
                    </h3>
                    <p className="text-gray-600">
                      Generate comprehensive compliance reports with one click,
                      ready for any audit or review.
                    </p>
                  </div>
                </div>
              </div>
              <Button size="lg" className="mt-8">
                See How It Works
              </Button>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="aspect-square bg-gradient-to-br from-primary/10 to-primary/30 rounded-2xl">
              {/* Placeholder for solution illustration/screenshot */}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Solution;