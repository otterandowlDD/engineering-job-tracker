type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  headingId: string;
  description?: string;
};

export default function SectionHeading({
  eyebrow,
  title,
  headingId,
  description,
}: SectionHeadingProps) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8a6544]">{eyebrow}</p>
      <h2 id={headingId} className="mt-4 max-w-3xl text-3xl font-bold tracking-tight text-[#2f2a26] sm:text-4xl">
        {title}
      </h2>
      {description ? <p className="mt-5 max-w-2xl leading-7 text-[#68615a]">{description}</p> : null}
    </div>
  );
}
