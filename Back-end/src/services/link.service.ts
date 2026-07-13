import LinkModel from "../models/link.models.js";
import CliqueModel from "../models/clique.model.js";

class LinkService {
  static async encurtarLink(
    urlOriginal: string,
    codigo?: string,
    expiraEm?: number,
    senha?: string,
  ) {
    return LinkModel.criarLinkUnico(urlOriginal, codigo, expiraEm, senha);
  }

  static async encontrarLink(codigo: string) {
    let temSenha: boolean = false;
    const link = await LinkModel.buscarLink(codigo);
    if (!link) {
      throw new Error("URL não encontrada!");
    }
    const totalCliques: number = link.total_cliques;
    if (link.senha !== null) {
      temSenha = true;
    }

    return { totalCliques, temSenha };
  }

  static async redirecionarLink(codigo: string, ip: string, userAgent: string) {
    const link = await LinkModel.buscarLink(codigo);
    if (!link) throw new Error("Link nao encontrado!");

    await LinkModel.registrarClique(link.id);
    await CliqueModel.registrarClique(link.id, ip, userAgent);

    return link.url_original;
  }

  static async verificarSenha(
    codigo: string,
    senha: string,
    ip: string,
    userAgent: string,
  ) {
    return LinkModel.verificarSenha(codigo, senha, ip, userAgent);
  }

  static async gerarQrcode(codigo: string) {
    const link = await LinkModel.buscarLinkParaQrcode(codigo);
    if (!link) throw new Error("Link nao encontrado!");
    return LinkModel.gerarQrcode(codigo);
  }

  static async buscarEstatisticas() {
    return LinkModel.buscarEstatisticas();
  }
}

export default LinkService;
