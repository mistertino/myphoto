import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { getAccessToken } from '@/utils/sessionTokenAccessor';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string[] } },
) {
  const { slug } = params;
  // console.log(new URLSearchParams(request.nextUrl.searchParams));
  try {
    const searchParams = new URLSearchParams(request.nextUrl.searchParams);

    // get token from cookie
    const accessToken = await getAccessToken();
    if (accessToken) {
      // Cấu hình header cho cuộc gọi API
      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
      // call api ở đây
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/${slug.join('/')}${searchParams ? `?${searchParams}` : ``}`,
        {
          cache: 'no-cache',
          method: 'GET',
          headers,
        },
      );
      const res = await response.json();
      return NextResponse.json(res, { status: response.status });
    }
    return NextResponse.json({ message: 'Lỗi hệ thống, vui lòng thử lại' });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function POST(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  const reqBody = await request.json();
  const { slug } = params;

  try {
    const accessToken = await getAccessToken();

    if (accessToken) {
      // Cấu hình header cho cuộc gọi API
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      // call api ở đây
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/${slug.join('/')}`,
        {
          cache: 'no-cache',
          method: 'POST',
          headers,
          body: JSON.stringify(reqBody),
        },
      );
      const res = await response.json();
      return NextResponse.json(res, { status: response.status });
    }
    return NextResponse.json({ message: 'Lỗi hệ thống, vui lòng thử lại' });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { slug: string[] } },
) {
  const reqBody = await request.json();
  const { slug } = params;

  try {
    const accessToken = await getAccessToken();

    if (accessToken) {
      // Cấu hình header cho cuộc gọi API
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };
      // call api ở đây
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/${slug.join('/')}`,
        {
          cache: 'no-cache',
          method: 'PUT',
          headers,
          body: JSON.stringify(reqBody),
        },
      );
      const res = await response.json();
      return NextResponse.json(res, { status: response.status });
    }
    return NextResponse.json({ message: 'Lỗi hệ thống, vui lòng thử lại' });
  } catch (error) {
    return NextResponse.json(error);
  }
}

export async function DELETE(
  _: any,
  { params }: { params: { slug: string[] } },
) {
  // const reqBody = await request.json();
  const { slug } = params;

  try {
    const accessToken = await getAccessToken();

    if (accessToken) {
      // Cấu hình header cho cuộc gọi API
      const headers = {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      };

      // call api ở đây
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/${slug.join('/')}`,
        {
          cache: 'no-cache',
          method: 'DELETE',
          headers,
          // body: JSON.stringify(reqBody),
        },
      );
      const res = await response.json();
      return NextResponse.json(res, { status: response.status });
    }
    return NextResponse.json({ message: 'Lỗi hệ thống, vui lòng thử lại' });
  } catch (error) {
    return NextResponse.json(error);
  }
}
