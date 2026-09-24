import { NextResponse } from 'next/server';
import { initialProjects } from '@/lib/initialData';

export async function GET() {
  return NextResponse.json(initialProjects);
}

