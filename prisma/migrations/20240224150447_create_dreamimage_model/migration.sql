/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `Dream` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Dream" DROP COLUMN "imageUrl";

-- CreateTable
CREATE TABLE "DreamImage" (
    "id" SERIAL NOT NULL,
    "url" TEXT NOT NULL,
    "dreamId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DreamImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DreamImage" ADD CONSTRAINT "DreamImage_dreamId_fkey" FOREIGN KEY ("dreamId") REFERENCES "Dream"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
