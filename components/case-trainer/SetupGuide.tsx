"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { trackCaseTrainerPlatformSelect } from "@/lib/analytics/case-trainer";

type PlatformStep = {
  title: string;
  body: string;
};

type Platform = {
  id: string;
  name: string;
  description: string;
  recommended?: boolean;
  iconUrl: string;
  note?: string;
  steps: PlatformStep[];
};

const platforms: Platform[] = [
  {
    id: "claude",
    name: "Claude",
    description: "Best performance & context retention",
    recommended: true,
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/8/8a/Claude_AI_logo.svg",
    steps: [
      {
        title: "Download Files",
        body: "Download both `System_Prompt.md` and `Case_Hub.csv` from this page.",
      },
      {
        title: "Create a Project",
        body: "Go to claude.ai → Left sidebar → Projects → New Project. Name it exactly: `PJX Case Trainer`",
      },
      {
        title: "Upload Files",
        body: "Inside the project → Files → Add Files → Upload both `.md` and `.csv` files.",
      },
      {
        title: "Add Role Instructions",
        body: "In the project → Find Instructions → Paste your Role Instructions (provided by PJX team) → Save.",
      },
      {
        title: "Start a Session",
        body: "Click New Chat inside the project → Use sample prompts on this page to begin.",
      },
    ],
  },
  {
    id: "gemini",
    name: "Gemini",
    description: "Works great with Gems",
    iconUrl:
      "https://www.gstatic.com/lamda/images/gemini_sparkle_v002_d4735304ff6292a690345.svg",
    steps: [
      {
        title: "Download Files",
        body: "Download both `System_Prompt.md` and `Case_Hub.csv` from this page.",
      },
      {
        title: "Create a Gem",
        body: "Go to gemini.google.com → Sidebar → Gems → Create New Gem. Name it: `PJX Case Trainer`",
      },
      {
        title: "Upload Files",
        body: "In the Gem creator → Add files → Upload both `.md` and `.csv` files.",
      },
      {
        title: "Add Instructions",
        body: "In the Instructions field → Paste your Role Instructions (provided by PJX team) → Save.",
      },
      {
        title: "Start a Session",
        body: "Open your saved Gem → Use sample prompts on this page to begin.",
      },
    ],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    description: "Familiar Projects interface",
    iconUrl:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg",
    note: "For long sessions, start a fresh chat for each new case to maintain context quality.",
    steps: [
      {
        title: "Download Files",
        body: "Download both `System_Prompt.md` and `Case_Hub.csv` from this page.",
      },
      {
        title: "Create a Project",
        body: "Go to chatgpt.com → Left sidebar → Projects → New Project. Name it: `PJX Case Trainer`",
      },
      {
        title: "Upload Files",
        body: "Inside the project → Add files → Upload both `.md` and `.csv` files.",
      },
      {
        title: "Add Instructions",
        body: "In project settings → Project Instructions → Paste your Role Instructions → Save.",
      },
      {
        title: "Start a Session",
        body: "Click New Chat inside the project → Use sample prompts on this page to begin.",
      },
    ],
  },
];

