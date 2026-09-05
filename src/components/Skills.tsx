import SectionHeading from "@/components/SectionHeading";

const skillGroups = [
  { title: "Engineering", skills: ["Civil engineering", "Structural engineering", "Foundation engineering", "Reinforced concrete design", "Prestressed concrete pile design"] },
  { title: "Cost & Tender", skills: ["Tender engineering", "Cost engineering", "Cost control", "Pricing analysis"] },
  { title: "Coordination", skills: ["Technical coordination", "Multidisciplinary team coordination", "Technical proposal preparation"] },
];

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-heading" className="scroll-mt-24 border-t border-[#e2d7cc] py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading eyebrow="Capabilities" title="Technical depth, connected across disciplines." headingId="skills-heading" />

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((group) => (
            <article key={group.title} className="rounded-[26px] border border-[#ded2c7] bg-white/70 p-6">
              <h3 className="text-lg font-bold text-[#332e2a]">{group.title}</h3>
              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#655e57]">
                {group.skills.map((skill) => <li key={skill} className="border-b border-[#ebe3dc] pb-3 last:border-0 last:pb-0">{skill}</li>)}
              </ul>
            </article>
          ))}

          <article className="rounded-[26px] border border-[#ded2c7] bg-white/70 p-6">
            <h3 className="text-lg font-bold text-[#332e2a]">Digital Tools</h3>
            <ul className="mt-5 space-y-3 text-sm leading-6 text-[#655e57]">
              {[
                "AutoCAD",
                "Microsoft Excel — Advanced",
                "Microsoft Office",
                "AI-Assisted Engineering Workflows",
              ].map((tool) => (
                <li key={tool} className="border-b border-[#ebe3dc] pb-3 last:border-0 last:pb-0">{tool}</li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
