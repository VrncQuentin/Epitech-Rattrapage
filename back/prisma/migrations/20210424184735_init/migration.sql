-- CreateEnum
CREATE TYPE "WWType" AS ENUM ('WEATHER', 'TEMPERATURE');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "weatherUsed" BOOLEAN NOT NULL DEFAULT false,
    "githubUsed" BOOLEAN NOT NULL DEFAULT false,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WeatherWidget" (
    "id" TEXT NOT NULL,
    "param" TEXT NOT NULL DEFAULT E'',
    "timer" INTEGER NOT NULL,
    "weather" "WWType" NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GithubWidget" (
    "id" TEXT NOT NULL,
    "repo" TEXT NOT NULL DEFAULT E'',
    "timer" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WeatherWidget" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GithubWidget" ADD FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
