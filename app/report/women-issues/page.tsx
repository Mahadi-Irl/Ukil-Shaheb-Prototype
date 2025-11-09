'use client';

import { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';

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

export default function WomenIssuesPage() {
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    description: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showLawyers, setShowLawyers] = useState(false);
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      // Fetch lawyers specializing in Family Law and Criminal Law
      // Prefer female lawyers for women's issues
      const response = await fetch('/data/lawyers.json');
      const allLawyers: Lawyer[] = await response.json();
      
      // Filter for relevant lawyers (Family Law, Criminal Law)
      // Prioritize female lawyers
      const relevantLawyers = allLawyers
        .filter(lawyer => 
          lawyer.specialization === 'Family Law' || 
          lawyer.specialization === 'Criminal Law'
        )
        .sort((a, b) => {
          // Female lawyers first
          if (a.gender === 'Female' && b.gender !== 'Female') return -1;
          if (a.gender !== 'Female' && b.gender === 'Female') return 1;
          // Then by rating
          return b.rating - a.rating;
        })
        .slice(0, 6); // Show top 6 relevant lawyers
      
      setLawyers(relevantLawyers);
      setShowLawyers(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleContactNGO = async () => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'women-issues',
          name: formData.name.trim(),
          contact: formData.contact.trim(),
          description: formData.description.trim(),
        }),
      });

      if (response.ok) {
        alert('এনজিওর সাথে যোগাযোগের অনুরোধ পাঠানো হয়েছে। তারা শীঘ্রই আপনার সাথে যোগাযোগ করবে।');
      }
    } catch (err) {
      alert('একটি ত্রুটি হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col"
    >
      <Navbar />
      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              নারীর প্রতি ক্ষতি রিপোর্ট করুন
            </h1>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              নারীর প্রতি কোনো ধরনের ক্ষতি, নির্যাতন বা বৈষম্যের ঘটনা রিপোর্ট করুন। 
              আমরা আপনাকে উপযুক্ত আইনজীবী খুঁজে দেব যারা আপনার মামলায় সহায়তা করতে পারবেন।
            </p>
          </motion.div>

          {/* Info Box */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-lg p-6 mb-8"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg
                  className="w-8 h-8"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-semibold mb-2">মহুত্বপূর্ণ তথ্য</h3>
                <p className="text-purple-100 mb-2">
                  আপনার প্রথম পরামর্শ সম্পূর্ণ বিনামূল্যে। আমরা আপনাকে উপযুক্ত আইনজীবীদের তালিকা প্রদান করব যারা আপনার মামলায় সহায়তা করতে পারবেন। 
                  <span className="font-semibold">মহিলা আইনজীবীদের অগ্রাধিকার দেওয়া হবে।</span>
                </p>
                <p className="text-yellow-200 font-semibold">
                  ✓ প্রথম পরামর্শ সম্পূর্ণ ফ্রি | ✓ সম্পূর্ণ গোপনীয়
                </p>
              </div>
            </div>
          </motion.div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6"
            >
              <p className="text-red-800 text-center">{error}</p>
            </motion.div>
          )}

          {!showLawyers ? (
            /* Form */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-lg shadow-lg p-6 sm:p-8"
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    আপনার নাম <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="আপনার পূর্ণ নাম লিখুন"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    যোগাযোগের নম্বর <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="contact"
                    value={formData.contact}
                    onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                    required
                    placeholder="01XXXXXXXXX"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    ঘটনার বিবরণ <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                    rows={6}
                    placeholder="ঘটনার বিস্তারিত বিবরণ লিখুন (স্থান, সময়, ঘটনার ধরন ইত্যাদি)"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all font-semibold text-lg shadow-md hover:shadow-lg"
                >
                  {isSubmitting ? (
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
                      আইনজীবী খুঁজছি...
                    </span>
                  ) : (
                    'আইনজীবী খুঁজুন'
                  )}
                </button>
              </form>
            </motion.div>
          ) : (
            /* Lawyers List */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                <p className="text-green-800 text-center font-medium">
                  ✓ আপনার রিপোর্ট গ্রহণ করা হয়েছে। নিচে আপনার মামলার জন্য উপযুক্ত আইনজীবীদের তালিকা দেওয়া হলো।
                  <span className="block mt-2 text-sm">মহিলা আইনজীবীদের অগ্রাধিকার দেওয়া হয়েছে।</span>
                </p>
              </div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">
                  উপযুক্ত আইনজীবী
                </h2>
                <button
                  onClick={() => setShowLawyers(false)}
                  className="text-purple-600 hover:text-purple-800 font-medium"
                >
                  ← ফিরে যান
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {lawyers.map((lawyer) => (
                  <motion.div
                    key={lawyer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`bg-white rounded-lg shadow-lg p-6 border-2 transition-all ${
                      lawyer.gender === 'Female' 
                        ? 'border-pink-200 hover:border-pink-400' 
                        : 'border-gray-200 hover:border-gray-400'
                    } hover:shadow-xl`}
                  >
                    <div className="text-center mb-4">
                      <div className={`w-20 h-20 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-3 ${
                        lawyer.gender === 'Female'
                          ? 'bg-gradient-to-br from-pink-500 to-purple-500'
                          : 'bg-gradient-to-br from-purple-500 to-indigo-500'
                      }`}>
                        {lawyer.name.charAt(0)}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        {lawyer.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">
                        {lawyer.specializationBn}
                      </p>
                      {lawyer.gender === 'Female' && (
                        <span className="inline-block bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded-full mb-2">
                          👩‍⚖️ মহিলা আইনজীবী
                        </span>
                      )}
                      <div className="flex items-center justify-center gap-1 mb-2">
                        <span className="text-yellow-500">⭐</span>
                        <span className="font-semibold text-gray-700">
                          {lawyer.rating}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {lawyer.experienceBn} অভিজ্ঞতা • {lawyer.locationBn}
                      </p>
                    </div>

                    <div className="border-t border-gray-200 pt-4 space-y-2">
                      <Link
                        href={`/lawyers?book=${lawyer.id}`}
                        className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-medium text-center text-sm"
                      >
                        আইনজীবী নিয়োগ করুন
                      </Link>
                      <button
                        onClick={() => {
                          alert(`বিনামূল্যে পরামর্শের জন্য ${lawyer.name} এর সাথে যোগাযোগ করুন। প্রথম পরামর্শ সম্পূর্ণ ফ্রি এবং সম্পূর্ণ গোপনীয়!`);
                        }}
                        className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all font-medium text-sm"
                      >
                        🆓 বিনামূল্যে পরামর্শ
                      </button>
                      <Link
                        href={`/lawyers?book=${lawyer.id}`}
                        className="block w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-all font-medium text-center text-sm"
                      >
                        অ্যাপয়েন্টমেন্ট বুক করুন
                      </Link>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* NGO Contact Option */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6 mt-8"
              >
                <div className="flex items-start gap-4">
                  <div className="text-3xl">📞</div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      এনজিওর সাথে যোগাযোগ করতে চান?
                    </h3>
                    <p className="text-gray-700 mb-4">
                      আপনি চাইলে এনজিওর সাথেও যোগাযোগ করতে পারেন। তারা নারী অধিকার ও নির্যাতন প্রতিরোধে কাজ করে।
                    </p>
                    <button
                      onClick={handleContactNGO}
                      className="bg-yellow-600 text-white px-6 py-2 rounded-lg hover:bg-yellow-700 transition-all font-medium"
                    >
                      এনজিওর সাথে যোগাযোগ করুন
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </div>
      </main>
      <Footer />
    </motion.div>
  );
}
