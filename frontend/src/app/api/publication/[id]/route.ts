import { NextResponse } from 'next/server';
import { initialPublications } from '@/lib/initialData';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const item = initialPublications.find((p) => p.id === params.id);
  if (!item) {
    return NextResponse.json({ message: 'Publication not found' }, { status: 404 });
  }
  return NextResponse.json(item);
}
