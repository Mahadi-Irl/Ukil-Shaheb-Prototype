import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ChatUI from '@/components/ChatUI';

export default function ChatbotPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-indigo-50 to-blue-100">
      <Navbar />
      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-6 sm:p-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-2xl font-bold text-blue-600">
                  ⚖️
                </div>
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold mb-1">
                    AI আইনি সহায়ক
                  </h1>
                  <p className="text-blue-100 text-sm sm:text-base">
                    আপনার আইনি প্রশ্ন করুন বাংলা বা ইংরেজিতে
                  </p>
                </div>
              </div>
            </div>
            
            <div className="p-4 sm:p-6 lg:p-8">
              <ChatUI />
            </div>
            
            {/* Disclaimer */}
            <div className="px-4 sm:px-6 lg:px-8 pb-6 pt-4 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-600 text-center leading-relaxed">
                <span className="font-semibold text-gray-700">⚠️ দাবি পরিত্যাগ:</span> এই এআই শুধুমাত্র সাধারণ তথ্য দেয়, আইনগত পরামর্শ নয়। নির্দিষ্ট আইনি পরামর্শের জন্য একজন যোগ্য আইনজীবীর সাথে পরামর্শ করুন।
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}

