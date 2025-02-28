'use client';

import { Facebook, Twitter, Linkedin, Github } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Ampassador</h3>
            <p className="text-gray-600 text-sm">
              Making compliance simple and accessible for modern businesses.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Product</h3>
            <ul className="space-y-3">
              {["Features", "Pricing", "Security", "Roadmap"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Company</h3>
            <ul className="space-y-3">
              {["About", "Blog", "Careers", "Contact"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-3">
              {["Privacy", "Terms", "Cookie Policy"].map((item) => (
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
            © {new Date().getFullYear()} Ampassador. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;