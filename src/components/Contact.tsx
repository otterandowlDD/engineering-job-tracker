import SectionHeading from "@/components/SectionHeading";

export default function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-heading" className="scroll-mt-24 border-t border-[#e2d7cc] py-20 sm:py-24">
      <div className="mx-auto grid w-full max-w-6xl gap-10 rounded-[32px] border border-[#d7c8bb] bg-[#e9ddd1] p-7 shadow-[0_20px_55px_rgba(76,58,42,0.08)] sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end lg:p-14">
        <div>
          <SectionHeading eyebrow="Contact" title="Let’s discuss your next project." headingId="contact-heading" />
          <p className="mt-6 max-w-2xl text-base leading-8 text-[#5f554d]">For opportunities involving foundation engineering, cost and tender thinking, or technical coordination, reach out by email or LinkedIn.</p>
          <p className="mt-5 text-sm font-semibold text-[#51483f]">Bangkok, Thailand</p>
        </div>

        <div className="flex flex-wrap gap-3 lg:max-w-xs lg:justify-end">
          <a href="mailto:k.hemngern@hotmail.com" className="rounded-full border border-[#bda995] bg-[#f1e9e1] px-5 py-3 text-sm font-semibold text-[#786d64] opacity-80">Email</a>
          <a href="https://www.linkedin.com/in/khanittha-hemngern-317530418" className="rounded-full border border-[#bda995] bg-[#f1e9e1] px-5 py-3 text-sm font-semibold text-[#786d64] opacity-80">LinkedIn</a>
        </div>
      </div>
    </section>
  );
}
