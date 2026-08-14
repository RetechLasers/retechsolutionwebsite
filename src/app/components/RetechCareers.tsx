import { useEffect, useState } from 'react';
import { Briefcase, MapPin, DollarSign, Clock, X, ExternalLink, Plus } from 'lucide-react';

interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  salary?: string;
  description: string;
  requirements: string[];
  postedDate: string;
}

const STORAGE_KEY = 'retech_careers_v1';

const DEFAULT_JOBS: Job[] = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Chennai, India',
    type: 'Full-time',
    salary: '₹10-15 LPA',
    description: 'We are looking for an experienced software engineer to join our development team.',
    requirements: ['5+ years experience', 'React, Node.js', 'Strong problem-solving skills'],
    postedDate: '2024-04-20',
  },
  {
    id: '2',
    title: 'Data Analyst',
    department: 'Analytics',
    location: 'Bangalore, India',
    type: 'Full-time',
    salary: '₹6-9 LPA',
    description: 'Join our analytics team to help drive data-driven decisions.',
    requirements: ['3+ years experience', 'SQL, Python, Power BI', 'Statistical knowledge'],
    postedDate: '2024-04-18',
  },
  {
    id: '3',
    title: 'UI/UX Designer',
    department: 'Design',
    location: 'Remote',
    type: 'Full-time',
    salary: '₹7-10 LPA',
    description: 'Create beautiful and intuitive user experiences for our products.',
    requirements: ['4+ years experience', 'Figma, Adobe XD', 'Portfolio required'],
    postedDate: '2024-04-15',
  },
];

function loadJobs(): Job[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Job[]) : DEFAULT_JOBS;
  } catch {
    return DEFAULT_JOBS;
  }
}

const emptyJob = (): Partial<Job> => ({
  title: '',
  department: '',
  location: '',
  type: 'Full-time',
  salary: '',
  description: '',
  requirements: [],
  postedDate: new Date().toISOString().split('T')[0],
});

interface RetechCareersProps {
  isAdmin?: boolean;
}

