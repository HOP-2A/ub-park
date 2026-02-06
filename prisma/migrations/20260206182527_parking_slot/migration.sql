/*
  Warnings:

  - You are about to drop the column `parkingSpotId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `isAvailable` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `number` on the `ParkingSpot` table. All the data in the column will be lost.
  - You are about to drop the column `pricePerHour` on the `ParkingSpot` table. All the data in the column will be lost.
  - Added the required column `slotId` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `height` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `label` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `width` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `x` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.
  - Added the required column `y` to the `ParkingSpot` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SlotStatus" AS ENUM ('AVAILABLE', 'BOOKED', 'DISABLED');

-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_parkingSpotId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "parkingSpotId",
ADD COLUMN     "slotId" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "endTime" DROP NOT NULL,
ALTER COLUMN "status" SET DEFAULT 'CONFIRMED';

-- AlterTable
ALTER TABLE "ParkingSpot" DROP COLUMN "isAvailable",
DROP COLUMN "number",
DROP COLUMN "pricePerHour",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "height" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "label" TEXT NOT NULL,
ADD COLUMN     "rotation" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "status" "SlotStatus" NOT NULL DEFAULT 'AVAILABLE',
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "width" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "x" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "y" DOUBLE PRECISION NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_slotId_fkey" FOREIGN KEY ("slotId") REFERENCES "ParkingSpot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
