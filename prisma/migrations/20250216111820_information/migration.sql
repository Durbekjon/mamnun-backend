-- CreateTable
CREATE TABLE "informations" (
    "id" SERIAL NOT NULL,
    "phone_number" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "address" TEXT,

    CONSTRAINT "informations_pkey" PRIMARY KEY ("id")
);
