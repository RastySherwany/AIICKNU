import { NextResponse } from 'next/server';
import { initialNews } from '@/lib/initialData';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const item = initialNews.find((n) => n.id === params.id);
  if (!item) {
    return NextResponse.json({ message: 'News item not found' }, { status: 404 });
  }
  return NextResponse.json(item);
}

