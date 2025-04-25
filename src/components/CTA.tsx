'use client';

import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Calendar } from 'lucide-react';
import Image from 'next/image';
import { useLanguage } from "@/context/LanguageContext";
import Link from 'next/link';

const CTA = () => {
  const { t } = useLanguage();

  return (
    <section className="py-20 bg-neutral-50" >
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {t("readyToGetStarted")}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {t("scheduleConsultation")}
            </p>
            <Link
              href="https://cal.com/theodoros-ampas/30min"
              target="_blank"
              rel="noopener noreferrer"
              >
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 h-auto w-full sm:w-auto min-w-[200px] border-2"
              >
                <Calendar className="mr-2 h-5 w-5" />
                {t("bookSession")}
              </Button>
            </Link>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <Image 
              src="/lovable-uploads/8f0dc57d-81d9-4165-935e-b35fa1f198aa.png"
              alt="Booking calendar interface"
              className="rounded-lg shadow-xl w-full"
              width={600} 
              height={400} 
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;