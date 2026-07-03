import LinkModel from "../models/link.models.js";
import CliqueModel from "../models/clique.model.js";
class LinkService {
    static async encurtarLink(urlOriginal, codigo, expiraEm, senha) {
        return LinkModel.criarLinkUnico(urlOriginal, codigo, expiraEm, senha);
    }
    static async redirecionarLink(codigo, ip, userAgent) {
        const link = await LinkModel.buscarLink(codigo);
        if (!link)
            throw new Error("Link nao encontrado!");
        await LinkModel.registrarClique(link.id);
        await CliqueModel.registrarClique(link.id, ip, userAgent);
        return link.url_original;
    }
    static async verificarSenha(codigo, senha, ip, userAgent) {
        return LinkModel.verificarSenha(codigo, senha, ip, userAgent);
    }
    static async gerarQrcode(codigo) {
        const link = await LinkModel.buscarLinkParaQrcode(codigo);
        if (!link)
            throw new Error("Link nao encontrado!");
        return LinkModel.gerarQrcode(codigo);
    }
    static async buscarEstatisticas() {
        return LinkModel.buscarEstatisticas();
    }
}
export default LinkService;
//# sourceMappingURL=link.service.js.map