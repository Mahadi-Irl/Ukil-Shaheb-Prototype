import { NextRequest, NextResponse } from 'next/server';

// Type definitions for request and response
interface ChatbotRequest {
  message: string;
}

interface ChatbotResponse {
  reply: string;
}

// Configuration for OpenAI API
const OPENAI_CONFIG = {
  apiKey: process.env.OPENAI_API_KEY || 'sk-dummy-key-for-development',
  baseUrl: 'https://api.openai.com/v1',
  // Model configuration - can be swapped for fine-tuned model
  model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
  // Fine-tuned model ID (set this when ready)
  fineTunedModel: process.env.OPENAI_FINE_TUNED_MODEL || null,
  temperature: 0.7,
  maxTokens: 500,
};

// System prompt for the legal assistant
const SYSTEM_PROMPT = `You are a helpful legal assistant for Bangladesh. Provide general legal information in both Bangla and English. 
Always remind users that this is general information, not legal advice, and they should consult a qualified lawyer for specific legal matters. 
Respond in the same language the user uses.`;

// Bangla disclaimer to append to responses
const BANGLA_DISCLAIMER = '\n\n⚠️ এই এআই শুধুমাত্র সাধারণ তথ্য দেয়, আইনগত পরামর্শ নয়।';

/**
 * Get response from OpenAI API (or mock for development)
 */
