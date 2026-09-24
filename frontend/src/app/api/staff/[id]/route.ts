import { NextResponse } from 'next/server';
import { initialStaff } from '@/lib/initialData';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const staff = initialStaff.find((s) => s.id === params.id);
  if (!staff) {
    return NextResponse.json({ message: 'Staff member not found' }, { status: 404 });
  }
  return NextResponse.json(staff);
}

