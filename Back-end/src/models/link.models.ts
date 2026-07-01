import { nanoid } from "nanoid";
import { prisma } from "../repositories/database.ts";

class LinkModel {
  static gerarLink(tamanho = 6): string {
    return nanoid(tamanho)
  }

  static async linkDisponivel(codigo: string): Promise<boolean> {
    const link = await prisma.link.findUnique({ where: { codigo } });

    return !link;
  }

  static async criarLinkUnico(urlOriginal: string, codigo?: string) {
    const codigoGerado = codigo ?? this.gerarLink();

    if (!(await this.linkDisponivel(codigoGerado))) {
      throw new Error("Codigo ja existe, tente novamente");
    }

    return prisma.link.create({
      data: {
        url_original: urlOriginal,
        codigo: codigoGerado,
      },
    });
  }

  static async buscarLink(codigo: string) {
    return prisma.link.findUnique({ where: { codigo } });
  }

  static async registrarClique(linkId: string) {
    return prisma.link.update({
      where: { id: linkId },
      data: { total_cliques: { increment: 1 } },
    });
  }
}



export default LinkModel;
