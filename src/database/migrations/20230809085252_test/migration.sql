-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfileData" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "djName" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "iidxId" TEXT NOT NULL,
    "spClass" TEXT NOT NULL,
    "dpClass" TEXT NOT NULL,
    "spArena" TEXT NOT NULL,
    "dpArena" TEXT NOT NULL,
    "spMusicData" JSONB NOT NULL,
    "dpMusicData" JSONB NOT NULL,
    "spRadarData" JSONB NOT NULL,
    "dpRadarData" JSONB NOT NULL,

    CONSTRAINT "ProfileData_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- AddForeignKey
ALTER TABLE "ProfileData" ADD CONSTRAINT "ProfileData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
