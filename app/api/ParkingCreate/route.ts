import prisma from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const {name , address, city, latitude, longitude, ownerId}= req.body;

    const owner = await prisma.owner.findUnique({where : {id : ownerId}},)
    
    const createParking = await prisma.place.create({
        data: {
            name,
            address,
            city,
            latitude,
            longitude,
            ownerId
        }
    })
    return NextResponse.json({message:createParking}, {status:200})
}
export async function GET() {
    const allPlace = await prisma.place.findMany({include : {owner:true}})
    return NextResponse.json({message:allPlace}, {status:200})
}