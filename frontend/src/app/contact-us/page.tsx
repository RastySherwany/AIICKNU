'use client';

import { motion } from 'framer-motion';

export default function Page() {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002147] mb-8 pb-4 border-b border-gray-200">Contact Information</h1>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6 text-gray-700 leading-relaxed text-justify text-lg">We welcome inquiries from prospective students, researchers, industry partners, and the general public. If you have questions about our ongoing projects, educational programs, or collaboration opportunities, please do not hesitate to reach out to us. </p>
          <p className="mb-6 text-gray-700 leading-relaxed text-justify text-lg">You can visit us in person at the Knowledge University campus in Erbil, where our laboratories and administrative offices are located. Our dedicated staff is always available to provide tours of our facilities and discuss how we can work together to advance the field of AI. </p>
          <p className="mb-6 text-gray-700 leading-relaxed text-justify text-lg">For general inquiries, please contact our main office via email or phone. We strive to respond to all messages as quickly as possible. We look forward to hearing from you and exploring how we can collaborate to shape the future of artificial intelligence.</p>
        </div>
      </motion.div>
    </div>
  );
}
