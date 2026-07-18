"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Linkedin, Mail } from "lucide-react";

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
}

export default function TeamMemberCard({
  member,
  index = 0,
}: TeamMemberCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="group relative overflow-hidden rounded-[18px] border border-[#dbe5f6] bg-white shadow-sm transition-shadow hover:shadow-lg"
    >
      <div className="aspect-[10/9] overflow-hidden bg-gradient-to-br from-[#edf6ff] to-[#dbe5f6]">
        {member.image ? (
          <Image
            src={member.image}
            alt={`${member.name} - ${member.role}`}
            width={400}
            height={360}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-6xl font-bold text-[#0E56FA]/20">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="bg-white p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-[#183253]">
              {member.name}
            </h3>
            <p className="truncate text-sm text-[#52617b]">
              {member.role}
            </p>
            {member.department && (
              <p className="mt-1 text-xs font-medium text-[#0E56FA]">
                {member.department}
              </p>
            )}
          </div>
          <div className="flex flex-shrink-0 gap-2">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s LinkedIn profile`}
                className="rounded-[10px] bg-[#edf6ff] p-2 text-[#52617b] transition-colors hover:bg-[#0E56FA]/10 hover:text-[#0E56FA]"
              >
                <Linkedin className="h-4 w-4" strokeWidth={1.7} />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name}`}
                className="rounded-[10px] bg-[#edf6ff] p-2 text-[#52617b] transition-colors hover:bg-[#0E56FA]/10 hover:text-[#0E56FA]"
              >
                <Mail className="h-4 w-4" strokeWidth={1.7} />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
