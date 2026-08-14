import { useState } from 'react';
import { Play } from 'lucide-react';

interface Company {
  id: string;
  logo: string;
  name: string;
  type: 'image' | 'gif' | 'video';
}

export default function CompaniesStudentsJoined() {
  const [companies] = useState<Company[]>([
    {
      id: '1',
      logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=400&h=200&fit=crop',
      name: 'Tech Corporation',
      type: 'image'
    },
    {
      id: '2',
      logo: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=200&fit=crop',
      name: 'Global Solutions Inc',
      type: 'image'
    },
    {
      id: '3',
      logo: 'https://images.unsplash.com/photo-1612521564730-62fc7691cd85?w=400&h=200&fit=crop',
      name: 'Innovation Labs',
      type: 'image'
    },
    {
      id: '4',
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=400&h=200&fit=crop',
      name: 'Digital Enterprises',
      type: 'image'
    },
    {
      id: '5',
      logo: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=200&fit=crop',
      name: 'Smart Systems Ltd',
      type: 'image'
    },
    {
      id: '6',
      logo: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop',
      name: 'Future Technologies',
      type: 'image'
    }
  ]);

  const renderLogo = (company: Company) => {
    if (company.type === 'video') {
      return (
        <video
          src={company.logo}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-20 object-contain"
        />
      );
    }

    return (
      <img
        src={company.logo}
        alt={company.name}
        className="w-full h-20 object-contain"
      />
    );
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Companies Our Students Joined</h2>
        <p className="text-gray-600">Showcasing the diverse organizations where our talented students have built their careers</p>
      </div>

      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <span className="text-blue-600 font-semibold">{companies.length}</span>
            <span className="text-gray-600 ml-2">Companies</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {companies.map((company) => (
          <div
            key={company.id}
            className="relative group bg-white rounded-lg shadow-md overflow-hidden p-4 flex items-center justify-center hover:shadow-xl transition-shadow"
          >
            {renderLogo(company)}

            {company.type !== 'image' && (
              <div className="absolute bottom-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                {company.type === 'gif' ? (
                  <span>GIF</span>
                ) : (
                  <>
                    <Play size={12} />
                    <span>Video</span>
                  </>
                )}
              </div>
            )}

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-white text-xs text-center truncate">{company.name}</p>
            </div>
          </div>
        ))}
      </div>

      {companies.length === 0 && (
        <div className="text-center py-20 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">Company logos are managed from the backend.</p>
        </div>
      )}
    </div>
  );
}
