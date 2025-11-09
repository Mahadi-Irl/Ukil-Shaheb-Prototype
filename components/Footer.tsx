import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">যোগাযোগ</h3>
            <div className="space-y-2 text-sm">
              <p>ইমেইল: contact@ukilshaheb.com</p>
              <p>ফোন: +880 1234-567890</p>
              <p>ঠিকানা: ঢাকা, বাংলাদেশ</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">দ্রুত লিংক</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/chatbot" className="hover:text-white transition-colors">
                  AI Chatbot
                </Link>
              </li>
              <li>
                <Link href="/case-status" className="hover:text-white transition-colors">
                  Case Updates
                </Link>
              </li>
              <li>
                <Link href="/lawyers" className="hover:text-white transition-colors">
                  Lawyers
                </Link>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div>
            <h3 className="text-white text-lg font-semibold mb-4">দাবি পরিত্যাগ</h3>
            <p className="text-sm leading-relaxed">
              এই প্ল্যাটফর্মটি শুধুমাত্র তথ্য প্রদানের উদ্দেশ্যে তৈরি করা হয়েছে। 
              এখানে প্রদত্ত তথ্য আইনি পরামর্শ হিসেবে বিবেচিত হবে না। 
              কোনো আইনি সমস্যার জন্য একজন যোগ্য আইনজীবীর সাথে পরামর্শ করুন।
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Ukil Shaheb. সর্বস্বত্ব সংরক্ষিত।</p>
        </div>
      </div>
    </footer>
  );
}

