// src/app/api/vaults/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import mongoose from 'mongoose';
import { Vault } from '@/models/User';

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { name } = await req.json();
  
  try {
    const vault = await Vault.create({
      name,
      owner: new mongoose.Types.ObjectId(session.user.id)
    });

    return NextResponse.json(vault, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create vault' }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const vaults = await Vault.find({ 
      $or: [
        { owner: new mongoose.Types.ObjectId(session.user.id) },
        { sharedWith: new mongoose.Types.ObjectId(session.user.id) }
      ]
    });

    return NextResponse.json(vaults);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch vaults' }, { status: 500 });
  }
}