import { NextResponse } from 'next/server';
import { getLarkToken } from '@/app/utils/lark'; // Điều chỉnh đường dẫn nếu cần

export async function GET() {
  try {
    const token = await getLarkToken();
    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error fetching token:', error);
    return NextResponse.json(
      { error: 'Failed to fetch token' },
      { status: 500 }
    );
  }
}
