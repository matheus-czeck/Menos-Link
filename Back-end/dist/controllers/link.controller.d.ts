import { type Request, type Response } from "express";
declare class LinkController {
    static encurtarLink(req: Request, res: Response): Promise<void>;
    static redirecionarLink(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static gerarQrcode(req: Request, res: Response): Promise<void>;
    static verificaSenha(req: Request, res: Response): Promise<Response<any, Record<string, any>> | undefined>;
    static buscarEstatisticas(req: Request, res: Response): Promise<void>;
}
export default LinkController;
//# sourceMappingURL=link.controller.d.ts.map