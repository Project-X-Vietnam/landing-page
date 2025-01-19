//api/lark/submit/route.ts

import { NextResponse } from 'next/server';
import { getLarkToken } from '@/app/utils/lark';
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const token = await getLarkToken(); // Implement this function to get token

    const response = await fetch(
      `https://open.larksuite.com/open-apis/bitable/v1/apps/${process.env.LARK_APP_TOKEN}/tables/${process.env.LARK_TABLE_ID}/records`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify(body),
      }
    );

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { error: 'Failed to submit form' },
      { status: 500 }
    );
  }
}
