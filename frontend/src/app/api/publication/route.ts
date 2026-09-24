import { NextResponse } from 'next/server';
import { initialPublications } from '@/lib/initialData';

export async function GET() {
  return NextResponse.json(initialPublications);
}

