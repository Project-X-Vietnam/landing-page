"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Mail } from "lucide-react";
import LinkedInIcon from "@/components/icons/LinkedInIcon";

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
      className="group"
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-[18px] bg-gradient-to-br from-[#edf6ff] to-[#dbe5f6]">
        {member.image ? (
          <Image
            src={member.image}
            alt={`${member.name} - ${member.role}`}
            width={600}
            height={750}
            className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <span className="text-6xl font-bold text-[#0E56FA]/20">
              {member.name.charAt(0)}
            </span>
          </div>
        )}
      </div>

      <div className="mt-4 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-[15px] font-medium text-[#183253]">
            {member.name}
          </h3>
          <p className="truncate text-[15px] text-[#8a95a8]">
            {member.role}
          </p>
          {member.department && (
            <p className="mt-1 text-xs font-medium text-[#0E56FA]">
              {member.department}
            </p>
          )}
        </div>
        {(member.linkedin || member.email) && (
          <div className="flex flex-shrink-0 items-center gap-3 pt-0.5">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name}'s LinkedIn profile`}
                className="text-[#a3adbe] transition-colors hover:text-[#0E56FA] focus-visible:text-[#0E56FA] focus-visible:outline-none"
              >
                <LinkedInIcon className="h-4 w-4" />
              </a>
            )}
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                aria-label={`Email ${member.name}`}
                className="text-[#a3adbe] transition-colors hover:text-[#0E56FA] focus-visible:text-[#0E56FA] focus-visible:outline-none"
              >
                <Mail className="h-[17px] w-[17px]" strokeWidth={1.9} />
              </a>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
}
