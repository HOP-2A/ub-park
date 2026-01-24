import prisma from "@/lib/db";
import { NextResponse } from "next/server";


export async function GET(req:Request, context: {params : promise<{placeId : string}>}) {
    const {placeId} = await context.params;
const place = await prisma.place.findUnique({where: {id: placeId}, include: {owner}})

return NextResponse.json({message : place})
}