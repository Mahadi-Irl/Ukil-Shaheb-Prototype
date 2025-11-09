'use client';

import { useState, useMemo, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface Lawyer {
  id: string;
  name: string;
  nameEn: string;
  specialization: string;
  specializationBn: string;
  rating: number;
  gender: string;
  genderBn: string;
  location: string;
  locationBn: string;
  experience: string;
  experienceBn: string;
  languages: string[];
  consultationFee: number;
  available: boolean;
}

interface BookingRequest {
  lawyerId: string;
  userName: string;
  time: string;
}

function LawyerCard({
  lawyer,
  onBookConsultation,
}: {
  lawyer: Lawyer;
  onBookConsultation: (lawyer: Lawyer) => void;
}) {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-1">{lawyer.name}</h3>
          <p className="text-gray-600 text-sm mb-2">{lawyer.nameEn}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500">
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
            <span className="text-gray-700 font-semibold">{lawyer.rating}</span>
            <span className="text-gray-500 text-sm">({lawyer.experience})</span>
          </div>
        </div>
        <div className="mt-2 sm:mt-0">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded-full">
            {lawyer.specializationBn}
          </span>
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-4 h-4 mr-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {lawyer.locationBn} ({lawyer.location})
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-4 h-4 mr-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
            />
          </svg>
          {lawyer.genderBn}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <svg
            className="w-4 h-4 mr-2 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129"
            />
          </svg>
          {lawyer.languages.join(', ')}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <div>
          <span className="text-2xl font-bold text-blue-600">
            ৳{lawyer.consultationFee.toLocaleString()}
          </span>
          <span className="text-gray-500 text-sm ml-1">/consultation</span>
        </div>
        <button
          onClick={() => onBookConsultation(lawyer)}
          disabled={!lawyer.available}
          className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
            lawyer.available
              ? 'bg-blue-600 text-white hover:bg-blue-700'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          Book Consultation
        </button>
      </div>
    </div>
  );
}

function BookingModal({
  lawyer,
  isOpen,
  onClose,
  onConfirm,
}: {
  lawyer: Lawyer | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (booking: BookingRequest) => void;
}) {
  const [userName, setUserName] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate time slots (9 AM to 6 PM, 1 hour intervals)
  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      const time = `${hour.toString().padStart(2, '0')}:00`;
      slots.push(time);
    }
    return slots;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!lawyer || !userName.trim() || !selectedTime) return;

    setIsSubmitting(true);
    try {
      await onConfirm({
        lawyerId: lawyer.id,
        userName: userName.trim(),
        time: selectedTime,
      });
      setUserName('');
      setSelectedTime('');
      onClose();
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen || !lawyer) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Book Consultation</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-1">{lawyer.name}</h3>
            <p className="text-sm text-gray-600">{lawyer.specializationBn}</p>
            <p className="text-sm text-gray-600 mt-1">
              Consultation Fee: ৳{lawyer.consultationFee.toLocaleString()}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="userName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Your Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="userName"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                required
                placeholder="Enter your name"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label
                htmlFor="timeSlot"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Select Time Slot <span className="text-red-500">*</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedTime === time
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!userName.trim() || !selectedTime || isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {isSubmitting ? 'Booking...' : 'Confirm Booking'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function LawyersPage() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLawyer, setSelectedLawyer] = useState<Lawyer | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState<string | null>(null);

  // Filters
  const [specializationFilter, setSpecializationFilter] = useState<string>('all');
  const [genderFilter, setGenderFilter] = useState<string>('all');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  // Load lawyers data
  useEffect(() => {
    const loadLawyers = async () => {
      try {
        const response = await fetch('/data/lawyers.json');
        const data = await response.json();
        setLawyers(data);
      } catch (error) {
        console.error('Error loading lawyers:', error);
      } finally {
        setLoading(false);
      }
    };
    loadLawyers();
  }, []);

  // Get unique values for filters
  const specializations = useMemo(
    () => Array.from(new Set(lawyers.map((l) => l.specialization))),
    [lawyers]
  );
  const genders = useMemo(
    () => Array.from(new Set(lawyers.map((l) => l.gender))),
    [lawyers]
  );
  const locations = useMemo(
    () => Array.from(new Set(lawyers.map((l) => l.location))),
    [lawyers]
  );

  // Filter lawyers
  const filteredLawyers = useMemo(() => {
    return lawyers.filter((lawyer) => {
      if (specializationFilter !== 'all' && lawyer.specialization !== specializationFilter) {
        return false;
      }
      if (genderFilter !== 'all' && lawyer.gender !== genderFilter) {
        return false;
      }
      if (locationFilter !== 'all' && lawyer.location !== locationFilter) {
        return false;
      }
      return true;
    });
  }, [lawyers, specializationFilter, genderFilter, locationFilter]);

  const handleBookConsultation = (lawyer: Lawyer) => {
    setSelectedLawyer(lawyer);
    setIsModalOpen(true);
    setBookingSuccess(null);
  };

  const handleConfirmBooking = async (booking: BookingRequest) => {
    try {
      const response = await fetch('/api/lawyers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(booking),
      });

      if (!response.ok) {
        throw new Error('Booking failed');
      }

      const data = await response.json();
      setBookingSuccess(data.message || 'Booking confirmed successfully!');
      setIsModalOpen(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => setBookingSuccess(null), 5000);
    } catch (error) {
      console.error('Booking error:', error);
      alert('Failed to book consultation. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading lawyers...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              আইনজীবী
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              যোগ্য আইনজীবীদের সাথে পরামর্শ করুন
            </p>
          </div>

          {/* Success Message */}
          {bookingSuccess && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-green-800">{bookingSuccess}</p>
            </div>
          )}

          {/* Filters */}
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Filters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Specialization
                </label>
                <select
                  value={specializationFilter}
                  onChange={(e) => setSpecializationFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Specializations</option>
                  {specializations.map((spec) => (
                    <option key={spec} value={spec}>
                      {spec}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Gender
                </label>
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All</option>
                  {genders.map((gender) => (
                    <option key={gender} value={gender}>
                      {gender}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="all">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Lawyers Grid */}
          {filteredLawyers.length === 0 ? (
            <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <p className="text-gray-600">No lawyers found matching your filters.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredLawyers.map((lawyer) => (
                <LawyerCard
                  key={lawyer.id}
                  lawyer={lawyer}
                  onBookConsultation={handleBookConsultation}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* Booking Modal */}
      <BookingModal
        lawyer={selectedLawyer}
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedLawyer(null);
        }}
        onConfirm={handleConfirmBooking}
      />
    </div>
  );
}
