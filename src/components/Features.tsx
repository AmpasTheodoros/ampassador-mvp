'use client';

import { Shield, Zap, FileCheck, Bell } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Smart Onboarding",
    description: "Industry-specific compliance flows that guide you step by step",
  },
  {
    icon: FileCheck,
    title: "Ready Templates",
    description: "Pre-built templates for GDPR, HIPAA, and AI compliance",
  },
  {
    icon: Bell,
    title: "Real-time Alerts",
    description: "Stay updated with regulatory changes and compliance deadlines",
  },
  {
    icon: Zap,
    title: "Instant Reports",
    description: "Generate audit-ready reports with one click",
  },
];

const Features = () => {
  return (
    <div className="py-20 bg-gray-50" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful features to help you manage compliance with confidence
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-6 rounded-xl hover:scale-105 transition-transform duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;