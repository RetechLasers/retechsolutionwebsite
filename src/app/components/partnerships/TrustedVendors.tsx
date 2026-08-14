import { useEffect, useState } from 'react';
import { Upload, X, Store, MapPin, Phone } from 'lucide-react';

interface Vendor {
  id: string;
  name: string;
  category: string;
  location: string;
  contact: string;
  description: string;
}

const STORAGE_KEY = 'retech_vendors_v1';

const DEFAULT_VENDORS: Vendor[] = [
  {
    id: '1',
    name: 'Premium Electronics Suppliers',
    category: 'Electronics Components',
    location: 'Chennai, Tamil Nadu',
    contact: '+91 98765 43210',
    description: 'Reliable supplier of electronic components and PCB materials',
  },
  {
    id: '2',
    name: 'Industrial Equipment Co.',
    category: 'Machinery',
    location: 'Bangalore, Karnataka',
    contact: '+91 98765 43211',
    description: 'Quality industrial machinery and equipment provider',
  },
  {
    id: '3',
    name: 'Software Solutions Ltd',
    category: 'Software Tools',
    location: 'Hyderabad, Telangana',
    contact: '+91 98765 43212',
    description: 'Enterprise software tools and development platforms',
  },
];

function loadVendors(): Vendor[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Vendor[]) : DEFAULT_VENDORS;
  } catch {
    return DEFAULT_VENDORS;
  }
}

interface TrustedVendorsProps {
  isAdmin?: boolean;
}

export default function TrustedVendors({ isAdmin = false }: TrustedVendorsProps) {
  const [vendors, setVendors] = useState<Vendor[]>(() => loadVendors());

  // Persist so admin additions survive reloads.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(vendors));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [vendors]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newVendor, setNewVendor] = useState<Partial<Vendor>>({
    name: '',
    category: '',
    location: '',
    contact: '',
    description: '',
  });

  const handleAddVendor = () => {
    if (newVendor.name && newVendor.category && newVendor.location && newVendor.contact && newVendor.description) {
      const vendor: Vendor = {
        id: Date.now().toString(),
        name: newVendor.name,
        category: newVendor.category,
        location: newVendor.location,
        contact: newVendor.contact,
        description: newVendor.description,
      };
      setVendors([...vendors, vendor]);
      setNewVendor({ name: '', category: '', location: '', contact: '', description: '' });
      setShowAddForm(false);
    }
  };

  const deleteVendor = (id: string) => {
    if (window.confirm('Delete this vendor?')) {
      setVendors(vendors.filter((vendor) => vendor.id !== id));
    }
  };

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-green-600 to-emerald-500 text-white shadow-lg">
            <Store size={28} />
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-green-600">Business Partners</p>
            <h3 className="text-3xl font-extrabold text-white">Trusted Vendors</h3>
          </div>
        </div>

        {isAdmin && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-6 py-3 font-bold text-white shadow-lg shadow-green-200 transition hover:-translate-y-1 hover:shadow-xl"
          >
            {showAddForm ? <X size={20} /> : <Upload size={20} />}
            {showAddForm ? 'Cancel' : 'Add Vendor'}
          </button>
        )}
      </div>

      {isAdmin && showAddForm && (
        <div className="mb-10 rounded-[28px] bg-white/75 p-8 shadow-xl ring-1 ring-white/60 backdrop-blur-xl">
          <h4 className="mb-6 text-2xl font-extrabold text-slate-900">Add New Vendor</h4>
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Vendor Name"
                value={newVendor.name}
                onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
                className="rounded-xl border border-slate-200 px-5 py-3 outline-none ring-1 ring-slate-100 transition focus:border-green-500 focus:ring-green-100"
              />
              <input
                type="text"
                placeholder="Category"
                value={newVendor.category}
                onChange={(e) => setNewVendor({ ...newVendor, category: e.target.value })}
                className="rounded-xl border border-slate-200 px-5 py-3 outline-none ring-1 ring-slate-100 transition focus:border-green-500 focus:ring-green-100"
              />
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Location"
                value={newVendor.location}
                onChange={(e) => setNewVendor({ ...newVendor, location: e.target.value })}
                className="rounded-xl border border-slate-200 px-5 py-3 outline-none ring-1 ring-slate-100 transition focus:border-green-500 focus:ring-green-100"
              />
              <input
                type="text"
                placeholder="Contact Number"
                value={newVendor.contact}
                onChange={(e) => setNewVendor({ ...newVendor, contact: e.target.value })}
                className="rounded-xl border border-slate-200 px-5 py-3 outline-none ring-1 ring-slate-100 transition focus:border-green-500 focus:ring-green-100"
              />
            </div>
            <textarea
              placeholder="Description"
              value={newVendor.description}
              onChange={(e) => setNewVendor({ ...newVendor, description: e.target.value })}
              rows={3}
              className="w-full rounded-xl border border-slate-200 px-5 py-3 outline-none ring-1 ring-slate-100 transition focus:border-green-500 focus:ring-green-100"
            />
            <button
              onClick={handleAddVendor}
              className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-3 font-bold text-white shadow-lg shadow-green-200 transition hover:-translate-y-1 hover:shadow-xl"
            >
              Save Vendor
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {vendors.map((vendor) => (
          <div key={vendor.id} className="group relative overflow-hidden rounded-[28px] bg-white/75 p-7 shadow-xl ring-1 ring-white/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_25px_60px_rgba(34,197,94,0.25)]">
            {isAdmin && (
              <button
                onClick={() => deleteVendor(vendor.id)}
                className="absolute right-4 top-4 rounded-full bg-red-600 p-2 text-white opacity-0 shadow-lg transition-all duration-300 hover:scale-110 group-hover:opacity-100"
              >
                <X size={16} />
              </button>
            )}

            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-600 to-emerald-500 text-white shadow-lg">
                <Store size={22} />
              </div>
              <div>
                <h4 className="text-lg font-extrabold text-slate-900">{vendor.name}</h4>
                <span className="inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700 ring-1 ring-green-200">{vendor.category}</span>
              </div>
            </div>

            <div className="mb-4 space-y-2.5">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <MapPin size={16} />
                </div>
                <span className="font-medium">{vendor.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Phone size={16} />
                </div>
                <span className="font-medium">{vendor.contact}</span>
              </div>
            </div>

            <p className="leading-7 text-slate-600">{vendor.description}</p>
          </div>
        ))}
      </div>

      {vendors.length === 0 && (
        <div className="rounded-[28px] bg-white/75 py-20 text-center shadow-xl ring-1 ring-white/60 backdrop-blur-xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
              <Store size={40} />
            </div>
          </div>
          <p className="text-lg text-slate-600">
            {isAdmin ? 'No vendors added yet. Click the button to add one.' : 'No vendors available yet.'}
          </p>
        </div>
      )}
    </div>
  );
}