import { NextResponse } from 'next/server';
import { initialActivities } from '@/lib/initialData';

export async function GET() {
  return NextResponse.json(initialActivities);
}

