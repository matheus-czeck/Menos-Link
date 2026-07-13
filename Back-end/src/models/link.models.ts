import { nanoid } from "nanoid";
import { prisma } from "../repositories/database.js";
import qrcode from "qrcode";
import bcrypt from "bcrypt";
import CliqueModel from "./clique.model.js";

class LinkModel {
  static gerarLink(tamanho = 6): string {
    return nanoid(tamanho);
  }

  static async linkDisponivel(codigo: string): Promise<boolean> {
    const link = await prisma.link.findUnique({ where: { codigo } });

    return !link;
  }

  static async criarLinkUnico(
    urlOriginal: string,
    codigo?: string,
    expiraEm?: number,
    senha?: string,
  ) {
    const codigoGerado = codigo ?? this.gerarLink();

    if (!(await this.linkDisponivel(codigoGerado))) {
      throw new Error("Codigo ja existe, tente novamente");
    }

    if (senha) {
      const salt = 10;
      senha = await bcrypt.hash(senha, salt);
    }

    let expiraEmData: Date | null = null;
    if (expiraEm) {
      expiraEmData = new Date();
      expiraEmData.setDate(expiraEmData.getDate() + expiraEm);
    }

    return prisma.link.create({
      data: {
        url_original: urlOriginal,
        codigo: codigoGerado,
        expira_em: expiraEmData,
        senha: senha || null,
      },
    });
  }

  static async buscarLink(codigo: string) {
    const link = await prisma.link.findUnique({ where: { codigo } });

    if (!link) return null;
    if (link.expira_em && link.expira_em < new Date()) {
      throw new Error("Link expirado!");
    }

    return link;
  }

  static async registrarClique(linkId: string) {
    return prisma.link.update({
      where: { id: linkId },
      data: { total_cliques: { increment: 1 } },
    });
  }

  static gerarQrcode(codigo: string): Promise<string> {
    const link = `${process.env.BASE_URL}/${codigo}`;
    return qrcode.toDataURL(link);
  }

  static async verificarSenha(
    codigo: string,
    senha: string,
    ip: string,
    userAgent: string,
  ) {
    const link = await prisma.link.findUnique({ where: { codigo } });
    if (!link) throw new Error("Link nao encontrado!");
    if (link.senha !== null) {
      const senhaValida = await bcrypt.compare(senha, link.senha);
      if (!senhaValida) throw new Error("Senha incorreta!");
      return link;
    }

    return link;
  }

  static async buscarEstatisticas() {
    const dispositivos = await prisma.clique.groupBy({
      by: ["dispositivo"],
      _count: { dispositivo: true },
      orderBy: { _count: { dispositivo: "desc" } },
    });

    const totalCliques = await prisma.clique.count();

    return {
      totalCliques,
      dispositivos: dispositivos.map((d: any) => ({
        dispositivo: d.dispositivo,
        total: d._count.dispositivo,
      })),
    };
  }

  static async buscarLinkParaQrcode(codigo: string) {
    const link = await prisma.link.findUnique({ where: { codigo } });
    if (!link) throw new Error("Link nao encontrado!");
    return link;
  }
}

export default LinkModel;
