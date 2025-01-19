import { getLarkAccessToken } from '@/lib/lark/auth';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const token = await getLarkAccessToken();

    const response = await fetch('https://open.larksuite.com/some-api', {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch data from Lark' },
      { status: 500 }
    );
  }
}
