// src/components/Hero

"use client"

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Star } from "lucide-react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";

export default function Hero() {
  const { t, language } = useLanguage();

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-12 md:py-20 overflow-hidden bg-gradient-to-b from-purple-50 to-white">
      <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-repeat" />
      
      <div className="relative max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-6 md:space-y-8"
        >
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-primary bg-primary/10 rounded-full">
              <Star className="w-4 h-4" />
              {t("limitedTimeOffer")}
            </span>
          </div>
          <h1 className="text-3xl md:text-6xl font-bold text-gray-900 tracking-tight leading-tight">
            {language === "en" ? (
              <>
                Turn Complex Compliance into<br className="hidden sm:block" />
                <span className="text-primary">One-Click Solutions</span>
              </>
            ) : (
              <>
                Απλοποιήστε τη Συμμόρφωση με<br className="hidden sm:block" />
                <span className="text-primary">ένα Κλικ</span>
              </>
            )}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
            {t("automateCompliance")}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary-hover text-white min-w-[200px] h-12 group"
              asChild
            >
              <Link href="/auth?tab=register">
                {t("startFreeTrial")}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto min-w-[200px] h-12 border-2"
              asChild
            >
              <Link href="/auth?tab=login">
                {t("bookDemo")}
              </Link>
            </Button>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="pt-8"
          >
            <p className="text-sm text-gray-500 mb-4">{t("trustedByCompanies")}</p>
            <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
              <div className="flex items-center gap-1 text-gray-600">
                <Shield className="w-5 h-5" />
                <span className="font-medium">{t("gdprReady")}</span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Star className="w-5 h-5" />
                <span className="font-medium">{t("rating")}</span>
              </div>
              {/* <div className="text-gray-600 font-medium">
                {t("companiesTrustUs")}
              </div> */}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}