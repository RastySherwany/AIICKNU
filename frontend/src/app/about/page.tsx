'use client';

import { motion } from 'framer-motion';

export default function Page() {
  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002147] mb-8 pb-4 border-b border-gray-200">About the Centre</h1>
        <div className="prose prose-lg max-w-none">
          <p className="mb-6 text-gray-700 leading-relaxed text-justify text-lg">The Artificial Intelligence & Innovation Centre is dedicated to advancing the field of Artificial Intelligence through rigorous research, cutting-edge development, and comprehensive educational programs. We aim to foster a collaborative environment where students, researchers, and industry professionals can work together to solve complex real-world problems using state-of-the-art machine learning, deep learning, and robotics technologies. </p>
          <p className="mb-6 text-gray-700 leading-relaxed text-justify text-lg">Our mission is to establish Knowledge University as a premier hub for AI innovation in the region. We provide an open and inclusive ecosystem that encourages theoretical exploration and practical application. By bridging the gap between academia and industry, we strive to produce research that not only pushes the boundaries of science but also delivers tangible benefits to society. </p>
          <p className="mb-6 text-gray-700 leading-relaxed text-justify text-lg">Through our state-of-the-art laboratories and dedicated faculty, we offer unparalleled opportunities for hands-on experience in natural language processing, computer vision, autonomous systems, and data science. We invite all passionate individuals to join us in shaping the future of technology.</p>
        </div>
      </motion.div>
    </div>
  );
}
