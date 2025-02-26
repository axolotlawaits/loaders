-- CreateTable
CREATE TABLE "Route" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rrs" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Route_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RouteDay" (
    "id" TEXT NOT NULL,
    "day" TIMESTAMP(3) NOT NULL,
    "routeId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RouteDay_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Filial" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "accepted" BOOLEAN NOT NULL DEFAULT false,
    "feedback" TEXT,
    "routeId" TEXT NOT NULL,
    "routeDayId" TEXT,

    CONSTRAINT "Filial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Loader" (
    "id" TEXT NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "filialId" TEXT NOT NULL,

    CONSTRAINT "Loader_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Route_name_key" ON "Route"("name");

-- CreateIndex
CREATE UNIQUE INDEX "RouteDay_day_key" ON "RouteDay"("day");

-- AddForeignKey
ALTER TABLE "RouteDay" ADD CONSTRAINT "RouteDay_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Filial" ADD CONSTRAINT "Filial_routeId_fkey" FOREIGN KEY ("routeId") REFERENCES "Route"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Filial" ADD CONSTRAINT "Filial_routeDayId_fkey" FOREIGN KEY ("routeDayId") REFERENCES "RouteDay"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Loader" ADD CONSTRAINT "Loader_filialId_fkey" FOREIGN KEY ("filialId") REFERENCES "Filial"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

