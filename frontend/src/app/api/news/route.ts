import { NextResponse } from 'next/server';
import { initialNews } from '@/lib/initialData';

export async function GET() {
  return NextResponse.json(initialNews);
}
