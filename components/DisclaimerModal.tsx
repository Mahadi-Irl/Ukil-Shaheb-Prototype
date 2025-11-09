'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function DisclaimerModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen disclaimer before
    const hasSeenDisclaimer = localStorage.getItem('hasSeenDisclaimer');
    
    if (!hasSeenDisclaimer) {
      setIsOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('hasSeenDisclaimer', 'true');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={handleAccept}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-6 sm:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-lg mr-4">
                      <svg
                        className="w-8 h-8 text-white"
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
                    <h2 className="text-2xl font-bold text-gray-900">দাবি পরিত্যাগ</h2>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4 text-gray-700 mb-6">
                  <p className="text-base leading-relaxed">
                    <strong className="text-gray-900">এই প্ল্যাটফর্মটি শুধুমাত্র তথ্য প্রদানের উদ্দেশ্যে তৈরি করা হয়েছে।</strong>
                  </p>
                  
                  <p className="text-base leading-relaxed">
                    এখানে প্রদত্ত তথ্য, পরামর্শ এবং AI চ্যাটবটের উত্তরগুলো <strong className="text-gray-900">আইনি পরামর্শ হিসেবে বিবেচিত হবে না</strong>। 
                    এই প্ল্যাটফর্ম কোনো আইনি পরামর্শদাতা, আইনজীবী বা আইনি প্রতিষ্ঠানের প্রতিনিধিত্ব করে না।
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 my-4">
                    <p className="text-sm text-yellow-800">
                      <strong>মহুত্বপূর্ণ:</strong> কোনো আইনি সমস্যা, মামলা বা গুরুত্বপূর্ণ সিদ্ধান্তের জন্য 
                      একজন যোগ্য, লাইসেন্সপ্রাপ্ত আইনজীবীর সাথে সরাসরি পরামর্শ করুন।
                    </p>
                  </div>

                  <p className="text-base leading-relaxed">
                    এই প্ল্যাটফর্মের মাধ্যমে প্রদত্ত কোনো তথ্যের ভুল বা ত্রুটির জন্য আমরা দায়ী নই। 
                    ব্যবহারকারীকে তার নিজের দায়িত্বে এই প্ল্যাটফর্ম ব্যবহার করতে হবে।
                  </p>

                  <p className="text-base leading-relaxed">
                    এই প্ল্যাটফর্ম ব্যবহার করে আপনি স্বীকার করছেন যে আপনি এই দাবি পরিত্যাগের শর্তাবলী 
                    পড়েছেন, বুঝেছেন এবং গ্রহণ করেছেন।
                  </p>
                </div>

                {/* Footer */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200">
                  <button
                    onClick={handleAccept}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-semibold shadow-md hover:shadow-lg"
                  >
                    বুঝেছি, গ্রহণ করছি
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

