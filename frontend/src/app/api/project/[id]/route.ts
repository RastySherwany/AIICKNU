import { NextResponse } from 'next/server';
import { initialProjects } from '@/lib/initialData';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const item = initialProjects.find((p) => p.id === params.id);
  if (!item) {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
  return NextResponse.json(item);
}

