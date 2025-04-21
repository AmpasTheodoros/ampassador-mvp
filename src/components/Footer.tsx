'use client';

import { Facebook, Twitter, Linkedin, Github } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Link from "next/link";

const Footer = () => {
  const { language, t } = useLanguage();

  // Translated content for Greek
  const companyName = "Ampassador";
  const description =
    language === "gr"
      ? "Κάνουμε τη συμμόρφωση απλή και προσβάσιμη για τις σύγχρονες επιχειρήσεις."
      : "Making compliance simple and accessible for modern businesses.";

  const productItems =
    language === "gr"
      ? ["Χαρακτηριστικά", "Τιμολόγηση", "Ασφάλεια", "Οδικός Χάρτης"]
      : ["Features", "Pricing", "Security", "Roadmap"];
  const companyItems =
    language === "gr"
      ? ["Σχετικά", "Blog", "Καριέρα", "Επικοινωνία"]
      : ["About", "Blog", "Careers", "Contact"];
  const legalItems =
    language === "gr"
      ? ["Απόρρητο", "Όροι", "Πολιτική Cookies"]
      : ["Privacy", "Terms", "Cookie Policy"];

  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">{companyName}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-gray-500" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500" aria-label="Linkedin">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-gray-500" aria-label="Github">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {language === "gr" ? "Προϊόν" : "Product"}
            </h3>
            <ul className="space-y-3">
              {productItems.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {language === "gr" ? "Εταιρεία" : "Company"}
            </h3>
            <ul className="space-y-3">
              {companyItems.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">
              {language === "gr" ? "Νομικά" : "Legal"}
            </h3>
            <ul className="space-y-3">
              {legalItems.map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-gray-400 text-sm text-center">
            © {new Date().getFullYear()} {companyName}.{" "}
            {language === "gr"
              ? "Όλα τα δικαιώματα διατηρούνται."
              : "All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;