async function getOpenAIResponse(message: string): Promise<string> {
  // Use mock response if no API key is set or if explicitly enabled
  const useMock = !process.env.OPENAI_API_KEY || process.env.USE_MOCK_RESPONSE === 'true';
  
  if (useMock) {
    return getMockResponse(message);
  }

  try {
    // Determine which model to use (fine-tuned or regular)
    const modelToUse = OPENAI_CONFIG.fineTunedModel || OPENAI_CONFIG.model;

    const response = await fetch(`${OPENAI_CONFIG.baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_CONFIG.apiKey}`,
      },
      body: JSON.stringify({
        model: modelToUse,
        messages: [
          {
            role: 'system',
            content: SYSTEM_PROMPT,
          },
          {
            role: 'user',
            content: message,
          },
        ],
        temperature: OPENAI_CONFIG.temperature,
        max_tokens: OPENAI_CONFIG.maxTokens,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error('OpenAI API Error:', errorData);
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    return data.choices[0]?.message?.content || getMockResponse(message);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    // Fallback to mock response on error
    return getMockResponse(message);
  }
}

/**
 * Generate mock response for development/testing
 * This will be replaced by actual OpenAI responses in production
 */
function getMockResponse(message: string): string {
  const isBangla = /[\u0980-\u09FF]/.test(message);
  
  // Comprehensive mock responses based on common legal questions
  const lowerMessage = message.toLowerCase();
  
  // Contract related
  if (lowerMessage.includes('contract') || lowerMessage.includes('চুক্তি') || lowerMessage.includes('চুক্তিপত্র')) {
    return isBangla
      ? 'চুক্তি হলো দুই বা ততোধিক পক্ষের মধ্যে আইনগতভাবে বাধ্যতামূলক একটি সমঝোতা। একটি বৈধ চুক্তির জন্য প্রয়োজন:\n\n১. উভয় পক্ষের সম্মতি\n২. বৈধ উদ্দেশ্য\n৩. বিবেচনা (consideration)\n৪. চুক্তি করার আইনগত ক্ষমতা\n\nভাড়া চুক্তি, বিক্রয় চুক্তি, বা ব্যবসায়িক চুক্তি - সব ধরনের চুক্তির জন্য সঠিক দলিল তৈরি করা গুরুত্বপূর্ণ।'
      : 'A contract is a legally binding agreement between two or more parties. For a contract to be valid, it must have:\n\n1. Mutual consent of all parties\n2. Lawful purpose\n3. Consideration\n4. Legal capacity to contract\n\nProper documentation is essential for all types of contracts including rental, sales, or business agreements.';
  }
  
  // Divorce related
  if (lowerMessage.includes('divorce') || lowerMessage.includes('তালাক') || lowerMessage.includes('বিবাহবিচ্ছেদ')) {
    return isBangla
      ? 'বাংলাদেশে বিবাহবিচ্ছেদের জন্য পারিবারিক আদালতে আবেদন করতে হবে। বিবাহবিচ্ছেদের প্রধান কারণগুলো:\n\n১. পরস্পরের সম্মতিতে\n২. স্বামী কর্তৃক তালাক\n৩. স্ত্রী কর্তৃক খুলা\n৪. আদালত কর্তৃক বিবাহবিচ্ছেদ\n\nসন্তান হেফাজত, ভরণপোষণ এবং সম্পত্তি বণ্টন সংক্রান্ত বিষয়গুলোও বিবেচনায় নিতে হবে। একজন অভিজ্ঞ আইনজীবীর সাথে পরামর্শ করার পরামর্শ দিচ্ছি।'
      : 'In Bangladesh, divorce applications must be filed in the Family Court. Main grounds for divorce include:\n\n1. Mutual consent\n2. Talaq by husband\n3. Khula by wife\n4. Divorce by court order\n\nIssues like child custody, maintenance, and property division must also be considered. I recommend consulting with an experienced lawyer.';
  }
  
  // Property related
  if (lowerMessage.includes('property') || lowerMessage.includes('জমি') || lowerMessage.includes('সম্পত্তি') || lowerMessage.includes('ভাড়া')) {
    return isBangla
      ? 'সম্পত্তি হস্তান্তরের জন্য দলিল রেজিস্ট্রেশন করা আবশ্যক। গুরুত্বপূর্ণ বিষয়:\n\n১. জমি ক্রয়-বিক্রয়ের সময় সঠিক দলিল তৈরি করুন\n২. দলিল রেজিস্ট্রেশন নিশ্চিত করুন\n৩. সম্পত্তির মালিকানা যাচাই করুন\n৪. ভাড়া চুক্তির জন্য লিখিত চুক্তি রাখুন\n\nঅবৈধ দখল থেকে রক্ষা পেতে এবং আইনি সমস্যা এড়াতে একজন সম্পত্তি আইন বিশেষজ্ঞের পরামর্শ নিন।'
      : 'Property transfer requires registration of documents. Important points:\n\n1. Ensure proper documentation for land purchase/sale\n2. Complete registration of documents\n3. Verify property ownership\n4. Maintain written agreements for rental\n\nConsult a property law specialist to protect against illegal possession and avoid legal issues.';
  }
  
  // Criminal law
  if (lowerMessage.includes('criminal') || lowerMessage.includes('ফৌজদারি') || lowerMessage.includes('জিডি') || lowerMessage.includes('মামলা') || lowerMessage.includes('গ্রেফতার')) {
    return isBangla
      ? 'ফৌজদারি আইন সংক্রান্ত বিষয়গুলো গুরুত্বপূর্ণ। যদি আপনি কোনো অপরাধের শিকার হন:\n\n১. নিকটস্থ থানায় জিডি বা মামলা দায়ের করুন\n২. প্রয়োজন হলে জামিনের জন্য আবেদন করুন\n৩. একজন ফৌজদারি আইন বিশেষজ্ঞের পরামর্শ নিন\n\nআপনার অধিকার জানা এবং সঠিক আইনি পদক্ষেপ নেওয়া অত্যন্ত গুরুত্বপূর্ণ।'
      : 'Criminal law matters are important. If you are a victim of crime:\n\n1. File a GD or case at the nearest police station\n2. Apply for bail if necessary\n3. Consult a criminal law specialist\n\nIt is crucial to know your rights and take proper legal action.';
  }
  
  // Family law
  if (lowerMessage.includes('family') || lowerMessage.includes('পারিবারিক') || lowerMessage.includes('সন্তান') || lowerMessage.includes('হেফাজত')) {
    return isBangla
      ? 'পারিবারিক আইন সংক্রান্ত বিষয়গুলো:\n\n১. বিবাহ ও তালাক\n২. সন্তান হেফাজত\n৩. ভরণপোষণ\n৪. উত্তরাধিকার\n\nপারিবারিক সমস্যার সমাধানের জন্য পারিবারিক আদালতে আবেদন করা যেতে পারে। একজন পারিবারিক আইন বিশেষজ্ঞের পরামর্শ নেওয়ার পরামর্শ দিচ্ছি।'
      : 'Family law matters include:\n\n1. Marriage and divorce\n2. Child custody\n3. Maintenance\n4. Inheritance\n\nFamily Court applications can be filed to resolve family issues. I recommend consulting a family law specialist.';
  }
  
  // Women's rights
  if (lowerMessage.includes('women') || lowerMessage.includes('নারী') || lowerMessage.includes('মহিলা') || lowerMessage.includes('নির্যাতন') || lowerMessage.includes('হয়রানি')) {
    return isBangla
      ? 'নারী নির্যাতন প্রতিরোধ আইন, ২০০০ এবং নারী ও শিশু নির্যাতন দমন আইন, ২০০০ নারীদের সুরক্ষা প্রদান করে।\n\nআপনি যদি নির্যাতনের শিকার হন:\n\n১. নিকটস্থ থানায় অভিযোগ করুন\n২. জরুরি হটলাইন ১০৯ এ কল করুন\n৩. একজন মহিলা আইনজীবীর সাথে যোগাযোগ করুন\n\nআমাদের মহিলা বিভাগে বিশেষজ্ঞ মহিলা আইনজীবীদের সাথে যোগাযোগ করতে পারেন।'
      : 'The Prevention of Oppression Against Women and Children Act, 2000 provides protection for women.\n\nIf you are a victim of violence:\n\n1. File a complaint at the nearest police station\n2. Call emergency hotline 109\n3. Contact a women lawyer\n\nYou can contact specialist women lawyers through our Women\'s Section.';
  }
  
  // Labor law
  if (lowerMessage.includes('labor') || lowerMessage.includes('শ্রম') || lowerMessage.includes('চাকরি') || lowerMessage.includes('কর্মচারী')) {
    return isBangla
      ? 'শ্রম আইন কর্মচারীদের অধিকার সুরক্ষা করে:\n\n১. ন্যূনতম মজুরি\n২. কাজের সময় ও ছুটি\n৩. চাকরিচ্যুত হলে ক্ষতিপূরণ\n৪. কর্মস্থলে নিরাপত্তা\n\nআপনার অধিকার লঙ্ঘিত হলে শ্রম আদালতে আবেদন করতে পারেন। একজন শ্রম আইন বিশেষজ্ঞের পরামর্শ নিন।'
      : 'Labor law protects workers\' rights:\n\n1. Minimum wage\n2. Working hours and leave\n3. Compensation for termination\n4. Workplace safety\n\nYou can file applications in Labor Court if your rights are violated. Consult a labor law specialist.';
  }
  
  // General greeting
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('নমস্কার') || lowerMessage.includes('সালাম') || lowerMessage.includes('হ্যালো')) {
    return isBangla
      ? 'নমস্কার! আমি আপনার আইনি সহায়ক AI। আমি সাধারণ আইনি তথ্য প্রদান করতে পারি। আপনি কী জানতে চান?\n\nআমি সাহায্য করতে পারি:\n• পারিবারিক আইন\n• সম্পত্তি আইন\n• ফৌজদারি আইন\n• শ্রম আইন\n• নারী অধিকার\n• এবং আরও অনেক বিষয়ে'
      : 'Hello! I am your legal assistant AI. I can provide general legal information. What would you like to know?\n\nI can help with:\n• Family law\n• Property law\n• Criminal law\n• Labor law\n• Women\'s rights\n• And many more topics';
  }
  
  // Default response
  return isBangla
    ? 'আপনার প্রশ্নের জন্য ধন্যবাদ। আমি একটি আইনি সহায়ক AI। আমি সাধারণ আইনি তথ্য প্রদান করতে পারি।\n\nআমি সাহায্য করতে পারি:\n• পারিবারিক আইন (বিবাহ, তালাক, সন্তান হেফাজত)\n• সম্পত্তি আইন (জমি ক্রয়-বিক্রয়, ভাড়া)\n• ফৌজদারি আইন (জিডি, মামলা)\n• শ্রম আইন (চাকরি, মজুরি)\n• নারী অধিকার\n\nনির্দিষ্ট আইনি পরামর্শের জন্য একজন যোগ্য আইনজীবীর সাথে পরামর্শ করার পরামর্শ দিচ্ছি। আমাদের আইনজীবী পেজে যোগ্য আইনজীবীদের খুঁজে পেতে পারেন।'
    : 'Thank you for your question. I am a legal assistant AI. I can provide general legal information.\n\nI can help with:\n• Family law (marriage, divorce, child custody)\n• Property law (land purchase/sale, rental)\n• Criminal law (GD, cases)\n• Labor law (employment, wages)\n• Women\'s rights\n\nFor specific legal advice, I recommend consulting with a qualified lawyer. You can find qualified lawyers on our Lawyers page.';
}

/**
 * POST handler for chatbot API
 * Accepts: { message: string }
 * Returns: { reply: string }
 */
export async function POST(request: NextRequest): Promise<NextResponse<ChatbotResponse | { error: string }>> {
  try {
    const body: ChatbotRequest = await request.json();
    const { message } = body;

    // Validate input
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required and must be a non-empty string' },
        { status: 400 }
      );
    }

    // Get response from OpenAI (or mock)
    const aiResponse = await getOpenAIResponse(message.trim());
    
    // Append Bangla disclaimer to the response
    const reply = `${aiResponse}${BANGLA_DISCLAIMER}`;

    return NextResponse.json({ reply });
  } catch (error) {
    console.error('Chatbot API Error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    
    return NextResponse.json(
      { error: `Failed to process request: ${errorMessage}` },
      { status: 500 }
    );
  }
}
