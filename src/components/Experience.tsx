import SectionHeading from "@/components/SectionHeading";

const experiences = [
  {
    role: "Senior Civil Engineer",
    employer: "Southern Concrete Pile Public Company Limited",
    dates: "February 2018 — May 2026",
    summary:
      "Delivered structural and foundation engineering solutions for industrial, commercial, and infrastructure projects involving prestressed concrete piles, bored piles, and steel pipe piles.",
    responsibilities: [
      "Performed structural calculations, pile-capacity analysis, and design verification in accordance with Thai Industrial Standards (TIS) and Department of Public Works (DPT) standards.",
      "Prepared BOQs, cost estimates, technical proposals, and commercial evaluations for project bidding and engineering decisions.",
      "Evaluated pile deviation, pile inclination, constructability challenges, and site constraints with clients, consultants, contractors, and multidisciplinary teams.",
      "Reviewed calculations, reinforcement detailing, shop drawings, and technical documentation prepared by junior engineers.",
      "Coordinated engineering, production, quality assurance, logistics, and commercial teams.",
      "Mentored junior engineers and provided technical guidance.",
    ],
  },
  {
    role: "Office Engineer",
    employer: "Koranit Construction Co., Ltd.",
    dates: "August 2016 — August 2017",
    summary: null,
    responsibilities: [
      "Reviewed tender documents, specifications, drawings, and Bills of Quantities.",
      "Prepared quantity take-offs, cost estimates, tender budgets, and subcontractor evaluations.",
      "Coordinated engineering information throughout tender preparation and bid submission.",
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-heading" className="scroll-mt-24 border-t border-[#e2d7cc] py-20 sm:py-24">
      <div className="mx-auto w-full max-w-6xl">
        <SectionHeading
          eyebrow="Experience"
          title="Experience across foundation engineering and project delivery."
          headingId="experience-heading"
          description="9+ years spanning structural and foundation engineering, cost estimation, technical tendering, and multidisciplinary project coordination across industrial, commercial, and infrastructure projects."
        />

        <ol className="relative mt-12 space-y-6 border-l border-[#cdbba9] pl-8 sm:ml-4 sm:pl-12">
          {experiences.map((experience) => (
            <li key={`${experience.employer}-${experience.dates}`} className="relative">
              <span className="absolute -left-[2.55rem] top-7 h-4 w-4 rounded-full border-4 border-[#f7f3ee] bg-[#8a6544] sm:-left-[3.55rem]" aria-hidden="true" />
              <article className="rounded-[28px] border border-[#ded2c7] bg-white/75 p-6 shadow-[0_12px_35px_rgba(76,58,42,0.06)] sm:p-8">
                <div className="grid gap-6 sm:grid-cols-[1fr_auto] sm:items-start">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8a6544]">Role</p>
                    <h3 className="mt-2 text-xl font-bold text-[#302b27]">{experience.role}</h3>
                    <p className="mt-2 text-[#6f665e]">{experience.employer}</p>
                  </div>
                  <p className="w-fit rounded-full border border-[#ded2c7] bg-[#f4ede6] px-4 py-2 text-sm text-[#655a51]">{experience.dates}</p>
                </div>
                <div className="mt-7 border-t border-[#e7ded6] pt-6">
                  {experience.summary ? (
                    <p className="font-semibold leading-7 text-[#403a35]">{experience.summary}</p>
                  ) : null}
                  <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm leading-6 text-[#70675f] lg:grid-cols-2">
                    {experience.responsibilities.map((responsibility) => (
                      <li key={responsibility} className="relative pl-4 before:absolute before:left-0 before:top-[0.65rem] before:h-1 before:w-1 before:rounded-full before:bg-[#8a6544]">
                        {responsibility}
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
