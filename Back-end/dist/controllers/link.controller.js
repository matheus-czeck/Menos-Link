import {} from "express";
import LinkService from "../services/link.service.js";
class LinkController {
    static async encurtarLink(req, res) {
        try {
            const { urlOriginal, codigo, expiraEm, senha } = req.body;
            const link = await LinkService.encurtarLink(urlOriginal, codigo, expiraEm, senha);
            res.status(201).json(link);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
    static async redirecionarLink(req, res) {
        try {
            const ip = req.ip;
            const userAgent = req.headers["user-agent"];
            const { codigo } = req.params;
            const urlOriginal = await LinkService.redirecionarLink(codigo, ip, userAgent);
            res.redirect(urlOriginal);
        }
        catch (error) {
            const mensagem = error.message;
            if (mensagem === "Link protegido por senha!") {
                return res.status(401).json({ error: mensagem, protegido: true });
            }
            if (mensagem === "Link expirado!") {
                return res.status(410).json({ error: mensagem });
            }
            res.status(404).json({ error: mensagem });
        }
    }
    static async gerarQrcode(req, res) {
        try {
            const { codigo } = req.params;
            const qrcode = await LinkService.gerarQrcode(codigo);
            res.status(200).json({ qrcode });
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
    static async verificaSenha(req, res) {
        try {
            const ip = req.ip;
            const userAgent = req.headers["user-agent"];
            const { codigo, senha } = req.body;
            const urlOriginal = await LinkService.verificarSenha(codigo, senha, ip, userAgent);
            res.status(200).json({ urlOriginal });
        }
        catch (error) {
            const messagem = error.message;
            if (messagem === "Senha incorreta!") {
                return res.status(403).json({ error: messagem });
            }
            res.status(404).json({ error: messagem });
        }
    }
    static async buscarEstatisticas(req, res) {
        try {
            const estatisticas = await LinkService.buscarEstatisticas();
            res.status(200).json(estatisticas);
        }
        catch (error) {
            res.status(404).json({ error: error.message });
        }
    }
}
export default LinkController;
//# sourceMappingURL=link.controller.js.map