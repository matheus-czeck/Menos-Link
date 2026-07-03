import { describe, it, expect, vi, beforeEach } from "vitest";
import LinkModel from "../models/link.models.js";
import { prisma } from "../repositories/database.js";


vi.mock("../repositories/database.ts", () => ({
  prisma: {
    link: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

const linkMock = {
  id: "qualquerId",
  codigo: "google",
  url_original: "https://www/google.com",
  total_cliques: 0,
  senha: null,
  qrcode_path: null,
  criado_em: new Date(),
  expira_em: null,
};

describe("LinkModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve retornar true quando o codigo nao existe no banco", async () => {
    vi.mocked(prisma.link.findUnique).mockResolvedValue(null);

    const disponivel = await LinkModel.linkDisponivel("google");
    expect(disponivel).toBe(true);
  });

  it("deve retornar false quando o codigo ja existe no banco", async () => {
    vi.mocked(prisma.link.findUnique).mockResolvedValue(linkMock);

    const disponivel = await LinkModel.linkDisponivel("google");
    expect(disponivel).toBe(false);
  });

  it("deve gerar um codigo com 6 caracteres", () => {
    const codigo = LinkModel.gerarLink();
    expect(codigo).toHaveLength(6);
  });

  it("Deve gerar um codigo apenas com caracteres alfanumericos", () => {
    const codigo = LinkModel.gerarLink();
    expect(codigo).toMatch(/^[a-zA-Z0-9_-]+$/);
  });

  it("deve gerar codigo unicos", () => {
    const codigo1 = LinkModel.gerarLink();
    const codigo2 = LinkModel.gerarLink();
    expect(codigo1).not.toBe(codigo2);
  });

  it("deve lancar erro se o codigo ja existir no banco", async () => {
    vi.mocked(prisma.link.findUnique).mockResolvedValue(linkMock);

    await expect(
      LinkModel.criarLinkUnico("https://www/google.com", "google"),
    ).rejects.toThrow("Codigo ja existe, tente novamente");
  });

  it("deve criar link com codigo personlizado", async () => {
    vi.mocked(prisma.link.findUnique).mockResolvedValue(null);
    vi.mocked(prisma.link.create).mockResolvedValue(linkMock);

    const link = await LinkModel.criarLinkUnico(
      "https://www/google.com",
      "google",
    );
    expect(link.codigo).toBe("google");
  });

  it("Deve retornar null quando o link nao existe", async () => {
    vi.mocked(prisma.link.findUnique).mockResolvedValue(null);

    const link = await LinkModel.buscarLink("linkInexistente");
    expect(link).toBeNull();
  });

  it("deve retornar o link quando o codigo existe", async () => {
    vi.mocked(prisma.link.findUnique).mockResolvedValue(linkMock);

    const link = await LinkModel.buscarLink("google");
    expect(link?.codigo).toBe("google");
  });
});
