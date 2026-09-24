'use client';

import { getApiUrl, getImageUrl } from '@/lib/api';
import { initialStaff } from '@/lib/initialData';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FaLinkedinIn, FaOrcid, FaResearchgate, FaGlobe } from 'react-icons/fa6';
import { SiGooglescholar } from 'react-icons/si';
import ImageLightbox from '@/components/ImageLightbox';

interface Staff {
  id: string;
  name: string;
  title: string | null;
  degree?: string | null;
  role: string;
  type: string;
  bio?: string | null;
  image?: string;
  personalSite?: string;
  linkedin?: string;
  orcid?: string;
  googleScholar?: string;
  researchGate?: string;
}

const getShortRole = (role: string) => {
  if (!role) return 'Researcher';
  const lower = role.toLowerCase();
  if (lower.includes('co-founder') || lower.includes('cofounder')) return 'Co-Founder';
  if (lower.includes('director')) return 'Director';
  if (lower.includes('dean')) return 'Dean';
  if (lower.includes('researcher')) return 'Researcher';
  if (lower.includes('lecturer')) return 'Researcher';
  return role.split(',')[0].trim();
};

export default function StaffProfile({ params }: { params: { id: string } }) {
  const [member, setMember] = useState<Staff | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    fetch(getApiUrl(`/staff/${params.id}`))
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch');
        return res.json();
      })
      .then(data => {
        if (data && data.id) {
          setMember(data);
        } else {
          const fallback = initialStaff.find(s => s.id === params.id);
          setMember((fallback as unknown as Staff) || null);
        }
        setLoading(false);
      })
      .catch(() => {
        const fallback = initialStaff.find(s => s.id === params.id);
        setMember((fallback as unknown as Staff) || null);
        setLoading(false);
      });
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002147]"></div>
      </div>
    );
  }

  if (!member) {
    return <div className="text-center pt-32 text-xl min-h-[70vh]">Staff member not found.</div>;
  }

  const displayName = member.name.replace(/,\s*(PhD|Ph\.D\.|MSc|M\.Sc\.|PFHEA-UK|BSc).*$/i, '').split(',')[0].trim();
  const degree = member.degree || member.title || 'MSc';
  const category = member.type === 'LEADERSHIP' ? 'Leader' : 'Member';
  const shortRole = getShortRole(member.role);

  const imagesList = member.image
    ? member.image
        .split(',')
        .filter(Boolean)
        .map((url: string) => getImageUrl(url))
    : [];

  return (
    <div className="pt-32 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[75vh]">
      <Link href="/staff" className="inline-flex items-center text-[#002147] hover:text-blue-900 mb-8 transition-colors font-medium">
        <ArrowLeft className="mr-2" size={20} />
        Back to Directory
      </Link>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 sm:p-10"
      >
        {/* Profile Card Header: Big Photo on Left, Info on Right */}
        <div className="flex flex-col sm:flex-row gap-8 items-start sm:items-center pb-8 border-b border-gray-100">
          {/* Large Portrait Photo */}
          <div 
            onClick={() => imagesList.length > 0 && setLightboxOpen(true)}
            className={`w-48 sm:w-56 h-60 sm:h-72 rounded-2xl bg-gray-100 overflow-hidden shadow-md flex-shrink-0 relative group ${
              imagesList.length > 0 ? 'cursor-zoom-in' : ''
            }`}
          >
            {imagesList.length > 0 ? (
              <>
                <img 
                  src={imagesList[0]} 
                  alt={displayName} 
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center pointer-events-none">
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm shadow-md">
                    Click to enlarge
                  </span>
                </div>
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl font-light text-gray-400">
                {displayName.charAt(0)}
              </div>
            )}
          </div>

          {/* Profile Info */}
          <div className="flex flex-col justify-center flex-grow min-w-0">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#002147] leading-tight">
              {displayName}
            </h1>

            {/* Three Blue Marks / Badges */}
            <div className="flex flex-wrap items-center gap-1.5 mt-2.5 mb-3">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-[#002147] text-white shadow-xs tracking-wide">
                {degree}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-[#002147] text-white shadow-xs tracking-wide">
                {category}
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded text-xs font-semibold bg-[#002147] text-white shadow-xs tracking-wide">
                {shortRole}
              </span>
            </div>

            <p className="text-base sm:text-lg text-gray-800 font-semibold mb-5 leading-relaxed">
              {member.role}
            </p>

            {/* Academic Platform Badge Buttons */}
            <div className="flex items-center gap-3 flex-wrap">
              {member.linkedin && (
                <a 
                  href={member.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all"
                  title="LinkedIn"
                >
                  <FaLinkedinIn size={18} />
                </a>
              )}
              {member.googleScholar && (
                <a 
                  href={member.googleScholar} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all"
                  title="Google Scholar"
                >
                  <SiGooglescholar size={18} />
                </a>
              )}
              {member.researchGate && (
                <a 
                  href={member.researchGate} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-[#00CCBB] text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all"
                  title="ResearchGate"
                >
                  <FaResearchgate size={18} />
                </a>
              )}
              {member.orcid && (
                <a 
                  href={member.orcid} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-[#A6CE39] text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all"
                  title="ORCID"
                >
                  <FaOrcid size={18} />
                </a>
              )}
              {member.personalSite && (
                <a 
                  href={member.personalSite} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="w-10 h-10 rounded-full bg-[#002147] text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all"
                  title="Personal Website"
                >
                  <FaGlobe size={18} />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Bio / Description Section */}
        <div className="pt-8">
          <h2 className="text-xl font-bold text-[#002147] mb-4">About</h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed text-justify">
            {member.bio ? (
              <p className="whitespace-pre-wrap">{member.bio}</p>
            ) : (
              <p>
                {displayName} is a key member of the Artificial Intelligence &amp; Innovation Centre. 
                Their work focuses on advancing technology and research within the {member.role} domain.
              </p>
            )}
          </div>
        </div>
      </motion.div>

      <ImageLightbox
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        images={imagesList}
        currentIndex={lightboxIndex}
        setCurrentIndex={setLightboxIndex}
        title={member.name}
      />
    </div>
  );
}
