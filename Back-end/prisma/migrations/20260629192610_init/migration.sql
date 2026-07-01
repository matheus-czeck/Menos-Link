-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "url_original" TEXT NOT NULL,
    "total_cliques" INTEGER NOT NULL DEFAULT 0,
    "senha" TEXT,
    "qrcode_path" TEXT,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expira_em" TIMESTAMP(3),

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Clique" (
    "id" TEXT NOT NULL,
    "linkId" TEXT NOT NULL,
    "clicadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ip" TEXT,
    "pais" TEXT,
    "dispositivo" TEXT,

    CONSTRAINT "Clique_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_codigo_key" ON "Link"("codigo");

-- AddForeignKey
ALTER TABLE "Clique" ADD CONSTRAINT "Clique_linkId_fkey" FOREIGN KEY ("linkId") REFERENCES "Link"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
