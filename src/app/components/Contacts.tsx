import { useState } from 'react';
import { Phone, Mail, MapPin, Edit2, Save, X } from 'lucide-react';

interface ContactInfo {
  phone1: string;
  phone2: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  linkedin: string;
}

export default function Contacts() {
  const [isEditing, setIsEditing] = useState(false);
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    phone1: '+91 1234567890',
    phone2: '+91 0987654321',
    whatsapp: '+91 1234567890',
    email: 'contact@department.edu',
    address: '123 University Road, City, State - 123456',
    facebook: 'https://facebook.com/yourdepartment',
    instagram: 'https://instagram.com/yourdepartment',
    linkedin: 'https://linkedin.com/company/yourdepartment'
  });
  const [editedInfo, setEditedInfo] = useState<ContactInfo>(contactInfo);

  const handleSave = () => {
    setContactInfo(editedInfo);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedInfo(contactInfo);
    setIsEditing(false);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Contact Us</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <Edit2 size={20} />
            Edit Information
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
            >
              <Save size={20} />
              Save
            </button>
            <button
              onClick={handleCancel}
              className="flex items-center gap-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
            >
              <X size={20} />
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Details */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Contact Details</h3>

          <div className="space-y-6">
            {/* Phone Numbers */}
            <div className="flex items-start gap-4">
              <Phone className="text-blue-600 mt-1" size={24} />
              <div className="flex-1">
                <p className="font-semibold text-gray-700 mb-2">Phone Numbers</p>
                {isEditing ? (
                  <div className="space-y-2">
                    <input
                      type="tel"
                      value={editedInfo.phone1}
                      onChange={(e) => setEditedInfo({ ...editedInfo, phone1: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Primary Phone"
                    />
                    <input
                      type="tel"
                      value={editedInfo.phone2}
                      onChange={(e) => setEditedInfo({ ...editedInfo, phone2: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Secondary Phone"
                    />
                  </div>
                ) : (
                  <div>
                    <p className="text-gray-600">{contactInfo.phone1}</p>
                    <p className="text-gray-600">{contactInfo.phone2}</p>
                  </div>
                )}
              </div>
            </div>

            {/* WhatsApp */}
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-2 rounded-full mt-1">
                <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-700 mb-2">WhatsApp</p>
                {isEditing ? (
                  <input
                    type="tel"
                    value={editedInfo.whatsapp}
                    onChange={(e) => setEditedInfo({ ...editedInfo, whatsapp: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="WhatsApp Number"
                  />
                ) : (
                  <a href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline">
                    {contactInfo.whatsapp}
                  </a>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <Mail className="text-blue-600 mt-1" size={24} />
              <div className="flex-1">
                <p className="font-semibold text-gray-700 mb-2">Email</p>
                {isEditing ? (
                  <input
                    type="email"
                    value={editedInfo.email}
                    onChange={(e) => setEditedInfo({ ...editedInfo, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Email Address"
                  />
                ) : (
                  <a href={`mailto:${contactInfo.email}`} className="text-blue-600 hover:underline">
                    {contactInfo.email}
                  </a>
                )}
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4">
              <MapPin className="text-blue-600 mt-1" size={24} />
              <div className="flex-1">
                <p className="font-semibold text-gray-700 mb-2">Address</p>
                {isEditing ? (
                  <textarea
                    value={editedInfo.address}
                    onChange={(e) => setEditedInfo({ ...editedInfo, address: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                    placeholder="Address"
                  />
                ) : (
                  <p className="text-gray-600">{contactInfo.address}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-white rounded-lg shadow-md p-8">
          <h3 className="text-2xl font-semibold text-gray-900 mb-6">Connect With Us</h3>

          <div className="space-y-6">
            {/* Facebook */}
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-700 mb-1">Facebook</p>
                {isEditing ? (
                  <input
                    type="url"
                    value={editedInfo.facebook}
                    onChange={(e) => setEditedInfo({ ...editedInfo, facebook: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Facebook URL"
                  />
                ) : (
                  <a href={contactInfo.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline break-all">
                    {contactInfo.facebook}
                  </a>
                )}
              </div>
            </div>

            {/* Instagram */}
            <div className="flex items-center gap-4">
              <div className="bg-pink-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-700 mb-1">Instagram</p>
                {isEditing ? (
                  <input
                    type="url"
                    value={editedInfo.instagram}
                    onChange={(e) => setEditedInfo({ ...editedInfo, instagram: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Instagram URL"
                  />
                ) : (
                  <a href={contactInfo.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:underline break-all">
                    {contactInfo.instagram}
                  </a>
                )}
              </div>
            </div>

            {/* LinkedIn */}
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 p-3 rounded-full">
                <svg className="w-6 h-6 text-blue-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-gray-700 mb-1">LinkedIn</p>
                {isEditing ? (
                  <input
                    type="url"
                    value={editedInfo.linkedin}
                    onChange={(e) => setEditedInfo({ ...editedInfo, linkedin: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="LinkedIn URL"
                  />
                ) : (
                  <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline break-all">
                    {contactInfo.linkedin}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <h4 className="font-semibold text-gray-700 mb-4">Quick Contact</h4>
            <div className="flex flex-wrap gap-3">
              <a
                href={`tel:${contactInfo.phone1}`}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Call Now
              </a>
              <a
                href={`mailto:${contactInfo.email}`}
                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition"
              >
                Send Email
              </a>
              <a
                href={`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
