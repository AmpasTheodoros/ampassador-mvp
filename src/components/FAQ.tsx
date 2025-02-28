'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';

const faqs = [
  {
    question: 'How quickly can I get started with Ampassador?',
    answer:
      'You can get started in minutes! Our guided setup process will help you configure your compliance requirements based on your industry and specific needs.',
  },
  {
    question: 'What types of compliance does Ampassador cover?',
    answer:
      'We cover major compliance frameworks including GDPR, HIPAA, AI Act, and more. Our platform automatically updates as new regulations are introduced.',
  },
  {
    question: 'How does the pricing work?',
    answer:
      'We offer a simple, transparent pricing model starting at $49/month. This includes all core features, templates, and automatic updates. Enterprise plans are available for larger organizations.',
  },
  {
    question: 'Can I export compliance reports for audits?',
    answer:
      'Yes! You can generate comprehensive compliance reports with one click. These reports are audit-ready and include all necessary documentation and timestamps.',
  },
  {
    question: 'Do you offer support for implementation?',
    answer:
      'Absolutely! Our team provides dedicated support to help you get set up and make the most of Ampassador. We also offer training sessions for enterprise customers.',
  },
];

const FAQ = () => {
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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Everything you need to know about Ampassador
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