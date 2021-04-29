-- AlterTable
ALTER TABLE "User" ADD COLUMN     "spacexUsed" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "SpaceXWidget" (
    "id" TEXT NOT NULL,
    "rocketId" INTEGER,
    "desiredInfo" TEXT,
    "timer" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SpaceXWidget" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
