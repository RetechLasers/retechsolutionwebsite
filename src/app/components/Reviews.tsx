import { useState } from 'react';
import { Upload, X, Star, Briefcase, GraduationCap } from 'lucide-react';

interface Review {
  id: string;
  name: string;
  role: string;
  type: 'student' | 'staff';
  company?: string;
  rating: number;
  review: string;
  photo?: string;
  year?: string;
}

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      name: 'Rajesh Kumar',
      role: 'Software Engineer',
      type: 'student',
      company: 'Tech Giants Inc',
      rating: 5,
      review: 'The skill development programs helped me tremendously in securing my dream job. The hands-on training in Full Stack Development made me industry-ready.',
      year: '2023'
    },
    {
      id: '2',
      name: 'Dr. Priya Sharma',
      role: 'Associate Professor',
      type: 'staff',
      rating: 5,
      review: 'Our department provides excellent opportunities for research and professional development. The collaborative environment fosters innovation and growth.',
      year: '2024'
    },
    {
      id: '3',
      name: 'Arun Krishnan',
      role: 'Data Analyst',
      type: 'student',
      company: 'Analytics Pro',
      rating: 4,
      review: 'The Data Analytics courses and workshops equipped me with practical skills. The placement support was exceptional.',
      year: '2023'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newReview, setNewReview] = useState<Partial<Review>>({
    name: '',
    role: '',
    type: 'student',
    company: '',
    rating: 5,
    review: '',
    year: new Date().getFullYear().toString()
  });

  const handleAddReview = () => {
    if (newReview.name && newReview.role && newReview.review) {
      const review: Review = {
        id: Date.now().toString(),
        name: newReview.name,
        role: newReview.role,
        type: newReview.type || 'student',
        company: newReview.company,
        rating: newReview.rating || 5,
        review: newReview.review,
        year: newReview.year
      };
      setReviews([...reviews, review]);
      setNewReview({
        name: '',
        role: '',
        type: 'student',
        company: '',
        rating: 5,
        review: '',
        year: new Date().getFullYear().toString()
      });
      setShowAddForm(false);
    }
  };

  const deleteReview = (id: string) => {
    setReviews(reviews.filter(r => r.id !== id));
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            size={16}
            className={star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
          />
        ))}
      </div>
    );
  };

  const studentReviews = reviews.filter(r => r.type === 'student');
  const staffReviews = reviews.filter(r => r.type === 'staff');

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Reviews & Testimonials</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <Upload size={20} />
          {showAddForm ? 'Cancel' : 'Add Review'}
        </button>
      </div>

      {showAddForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h4 className="font-semibold text-gray-900 mb-4">Add New Review</h4>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Name"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Role/Position"
                value={newReview.role}
                onChange={(e) => setNewReview({ ...newReview, role: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <select
                value={newReview.type}
                onChange={(e) => setNewReview({ ...newReview, type: e.target.value as 'student' | 'staff' })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="student">Student (Placed)</option>
                <option value="staff">Staff</option>
              </select>

              {newReview.type === 'student' && (
                <input
                  type="text"
                  placeholder="Company (Optional)"
                  value={newReview.company}
                  onChange={(e) => setNewReview({ ...newReview, company: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              )}

              <input
                type="text"
                placeholder="Year"
                value={newReview.year}
                onChange={(e) => setNewReview({ ...newReview, year: e.target.value })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-700 mb-2">Rating</label>
              <select
                value={newReview.rating}
                onChange={(e) => setNewReview({ ...newReview, rating: parseInt(e.target.value) })}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {[5, 4, 3, 2, 1].map(r => (
                  <option key={r} value={r}>{r} Star{r !== 1 && 's'}</option>
                ))}
              </select>
            </div>

            <textarea
              placeholder="Review"
              value={newReview.review}
              onChange={(e) => setNewReview({ ...newReview, review: e.target.value })}
              rows={4}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleAddReview}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              Save Review
            </button>
          </div>
        </div>
      )}

      {/* Student Reviews */}
      <div className="mb-12">
        <div className="flex items-center gap-3 mb-6">
          <GraduationCap className="text-blue-600" size={32} />
          <h3 className="text-2xl font-semibold text-gray-900">Student Placements</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studentReviews.map((review) => (
            <div key={review.id} className="relative group bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <button
                onClick={() => deleteReview(review.id)}
                className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 text-lg">{review.name}</h4>
                <p className="text-sm text-blue-600">{review.role}</p>
                {review.company && (
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <Briefcase size={14} />
                    {review.company}
                  </p>
                )}
                {review.year && <p className="text-xs text-gray-500 mt-1">Batch {review.year}</p>}
              </div>

              <div className="mb-3">
                {renderStars(review.rating)}
              </div>

              <p className="text-gray-600 text-sm italic">"{review.review}"</p>
            </div>
          ))}
        </div>

        {studentReviews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">No student reviews yet.</p>
          </div>
        )}
      </div>

      {/* Staff Reviews */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="text-green-600" size={32} />
          <h3 className="text-2xl font-semibold text-gray-900">Staff Testimonials</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staffReviews.map((review) => (
            <div key={review.id} className="relative group bg-white rounded-lg shadow-md p-6 hover:shadow-xl transition-shadow">
              <button
                onClick={() => deleteReview(review.id)}
                className="absolute top-4 right-4 bg-red-600 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X size={16} />
              </button>

              <div className="mb-4">
                <h4 className="font-semibold text-gray-900 text-lg">{review.name}</h4>
                <p className="text-sm text-green-600">{review.role}</p>
                {review.year && <p className="text-xs text-gray-500 mt-1">Since {review.year}</p>}
              </div>

              <div className="mb-3">
                {renderStars(review.rating)}
              </div>

              <p className="text-gray-600 text-sm italic">"{review.review}"</p>
            </div>
          ))}
        </div>

        {staffReviews.length === 0 && (
          <div className="text-center py-12 bg-white rounded-lg shadow-md">
            <p className="text-gray-600">No staff reviews yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
