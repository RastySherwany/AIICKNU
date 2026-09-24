'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, BrainCircuit, Code, Lightbulb, Cpu, Network, Calendar } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};

export default function Home() {
  const [slides, setSlides] = useState<any[]>([{
    id: 'default-hero',
    type: 'HERO',
    title: 'Artificial Intelligence & \nInnovation Centre',
    description: 'Advancing the frontier of Artificial Intelligence through cutting-edge research, intelligent robotics, and transformative technological solutions.',
    image: '/hero-bg-light.jpg',
    link: '/about',
    linkText: 'Explore The Centre'
  }]);
  
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    Promise.all([
      fetch(`http://${window.location.hostname}:3001/news`).then(r => r.json()).catch(() => []),
      fetch(`http://${window.location.hostname}:3001/activity`).then(r => r.json()).catch(() => [])
    ]).then(([news, activities]) => {
      const posts = [...news.map((n:any) => ({...n, type: 'news'})), ...activities.map((a:any) => ({...a, type: 'activities'}))]
        .filter(p => p.image)
        .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        .slice(0, 4) 
        .map(p => ({
          id: p.id,
          type: p.type,
          title: p.title,
          description: p.content || p.description,
          date: p.date || p.createdAt,
          image: p.image.split(',')[0],
          link: `/${p.type}/${p.id}`,
          linkText: `Read ${p.type === 'news' ? 'Article' : 'Activity'}`
        }));
        
      if (posts.length > 0) {
        setSlides(prev => [...prev, ...posts]);
      }
    });
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentSlide(s => (s + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const slide = slides[currentSlide];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center bg-gray-900 overflow-hidden border-b border-gray-100">
        
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 z-0"
          >
            <img 
              src={slide.image?.startsWith('/uploads') ? `http://${window.location.hostname}:3001${slide.image}` : slide.image} 
              alt={slide.title} 
              className="w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-black/60 pointer-events-none"></div>
            {slide.type === 'HERO' ? (
               <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent pointer-events-none"></div>
            ) : (
               <div className="absolute inset-0 bg-gradient-to-r from-[#002147]/90 via-[#002147]/70 to-transparent pointer-events-none"></div>
            )}
          </motion.div>
        </AnimatePresence>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-20 pb-20">
          <AnimatePresence mode="wait">
            <motion.div 
              key={slide.id}
              initial={{ opacity: 0, y: 30 }} 
              animate={{ opacity: 1, y: 0 }} 
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="max-w-3xl"
            >
              {slide.type !== 'HERO' && slide.date && (
                <div className="inline-flex items-center gap-2 py-1.5 px-3.5 rounded-full bg-white/20 text-white backdrop-blur-md text-sm font-medium mb-6 border border-white/25 shadow-sm">
                  <Calendar size={15} className="text-white/80 flex-shrink-0" />
                  <span>
                    {new Date(slide.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </span>
                </div>
              )}
            
              <h1 className={`font-extrabold tracking-tight mb-6 leading-tight line-clamp-3 ${slide.type === 'HERO' ? 'text-5xl md:text-7xl text-gray-900' : 'text-3xl md:text-5xl text-white'}`}>
                {slide.title.split('\n').map((line: string, i: number) => (
                  <span key={i}>
                    {i === 1 && slide.type === 'HERO' ? <span className="text-[#002147]">{line}</span> : line}
                    {i === 0 && slide.type === 'HERO' && <br/>}
                  </span>
                ))}
              </h1>
              
              <p className={`mt-4 text-xl mb-10 max-w-2xl leading-relaxed line-clamp-3 ${slide.type === 'HERO' ? 'text-gray-600' : 'text-gray-200'}`}>
                {slide.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={slide.link} className={`inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-lg transition-all shadow-lg ${slide.type === 'HERO' ? 'text-white bg-[#002147] hover:bg-blue-800' : 'text-[#002147] bg-white hover:bg-gray-100'}`}>
                  {slide.linkText}
                </Link>
                {slide.type === 'HERO' && (
                  <Link href="/projects" className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-300 text-base font-semibold rounded-lg text-gray-700 bg-white/50 hover:bg-white transition-all backdrop-blur-sm shadow-sm">
                    View AI Projects
                  </Link>
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Slide Indicators */}
        {slides.length > 1 && (
          <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center gap-3">
            {slides.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-12 h-1.5 rounded-full transition-all ${currentSlide === idx ? 'bg-white' : 'bg-white/30 hover:bg-white/50'}`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Highlights Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Pioneering The Future</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">Focusing on practical and theoretical advancements in intelligent systems.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: BrainCircuit, title: 'Machine Learning', desc: 'Pushing boundaries in Deep Learning, NLP, and Computer Vision algorithms.' },
              { icon: Network, title: 'Neural Networks', desc: 'Designing complex architectures that mimic human cognitive processes.' },
              { icon: Cpu, title: 'Robotics & IoT', desc: 'Integrating AI with physical systems for autonomous and intelligent agents.' }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:shadow-[#002147]/5 transition-all group"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-[#002147] to-cyan-500 text-white rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
