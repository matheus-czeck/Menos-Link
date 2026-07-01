import { type Request, type Response } from "express";
import LinkService from "../services/link.service.ts";

class LinkController {
  static async encurtarLink(req: Request, res: Response) {
    try {
      const { urlOriginal, codigo } = req.body;
      const link = await LinkService.encurtarLink(urlOriginal, codigo);
      res.status(201).json(link);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async redirecionarLink(req: Request, res: Response) {
    try {
      const { codigo } = req.params as { codigo: string };
      const urlOriginal = await LinkService.redirecionarLink(codigo);
      res.redirect(urlOriginal);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  }
}
export default LinkController;


