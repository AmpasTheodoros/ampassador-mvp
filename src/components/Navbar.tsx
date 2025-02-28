"use client"

import { Button } from "./ui/button";
import { Menu, MenuIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

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
              Pricing
            </Link>
            <Link href="#about" className="text-gray-600 hover:text-gray-900">
              About Us
            </Link>
            <Link href="#services" className="text-gray-600 hover:text-gray-900">
              Services
            </Link>
            <Link href="#faq" className="text-gray-600 hover:text-gray-900">
              FAQ
            </Link>
            <Button>
              <Link
                href="/dashboard"
              >
                <MenuIcon className="md:hidden" />
                {true ? 'Dashboard' : 'Get Started'}
              </Link>
            </Button>
            <UserButton />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
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
                Pricing
              </Link>
              <Link
                href="#about"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                About Us
              </Link>
              <Link
                href="#services"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                Services
              </Link>
              <Link
                href="#faq"
                className="text-gray-600 hover:text-gray-900 px-4 py-2"
                onClick={() => setIsOpen(false)}
              >
                FAQ
              </Link>
              <div className="px-4">
                <Button className="w-full">
                  <Link
                    href="/dashboard"
                  >
                    {true ? 'Dashboard' : 'Get Started'}
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