'use client';

import { getApiUrl, getImageUrl } from '@/lib/api';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Page() {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${getApiUrl('/activity')}`)
      .then(res => res.json())
      .then(resData => {
        setData(resData);
        setLoading(false);
      });
  }, []);

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002147] mb-4">Activities</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">Explore our latest updates and contributions to the field of AI.</p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#002147]"></div>
        </div>
      ) : data.length === 0 ? (
        <div className="text-center text-gray-500 py-12 bg-white rounded-2xl shadow-sm border border-gray-100">
          No records found. Check back later!
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.map((item, idx) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
            >
              <Link href={`/activities/${item.id}`} className="block h-full group">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 group-hover:shadow-xl group-hover:border-[#002147]/20 transition-all flex flex-col h-full group-hover:-translate-y-1 overflow-hidden">
                  {item.image && <div className="-mx-8 -mt-8 mb-6 h-48 bg-gray-100"><img src={item.image.split(',')[0]?.startsWith('/') ? `${getApiUrl('${item.image.split(',')[0]}')}` : item.image.split(',')[0]} alt={item.title} className="w-full h-full object-cover" /></div>}
                  <h3 className="text-2xl font-bold mb-4 text-[#002147] line-clamp-2">{item.title}</h3>
                  
                  <div className="text-gray-600 mb-6 flex-grow text-justify line-clamp-4 leading-relaxed">
                    {item.description || item.content}
                  </div>
                  
                  <div className="mt-auto pt-4 border-t border-gray-50">
                    {(item.date || item.createdAt) && (
                      <p className="text-sm font-medium text-gray-400 mb-2">
                        {new Date(item.date || item.createdAt).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                        {item.isUpcoming === true && (
                          <span className="ml-3 px-2 py-0.5 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                            Upcoming
                          </span>
                        )}
                      </p>
                    )}
                    <span className="text-[#002147] font-bold text-sm group-hover:underline inline-flex items-center mt-2">
                      Read full post &rarr;
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
