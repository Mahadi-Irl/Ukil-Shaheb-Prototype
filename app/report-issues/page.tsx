import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ReportIssuesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Report Issues</h1>
          <p className="text-gray-600">Report issues page coming soon...</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}

