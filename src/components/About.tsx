import SectionHeading from "@/components/SectionHeading";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="scroll-mt-24 border-t border-[#e2d7cc] py-20 sm:py-24"
    >
      <div className="mx-auto grid w-full max-w-6xl gap-10 lg:grid-cols-[0.78fr_1.22fr] lg:gap-20">
        <SectionHeading
          eyebrow="About"
          title="Engineering decisions grounded in the whole project."
          headingId="about-heading"
        />

        <div className="space-y-6">
  <p>
    I’m a civil and structural engineer with 9+ years in foundation
    engineering, tendering, cost estimation, and project coordination.
  </p>

  <p>
    My strength is seeing both the technical and commercial sides of a
    project. I review the details, identify risks early, and work with
    different teams to carry practical solutions through to construction.
  </p>
</div>
      </div>
    </section>
  );
}
