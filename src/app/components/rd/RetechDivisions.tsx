import { useState } from 'react';
import { X } from 'lucide-react';

function Lightbox({ src, alt, onClose }) {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        className="absolute right-5 top-5 rounded-full bg-white/10 p-2 text-white ring-1 ring-white/30 transition hover:bg-white/20"
      >
        <X size={22} />
      </button>
      <img
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
        className="max-h-[88vh] max-w-[92vw] rounded-2xl object-contain shadow-2xl"
      />
    </div>
  );
}

function PhotoGrid({ photos }) {
  const [active, setActive] = useState(null);
  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((p, i) => (
          <button
            type="button"
            key={i}
            onClick={() => setActive(p)}
            className="group relative overflow-hidden rounded-2xl bg-white text-left shadow-sm ring-1 ring-slate-100 transition duration-500 hover:-translate-y-1 hover:shadow-[0_20px_50px_rgba(14,165,233,0.20)] hover:ring-blue-200"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100">
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className="h-full w-full object-cover transition duration-500 group-hover:scale-110"
              />
            </div>
            {p.caption && (
              <div className="p-4">
                <p className="text-sm font-semibold text-slate-700">{p.caption}</p>
              </div>
            )}
          </button>
        ))}
      </div>
      {active && <Lightbox src={active.src} alt={active.alt} onClose={() => setActive(null)} />}
    </>
  );
}

function SectionHeader({ eyebrow, title, description }) {
  return (
    <div className="mb-10 max-w-3xl">
      <div className="mb-4 inline-flex rounded-full bg-blue-50 px-5 py-2 text-sm font-bold text-blue-700 ring-1 ring-blue-100">
        {eyebrow}
      </div>
      <h1 className="text-3xl font-black tracking-tight text-slate-800 sm:text-4xl">{title}</h1>
      <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">{description}</p>
    </div>
  );
}

function DivisionShell({ children }) {
  return (
    <section className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/40 px-5 py-10 shadow-[0_30px_110px_rgba(14,165,233,0.10)] backdrop-blur-[2px] sm:rounded-[42px] sm:px-8 sm:py-14 lg:px-12">
      {children}
    </section>
  );
}

export function RetechMotorsPage({ photos }) {
  return (
    <DivisionShell>
      <SectionHeader
        eyebrow="Retech Motors"
        title="Designing & Testing BLDC Motors, In-House"
        description="Our Retech Motors division designs, builds, and validates BLDC motor drivers and motor assemblies from the ground up — from custom PCB driver boards to full torque, velocity, and position testing on our in-house Spinner test rig."
      />
      <PhotoGrid photos={photos} />
    </DivisionShell>
  );
}

export function RetechLasersPage({ photos }) {
  return (
    <DivisionShell>
      <SectionHeader
        eyebrow="Retech Lasers"
        title="Precision Laser Machinery & Manufacturing"
        description="Retech Lasers builds cutting-edge machinery powered by laser technology, engineered for precision manufacturing. Our team combines mechanical design with hardware integration to deliver reliable, production-ready laser systems."
      />
      <PhotoGrid photos={photos} />
    </DivisionShell>
  );
}

export function ResearchDevelopmentPage({ photos }) {
  return (
    <DivisionShell>
      <SectionHeader
        eyebrow="Research & Development"
        title="Humanoid Robotics, Motor Control Software & AI"
        description="Our R&D team works across the full stack — CAD design of humanoid robot limbs and actuators, custom motor-control software like our Spinner interface, and GPU-accelerated neural network training and testing for robotic perception and control."
      />
      <PhotoGrid photos={photos} />
    </DivisionShell>
  );
}
