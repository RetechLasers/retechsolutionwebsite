import { ArrowLeft, Handshake } from 'lucide-react';
import MOUs from './partnerships/MOUs';
import ConsultancyWorks from './partnerships/ConsultancyWorks';
import TrustedVendors from './partnerships/TrustedVendors';

export default function Partnerships({ activeSection, setActiveSection }) {
  return (
    <div>
      {activeSection.startsWith('partnerships-') && (
        <button
          onClick={() => setActiveSection('partnerships')}
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2 text-blue-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-blue-50"
        >
          <ArrowLeft size={20} />
          Back to Partnerships
        </button>
      )}

      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 text-white shadow-lg">
          <Handshake size={28} />
        </div>
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-cyan-300">
            Collaborations
          </p>
          <h2 className="text-4xl font-extrabold text-white">
            Partnerships
          </h2>
        </div>
      </div>

      <div className="mb-10 flex flex-wrap gap-4">
        <button
          onClick={() => setActiveSection('partnerships-mous')}
          className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-1 hover:shadow-xl"
        >
          MOUs
        </button>

        <button
          onClick={() => setActiveSection('partnerships-consultancy')}
          className="rounded-xl bg-gradient-to-r from-purple-600 to-pink-500 px-6 py-3 font-bold text-white shadow-lg shadow-purple-200 transition hover:-translate-y-1 hover:shadow-xl"
        >
          Consultancy Works
        </button>

        <button
          onClick={() => setActiveSection('partnerships-vendors')}
          className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 font-bold text-white shadow-lg shadow-green-200 transition hover:-translate-y-1 hover:shadow-xl"
        >
          Trusted Vendors
        </button>
      </div>

      {activeSection === 'partnerships' && (
        <div className="rounded-[28px] bg-white/75 p-12 text-center shadow-xl ring-1 ring-white/60 backdrop-blur-xl">
          <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-blue-100 to-cyan-100 text-blue-600">
            <Handshake size={40} />
          </div>
          <p className="text-lg text-slate-600">
            Select a category above to view and manage partnerships
          </p>
        </div>
      )}

      {activeSection === 'partnerships-mous' && <MOUs />}
      {activeSection === 'partnerships-consultancy' && <ConsultancyWorks />}
      {activeSection === 'partnerships-vendors' && <TrustedVendors />}
    </div>
  );
}