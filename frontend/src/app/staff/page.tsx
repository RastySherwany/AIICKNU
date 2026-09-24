'use client';

import { getApiUrl, getImageUrl } from '@/lib/api';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FaLinkedinIn, FaOrcid, FaResearchgate, FaGlobe } from 'react-icons/fa6';
import { SiGooglescholar } from 'react-icons/si';

interface Staff {
  id: string;
  name: string;
  title: string | null;
  degree?: string | null;
  role: string;
  type: string;
  image?: string;
  personalSite?: string;
  linkedin?: string;
  orcid?: string;
  googleScholar?: string;
  researchGate?: string;
}

const SocialIcons = ({ member }: { member: Staff }) => (
  <div className="flex items-center gap-2.5 flex-wrap" onClick={(e) => e.stopPropagation()}>
    {member.linkedin && (
      <a
        href={member.linkedin}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-[#0A66C2] text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all"
        title="LinkedIn"
        onClick={(e) => e.stopPropagation()}
      >
        <FaLinkedinIn size={16} />
      </a>
    )}
    {member.googleScholar && (
      <a
        href={member.googleScholar}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-[#1a1a1a] text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all"
        title="Google Scholar"
        onClick={(e) => e.stopPropagation()}
      >
        <SiGooglescholar size={16} />
      </a>
    )}
    {member.researchGate && (
      <a
        href={member.researchGate}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-[#00CCBB] text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all"
        title="ResearchGate"
        onClick={(e) => e.stopPropagation()}
      >
        <FaResearchgate size={16} />
      </a>
    )}
    {member.orcid && (
      <a
        href={member.orcid}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-[#A6CE39] text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all"
        title="ORCID"
        onClick={(e) => e.stopPropagation()}
      >
        <FaOrcid size={16} />
      </a>
    )}
    {member.personalSite && (
      <a
        href={member.personalSite}
        target="_blank"
        rel="noopener noreferrer"
        className="w-9 h-9 rounded-full bg-[#002147] text-white flex items-center justify-center hover:scale-110 hover:shadow-md transition-all"
        title="Personal Website"
        onClick={(e) => e.stopPropagation()}
      >
        <FaGlobe size={16} />
      </a>
    )}
  </div>
);

const getImgSrc = (member: Staff) => {
  if (!member.image) return null;
  const first = member.image.split(',')[0];
  return first?.startsWith('/') ? `${getApiUrl('${first}')}` : first;
};

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

/* Academic staff card with large portrait photo and 3 badges */
const StaffCard = ({ member, idx }: { member: Staff; idx: number }) => {
  const displayName = member.name.replace(/,\s*(PhD|Ph\.D\.|MSc|M\.Sc\.|PFHEA-UK|BSc).*$/i, '').split(',')[0].trim();
  const degree = member.degree || member.title || 'MSc';
  const category = member.type === 'LEADERSHIP' ? 'Leader' : 'Member';
  const shortRole = getShortRole(member.role);
  const imgSrc = getImgSrc(member);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: idx * 0.05 }}
      className="h-full"
    >
      <Link
        href={`/staff/${member.id}`}
        className="group bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-xl hover:border-[#002147]/20 transition-all duration-300 overflow-hidden flex flex-col sm:flex-row h-full"
      >
        {/* Large Portrait Profile Photo */}
        <div className="w-full sm:w-52 md:w-60 h-64 sm:h-auto min-h-[250px] bg-gray-100 flex-shrink-0 relative overflow-hidden">
          {imgSrc ? (
            <img
              src={imgSrc}
              alt={displayName}
              className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl font-light text-gray-400">
              {displayName.charAt(0)}
            </div>
          )}
        </div>

        {/* Info Column */}
        <div className="p-6 sm:p-7 flex flex-col justify-center flex-grow min-w-0">
          <h3 className="text-xl sm:text-2xl font-bold text-[#002147] group-hover:text-blue-800 transition-colors leading-snug">
            {displayName}
          </h3>

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

          <p className="text-sm sm:text-base text-gray-800 font-semibold leading-relaxed mb-5">
            {member.role}
          </p>

          <div>
            <SocialIcons member={member} />
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default function StaffPage() {
  const [staff, setStaff] = useState<Staff[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${getApiUrl('/staff')}`)
      .then(res => res.json())
      .then(data => {
        setStaff(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const leadership = staff.filter(s => s.type === 'LEADERSHIP');
  const members = staff.filter(s => s.type !== 'LEADERSHIP');

  return (
    <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center mb-16">
        <h1 className="text-4xl font-extrabold tracking-tight text-[#002147] mb-4">Our Team</h1>
        <p className="text-xl text-gray-500 max-w-2xl mx-auto">
          Meet the brilliant minds driving innovation at the Artificial Intelligence &amp; Innovation Centre.
        </p>
      </motion.div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#002147]"></div>
        </div>
      ) : (
        <>
          {/* Leaders — centered on top row */}
          {leadership.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10 max-w-5xl mx-auto">
              {leadership.map((member, idx) => (
                <StaffCard key={member.id} member={member} idx={idx} />
              ))}
            </div>
          )}

          {/* Members — grid */}
          {members.length > 0 && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {members.map((member, idx) => (
                <StaffCard key={member.id} member={member} idx={idx + leadership.length} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
