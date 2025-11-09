import { NextRequest, NextResponse } from 'next/server';

// Type definitions
interface ContactRequest {
  type: 'pet-violence' | 'women-issues';
  name: string;
  contact: string;
  description: string;
}

interface NGO {
  id: string;
  name: string;
  nameEn: string;
  type: string;
  contact: string;
  email: string;
  address: string;
  description: string;
}

interface ContactResponse {
  success: boolean;
  message: string;
  ngoContacted?: {
    name: string;
    contact: string;
    email: string;
  };
}

/**
 * Load NGOs from JSON file
 */
async function loadNGOs(): Promise<NGO[]> {
  try {
    // In production, this would be a database query
    // For now, we'll use a mock list
    const ngos: NGO[] = [
      {
        id: 'ngo-001',
        name: 'বাংলাদেশ প্রাণী কল্যাণ সমিতি',
        nameEn: 'Bangladesh Animal Welfare Society',
        type: 'pet-violence',
        contact: '+880 1234-567890',
        email: 'info@baws.org.bd',
        address: 'Dhaka, Bangladesh',
        description: 'Dedicated to protecting animals and preventing cruelty',
      },
      {
        id: 'ngo-002',
        name: 'প্রাণী অধিকার ফাউন্ডেশন',
        nameEn: 'Animal Rights Foundation',
        type: 'pet-violence',
        contact: '+880 9876-543210',
        email: 'contact@arf.org.bd',
        address: 'Chittagong, Bangladesh',
        description: 'Advocating for animal rights and welfare',
      },
      {
        id: 'ngo-003',
        name: 'নারীর অধিকার সংস্থা',
        nameEn: "Women's Rights Organization",
        type: 'women-issues',
        contact: '+880 1111-222222',
        email: 'info@wro.org.bd',
        address: 'Dhaka, Bangladesh',
        description: "Supporting women's rights and providing legal aid",
      },
      {
        id: 'ngo-004',
        name: 'মহিলা নিরাপত্তা নেটওয়ার্ক',
        nameEn: "Women's Safety Network",
        type: 'women-issues',
        contact: '+880 3333-444444',
        email: 'support@wsn.org.bd',
        address: 'Sylhet, Bangladesh',
        description: "Ensuring women's safety and providing support services",
      },
      {
        id: 'ngo-005',
        name: 'নারী উন্নয়ন কেন্দ্র',
        nameEn: 'Women Development Center',
        type: 'women-issues',
        contact: '+880 5555-666666',
        email: 'contact@wdc.org.bd',
        address: 'Rajshahi, Bangladesh',
        description: 'Empowering women through legal and social support',
      },
    ];

    return ngos;
  } catch (error) {
    console.error('Error loading NGOs:', error);
    return [];
  }
}

/**
 * Find appropriate NGO based on report type
 */
function findNGO(ngos: NGO[], type: string): NGO | null {
  const matchingNGOs = ngos.filter((ngo) => ngo.type === type);
  if (matchingNGOs.length === 0) return null;

  // Randomly select one NGO (in production, could use load balancing or priority)
  return matchingNGOs[Math.floor(Math.random() * matchingNGOs.length)];
}

/**
 * Simulate sending data to NGO endpoint
 */
async function sendToNGO(ngo: NGO, contactData: ContactRequest): Promise<boolean> {
  try {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    // TODO: In production, make actual API call to NGO endpoint
    // const response = await fetch(ngo.apiEndpoint, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(contactData),
    // });
    // return response.ok;

    // For now, log the data (in production, this would be sent to NGO)
    console.log('Sending to NGO:', {
      ngo: ngo.name,
      contactData: {
        name: contactData.name,
        contact: contactData.contact,
        description: contactData.description,
        type: contactData.type,
      },
    });

    return true;
  } catch (error) {
    console.error('Error sending to NGO:', error);
    return false;
  }
}

/**
 * POST handler for contact API
 * Accepts: { type: 'pet-violence' | 'women-issues', name: string, contact: string, description: string }
 * Returns: { success: boolean, message: string, ngoContacted?: {...} }
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ContactResponse | { error: string }>> {
  try {
    const body: ContactRequest = await request.json();
    const { type, name, contact, description } = body;

    // Validate input
    if (!type || (type !== 'pet-violence' && type !== 'women-issues')) {
      return NextResponse.json(
        { error: "Type must be either 'pet-violence' or 'women-issues'" },
        { status: 400 }
      );
    }

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return NextResponse.json(
        { error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!contact || typeof contact !== 'string' || contact.trim().length === 0) {
      return NextResponse.json(
        { error: 'Contact information is required' },
        { status: 400 }
      );
    }

    if (!description || typeof description !== 'string' || description.trim().length === 0) {
      return NextResponse.json(
        { error: 'Description is required' },
        { status: 400 }
      );
    }

    // Load NGOs
    const ngos = await loadNGOs();

    // Find appropriate NGO
    const ngo = findNGO(ngos, type);

    if (!ngo) {
      return NextResponse.json(
        {
          success: false,
          message: 'দুঃখিত, এই মুহূর্তে উপযুক্ত এনজিও পাওয়া যায়নি। অনুগ্রহ করে পরে আবার চেষ্টা করুন।',
        },
        { status: 404 }
      );
    }

    // Send data to NGO
    const sent = await sendToNGO(ngo, {
      type,
      name: name.trim(),
      contact: contact.trim(),
      description: description.trim(),
    });

    if (!sent) {
      return NextResponse.json(
        {
          success: false,
          message: 'এনজিওর কাছে তথ্য পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে পরে আবার চেষ্টা করুন।',
        },
        { status: 500 }
      );
    }

    // Return success message in Bangla
    return NextResponse.json({
      success: true,
      message: `ধন্যবাদ ${name.trim()}! আপনার রিপোর্ট সফলভাবে জমা দেওয়া হয়েছে। ${ngo.name} শীঘ্রই আপনার সাথে যোগাযোগ করবে। আপনার প্রথম পরামর্শ সম্পূর্ণ বিনামূল্যে হবে।`,
      ngoContacted: {
        name: ngo.name,
        contact: ngo.contact,
        email: ngo.email,
      },
    });
  } catch (error) {
    console.error('Contact API Error:', error);

    const errorMessage =
      error instanceof Error ? error.message : 'An unknown error occurred';

    return NextResponse.json(
      {
        success: false,
        message: `দুঃখিত, একটি ত্রুটি হয়েছে: ${errorMessage}`,
      },
      { status: 500 }
    );
  }
}

