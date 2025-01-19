import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Kiểm tra nếu đường dẫn là '/sfp2025/form'
  if (request.nextUrl.pathname === '/sfp2025/form') {
    // Chuyển hướng đến trang chính
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Nếu không, tiếp tục xử lý request bình thường
  return NextResponse.next();
}

// Cấu hình phạm vi của middleware
export const config = {
  matcher: '/sfp2025/form', // Chỉ áp dụng middleware cho đường dẫn này
};
