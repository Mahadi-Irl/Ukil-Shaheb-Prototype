'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface CaseData {
  status: string;
  nextDate: string;
  judge: string;
  caseNumber: string;
  courtName: string;
  caseYear: string;
  caseType?: string;
  parties?: string[];
}

// Demo cases for demonstration
const DEMO_CASES: CaseData[] = [
  {
    status: 'Under Trial',
    nextDate: '2024-03-20',
    judge: 'জনাবা ফাতেমা খাতুন',
    caseNumber: '67890',
    courtName: 'Chittagong District Court',
    caseYear: '2023',
    caseType: 'Criminal Case',
    parties: ['স্টেট vs জনাব সেলিম আহমেদ'],
  },
  {
    status: 'Hearing Scheduled',
    nextDate: '2024-03-18',
    judge: 'জনাব মোঃ হাসান আলী',
    caseNumber: '11111',
    courtName: 'Sylhet District Court',
    caseYear: '2024',
    caseType: 'Family Matter',
    parties: ['আবেদনকারী: জনাবা নাজমা বেগম', 'প্রতিপক্ষ: জনাব মোঃ আলী'],
  },
];

export default function CaseStatusPage() {
  const [caseNo, setCaseNo] = useState('');
  const [court, setCourt] = useState('');
  const [year, setYear] = useState('');
  const [caseData, setCaseData] = useState<CaseData | null>(null);
  const [demoCases] = useState<CaseData[]>(DEMO_CASES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notificationsEnabled, setNotificationsEnabled] = useState<Record<string, boolean>>({});
  const [selectedCase, setSelectedCase] = useState<CaseData | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/case', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          caseNo: caseNo.trim(),
          court: court.trim(),
          year: year.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch case status');
      }

      const data = await response.json();
      setCaseData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setCaseData(null);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEnableNotifications = (caseId?: string) => {
    if (caseId) {
      setNotificationsEnabled(prev => ({ ...prev, [caseId]: true }));
      alert('Notifications enabled for this case. You will receive updates via email/SMS.');
    } else if (caseData) {
      const caseId = `${caseData.caseNumber}-${caseData.courtName}-${caseData.caseYear}`;
      setNotificationsEnabled(prev => ({ ...prev, [caseId]: true }));
      alert('Notifications enabled for this case. You will receive updates via email/SMS.');
    }
  };

  const formatDate = (dateString: string) => {
    if (dateString === 'N/A') return dateString;
    
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('pending')) return 'bg-yellow-100 text-yellow-800';
    if (statusLower.includes('trial') || statusLower.includes('hearing')) return 'bg-blue-100 text-blue-800';
    if (statusLower.includes('found')) return 'bg-red-100 text-red-800';
    return 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              কেস স্ট্যাটাস
            </h1>
            <p className="text-gray-600 text-sm sm:text-base">
              আপনার মামলার সর্বশেষ অবস্থা জানুন
            </p>
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-lg shadow-md p-6 sm:p-8 mb-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label
                    htmlFor="caseNo"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    কেস নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="caseNo"
                    value={caseNo}
                    onChange={(e) => setCaseNo(e.target.value)}
                    placeholder="12345"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="court"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    আদালতের নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="court"
                    value={court}
                    onChange={(e) => setCourt(e.target.value)}
                    placeholder="Dhaka District Court"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="year"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    সাল <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="year"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="2024"
                    pattern="\d{4}"
                    maxLength={4}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-medium text-sm sm:text-base"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    খুঁজছি...
                  </span>
                ) : (
                  'খুঁজুন'
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-red-800 text-sm">{error}</p>
              </div>
            )}
          </div>

          {/* Demo Cases Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              উদাহরণ কেস (ডেমো)
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {demoCases.map((demoCase, index) => {
                const caseId = `${demoCase.caseNumber}-${demoCase.courtName}-${demoCase.caseYear}`;
                return (
                  <div 
                    key={index} 
                    className="bg-white rounded-lg shadow-lg p-6 border-2 border-blue-100 hover:border-blue-300 cursor-pointer transition-all"
                    onClick={() => setSelectedCase(demoCase)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-900">মামলা #{demoCase.caseNumber}</h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(
                          demoCase.status
                        )}`}
                      >
                        {demoCase.status}
                      </span>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">আদালত</h4>
                        <p className="text-sm font-semibold text-gray-900">{demoCase.courtName}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">মামলার ধরন</h4>
                        <p className="text-sm font-semibold text-gray-900">{demoCase.caseType}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">পরবর্তী শুনানি</h4>
                        <p className="text-sm font-semibold text-blue-600">{formatDate(demoCase.nextDate)}</p>
                      </div>
                      <div>
                        <h4 className="text-xs font-medium text-gray-500 mb-1">বিচারক</h4>
                        <p className="text-sm font-semibold text-gray-900">{demoCase.judge}</p>
                      </div>
                    </div>

                    {demoCase.parties && demoCase.parties.length > 0 && (
                      <div className="mb-4 pt-4 border-t border-gray-200">
                        <h4 className="text-xs font-medium text-gray-500 mb-2">পক্ষসমূহ</h4>
                        <ul className="space-y-1">
                          {demoCase.parties.map((party, idx) => (
                            <li key={idx} className="text-xs text-gray-700">{party}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedCase(demoCase);
                        }}
                        className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium text-xs hover:bg-blue-700 transition-colors"
                      >
                        বিস্তারিত দেখুন
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEnableNotifications(caseId);
                        }}
                        disabled={notificationsEnabled[caseId]}
                        className={`px-4 py-2 rounded-lg font-medium text-xs transition-colors ${
                          notificationsEnabled[caseId]
                            ? 'bg-green-100 text-green-800 cursor-not-allowed'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                        }`}
                      >
                        {notificationsEnabled[caseId] ? '✓' : '🔔'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Case Status Card */}
          {caseData && (
            <div 
              className="bg-white rounded-lg shadow-lg p-6 sm:p-8 cursor-pointer hover:shadow-xl transition-shadow"
              onClick={() => setSelectedCase(caseData)}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">মামলার তথ্য</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                    caseData.status
                  )}`}
                >
                  {caseData.status}
                </span>
              </div>
              <div className="text-center mb-4">
                <p className="text-sm text-blue-600 font-medium">বিস্তারিত দেখতে ক্লিক করুন</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    কেস নম্বর
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {caseData.caseNumber}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    আদালত
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {caseData.courtName}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    সাল
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {caseData.caseYear}
                  </p>
                </div>

                {caseData.caseType && (
                  <div>
                    <h3 className="text-sm font-medium text-gray-500 mb-1">
                      মামলার ধরন
                    </h3>
                    <p className="text-lg font-semibold text-gray-900">
                      {caseData.caseType}
                    </p>
                  </div>
                )}

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    পরবর্তী শুনানির তারিখ
                  </h3>
                  <p className="text-lg font-semibold text-blue-600">
                    {formatDate(caseData.nextDate)}
                  </p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">
                    বিচারক
                  </h3>
                  <p className="text-lg font-semibold text-gray-900">
                    {caseData.judge}
                  </p>
                </div>
              </div>

              {caseData.parties && caseData.parties.length > 0 && (
                <div className="mb-6 pt-6 border-t border-gray-200">
                  <h3 className="text-sm font-medium text-gray-500 mb-3">
                    পক্ষসমূহ
                  </h3>
                  <ul className="space-y-2">
                    {caseData.parties.map((party, index) => (
                      <li key={index} className="text-gray-700">
                        {party}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="pt-6 border-t border-gray-200">
                <button
                  onClick={() => handleEnableNotifications()}
                  disabled={notificationsEnabled[`${caseData.caseNumber}-${caseData.courtName}-${caseData.caseYear}`]}
                  className={`w-full sm:w-auto px-6 py-3 rounded-lg font-medium text-sm sm:text-base transition-colors ${
                    notificationsEnabled[`${caseData.caseNumber}-${caseData.courtName}-${caseData.caseYear}`]
                      ? 'bg-green-100 text-green-800 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                >
                  {notificationsEnabled[`${caseData.caseNumber}-${caseData.courtName}-${caseData.caseYear}`] ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      বিজ্ঞপ্তি সক্রিয়
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <svg
                        className="w-5 h-5 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                      </svg>
                      বিজ্ঞপ্তি সক্রিয় করুন
                    </span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Help Text */}
          {!caseData && !isLoading && !selectedCase && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
              <p className="text-sm text-blue-800">
                <strong>সাহায্য:</strong> আপনার মামলার কেস নম্বর, আদালতের নাম এবং সাল
                প্রবেশ করান। সিস্টেম আপনার মামলার সর্বশেষ অবস্থা প্রদর্শন করবে।
              </p>
            </div>
          )}

          {/* Detailed Case View Modal */}
          {selectedCase && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
              <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">মামলার বিস্তারিত তথ্য</h2>
                  <button
                    onClick={() => setSelectedCase(null)}
                    className="text-gray-500 hover:text-gray-700 text-2xl font-bold"
                  >
                    ×
                  </button>
                </div>

                <div className="p-6 space-y-6">
                  {/* Header Info */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">কেস নম্বর</h3>
                      <p className="text-xl font-bold text-gray-900">#{selectedCase.caseNumber}</p>
                    </div>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-gray-500 mb-1">মামলার অবস্থা</h3>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          selectedCase.status
                        )}`}
                      >
                        {selectedCase.status}
                      </span>
                    </div>
                  </div>

                  {/* Court Information */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">আদালতের তথ্য</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">আদালতের নাম</h4>
                        <p className="text-base font-semibold text-gray-900">{selectedCase.courtName}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">বিচারক</h4>
                        <p className="text-base font-semibold text-gray-900">{selectedCase.judge}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">সাল</h4>
                        <p className="text-base font-semibold text-gray-900">{selectedCase.caseYear}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-500 mb-1">মামলার ধরন</h4>
                        <p className="text-base font-semibold text-gray-900">{selectedCase.caseType}</p>
                      </div>
                    </div>
                  </div>

                  {/* Next Hearing */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">পরবর্তী শুনানি</h3>
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                      <p className="text-2xl font-bold text-yellow-800">{formatDate(selectedCase.nextDate)}</p>
                      <p className="text-sm text-yellow-700 mt-2">আপনার পরবর্তী শুনানির তারিখ</p>
                    </div>
                  </div>

                  {/* Parties */}
                  {selectedCase.parties && selectedCase.parties.length > 0 && (
                    <div className="border-t border-gray-200 pt-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">পক্ষসমূহ</h3>
                      <div className="space-y-3">
                        {selectedCase.parties.map((party, idx) => (
                          <div key={idx} className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-base font-semibold text-gray-900">{party}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Case History (Demo) */}
                  <div className="border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-4">মামলার ইতিহাস</h3>
                    <div className="space-y-4">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">মামলা দায়ের</p>
                          <p className="text-sm text-gray-600">১৫ জানুয়ারি, ২০২৪</p>
                          <p className="text-sm text-gray-700 mt-1">মামলাটি আদালতে দায়ের করা হয়েছে</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">প্রাথমিক শুনানি</p>
                          <p className="text-sm text-gray-600">২০ জানুয়ারি, ২০২৪</p>
                          <p className="text-sm text-gray-700 mt-1">প্রাথমিক শুনানি সম্পন্ন হয়েছে</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-900">পরবর্তী শুনানি নির্ধারিত</p>
                          <p className="text-sm text-gray-600">{formatDate(selectedCase.nextDate)}</p>
                          <p className="text-sm text-gray-700 mt-1">পরবর্তী শুনানির তারিখ নির্ধারণ করা হয়েছে</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="border-t border-gray-200 pt-6 flex gap-4">
                    <button
                      onClick={() => {
                        const caseId = `${selectedCase.caseNumber}-${selectedCase.courtName}-${selectedCase.caseYear}`;
                        handleEnableNotifications(caseId);
                      }}
                      disabled={notificationsEnabled[`${selectedCase.caseNumber}-${selectedCase.courtName}-${selectedCase.caseYear}`]}
                      className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${
                        notificationsEnabled[`${selectedCase.caseNumber}-${selectedCase.courtName}-${selectedCase.caseYear}`]
                          ? 'bg-green-100 text-green-800 cursor-not-allowed'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}
                    >
                      {notificationsEnabled[`${selectedCase.caseNumber}-${selectedCase.courtName}-${selectedCase.caseYear}`]
                        ? '✓ বিজ্ঞপ্তি সক্রিয়'
                        : 'বিজ্ঞপ্তি সক্রিয় করুন'}
                    </button>
                    <button
                      onClick={() => setSelectedCase(null)}
                      className="px-6 py-3 rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
                    >
                      বন্ধ করুন
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