export default function RetechCareers({ isAdmin = false }: RetechCareersProps) {
  const [jobs, setJobs] = useState<Job[]>(() => loadJobs());

  // Persist so admin-added openings survive reloads.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
    } catch {
      /* storage unavailable — ignore */
    }
  }, [jobs]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newJob, setNewJob] = useState<Partial<Job>>(emptyJob());
  const [requirementInput, setRequirementInput] = useState('');

  const handleAddRequirement = () => {
    if (requirementInput.trim()) {
      setNewJob({
        ...newJob,
        requirements: [...(newJob.requirements || []), requirementInput.trim()],
      });
      setRequirementInput('');
    }
  };

  const handleRemoveRequirement = (index: number) => {
    const updatedRequirements = [...(newJob.requirements || [])];
    updatedRequirements.splice(index, 1);
    setNewJob({ ...newJob, requirements: updatedRequirements });
  };

  const handleAddJob = () => {
    if (newJob.title && newJob.department && newJob.location && newJob.description) {
      const job: Job = {
        id: Date.now().toString(),
        title: newJob.title,
        department: newJob.department,
        location: newJob.location,
        type: newJob.type || 'Full-time',
        salary: newJob.salary,
        description: newJob.description,
        requirements: newJob.requirements || [],
        postedDate: newJob.postedDate || new Date().toISOString().split('T')[0],
      };
      setJobs([...jobs, job]);
      setNewJob(emptyJob());
      setShowAddForm(false);
    }
  };

  const deleteJob = (id: string) => {
    if (window.confirm('Delete this job opening?')) {
      setJobs(jobs.filter((j) => j.id !== id));
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const days = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return 'Today';
    if (days === 1) return 'Yesterday';
    return `${days} days ago`;
  };

  return (
    <div>
      <div className="relative mb-10 overflow-hidden rounded-[28px] bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 p-10 text-white shadow-[0_25px_60px_rgba(59,130,246,0.25)] ring-1 ring-white/20">
        <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_60%)]" />
        <div className="relative z-10">
          <div className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 text-white shadow-lg backdrop-blur">
            <Briefcase size={32} />
          </div>
          <h2 className="mb-4 text-4xl font-black">Careers at Retech Solutions</h2>
          <p className="mb-4 max-w-2xl text-xl leading-8 text-white/90">Join our innovative team and shape the future of technology with cutting-edge projects</p>
          <a
            href="https://retechsolutions.in"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-white transition hover:text-cyan-100"
          >
            Visit Retech Solutions <ExternalLink size={18} />
          </a>
        </div>
      </div>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-blue-600">Join Our Team</p>
          <h3 className="text-3xl font-extrabold text-slate-900">Current Openings</h3>
        </div>
        {isAdmin && (
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex w-fit items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-1 hover:shadow-xl"
          >
            {showAddForm ? <X size={20} /> : <Plus size={20} />}
            {showAddForm ? 'Cancel' : 'Add Job Opening'}
          </button>
        )}
      </div>

      {isAdmin && showAddForm && (
        <div className="mb-10 rounded-[28px] bg-white/75 p-8 shadow-xl ring-1 ring-white/60 backdrop-blur-xl">
          <h4 className="mb-6 text-2xl font-extrabold text-slate-900">Add New Job Opening</h4>
          <div className="space-y-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <input
                type="text"
                placeholder="Job Title"
                value={newJob.title}
                onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
                className="rounded-xl border border-slate-200 px-5 py-3 outline-none ring-1 ring-slate-100 transition focus:border-blue-500 focus:ring-blue-100"
              />
              <input
                type="text"
                placeholder="Department"
                value={newJob.department}
                onChange={(e) => setNewJob({ ...newJob, department: e.target.value })}
                className="rounded-xl border border-slate-200 px-5 py-3 outline-none ring-1 ring-slate-100 transition focus:border-blue-500 focus:ring-blue-100"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              <input
                type="text"
                placeholder="Location"
                value={newJob.location}
                onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
                className="rounded-xl border border-slate-200 px-5 py-3 outline-none ring-1 ring-slate-100 transition focus:border-blue-500 focus:ring-blue-100"
              />
              <select
                value={newJob.type}
                onChange={(e) => setNewJob({ ...newJob, type: e.target.value })}
                className="rounded-xl border border-slate-200 px-5 py-3 outline-none ring-1 ring-slate-100 transition focus:border-blue-500 focus:ring-blue-100"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
              </select>
              <input
                type="text"
                placeholder="Salary (Optional)"
                value={newJob.salary}
                onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
                className="rounded-xl border border-slate-200 px-5 py-3 outline-none ring-1 ring-slate-100 transition focus:border-blue-500 focus:ring-blue-100"
              />
            </div>

            <textarea
              placeholder="Job Description"
              value={newJob.description}
              onChange={(e) => setNewJob({ ...newJob, description: e.target.value })}
              rows={4}
              className="w-full rounded-xl border border-slate-200 px-5 py-3 outline-none ring-1 ring-slate-100 transition focus:border-blue-500 focus:ring-blue-100"
            />

            <div>
              <label className="mb-3 block text-sm font-bold text-slate-700">Requirements</label>
              <div className="mb-3 flex gap-2">
                <input
                  type="text"
                  placeholder="Add a requirement"
                  value={requirementInput}
                  onChange={(e) => setRequirementInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddRequirement()}
                  className="flex-1 rounded-xl border border-slate-200 px-5 py-3 outline-none ring-1 ring-slate-100 transition focus:border-blue-500 focus:ring-blue-100"
                />
                <button
                  onClick={handleAddRequirement}
                  className="rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-800"
                >
                  Add
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {newJob.requirements?.map((req, index) => (
                  <span
                    key={index}
                    className="flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-700 ring-1 ring-blue-200"
                  >
                    {req}
                    <button onClick={() => handleRemoveRequirement(index)} className="transition hover:text-blue-900">
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddJob}
              className="rounded-xl bg-gradient-to-r from-green-600 to-emerald-500 px-8 py-3 font-bold text-white shadow-lg shadow-green-200 transition hover:-translate-y-1 hover:shadow-xl"
            >
              Post Job
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {jobs.map((job) => (
          <div key={job.id} className="group relative overflow-hidden rounded-[28px] bg-white/75 p-7 shadow-xl ring-1 ring-white/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] hover:shadow-[0_25px_60px_rgba(59,130,246,0.25)]">
            {isAdmin && (
              <button
                onClick={() => deleteJob(job.id)}
                className="absolute right-4 top-4 rounded-full bg-red-600 p-2 text-white opacity-0 shadow-lg transition-all duration-300 hover:scale-110 group-hover:opacity-100"
              >
                <X size={16} />
              </button>
            )}

            <div className="mb-5">
              <h4 className="mb-2 text-2xl font-extrabold text-slate-900">{job.title}</h4>
              <p className="inline-flex rounded-full bg-blue-100 px-4 py-1.5 text-sm font-bold text-blue-700 ring-1 ring-blue-200">{job.department}</p>
            </div>

            <div className="mb-5 space-y-2.5">
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <MapPin size={16} />
                </div>
                <span className="font-medium">{job.location}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Briefcase size={16} />
                </div>
                <span className="font-medium">{job.type}</span>
              </div>
              {job.salary && (
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                    <DollarSign size={16} />
                  </div>
                  <span className="font-medium">{job.salary}</span>
                </div>
              )}
              <div className="flex items-center gap-3 text-sm text-slate-600">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <Clock size={16} />
                </div>
                <span className="font-medium">Posted {getTimeAgo(job.postedDate)}</span>
              </div>
            </div>

            <p className="mb-5 leading-7 text-slate-600">{job.description}</p>

            {job.requirements.length > 0 && (
              <div className="mb-5">
                <p className="mb-3 font-bold text-slate-700">Requirements:</p>
                <div className="flex flex-wrap gap-2">
                  {job.requirements.map((req, index) => (
                    <span key={index} className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200">{req}</span>
                  ))}
                </div>
              </div>
            )}

            <button className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-1 hover:shadow-xl">
              Apply Now
            </button>
          </div>
        ))}
      </div>

      {jobs.length === 0 && (
        <div className="rounded-[28px] bg-white/75 py-20 text-center shadow-xl ring-1 ring-white/60 backdrop-blur-xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
              <Briefcase size={40} />
            </div>
          </div>
          <p className="text-lg text-slate-600">No job openings at the moment. Check back soon!</p>
        </div>
      )}
    </div>
  );
}