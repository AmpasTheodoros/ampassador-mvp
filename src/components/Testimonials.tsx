'use client';

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import Image from 'next/image';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO at TechStart',
    content: 'Ampassador transformed our compliance process. What used to take months now takes days.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    name: 'Michael Chen',
    role: 'CTO at DataFlow',
    content: 'The AI-powered alerts have saved us countless hours of manual compliance checks.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Compliance Officer',
    content: 'Best investment we\'ve made for our compliance needs. The templates are invaluable.',
    rating: 5,
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
  },
];

const Testimonials = () => {
  const { t, language } = useLanguage();

  const testimonials =
    language === "gr"
      ? [
          {
            name: "Σάρα Τζόνσον",
            role: "Διευθύνουσα Σύμβουλος στην TechStart",
            content:
              "Το Ampassador μετέτρεψε εντελώς τις διαδικασίες συμμόρφωσής μας. Ό,τι απαιτούσε μήνες τώρα γίνεται σε λίγες μέρες.",
            rating: 5,
            image:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
          },
          {
            name: "Μιχαήλ Τσεν",
            role: "Τεχνικός Διευθυντής στην DataFlow",
            content:
              "Οι ειδοποιήσεις με AI μας έχουν γλιτώσει αμέτρητες ώρες χειροκίνητου ελέγχου συμμόρφωσης.",
            rating: 5,
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
          },
          {
            name: "Έμιλυ Ροντρίγκες",
            role: "Υπεύθυνη Συμμόρφωσης",
            content:
              "Η καλύτερη επένδυση για τις ανάγκες συμμόρφωσής μας. Τα πρότυπα είναι ανεκτίμητα.",
            rating: 5,
            image:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
          },
        ]
      : [
          {
            name: "Sarah Johnson",
            role: "CEO at TechStart",
            content:
              "Ampassador transformed our compliance process. What used to take months now takes days.",
            rating: 5,
            image:
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
          },
          {
            name: "Michael Chen",
            role: "CTO at DataFlow",
            content:
              "The AI-powered alerts have saved us countless hours of manual compliance checks.",
            rating: 5,
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
          },
          {
            name: "Emily Rodriguez",
            role: "Compliance Officer",
            content:
              "Best investment we've made for our compliance needs. The templates are invaluable.",
            rating: 5,
            image:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
          },
        ];
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("lovedByTeams")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("joinCompanies")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white p-6 rounded-xl shadow-lg"
            >
              <div className="flex items-center gap-2 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                ))}
              </div>
              <p className="text-gray-700 mb-6">{testimonial.content}</p>
              <div className="flex items-center gap-4">
                <Image
                  src={testimonial.image}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;