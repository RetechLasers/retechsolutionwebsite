import { useEffect, useState } from 'react';
import { Upload, X, FileText, Calendar } from 'lucide-react';

interface MOU {
  id: string;
  organization: string;
  date: string;
  description: string;
  document?: string;
}

const STORAGE_KEY = 'retech_mous_v1';

const DEFAULT_MOUS: MOU[] = [
  {
    id: '1',
    organization: 'Tech Innovation Institute',
    date: '2024-03-15',
    description: 'Collaboration for research and development in AI and Machine Learning',
  },
  {
    id: '2',
    organization: 'Global Software Solutions',
    date: '2024-01-20',
    description: 'Student internship and placement opportunities',
  },
  {
    id: '3',
    organization: 'Engineering Research Labs',
    date: '2023-11-10',
    description: 'Joint research initiatives in embedded systems and IoT',
  },
];

function loadMOUs(): MOU[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as MOU[]) : DEFAULT_MOUS;
  } catch {
    return DEFAULT_MOUS;
  }
}

interface MOUsProps {
  isAdmin?: boolean;
}

export default function MOUs({ isAdmin = false }: MOUsProps) {
  const [mous, setMous] = useState<MOU[]>(() => loadMOUs());

  // Persist so admin additions survive reloads.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(mous));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [mous]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newMOU, setNewMOU] = useState<Partial<MOU>>({
    organization: '',
    date: '',
    description: '',
  });

  const handleAddMOU = () => {
    if (newMOU.organization && newMOU.date && newMOU.description) {
      const mou: MOU = {
        id: Date.now().toString(),
        organization: newMOU.organization,
        date: newMOU.date,
        description: newMOU.description,
      };
      setMous([...mous, mou]);
      setNewMOU({ organization: '', date: '', description: '' });
      setShowAddForm(false);
    }
  };

  const deleteMOU = (id: string) => {
    if (window.confirm('Delete this MOU?')) {
      setMous(mous.filter((mou) => mou.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">Memorandums of Understanding</h3>
        {isAdmin && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Upload size={20} />
            {showAddForm ? 'Cancel' : 'Add MOU'}
          </button>
        )}
      </div>

      {isAdmin && showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-4">Add New MOU</h4>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Organization Name"
              value={newMOU.organization}
              onChange={(e) => setNewMOU({ ...newMOU, organization: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="date"
              value={newMOU.date}
              onChange={(e) => setNewMOU({ ...newMOU, date: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              placeholder="Description"
              value={newMOU.description}
              onChange={(e) => setNewMOU({ ...newMOU, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleAddMOU}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save MOU
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mous.map((mou) => (
          <div key={mou.id} className="relative group bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            {isAdmin && (
              <button
                onClick={() => deleteMOU(mou.id)}
                className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            )}

            <div className="flex items-center gap-3 mb-4">
              <FileText className="text-blue-600" size={24} />
              <h4 className="font-semibold text-gray-900">{mou.organization}</h4>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
              <Calendar size={16} />
              <span>{new Date(mou.date).toLocaleDateString()}</span>
            </div>

            <p className="text-gray-600 text-sm">{mou.description}</p>
          </div>
        ))}
      </div>

      {mous.length === 0 && (
        <div className="text-center py-20 bg-white rounded-lg shadow-md">
          <FileText size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            {isAdmin ? 'No MOUs added yet. Click the button to add one.' : 'No MOUs available yet.'}
          </p>
        </div>
      )}
    </div>
  );
}