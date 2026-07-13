import { type Request, type Response } from "express";
import LinkService from "../services/link.service.js";

class LinkController {
  static async encurtarLink(req: Request, res: Response) {
    try {
      const { urlOriginal, codigo, expiraEm, senha } = req.body;
      const link = await LinkService.encurtarLink(
        urlOriginal,
        codigo,
        expiraEm,
        senha,
      );
      res.status(201).json(link);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async encontrarLink(req: Request, res: Response) {
    const { codigo } = req.params as { codigo: string };
    try {
      const { temSenha, totalCliques } = await LinkService.encontrarLink(codigo);
        res.status(200).json({temSenha, totalCliques})
    } catch (error) {
      res.status(400).json({error: "O correu um eror interno."})
    }
  }

  static async redirecionarLink(req: Request, res: Response) {
    try {
      const ip = req.ip as string;
      const userAgent = req.headers["user-agent"] as string;
      const { codigo } = req.params as { codigo: string };
      const urlOriginal = await LinkService.redirecionarLink(
        codigo,
        ip,
        userAgent,
      );
      res.redirect(urlOriginal);
    } catch (error) {
      const mensagem = (error as Error).message;
      if (mensagem === "Link protegido por senha!") {
        return res.status(401).json({ error: mensagem, protegido: true });
      }
      if (mensagem === "Link expirado!") {
        return res.status(410).json({ error: mensagem });
      }
      res.status(404).json({ error: mensagem });
    }
  }

  static async gerarQrcode(req: Request, res: Response) {
    try {
      const { codigo } = req.params as { codigo: string };
      const qrcode = await LinkService.gerarQrcode(codigo);
      res.status(200).json({ qrcode });
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }

  static async verificaSenha(req: Request, res: Response) {
    try {
      const ip = req.ip as string;
      const userAgent = req.headers["user-agent"] as string;
      const { codigo, senha } = req.body as { codigo: string; senha: string };

      const urlOriginal = await LinkService.verificarSenha(
        codigo,
        senha,
        ip,
        userAgent,
      );
      res.status(200).json({ urlOriginal });
    } catch (error) {
      const messagem = (error as Error).message;
      if (messagem === "Senha incorreta!") {
        return res.status(403).json({ error: messagem });
      }

      res.status(404).json({ error: messagem });
    }
  }

  static async buscarEstatisticas(req: Request, res: Response) {
    try {
      const estatisticas = await LinkService.buscarEstatisticas();
      res.status(200).json(estatisticas);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}

export default LinkController;
