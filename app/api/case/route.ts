import { NextRequest, NextResponse } from 'next/server';

// Type definitions
interface CaseRequest {
  caseNo: string;
  court: string;
  year: string;
}

interface CaseResponse {
  status: string;
  nextDate: string;
  judge: string;
  caseNumber: string;
  courtName: string;
  caseYear: string;
  caseType?: string;
  parties?: string[];
}

// Mock database of cases (simulating Bangladesh Court API)
const MOCK_CASES_DB: Record<string, CaseResponse> = {
  'dhaka-12345-2024': {
    status: 'Pending',
    nextDate: '2024-03-15',
    judge: 'জনাব মোঃ আবুল কাসেম',
    caseNumber: '12345',
    courtName: 'Dhaka District Court',
    caseYear: '2024',
    caseType: 'Civil Suit',
    parties: ['প্লেইন্টিফ: জনাব রহিম উদ্দিন', 'ডিফেন্ডেন্ট: জনাব করিম উদ্দিন'],
  },
  'chittagong-67890-2023': {
    status: 'Under Trial',
    nextDate: '2024-03-20',
    judge: 'জনাবা ফাতেমা খাতুন',
    caseNumber: '67890',
    courtName: 'Chittagong District Court',
    caseYear: '2023',
    caseType: 'Criminal Case',
    parties: ['স্টেট vs জনাব সেলিম আহমেদ'],
  },
  'sylhet-11111-2024': {
    status: 'Hearing Scheduled',
    nextDate: '2024-03-18',
    judge: 'জনাব মোঃ হাসান আলী',
    caseNumber: '11111',
    courtName: 'Sylhet District Court',
    caseYear: '2024',
    caseType: 'Family Matter',
    parties: ['আবেদনকারী: জনাবা নাজমা বেগম', 'প্রতিপক্ষ: জনাব মোঃ আলী'],
  },
  'dhaka-22222-2024': {
    status: 'Under Trial',
    nextDate: '2024-03-25',
    judge: 'জনাব মোঃ রফিকুল ইসলাম',
    caseNumber: '22222',
    courtName: 'Dhaka District Court',
    caseYear: '2024',
    caseType: 'Property Dispute',
    parties: ['প্লেইন্টিফ: জনাবা সেলিনা আহমেদ', 'ডিফেন্ডেন্ট: জনাব মোঃ করিম'],
  },
  'dhaka-33333-2023': {
    status: 'Pending',
    nextDate: '2024-03-22',
    judge: 'জনাবা রোকেয়া সুলতানা',
    caseNumber: '33333',
    courtName: 'Dhaka Family Court',
    caseYear: '2023',
    caseType: 'Divorce Case',
    parties: ['আবেদনকারী: জনাবা নাজমা বেগম', 'প্রতিপক্ষ: জনাব মোঃ রহিম'],
  },
  'chittagong-44444-2024': {
    status: 'Hearing Scheduled',
    nextDate: '2024-03-28',
    judge: 'জনাব মোঃ করিম উদ্দিন',
    caseNumber: '44444',
    courtName: 'Chittagong District Court',
    caseYear: '2024',
    caseType: 'Business Dispute',
    parties: ['প্লেইন্টিফ: জনাব মোঃ হাসান', 'ডিফেন্ডেন্ট: জনাব মোঃ আলী'],
  },
  'rajshahi-55555-2023': {
    status: 'Under Trial',
    nextDate: '2024-03-30',
    judge: 'জনাব মোঃ কামরুল হাসান',
    caseNumber: '55555',
    courtName: 'Rajshahi District Court',
    caseYear: '2023',
    caseType: 'Criminal Case',
    parties: ['স্টেট vs জনাব মোঃ সেলিম'],
  },
  'sylhet-66666-2024': {
    status: 'Pending',
    nextDate: '2024-04-05',
    judge: 'জনাবা নাসরিন সুলতানা',
    caseNumber: '66666',
    courtName: 'Sylhet Family Court',
    caseYear: '2024',
    caseType: 'Custody Case',
    parties: ['আবেদনকারী: জনাবা ফাতেমা', 'প্রতিপক্ষ: জনাব মোঃ করিম'],
  },
};

/**
 * Generate a case key for lookup
 */
function generateCaseKey(court: string, caseNo: string, year: string): string {
  const courtLower = court.toLowerCase().replace(/\s+/g, '-');
  return `${courtLower}-${caseNo}-${year}`;
}

/**
 * Simulate fetching from Bangladesh Court API
 * This is a placeholder that will be replaced with actual API integration
 */
async function fetchFromBangladeshCourtAPI(
  caseNo: string,
  court: string,
  year: string
): Promise<CaseResponse | null> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  const caseKey = generateCaseKey(court, caseNo, year);
  const caseData = MOCK_CASES_DB[caseKey];

  if (caseData) {
    return caseData;
  }

  // If case not found in mock DB, return a generic response
  // In real implementation, this would call the actual Bangladesh Court API
  return {
    status: 'Case Not Found',
    nextDate: 'N/A',
    judge: 'N/A',
    caseNumber: caseNo,
    courtName: court,
    caseYear: year,
  };
}

/**
 * POST handler for case status API
 * Accepts: { caseNo: string, court: string, year: string }
 * Returns: { status, nextDate, judge, caseNumber, courtName, caseYear, ... }
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<CaseResponse | { error: string }>> {
  try {
    const body: CaseRequest = await request.json();
    const { caseNo, court, year } = body;

    // Validate input
    if (!caseNo || typeof caseNo !== 'string' || caseNo.trim().length === 0) {
      return NextResponse.json(
        { error: 'Case number is required' },
        { status: 400 }
      );
    }

    if (!court || typeof court !== 'string' || court.trim().length === 0) {
      return NextResponse.json(
        { error: 'Court name is required' },
        { status: 400 }
      );
    }

    if (!year || typeof year !== 'string' || year.trim().length === 0) {
      return NextResponse.json(
        { error: 'Year is required' },
        { status: 400 }
      );
    }

    // Validate year format (should be 4 digits)
    if (!/^\d{4}$/.test(year.trim())) {
      return NextResponse.json(
        { error: 'Year must be a 4-digit number (e.g., 2024)' },
        { status: 400 }
      );
    }

    // Simulate fetching from Bangladesh Court API
    // TODO: Replace this with actual Bangladesh Court API integration
    const caseData = await fetchFromBangladeshCourtAPI(
      caseNo.trim(),
      court.trim(),
      year.trim()
    );

    if (!caseData) {
      return NextResponse.json(
        { error: 'Failed to fetch case information' },
        { status: 500 }
      );
    }

    return NextResponse.json(caseData);
  } catch (error) {
    console.error('Case API Error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    return NextResponse.json(
      { error: `Failed to process request: ${errorMessage}` },
      { status: 500 }
    );
  }
}

/**
 * GET handler for case status API (optional - for direct URL access)
 */
export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const caseNo = searchParams.get('caseNo');
  const court = searchParams.get('court');
  const year = searchParams.get('year');

  if (!caseNo || !court || !year) {
    return NextResponse.json(
      { error: 'Missing required parameters: caseNo, court, year' },
      { status: 400 }
    );
  }

  // Reuse POST logic
  const mockRequest = {
    json: async () => ({ caseNo, court, year }),
  } as NextRequest;

  return POST(mockRequest);
}

