import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/db';
import Appointment from '@/models/Appointment';
import UserModel from '@/models/User';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { expertId, date, notes } = await req.json();

    if (!expertId || !date) {
      return NextResponse.json(
        { error: 'Expert and Date are required' },
        { status: 400 }
      );
    }

    await dbConnect();

    // Verify expert exists
    const expert = await UserModel.findById(expertId);
    if (!expert || expert.role !== 'expert') {
      return NextResponse.json({ error: 'Invalid expert' }, { status: 404 });
    }

    const appointment = await Appointment.create({
      userId: session.user.id,
      expertId,
      date: new Date(date),
      notes,
      status: 'scheduled'
    });

    return NextResponse.json(appointment, { status: 201 });
  } catch (error) {
    console.error('Error creating appointment:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}

export async function GET() {
    try {
      const session = await getServerSession(authOptions);
  
      if (!session || !session.user) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
  
      await dbConnect();

      // If user is expert, show appointments where they are the expert
      // If user is mother, show appointments where they are the user
      
      const isExpert = session.user.role === 'expert';
      const query = isExpert 
        ? { expertId: session.user.id } 
        : { userId: session.user.id };

      const appointments = await Appointment.find(query)
        .populate('userId', 'name email image')
        .populate('expertId', 'name specialization image')
        .sort({ date: 1 });
  
      return NextResponse.json(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      return NextResponse.json(
        { error: 'Internal Server Error' },
        { status: 500 }
      );
    }
  }
