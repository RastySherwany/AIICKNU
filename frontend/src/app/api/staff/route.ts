import { NextResponse } from 'next/server';
import { initialStaff } from '@/lib/initialData';

export async function GET() {
  return NextResponse.json(initialStaff);
}
