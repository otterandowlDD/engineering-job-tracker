export default function Footer() {
  return (
    <footer className="border-t border-[#e2d7cc] py-8">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 px-6 text-sm text-[#6d655e] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-bold text-[#37312d]">Ning</p>
          <p className="mt-1">Civil / Structural Engineer</p>
        </div>
        <p>© {new Date().getFullYear()} Ning</p>
      </div>
    </footer>
  );
}
