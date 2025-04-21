
"use client";

import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSelector from "./LanguageSelector";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useLanguage();
  const { isSignedIn } = useAuth();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary">
              Ampassador
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
              {t('pricing')}
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-gray-900">
              {t('about')}
            </Link>
            <Link href="#services" className="text-gray-600 hover:text-gray-900">
              {t('services')}
            </Link>
            <Link href="#faq" className="text-gray-600 hover:text-gray-900">
              {t('faq')}
            </Link>
            <LanguageSelector />
            <Button asChild>
              <Link href="/dashboard" className="flex items-center">
                {isSignedIn ? t('Dashboard') : t('getStarted') }
              </Link> 
            </Button>
            <UserButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <LanguageSelector />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 animate-fade-down">
            <div className="flex flex-col space-y-4">
              <Link
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('pricing')}
              </Link>
              <Link
                href="#about"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('about')}
              </Link>
              <Link
                href="#services"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('services')}
              </Link>
              <Link
                href="#faq"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                {t('faq')}
              </Link>
              <div className="px-4">
                <Button className="w-full bg-primary hover:bg-primary-hover" asChild>
                  <Link href="/dashboard" className="flex items-center">
                    {isSignedIn ? t('Dashboard') : t('getStarted') }
                  </Link> 
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;