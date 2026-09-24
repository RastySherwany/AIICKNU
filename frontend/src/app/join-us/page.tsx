'use client';

import { motion } from 'framer-motion';

export default function Page() {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002147] mb-8 pb-4 border-b border-gray-200">Join Our Team</h1>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6 text-gray-700 leading-relaxed text-justify text-lg">We are constantly looking for bright, motivated, and innovative minds to join our research center. Whether you are a prospective student, a postdoctoral researcher, or an industry expert looking for collaboration, the Artificial Intelligence & Innovation Centre offers a dynamic and supportive environment for your intellectual growth. </p>
          <p className="mb-6 text-gray-700 leading-relaxed text-justify text-lg">As a member of our team, you will have access to high-performance computing resources, advanced robotics equipment, and a network of leading experts in various AI subfields. We encourage interdisciplinary collaboration and value diverse perspectives that can lead to novel solutions for challenging problems. </p>
          <p className="mb-6 text-gray-700 leading-relaxed text-justify text-lg">Please keep an eye on this page for specific open positions, or feel free to reach out to us with your resume and a brief statement of research interests. We are always eager to connect with individuals who share our passion for pushing the boundaries of what artificial intelligence can achieve.</p>
        </div>
      </motion.div>
    </div>
  );
}
