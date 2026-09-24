import { NextResponse } from 'next/server';
import { initialDatasets } from '@/lib/initialData';

export async function GET() {
  return NextResponse.json(initialDatasets);
}
