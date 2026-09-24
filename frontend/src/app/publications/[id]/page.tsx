'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ImageLightbox from '@/components/ImageLightbox';

export default function DetailPage({ params }: { params: { id: string } }) {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetch(`http://${window.location.hostname}:3001/publication/` + params.id)
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[70vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002147]"></div>
      </div>
    );
  }

  if (!data) {
    return <div className="text-center pt-32 text-xl min-h-[70vh]">Post not found.</div>;
  }

  const imagesList = data.image
    ? data.image
        .split(',')
        .filter(Boolean)
        .map((url: string) => (url?.startsWith('/') ? `http://${window.location.hostname}:3001${url}` : url))
    : [];

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      <Link href="/publications" className="inline-flex items-center text-[#002147] hover:text-blue-900 mb-8 transition-colors">
        <ArrowLeft className="mr-2" size={20} />
        Back to Publications
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-8 sm:p-12"
      >
        {imagesList.length > 0 && (
          <div 
            onClick={() => openLightbox(0)}
            className="-mx-8 sm:-mx-12 -mt-8 sm:-mt-12 mb-10 overflow-hidden bg-gray-100 cursor-zoom-in group relative"
          >
            <img 
              src={imagesList[0]} 
              alt={data.title} 
              className="w-full h-64 sm:h-[450px] object-cover group-hover:scale-[1.02] transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center pointer-events-none">
              <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm shadow-md">
                Click to expand
              </span>
            </div>
          </div>
        )}

        <h1 className="text-2xl md:text-3xl font-bold text-[#002147] mb-6 leading-tight">{data.title}</h1>
        
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-10 pb-6 border-b border-gray-100">
          {(data.date || data.createdAt) && (
            <span className="font-medium bg-gray-50 px-3 py-1 rounded-full">
              {new Date(data.date || data.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          )}
          {data.isUpcoming === true && (
            <span className="font-medium px-3 py-1 rounded-full bg-green-100 text-green-700">
              Upcoming
            </span>
          )}
          {data.authors && (
            <span className="font-medium text-[#002147] bg-[#002147]/5 px-3 py-1 rounded-full">
              By {data.authors}
            </span>
          )}
        </div>
        
        <div className="prose prose-lg max-w-none text-gray-700 text-justify leading-relaxed">
          {data.content && <p className="mb-6 whitespace-pre-wrap">{data.content}</p>}
          {data.description && <p className="mb-6 whitespace-pre-wrap">{data.description}</p>}
        </div>

        {imagesList.length > 1 && (
          <div className="mt-12 pt-10 border-t border-gray-100">
            <h3 className="text-xl font-bold text-[#002147] mb-6">Gallery</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {imagesList.slice(1).map((imgUrl: string, i: number) => (
                <div 
                  key={i} 
                  onClick={() => openLightbox(i + 1)}
                  className="aspect-square rounded-xl overflow-hidden bg-gray-100 shadow-sm border border-gray-100 cursor-zoom-in group relative"
                >
                  <img 
                    src={imgUrl} 
                    alt={`${data.title} - Gallery image ${i + 1}`} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs font-medium px-2.5 py-1 rounded-full backdrop-blur-sm shadow-md">
                      Expand
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {data.link && data.link !== '#' && (
          <div className="mt-12 pt-6 border-t border-gray-100">
            <a href={data.link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-[#002147] hover:bg-blue-900 transition-colors">
              View External Resource &rarr;
            </a>
          </div>
        )}
      </motion.div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={imagesList}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
        title={data.title}
      />
    </div>
  );
}
