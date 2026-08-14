import { Brain, Code, TrendingUp, BarChart, Cpu, Target } from 'lucide-react';

interface Field {
  id: string;
  title: string;
  icon: React.ReactNode;
  color: string;
  bgGradient: string;
  topics: string[];
}

export default function FieldsOfFocus() {
  const fields: Field[] = [
    {
      id: '1',
      title: 'AI & Machine Learning',
      icon: <Brain size={32} />,
      color: 'from-purple-600 to-pink-500',
      bgGradient: 'from-purple-50 to-pink-50',
      topics: [
        'Statistical Modelling',
        'Language Models',
        'Object Detection and Image Processing',
        'AI Accelerators',
        'Edge Devices',
        'Quantum Machine Learning'
      ]
    },
    {
      id: '2',
      title: 'Full Stack Development Java',
      icon: <Code size={32} />,
      color: 'from-blue-600 to-cyan-500',
      bgGradient: 'from-blue-50 to-cyan-50',
      topics: [
        'Springboot',
        'Javascript',
        'MySQL'
      ]
    },
    {
      id: '3',
      title: 'Marketing',
      icon: <TrendingUp size={32} />,
      color: 'from-green-600 to-emerald-500',
      bgGradient: 'from-green-50 to-emerald-50',
      topics: [
        'Digital Marketing',
        'Direct Marketing'
      ]
    },
    {
      id: '4',
      title: 'Data Analytics',
      icon: <BarChart size={32} />,
      color: 'from-orange-600 to-amber-500',
      bgGradient: 'from-orange-50 to-amber-50',
      topics: [
        'Statistics',
        'Power BI',
        'MySQL',
        'R Language',
        'Julia'
      ]
    },
    {
      id: '5',
      title: 'Electrical and Electronics',
      icon: <Cpu size={32} />,
      color: 'from-red-600 to-rose-500',
      bgGradient: 'from-red-50 to-rose-50',
      topics: [
        'Embedded Systems and IoT',
        'Robotics Engineering',
        'PCB Designing',
        'PLC/SCADA Programming',
        'Matlab Simulink and Simscape'
      ]
    }
  ];

  return (
    <div>
      <div className="mb-10 flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 text-white shadow-lg">
          <Target size={28} />
        </div>
        <div>
          <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-blue-600">Specialized Training</p>
          <h2 className="text-4xl font-extrabold text-slate-950">Fields of Focus</h2>
        </div>
      </div>

      <p className="mb-10 text-lg text-slate-600">Explore our specialized areas of expertise and training programs across cutting-edge technologies</p>

      <div className="mb-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {fields.map((field) => (
          <div
            key={field.id}
            className="group relative overflow-hidden rounded-[28px] bg-white/75 shadow-xl ring-1 ring-white/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_25px_60px_rgba(59,130,246,0.25)]"
          >
            <div className={`bg-gradient-to-br ${field.bgGradient} p-6`}>
              <div className="flex items-center gap-4">
                <div className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${field.color} text-white shadow-lg transition duration-500 group-hover:scale-110 group-hover:rotate-6`}>
                  {field.icon}
                </div>
                <h3 className={`bg-gradient-to-r ${field.color} bg-clip-text text-xl font-extrabold text-transparent`}>
                  {field.title}
                </h3>
              </div>
            </div>

            <div className="p-6">
              <div className="flex flex-wrap gap-2">
                {field.topics.map((topic, index) => (
                  <span
                    key={index}
                    className="rounded-full bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 ring-1 ring-slate-200 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-200 hover:shadow-md"
                  >
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-[28px] bg-gradient-to-r from-blue-50 via-cyan-50 to-purple-50 p-10 text-center ring-1 ring-white/60 shadow-xl backdrop-blur-xl">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 text-white shadow-lg">
          <Target size={32} />
        </div>
        <h3 className="mb-4 text-3xl font-extrabold text-slate-900">
          Comprehensive Skill Development
        </h3>
        <p className="mx-auto max-w-3xl text-lg leading-8 text-slate-600">
          Our programs cover cutting-edge technologies and methodologies across multiple domains.
          We focus on hands-on training and real-world applications to ensure our students are
          industry-ready and equipped with the latest skills.
        </p>
      </div>
    </div>
  );
}
