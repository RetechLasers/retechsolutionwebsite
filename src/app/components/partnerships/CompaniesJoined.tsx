import { useEffect, useState } from 'react';
import { Upload, X, Briefcase } from 'lucide-react';

interface Consultancy {
  id: string;
  client: string;
  project: string;
  year: string;
  status: string;
}

const STORAGE_KEY = 'retech_consultancy_v1';

const DEFAULT_CONSULTANCIES: Consultancy[] = [
  {
    id: '1',
    client: 'ABC Manufacturing Ltd',
    project: 'Industrial Automation System Design',
    year: '2024',
    status: 'Completed',
  },
  {
    id: '2',
    client: 'XYZ Tech Solutions',
    project: 'Machine Learning Model Development',
    year: '2024',
    status: 'In Progress',
  },
  {
    id: '3',
    client: 'Global Energy Corp',
    project: 'Smart Grid Analytics Platform',
    year: '2023',
    status: 'Completed',
  },
];

function loadConsultancies(): Consultancy[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consultancy[]) : DEFAULT_CONSULTANCIES;
  } catch {
    return DEFAULT_CONSULTANCIES;
  }
}

interface ConsultancyWorksProps {
  isAdmin?: boolean;
}

export default function ConsultancyWorks({ isAdmin = false }: ConsultancyWorksProps) {
  const [consultancies, setConsultancies] = useState<Consultancy[]>(() => loadConsultancies());

  // Persist so admin additions survive reloads.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(consultancies));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [consultancies]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newConsultancy, setNewConsultancy] = useState<Partial<Consultancy>>({
    client: '',
    project: '',
    year: '',
    status: 'In Progress',
  });

  const handleAddConsultancy = () => {
    if (newConsultancy.client && newConsultancy.project && newConsultancy.year) {
      const consultancy: Consultancy = {
        id: Date.now().toString(),
        client: newConsultancy.client,
        project: newConsultancy.project,
        year: newConsultancy.year,
        status: newConsultancy.status || 'In Progress',
      };
      setConsultancies([...consultancies, consultancy]);
      setNewConsultancy({ client: '', project: '', year: '', status: 'In Progress' });
      setShowAddForm(false);
    }
  };

  const deleteConsultancy = (id: string) => {
    if (window.confirm('Delete this project?')) {
      setConsultancies(consultancies.filter((c) => c.id !== id));
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-semibold text-gray-900">Consultancy Works</h3>
        {isAdmin && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Upload size={20} />
            {showAddForm ? 'Cancel' : 'Add Project'}
          </button>
        )}
      </div>

      {isAdmin && showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h4 className="font-semibold text-gray-900 mb-4">Add New Consultancy Project</h4>
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Client Name"
              value={newConsultancy.client}
              onChange={(e) => setNewConsultancy({ ...newConsultancy, client: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Project Name"
              value={newConsultancy.project}
              onChange={(e) => setNewConsultancy({ ...newConsultancy, project: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Year"
              value={newConsultancy.year}
              onChange={(e) => setNewConsultancy({ ...newConsultancy, year: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <select
              value={newConsultancy.status}
              onChange={(e) => setNewConsultancy({ ...newConsultancy, status: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>
            <button
              onClick={handleAddConsultancy}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save Project
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {consultancies.map((consultancy) => (
          <div key={consultancy.id} className="relative group bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
            {isAdmin && (
              <button
                onClick={() => deleteConsultancy(consultancy.id)}
                className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>
            )}

            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="text-blue-600" size={24} />
              <span className={`px-3 py-1 rounded-full text-xs ${
                consultancy.status === 'Completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {consultancy.status}
              </span>
            </div>

            <h4 className="font-semibold text-gray-900 mb-2">{consultancy.project}</h4>
            <p className="text-gray-600 text-sm mb-2">{consultancy.client}</p>
            <p className="text-gray-500 text-xs">Year: {consultancy.year}</p>
          </div>
        ))}
      </div>

      {consultancies.length === 0 && (
        <div className="text-center py-20 bg-white rounded-lg shadow-md">
          <Briefcase size={48} className="mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">
            {isAdmin
              ? 'No consultancy projects added yet. Click the button to add one.'
              : 'No consultancy projects available yet.'}
          </p>
        </div>
      )}
    </div>
  );
}