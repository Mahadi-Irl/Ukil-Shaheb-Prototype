'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="min-h-screen flex flex-col"
    >
      <Navbar />
      
      <main className="flex-grow bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
        {/* Hero Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-8 sm:p-12 shadow-xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-blue-900 mb-4 drop-shadow-sm">
                আপনার আইনি সমাধানের সঙ্গী
              </h1>
              <p className="text-lg sm:text-xl text-gray-700 max-w-2xl mx-auto mb-8">
                বাংলাদেশের সেরা আইনজীবীদের সাথে সংযোগ করুন এবং যেকোনো সময় বিশেষজ্ঞ পরামর্শ পান
              </p>
              <Link
                href="/lawyers"
                className="inline-block bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                শুরু করুন
              </Link>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* AI Chatbot Service */}
              <Link href="/chatbot" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center h-full">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                    🤖
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">আইনি AI সহায়ক</h3>
                  <p className="text-gray-600 leading-relaxed">
                    যেকোনো সময় আইনি সহায়তা পান। বাংলা বা ইংরেজিতে আপনার প্রশ্ন করুন এবং তাৎক্ষণিক উত্তর পান।
                  </p>
                </div>
              </Link>

              {/* Lawyers Service */}
              <Link href="/lawyers" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center h-full">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                    💬
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">আইনজীবীর সাথে চ্যাট</h3>
                  <p className="text-gray-600 leading-relaxed">
                    যেকোনো সময় বিশেষজ্ঞ আইনজীবীদের সাথে সরাসরি কথা বলুন এবং আইনি পরামর্শ নিন।
                  </p>
                </div>
              </Link>

              {/* Women's Section */}
              <Link href="/report/women-issues" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center h-full">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                    🛡️
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">মহিলা বিভাগ</h3>
                  <p className="text-gray-600 leading-relaxed">
                    মহিলাদের জন্য নিরাপদ ও গোপনীয় আইনি পরামর্শ। বিশেষজ্ঞ মহিলা আইনজীবীদের সাথে যোগাযোগ করুন।
                  </p>
                </div>
              </Link>

              {/* Legal Documents */}
              <Link href="/lawyers" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center h-full">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                    📄
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">আইনি দলিল</h3>
                  <p className="text-gray-600 leading-relaxed">
                    বিশেষজ্ঞদের দ্বারা তৈরি আইনি ডকুমেন্ট পান। ভাড়া চুক্তি, বিক্রয় দলিল এবং আরও অনেক কিছু।
                  </p>
                </div>
              </Link>

              {/* Legal Education */}
              <Link href="/lawyers" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center h-full">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                    🏛️
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">আইন শিক্ষা</h3>
                  <p className="text-gray-600 leading-relaxed">
                    সাধারণ মানুষের জন্য সহজ ভাষায় আইনের মৌলিক ধারণা ও অধিকার সম্পর্কিত গাইড।
                  </p>
                </div>
              </Link>

              {/* Online Complaint */}
              <Link href="/report/pet-violence" className="group">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center h-full">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center text-4xl group-hover:scale-110 transition-transform">
                    ⏰
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">অনলাইন অভিযোগ দাখিল</h3>
                  <p className="text-gray-600 leading-relaxed">
                    আপনার আইনি অভিযোগ অনলাইনে সহজে দাখিল করুন। পশু নির্যাতন বা নারী নির্যাতন রিপোর্ট করুন।
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </section>

        {/* Emergency Reports Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                জরুরি রিপোর্ট
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                গুরুত্বপূর্ণ বিষয়গুলোর জন্য দ্রুত রিপোর্ট করুন। আমরা ২৪/৭ আপনার পাশে আছি।
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {/* Report Pet Violence Card */}
              <Link href="/report/pet-violence" className="group">
                <div className="bg-gradient-to-br from-red-50 to-pink-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border-2 border-red-200 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-red-100 rounded-full p-5 mb-6 group-hover:scale-110 transition-transform">
                      <span className="text-5xl">🐾</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      পশু নির্যাতন রিপোর্ট করুন
                    </h3>
                    <p className="text-gray-700 mb-6 text-base leading-relaxed">
                      পশু নির্যাতনের ঘটনা দেখলে বা জানলে আমাদের জানান। আমরা দ্রুত ব্যবস্থা নেব এবং সংশ্লিষ্ট এনজিওর সাথে যোগাযোগ করব। প্রথম পরামর্শ সম্পূর্ণ বিনামূল্যে।
                    </p>
                    <div className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg">
                      রিপোর্ট করুন
                    </div>
                  </div>
                </div>
              </Link>

              {/* Report Harm Against Women Card */}
              <Link href="/report/women-issues" className="group">
                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 p-8 border-2 border-purple-200 h-full">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-purple-100 rounded-full p-5 mb-6 group-hover:scale-110 transition-transform">
                      <span className="text-5xl">🛡️</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      নারীর প্রতি ক্ষতি রিপোর্ট করুন
                    </h3>
                    <p className="text-gray-700 mb-6 text-base leading-relaxed">
                      নারীর প্রতি কোনো ধরনের ক্ষতি, নির্যাতন বা বৈষম্যের ঘটনা রিপোর্ট করুন। আমরা আপনার পাশে আছি এবং প্রয়োজনীয় আইনি ও সামাজিক সহায়তা প্রদান করব। প্রথম পরামর্শ সম্পূর্ণ বিনামূল্যে।
                    </p>
                    <div className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-md hover:shadow-lg">
                      রিপোর্ট করুন
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </motion.div>
  );
}

