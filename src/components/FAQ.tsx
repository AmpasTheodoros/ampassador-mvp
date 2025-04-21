'use client';

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useLanguage } from "@/context/LanguageContext";

const FAQ = () => {
  const { t, language } = useLanguage();

  const faqs =
    language === "gr"
      ? [
          {
            question: "Πόσο γρήγορα μπορώ να ξεκινήσω με το Ampassador;",
            answer:
              "Μπορείτε να ξεκινήσετε σε λίγα λεπτά! Η καθοδηγούμενη διαδικασία εγκατάστασης θα σας βοηθήσει να ρυθμίσετε τις απαιτήσεις συμμόρφωσής σας σύμφωνα με τις ανάγκες και τον κλάδο σας.",
          },
          {
            question: "Τι είδους συμμόρφωση καλύπτει το Ampassador;",
            answer:
              "Καλύπτουμε τα σημαντικότερα πρότυπα συμμόρφωσης όπως GDPR, HIPAA, AI Act και άλλα. Η πλατφόρμα μας ενημερώνεται αυτόματα με νέες κανονιστικές απαιτήσεις.",
          },
          {
            question: "Πώς δουλεύει η τιμολόγηση;",
            answer:
              "Προσφέρουμε απλό και διαφανές μοντέλο τιμολόγησης που ξεκινά από 49€/μήνα. Περιλαμβάνει όλες τις βασικές λειτουργίες, πρότυπα και αυτόματες ενημερώσεις. Διατίθενται εταιρικά πακέτα για μεγαλύτερους οργανισμούς.",
          },
          {
            question: "Μπορώ να εξάγω αναφορές συμμόρφωσης για ελέγχους;",
            answer:
              "Ναι! Μπορείτε να δημιουργήσετε αναλυτικές αναφορές συμμόρφωσης με ένα κλικ. Οι αναφορές αυτές είναι πλήρως έτοιμες για ελέγχους και περιλαμβάνουν όλη την απαραίτητη τεκμηρίωση και χρονοσφραγίδες.",
          },
          {
            question: "Προσφέρετε υποστήριξη για την υλοποίηση;",
            answer:
              "Απολύτως! Η ομάδα μας παρέχει εξειδικευμένη υποστήριξη για να σας βοηθήσει να ξεκινήσετε και να εκμεταλλευθείτε στο έπακρο το Ampassador. Παρέχουμε επίσης εκπαιδευτικά σεμινάρια για εταιρικούς πελάτες.",
          },
        ]
      : [
          {
            question: "How quickly can I get started with Ampassador?",
            answer:
              "You can get started in minutes! Our guided setup process will help you configure your compliance requirements based on your industry and specific needs.",
          },
          {
            question: "What types of compliance does Ampassador cover?",
            answer:
              "We cover major compliance frameworks including GDPR, HIPAA, AI Act, and more. Our platform automatically updates as new regulations are introduced.",
          },
          {
            question: "How does the pricing work?",
            answer:
              "We offer a simple, transparent pricing model starting at $49/month. This includes all core features, templates, and automatic updates. Enterprise plans are available for larger organizations.",
          },
          {
            question: "Can I export compliance reports for audits?",
            answer:
              "Yes! You can generate comprehensive compliance reports with one click. These reports are audit-ready and include all necessary documentation and timestamps.",
          },
          {
            question: "Do you offer support for implementation?",
            answer:
              "Absolutely! Our team provides dedicated support to help you get set up and make the most of Ampassador. We also offer training sessions for enterprise customers.",
          },
        ];

  return (
    <section className="py-16 md:py-20 bg-gray-50" id="faq">
      <div className="max-w-3xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t("frequentlyAskedQuestions")}
          </h2>
          <p className="text-lg text-gray-600">
            {t("everythingToKnow")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent>{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;