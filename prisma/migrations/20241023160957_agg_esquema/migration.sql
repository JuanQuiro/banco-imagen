-- CreateTable
CREATE TABLE "VideoDestacado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "src" TEXT NOT NULL,
    "alt" TEXT NOT NULL,
    "titulo" TEXT,
    "descripcion" TEXT,
    "size" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "uploadedById" TEXT NOT NULL,
    CONSTRAINT "VideoDestacado_uploadedById_fkey" FOREIGN KEY ("uploadedById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Destacado" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tipo" TEXT NOT NULL,
    "imagenId" INTEGER,
    "videoId" INTEGER,
    "orden" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Destacado_imagenId_fkey" FOREIGN KEY ("imagenId") REFERENCES "ImagenDestacada" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Destacado_videoId_fkey" FOREIGN KEY ("videoId") REFERENCES "VideoDestacado" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "VideoDestacado_src_key" ON "VideoDestacado"("src");

-- CreateIndex
CREATE UNIQUE INDEX "Destacado_tipo_orden_key" ON "Destacado"("tipo", "orden");
