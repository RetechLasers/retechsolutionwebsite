import { useEffect, useState } from 'react';
import { Upload, X, Sparkles } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface Photo {
  id: string;
  url: string;
  caption: string;
}

const STORAGE_KEY = 'retech_workshops_v1';

const DEFAULT_PHOTOS: Photo[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?w=800&h=600&fit=crop',
    caption: 'Python Programming Workshop',
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop',
    caption: 'Data Science Value Added Course',
  },
];

function loadPhotos(): Photo[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Photo[]) : DEFAULT_PHOTOS;
  } catch {
    return DEFAULT_PHOTOS;
  }
}

interface WorkshopsAndCoursesProps {
  isAdmin?: boolean;
}

export default function WorkshopsAndCourses({ isAdmin = false }: WorkshopsAndCoursesProps) {
  const [photos, setPhotos] = useState<Photo[]>(() => loadPhotos());

  // Persist so admin uploads survive reloads.
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(photos));
    } catch {
      /* storage full or unavailable — ignore */
    }
  }, [photos]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      Array.from(files).forEach((file) => {
        if (file.size > 2 * 1024 * 1024) {
          alert(`"${file.name}" is larger than 2 MB. Please use a smaller image.`);
          return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
          const newPhoto: Photo = {
            id: Date.now().toString() + Math.random(),
            url: e.target?.result as string,
            caption: file.name,
          };
          setPhotos((prev) => [...prev, newPhoto]);
        };
        reader.readAsDataURL(file);
      });
    }
    // reset so the same file can be re-selected later
    event.target.value = '';
  };

  const deletePhoto = (id: string) => {
    if (window.confirm('Delete this photo?')) {
      setPhotos((prev) => prev.filter((photo) => photo.id !== id));
    }
  };

  return (
    <div>
      <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 via-cyan-400 to-blue-600 text-white shadow-lg">
            <Sparkles size={28} />
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-widest text-blue-600">Skill Enhancement</p>
            <h2 className="text-4xl font-extrabold text-slate-950">Workshops & Value Added Courses</h2>
          </div>
        </div>

        {isAdmin && (
          <label className="flex w-fit cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 px-6 py-3 font-bold text-white shadow-lg shadow-blue-200 transition hover:-translate-y-1 hover:shadow-xl">
            <Upload size={20} />
            Upload Photos
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative overflow-hidden rounded-[28px] bg-white/75 shadow-xl ring-1 ring-white/60 backdrop-blur-xl transition-all duration-500 hover:-translate-y-3 hover:scale-[1.03] hover:shadow-[0_25px_60px_rgba(59,130,246,0.25)]">
            <div className="relative h-64 overflow-hidden">
              <ImageWithFallback
                src={photo.url}
                alt={photo.caption}
                className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
            </div>

            {isAdmin && (
              <button
                onClick={() => deletePhoto(photo.id)}
                className="absolute right-3 top-3 rounded-full bg-red-600 p-2 text-white opacity-0 shadow-lg transition-all duration-300 hover:scale-110 group-hover:opacity-100"
              >
                <X size={16} />
              </button>
            )}

            <div className="p-5">
              <p className="font-semibold text-slate-700">{photo.caption}</p>
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="rounded-[28px] bg-white/75 py-20 text-center shadow-xl ring-1 ring-white/60 backdrop-blur-xl">
          <div className="mb-6 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-slate-100 to-slate-200 text-slate-400">
              <Upload size={40} />
            </div>
          </div>
          <p className="text-lg text-slate-600">
            {isAdmin
              ? 'No photos uploaded yet. Click the upload button to add photos.'
              : 'No photos available yet.'}
          </p>
        </div>
      )}
    </div>
  );
}