import { NextResponse } from 'next/server';
import { initialDatasets } from '@/lib/initialData';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const item = initialDatasets.find((d) => d.id === params.id);
  if (!item) {
    return NextResponse.json({ message: 'Dataset not found' }, { status: 404 });
  }
  return NextResponse.json(item);
}
