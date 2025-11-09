'use client';

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';

interface Meeting {
  id: string;
  lawyerName: string;
  lawyerNameEn: string;
  specialization: string;
  specializationBn: string;
  date: string;
  time: string;
  type: 'video' | 'phone' | 'in-person';
  status: 'upcoming' | 'completed' | 'cancelled';
  duration: number; // in minutes
  topic?: string;
  topicBn?: string;
}

const DEMO_MEETINGS: Meeting[] = [
  {
    id: 'meeting-001',
    lawyerName: 'জনাবা ফাতেমা খাতুন',
    lawyerNameEn: 'Ms. Fatema Khatun',
    specialization: 'Criminal Law',
    specializationBn: 'ফৌজদারি আইন',
    date: '2024-03-20',
    time: '10:00',
    type: 'video',
    status: 'upcoming',
    duration: 30,
    topic: 'Property Dispute',
    topicBn: 'সম্পত্তি বিরোধ',
  },
  {
    id: 'meeting-002',
    lawyerName: 'জনাব মোঃ আবুল কাসেম',
    lawyerNameEn: 'Mr. Abul Kashem',
    specialization: 'Family Law',
    specializationBn: 'পারিবারিক আইন',
    date: '2024-03-18',
    time: '14:00',
    type: 'phone',
    status: 'upcoming',
    duration: 45,
    topic: 'Divorce Consultation',
    topicBn: 'বিবাহবিচ্ছেদ পরামর্শ',
  },
  {
    id: 'meeting-003',
    lawyerName: 'জনাবা নাজমা বেগম',
    lawyerNameEn: 'Ms. Nazma Begum',
    specialization: 'Family Law',
    specializationBn: 'পারিবারিক আইন',
    date: '2024-03-15',
    time: '11:00',
    type: 'video',
    status: 'completed',
    duration: 30,
    topic: 'Child Custody',
    topicBn: 'সন্তান হেফাজত',
  },
  {
    id: 'meeting-004',
    lawyerName: 'জনাব মোঃ হাসান আলী',
    lawyerNameEn: 'Mr. Hasan Ali',
    specialization: 'Property Law',
    specializationBn: 'সম্পত্তি আইন',
    date: '2024-03-10',
    time: '15:00',
    type: 'in-person',
    status: 'completed',
    duration: 60,
    topic: 'Land Registration',
    topicBn: 'জমি রেজিস্ট্রেশন',
  },
];

