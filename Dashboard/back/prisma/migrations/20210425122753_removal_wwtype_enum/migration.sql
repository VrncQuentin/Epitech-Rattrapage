/*
  Warnings:

  - Changed the type of `weather` on the `WeatherWidget` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "WeatherWidget" DROP COLUMN "weather",
ADD COLUMN     "weather" BOOLEAN NOT NULL;

-- DropEnum
DROP TYPE "WWType";
