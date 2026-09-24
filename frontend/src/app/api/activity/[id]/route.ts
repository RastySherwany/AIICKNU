import { NextResponse } from 'next/server';
import { initialActivities } from '@/lib/initialData';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const item = initialActivities.find((a) => a.id === params.id);
  if (!item) {
    return NextResponse.json({ message: 'Activity not found' }, { status: 404 });
  }
  return NextResponse.json(item);
}