export default function MeetingsPage() {
  const { t } = useLanguage();
  const [selectedTab, setSelectedTab] = useState<'upcoming' | 'past'>('upcoming');
  const [activeVideoCall, setActiveVideoCall] = useState<string | null>(null);
  const [callDuration, setCallDuration] = useState(0);
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(true);

  const upcomingMeetings = DEMO_MEETINGS.filter(m => m.status === 'upcoming');
  const pastMeetings = DEMO_MEETINGS.filter(m => m.status === 'completed');

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const startVideoCall = (meetingId: string) => {
    setActiveVideoCall(meetingId);
    setCallDuration(0);
  };

  // Timer effect for video call
  useEffect(() => {
    if (activeVideoCall) {
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [activeVideoCall]);

  const endVideoCall = () => {
    setActiveVideoCall(null);
    setCallDuration(0);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const getMeetingTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return '📹';
      case 'phone':
        return '📞';
      case 'in-person':
        return '🏢';
      default:
        return '💬';
    }
  };

  const getMeetingTypeText = (type: string) => {
    if (type === 'video') return t('ভিডিও কল', 'Video Call');
    if (type === 'phone') return t('ফোন কল', 'Phone Call');
    return t('ব্যক্তিগত সাক্ষাৎ', 'In-Person');
  };

  const renderMeetingCard = (meeting: Meeting) => (
    <motion.div
      key={meeting.id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-shadow"
    >
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">{getMeetingTypeIcon(meeting.type)}</span>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {t(meeting.lawyerName, meeting.lawyerNameEn)}
              </h3>
              <p className="text-sm text-gray-600">
                {t(meeting.specializationBn, meeting.specialization)}
              </p>
            </div>
          </div>
          {meeting.topic && (
            <p className="text-sm text-gray-700 mb-2">
              {t(meeting.topicBn || meeting.topic, meeting.topic)}
            </p>
          )}
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-medium ${
            meeting.status === 'upcoming'
              ? 'bg-blue-100 text-blue-800'
              : 'bg-green-100 text-green-800'
          }`}
        >
          {meeting.status === 'upcoming'
            ? t('আসন্ন', 'Upcoming')
            : t('সম্পন্ন', 'Completed')}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
        <div>
          <span className="text-gray-500">{t('তারিখ', 'Date')}:</span>
          <span className="ml-2 font-semibold text-gray-900">
            {formatDate(meeting.date)}
          </span>
        </div>
        <div>
          <span className="text-gray-500">{t('সময়', 'Time')}:</span>
          <span className="ml-2 font-semibold text-gray-900">{meeting.time}</span>
        </div>
        <div>
          <span className="text-gray-500">{t('ধরন', 'Type')}:</span>
          <span className="ml-2 font-semibold text-gray-900">
            {getMeetingTypeText(meeting.type)}
          </span>
        </div>
        <div>
          <span className="text-gray-500">{t('সময়কাল', 'Duration')}:</span>
          <span className="ml-2 font-semibold text-gray-900">
            {meeting.duration} {t('মিনিট', 'min')}
          </span>
        </div>
      </div>

      {meeting.status === 'upcoming' && meeting.type === 'video' && (
        <button
          onClick={() => startVideoCall(meeting.id)}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all font-medium"
        >
          {t('মিটিং শুরু করুন', 'Start Meeting')}
        </button>
      )}

      {meeting.status === 'upcoming' && meeting.type === 'phone' && (
        <button
          onClick={() => alert(t('কল শুরু হচ্ছে...', 'Call starting...'))}
          className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-all font-medium"
        >
          {t('কল করুন', 'Call Now')}
        </button>
      )}

      {meeting.status === 'completed' && (
        <div className="text-sm text-gray-600">
          {t('এই মিটিং সম্পন্ন হয়েছে', 'This meeting has been completed')}
        </div>
      )}
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8 sm:py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {t('মিটিং', 'Meetings')}
            </h1>
            <p className="text-gray-600">
              {t('আপনার নির্ধারিত এবং অতীত মিটিংসমূহ', 'Your scheduled and past meetings')}
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-4 mb-6 justify-center">
            <button
              onClick={() => setSelectedTab('upcoming')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedTab === 'upcoming'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t('আসন্ন মিটিং', 'Upcoming')} ({upcomingMeetings.length})
            </button>
            <button
              onClick={() => setSelectedTab('past')}
              className={`px-6 py-3 rounded-lg font-medium transition-all ${
                selectedTab === 'past'
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {t('অতীত মিটিং', 'Past')} ({pastMeetings.length})
            </button>
          </div>

          {/* Video Call Interface */}
          {activeVideoCall && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 z-50 bg-black flex flex-col"
            >
              <div className="flex-1 flex items-center justify-center relative">
                {/* Remote Video (Lawyer) */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                  <div className="text-center text-white">
                    <div className="w-32 h-32 bg-blue-600 rounded-full flex items-center justify-center text-4xl mb-4 mx-auto">
                      👨‍⚖️
                    </div>
                    <p className="text-xl font-semibold">
                      {DEMO_MEETINGS.find(m => m.id === activeVideoCall)?.lawyerNameEn}
                    </p>
                    <p className="text-gray-400 mt-2">
                      {formatTime(callDuration)}
                    </p>
                  </div>
                </div>

                {/* Local Video (User) - Small Picture in Picture */}
                <div className="absolute bottom-20 right-4 w-48 h-36 bg-gray-800 rounded-lg border-2 border-white overflow-hidden">
                  <div className="w-full h-full bg-gray-700 flex items-center justify-center">
                    <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-2xl text-white">
                      👤
                    </div>
                  </div>
                </div>
              </div>

              {/* Controls */}
              <div className="bg-gray-900 p-6 flex items-center justify-center gap-4">
                <button
                  onClick={() => setMicOn(!micOn)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                    micOn ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'
                  }`}
                >
                  {micOn ? '🎤' : '🔇'}
                </button>
                <button
                  onClick={() => setCameraOn(!cameraOn)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-xl transition-all ${
                    cameraOn ? 'bg-gray-700 text-white' : 'bg-red-600 text-white'
                  }`}
                >
                  {cameraOn ? '📹' : '📷'}
                </button>
                <button
                  onClick={endVideoCall}
                  className="w-14 h-14 rounded-full bg-red-600 text-white flex items-center justify-center text-xl hover:bg-red-700 transition-all"
                >
                  📵
                </button>
              </div>
            </motion.div>
          )}

          {/* Meetings List */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {selectedTab === 'upcoming'
              ? upcomingMeetings.map(renderMeetingCard)
              : pastMeetings.map(renderMeetingCard)}
          </div>

          {selectedTab === 'upcoming' && upcomingMeetings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600">
                {t('কোন আসন্ন মিটিং নেই', 'No upcoming meetings')}
              </p>
            </div>
          )}

          {selectedTab === 'past' && pastMeetings.length === 0 && (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <p className="text-gray-600">
                {t('কোন অতীত মিটিং নেই', 'No past meetings')}
              </p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

