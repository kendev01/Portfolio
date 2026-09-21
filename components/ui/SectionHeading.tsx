import Reveal from "./Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  align?: "left" | "center";
}

export default function SectionHeading({ eyebrow, title, align = "left" }: SectionHeadingProps) {
  return (
    <Reveal className={align === "center" ? "text-center" : "text-left"}>
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">
        {eyebrow}
      </span>
      <h2 className="mt-3 font-heading text-3xl font-bold sm:text-4xl">{title}</h2>
      <div
        className={`mt-4 h-1 w-16 rounded-full bg-accent ${align === "center" ? "mx-auto" : ""}`}
      />
    </Reveal>
  );
}
