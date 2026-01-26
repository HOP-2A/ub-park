import prisma from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req:Request, context: {params : Promise<{placeId : string}>}) {
    const {placeId} = await context.params;
const place = await prisma.place.findUnique({where: {id: placeId}, include: {}})

return NextResponse.json({message : place})
}