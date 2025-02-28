'use client';

import { motion } from 'framer-motion';
import { Shield, ArrowRight, FileCheck, Clock } from 'lucide-react';

const GetStarted = () => {
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
            Benefits That Drive Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-neutral-50 rounded-xl">
              <Shield className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Guaranteed Compliance
              </h3>
              <p className="text-gray-600">
                Stay ahead of regulations with our automated compliance monitoring and real-time updates.
              </p>
            </div>
            <div className="p-6 bg-neutral-50 rounded-xl">
              <Clock className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Save 20+ Hours Monthly
              </h3>
              <p className="text-gray-600">
                Automate manual compliance tasks and focus on growing your business instead.
              </p>
            </div>
            <div className="p-6 bg-neutral-50 rounded-xl">
              <FileCheck className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Audit-Ready Always
              </h3>
              <p className="text-gray-600">
                Generate comprehensive reports instantly, ready for any compliance audit.
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
            Getting Started Is Simple
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: '1',
                title: 'Book a Demo',
                description: 'Schedule a personalized demo with our compliance experts'
              },
              {
                step: '2',
                title: 'Quick Setup',
                description: "We'll configure your compliance dashboard in under an hour"
              },
              {
                step: '3',
                title: 'Go Live',
                description: 'Start managing compliance with confidence'
              }
            ].map((item, index) => (
              <div key={index} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
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