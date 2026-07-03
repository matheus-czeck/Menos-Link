import LinkModel from "../models/link.models.ts";
import CliqueModel from "../models/clique.model.ts";

class LinkService {
  static async encurtarLink(
    urlOriginal: string,
    codigo?: string,
    expiraEm?: number,
    senha?: string,
  ) {
    return LinkModel.criarLinkUnico(urlOriginal, codigo, expiraEm, senha);
  }

  static async redirecionarLink(codigo: string, ip: string, userAgent: string) {
    const link = await LinkModel.buscarLink(codigo);
    if (!link) throw new Error("Link nao encontrado!");

    await LinkModel.registrarClique(link.id);
    await CliqueModel.registrarClique(link.id, ip, userAgent);

    return link.url_original;
  }

  static async verificarSenha(codigo: string, senha: string, ip: string, userAgent: string) {
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
