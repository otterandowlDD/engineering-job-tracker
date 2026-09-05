import SectionHeading from "@/components/SectionHeading";

const projects = [
  {
    number: "01",
    title: "Technical & Commercial Tender Management",
    description:
      "Managed scope review, quantity take-off, cost estimation, supplier quotations, and technical clarifications. Evaluated commercial options while protecting constructability, project requirements, and target margin.",
    label: "Tender Management • Cost Control",
  },
  {
    number: "02",
    title: "Multi-Stakeholder Project Coordination",
    description:
      "Coordinated clients, designers, factories, suppliers, subcontractors, and site teams to resolve technical constraints and confirm deliverables across multiple workstreams.",
    label: "Stakeholder Management • Delivery Control",
  },
  {
    number: "03",
    title: "Foundation Redesign for Pile Deviation",
    description:
      "Redesigned pile caps following actual pile-coordinate deviations. Assessed load redistribution, eccentric moments, pile reactions, cap dimensions, thickness, and reinforcement before coordinating the revised solution for construction.",
    label: "Foundation Design • Technical Decision",
  },
];

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-heading" className="scroll-mt-24 border-t border-[#e2d7cc] py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Selected work"
          title="Tendering, coordination, and foundation design in practice."
          headingId="projects-heading"
          description="A closer look at how I manage technical scope, commercial priorities, and stakeholder coordination across live projects."
        />

        <div className="mt-12 grid auto-rows-fr gap-5 md:grid-cols-3">
          {projects.map((project) => (
            <article key={project.number} className="group flex min-h-72 flex-col rounded-[28px] border border-[#ded2c7] bg-[#fffdfa] p-6 shadow-[0_12px_30px_rgba(76,58,42,0.05)] transition-transform duration-200 hover:-translate-y-1 sm:p-7">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a6544]">Project {project.number}</span>
                <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-full border border-[#d8cabd] text-[#8a6544]">↗</span>
              </div>
              <div className="my-8 h-px bg-[#e4dad1]" />
              <h3 className="text-xl font-bold text-[#302b27]">{project.title}</h3>
              <p className="mt-4 text-sm leading-7 text-[#70675f]">{project.description}</p>
              <p className="mt-auto pt-8 text-xs font-semibold uppercase tracking-[0.16em] text-[#95877a]">{project.label}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
