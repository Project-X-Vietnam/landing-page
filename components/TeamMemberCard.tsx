"use client";

import { motion } from "framer-motion";

// ============================================
// TEAM MEMBER TYPES
// ============================================
export interface TeamMember {
  name: string;
  role: string;
  department?: string;
  linkedin?: string;
  email?: string;
  image?: string;
  cohort?: string;
}

interface TeamMemberCardProps {
  member: TeamMember;
  index?: number;
  isDark: boolean;
}

// ============================================
// TEAM MEMBER CARD COMPONENT
// ============================================
export default function TeamMemberCard({
  member,
  index = 0,
  isDark,
}: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`group relative overflow-hidden rounded-2xl transition-all hover:scale-[1.02] ${
        isDark
          ? "bg-white/5 hover:bg-white/10"
          : "bg-white shadow-sm hover:shadow-lg"
      }`}
    >
      {/* Square Photo Container */}
      <div className="aspect-[10/9] overflow-hidden bg-gradient-to-br from-primary/20 to-pxv-cyan/20">
        {member.image ? (
          <img
            src={member.image}
            alt={`${member.name} - ${member.role}`}
            className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span
              className={`text-6xl font-bold ${
                isDark ? "text-white/20" : "text-primary/20"
              }`}
            >
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      {/* Info section at bottom */}
      <div className={`p-5 ${isDark ? "bg-white/5" : "bg-white"}`}>
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3
              className={`font-bold truncate ${
                isDark ? "text-white" : "text-pxv-dark"
              }`}
            >
              {member.name}
            </h3>
            <p
              className={`text-sm truncate ${
                isDark ? "text-white/60" : "text-slate-500"
              }`}
            >
              {member.role}
            </p>
            {member.department && (
              <p
                className={`text-xs mt-1 ${
                  isDark ? "text-primary/80" : "text-primary"
                }`}
              >
                {member.department}
              </p>
            )}
          </div>
          <div className="flex gap-2 flex-shrink-0">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s LinkedIn profile`}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? "bg-white/10 hover:bg-primary/20 text-white/60 hover:text-primary"
                    : "bg-slate-100 hover:bg-primary/10 text-slate-500 hover:text-primary"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name}`}
                className={`p-2 rounded-lg transition-colors ${
                  isDark
                    ? "bg-white/10 hover:bg-primary/20 text-white/60 hover:text-primary"
                    : "bg-slate-100 hover:bg-primary/10 text-slate-500 hover:text-primary"
                }`}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
