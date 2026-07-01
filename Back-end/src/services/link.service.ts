import LinkModel from "../models/link.models.ts";
import CliqueModel from "../models/clique.model.ts";

class LinkService {
  static async encurtarLink(urlOriginal: string, codigo?: string) {
    return LinkModel.criarLinkUnico(urlOriginal, codigo);
  }

  static async redirecionarLink(codigo: string){
    const link = await LinkModel.buscarLink(codigo);
    if (!link) throw new Error('Link nao encontrado!');

    await LinkModel.registrarClique(link.id);
    await CliqueModel.registrarClique(link.id);

    return link.url_original
}
}

export default LinkService;

