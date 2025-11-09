import { NextRequest, NextResponse } from 'next/server';

// Type definitions
interface BookingRequest {
  lawyerId: string;
  userName: string;
  time: string;
}

interface Booking {
  id: string;
  lawyerId: string;
  userName: string;
  time: string;
  createdAt: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface BookingResponse {
  success: boolean;
  message: string;
  bookingId?: string;
  booking?: Booking;
}

// In-memory storage for bookings (will be replaced with database)
const bookings: Map<string, Booking> = new Map();

// Generate unique booking ID
function generateBookingId(): string {
  return `booking-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * POST handler for lawyer booking
 * Accepts: { lawyerId: string, userName: string, time: string }
 * Returns: { success: boolean, message: string, bookingId?: string, booking?: Booking }
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<BookingResponse | { error: string }>> {
  try {
    const body: BookingRequest = await request.json();
    const { lawyerId, userName, time } = body;

    // Validate input
    if (!lawyerId || typeof lawyerId !== 'string' || lawyerId.trim().length === 0) {
      return NextResponse.json(
        { error: 'Lawyer ID is required' },
        { status: 400 }
      );
    }

    if (!userName || typeof userName !== 'string' || userName.trim().length === 0) {
      return NextResponse.json(
        { error: 'User name is required' },
        { status: 400 }
      );
    }

    if (!time || typeof time !== 'string' || time.trim().length === 0) {
      return NextResponse.json(
        { error: 'Time slot is required' },
        { status: 400 }
      );
    }

    // Validate time format (HH:MM)
    if (!/^([0-1][0-9]|2[0-3]):[0-5][0-9]$/.test(time.trim())) {
      return NextResponse.json(
        { error: 'Invalid time format. Please use HH:MM format (e.g., 14:00)' },
        { status: 400 }
      );
    }

    // Check if time slot is already booked for this lawyer
    const existingBooking = Array.from(bookings.values()).find(
      (booking) =>
        booking.lawyerId === lawyerId.trim() &&
        booking.time === time.trim() &&
        booking.status !== 'cancelled'
    );

    if (existingBooking) {
      return NextResponse.json(
        {
          success: false,
          message: 'This time slot is already booked. Please select another time.',
        },
        { status: 409 }
      );
    }

    // Create booking
    const bookingId = generateBookingId();
    const booking: Booking = {
      id: bookingId,
      lawyerId: lawyerId.trim(),
      userName: userName.trim(),
      time: time.trim(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    // Store booking in memory
    bookings.set(bookingId, booking);

    // TODO: In production, store in database
    // await db.bookings.create({ data: booking });

    // TODO: Send confirmation notification via Twilio/SMS
    // await sendSMSNotification(booking);

    // TODO: Send email confirmation
    // await sendEmailNotification(booking);

    // TODO: Prepare for WebRTC integration
    // Generate meeting link or room ID for video consultation
    // const meetingLink = await generateWebRTCLink(bookingId);

    return NextResponse.json({
      success: true,
      message: `Consultation booked successfully for ${userName} at ${time}. You will receive a confirmation shortly.`,
      bookingId: bookingId,
      booking: booking,
    });
  } catch (error) {
    console.error('Booking API Error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    return NextResponse.json(
      {
        success: false,
        message: `Failed to process booking: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}

/**
 * GET handler to retrieve bookings (for testing/admin purposes)
 * Query params: lawyerId (optional)
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const lawyerId = searchParams.get('lawyerId');

    let bookingsList = Array.from(bookings.values());

    // Filter by lawyerId if provided
    if (lawyerId) {
      bookingsList = bookingsList.filter(
        (booking) => booking.lawyerId === lawyerId
      );
    }

    return NextResponse.json({
      success: true,
      count: bookingsList.length,
      bookings: bookingsList,
    });
  } catch (error) {
    console.error('Get Bookings Error:', error);

    return NextResponse.json(
      { error: 'Failed to retrieve bookings' },
      { status: 500 }
    );
  }
}

/**
 * DELETE handler to cancel a booking
 * Body: { bookingId: string }
 */
export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { bookingId } = body;

    if (!bookingId) {
      return NextResponse.json(
        { error: 'Booking ID is required' },
        { status: 400 }
      );
    }

    const booking = bookings.get(bookingId);

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Update booking status to cancelled
    booking.status = 'cancelled';
    bookings.set(bookingId, booking);

    return NextResponse.json({
      success: true,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    console.error('Cancel Booking Error:', error);

    return NextResponse.json(
      { error: 'Failed to cancel booking' },
      { status: 500 }
    );
  }
}