function InlineCodeText({ text }: { text: string }) {
  const segments = text.split(/(`[^`]+`)/g);

  return (
    <p className="text-[0.875rem] font-normal leading-[1.6] tracking-[0.01em] text-[rgba(255,255,255,0.6)]">
      {segments.map((segment, index) =>
        segment.startsWith("`") && segment.endsWith("`") ? (
          <code
            key={`${segment}-${index}`}
            className="lumina-inline-code"
          >
            {segment.slice(1, -1)}
          </code>
        ) : (
          <span key={`${segment}-${index}`}>{segment}</span>
        ),
      )}
    </p>
  );
}

function PlatformSteps({
  platform,
  openStep,
  onToggleStep,
  onNextStep,
}: {
  platform: Platform;
  openStep: number | null;
  onToggleStep: (stepIndex: number) => void;
  onNextStep: (stepIndex: number) => void;
}) {
  return (
    <div className="space-y-1">
      {platform.steps.map((step, index) => {
        const isOpen = openStep === index;
        const hasNext = index < platform.steps.length - 1;

        return (
          <div
            key={`${platform.id}-${step.title}`}
            className="relative"
          >
            <button
              type="button"
              onClick={() => onToggleStep(index)}
              className="flex w-full items-start justify-between gap-4 py-5 text-left"
            >
              <span className="flex items-start gap-4">
                <span className="mt-0.5 font-md3-mono text-[0.8125rem] font-normal uppercase leading-[1.4] tracking-[0.17em] text-[rgba(255,255,255,0.4)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-[0.9375rem] font-normal leading-[1.4] text-[rgba(255,255,255,0.85)]">
                  {step.title}
                </span>
              </span>

              <ChevronDown
                className={cn(
                  "mt-0.5 h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200",
                  isOpen && "rotate-180",
                )}
              />
            </button>

            {index < platform.steps.length - 1 ? (
              <div className="lumina-divider" />
            ) : null}

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key={`${platform.id}-${index}-body`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="pb-5 pl-11">
                    <InlineCodeText text={step.body} />

                    {hasNext ? (
                      <button
                        type="button"
                        onClick={() => onNextStep(index)}
                        className="mt-4 font-md3-mono text-xs font-normal uppercase leading-[1.4] tracking-[0.17em] text-[rgba(255,255,255,0.4)] transition hover:text-[#8BEAFF]"
                      >
                        Next →
                      </button>
                    ) : null}
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

export default function SetupGuide() {
  const [selectedPlatformId, setSelectedPlatformId] = useState<string | null>(
    null,
  );
  const [openSteps, setOpenSteps] = useState<Record<string, number | null>>({});

  const selectedPlatform =
    platforms.find((platform) => platform.id === selectedPlatformId) ?? null;
  const selectedOpenStep =
    selectedPlatform &&
    Object.prototype.hasOwnProperty.call(openSteps, selectedPlatform.id)
      ? openSteps[selectedPlatform.id]
      : 0;

  const handleSelectPlatform = (platformId: string) => {
    setSelectedPlatformId(platformId);
    setOpenSteps((current) => ({
      ...current,
      [platformId]:
        Object.prototype.hasOwnProperty.call(current, platformId)
          ? current[platformId]
          : 0,
    }));
    trackCaseTrainerPlatformSelect(platformId);
  };

  const handleCollapsePlatform = (platformId: string) => {
    if (selectedPlatformId !== platformId) {
      return;
    }

    setOpenSteps((current) => ({
      ...current,
      [platformId]: null,
    }));
  };

  const handleToggleStep = (platformId: string, stepIndex: number) => {
    setOpenSteps((current) => ({
      ...current,
      [platformId]:
        (
          Object.prototype.hasOwnProperty.call(current, platformId)
            ? current[platformId]
            : 0
        ) === stepIndex
          ? null
          : stepIndex,
    }));
  };

  const handleNextStep = (platformId: string, stepIndex: number) => {
    const platform = platforms.find((item) => item.id === platformId);

    if (!platform) {
      return;
    }

    setOpenSteps((current) => ({
      ...current,
      [platformId]:
        stepIndex < platform.steps.length - 1 ? stepIndex + 1 : null,
    }));
  };

  return (
    <section className="reveal space-y-10">
      <div className="max-w-3xl">
        <p className="lumina-gradient-text font-md3-mono text-[0.75rem] font-normal uppercase leading-[1.4] tracking-[0.17em]">
          How to set up
        </p>
        <h2 className="lumina-setup-headline mt-4 font-md3-serif">
          Pick your platform. Follow{" "}
          <span className="lumina-gradient-text">5 steps.</span>
        </h2>
        <p className="mt-4 max-w-[560px] text-base font-normal leading-[1.7] tracking-[0.01em] text-[rgba(255,255,255,0.6)]">
          Select Claude, Gemini, or ChatGPT — then follow the steps to go from
          zero to first session in under 3 minutes.
        </p>
      </div>

      <div className="-mx-5 overflow-x-auto px-5 sm:mx-0 sm:px-0">
        <div className="flex min-w-full gap-4 pb-2 sm:min-w-0">
          {platforms.map((platform, index) => {
            const isSelected = selectedPlatformId === platform.id;

            return (
              <motion.button
                key={platform.id}
                type="button"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ delay: index * 0.08, duration: 0.45 }}
                onClick={() => handleSelectPlatform(platform.id)}
                onDoubleClick={() => handleCollapsePlatform(platform.id)}
                className={cn(
                  "platform-card lumina-glass min-w-[280px] flex-1 rounded-3xl p-6 text-left sm:min-w-0",
                  selectedPlatformId === null
                    ? "hover:bg-[rgba(255,255,255,0.06)]"
                    : isSelected
                      ? "active"
                      : "inactive",
                )}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={platform.iconUrl}
                      alt={platform.name}
                      className="platform-icon"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <div>
                      <h3 className="text-[1.25rem] font-semibold leading-[1.2] text-white">
                        {platform.name}
                      </h3>
                      <p className="mt-2 text-sm font-normal leading-[1.7] tracking-[0.01em] text-[rgba(255,255,255,0.65)]">
                        {platform.description}
                      </p>
                    </div>
                  </div>

                  {platform.recommended ? (
                    <span className="rounded-full border border-[#17CAFA]/40 bg-[#17CAFA]/12 px-3 py-1 font-md3-mono text-[0.6875rem] font-normal uppercase leading-[1.4] tracking-[0.12em]">
                      <span className="lumina-gradient-text">Recommended</span>
                    </span>
                  ) : null}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence initial={false} mode="wait">
        {selectedPlatform ? (
          <motion.div
            key={selectedPlatform.id}
            initial={{ height: 0, opacity: 0, y: -10 }}
            animate={{ height: "auto", opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="lumina-glass rounded-3xl p-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${selectedPlatform.id}-content`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  <p className="panel-context-line">
                    Follow these steps to set up{" "}
                    <span className="platform-name-inline">
                      {selectedPlatform.name}
                    </span>
                  </p>

                  <div>
                    <PlatformSteps
                      platform={selectedPlatform}
                      openStep={selectedOpenStep}
                      onToggleStep={(stepIndex) =>
                        handleToggleStep(selectedPlatform.id, stepIndex)
                      }
                      onNextStep={(stepIndex) =>
                        handleNextStep(selectedPlatform.id, stepIndex)
                      }
                    />
                  </div>

                  {selectedPlatform.note ? (
                    <div className="lumina-glass mt-6 rounded-2xl px-4 py-3 text-sm font-normal leading-[1.7] tracking-[0.01em] text-[rgba(255,255,255,0.65)]">
                      {selectedPlatform.note}
                    </div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
