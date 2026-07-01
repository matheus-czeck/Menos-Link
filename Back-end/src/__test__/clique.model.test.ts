import { describe, it, expect, vi, beforeEach } from "vitest";
import CliqueModel from "../models/clique.model.ts";
import { prisma } from "../repositories/database.ts";

vi.mock("../repositories/database.ts", () => ({
  prisma: {
    clique: {
      create: vi.fn(),
    },
  },
}));

const cliqueMock = {
  id: "qualquerId",
  linkId: "qualquerLinkId",
  clicadoEm: new Date(),
  ip: null,
  pais: null,
  dispositivo: null,
};

describe("CliqueModel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve registrar um clique com sucesso", async () => {
    vi.mocked(prisma.clique.create).mockResolvedValue(cliqueMock);

    const registro = await CliqueModel.registrarClique("qualquerLinkId");
    expect(registro.linkId).toBe("qualquerLinkId");
  });

  it("deve chamar o prisma com o linkId correto", async () => {
    vi.mocked(prisma.clique.create).mockResolvedValue(cliqueMock);

    await CliqueModel.registrarClique("qualquerLinkId");
    expect(prisma.clique.create).toHaveBeenCalledWith({
      data: { linkId: "qualquerLinkId" },
    });
  });
});
