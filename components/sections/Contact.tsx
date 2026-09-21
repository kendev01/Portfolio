"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedButton from "@/components/ui/AnimatedButton";
import Reveal from "@/components/ui/Reveal";
import Magnetic from "@/components/ui/Magnetic";
import { getIcon } from "@/components/ui/icon-map";
import { contactInfo, socialLinks } from "@/lib/data";
import {
  staggerContainer,
  fadeUp,
  hoverIcon,
  hoverSurface,
  HOVER_TRANSITION,
} from "@/lib/constants";
import type { ContactInfo } from "@/lib/types";
import Sheen from "@/components/ui/Sheen";

const icons: Record<ContactInfo["icon"], typeof Mail> = {
  Mail,
  Phone,
  MapPin,
};

const contactCard = hoverSurface();
const socialButton = hoverSurface(-4, 1.1);

export default function Contact() {
  return (
    <SectionWrapper id="contact">
      <SectionHeading eyebrow="Contact" title="Let's work together" align="center" />

      <Reveal>
        <p className="mx-auto mt-4 max-w-xl text-center text-muted">
          Have a project in mind or an opening on your team? I&apos;d love to hear from you.
        </p>
      </Reveal>

      <motion.div
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="mx-auto mt-12 grid max-w-3xl gap-5 sm:grid-cols-3"
      >
        {contactInfo.map((item) => {
          const Icon = icons[item.icon];
          return (
            <motion.div key={item.label} variants={fadeUp}>
              <motion.div
                initial="rest"
                animate="rest"
                whileHover="hover"
                variants={contactCard}
                transition={HOVER_TRANSITION}
                className="relative flex h-full flex-col items-center gap-3 overflow-hidden rounded-2xl border p-6 text-center"
              >
                <Sheen />

                <motion.span
                  variants={hoverIcon}
                  transition={{ type: "spring", stiffness: 400, damping: 14 }}
                  className="relative flex h-12 w-12 items-center justify-center rounded-full bg-accent/10"
                >
                  <Icon size={20} />
                </motion.span>
                <span className="relative text-xs font-semibold uppercase tracking-wider text-muted">
                  {item.label}
                </span>
                <div className="relative flex flex-col gap-1">
                  {item.entries.map((entry) =>
                    entry.href === "#" ? (
                      <span key={entry.value} className="text-sm font-medium">
                        {entry.value}
                      </span>
                    ) : (
                      <a
                        key={entry.value}
                        href={entry.href}
                        className="text-sm font-medium transition-colors hover:text-accent"
                      >
                        {entry.value}
                      </a>
                    ),
                  )}
                </div>
              </motion.div>
            </motion.div>
          );
        })}
      </motion.div>

      <motion.div
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        className="mt-8 flex justify-center gap-3"
      >
        {socialLinks.map((social) => {
          const Icon = getIcon(social.icon);
          return (
            <motion.div key={social.platform} variants={fadeUp}>
              <Magnetic strength={0.4}>
                <motion.a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.platform}
                  title={social.platform}
                  initial="rest"
                  animate="rest"
                  whileHover="hover"
                  variants={socialButton}
                  transition={HOVER_TRANSITION}
                  className="flex h-11 w-11 items-center justify-center rounded-full border"
                >
                  {Icon && (
                    <motion.span variants={hoverIcon} className="flex">
                      <Icon size={18} />
                    </motion.span>
                  )}
                </motion.a>
              </Magnetic>
            </motion.div>
          );
        })}
      </motion.div>

      <div className="mt-8 flex justify-center">
        <AnimatedButton href="mailto:kennethjohnbolilan01@gmail.com" variant="primary">
          <Mail size={16} />
          Say Hello
        </AnimatedButton>
      </div>
    </SectionWrapper>
  );
}
