import { NextResponse } from 'next/server';
import { getLarkToken } from '@/app/utils/lark'; // Điều chỉnh đường dẫn nếu cần

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const token = await getLarkToken();

    const response = await fetch('https://open.larksuite.com/open-apis/drive/v1/files/upload_all', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}
