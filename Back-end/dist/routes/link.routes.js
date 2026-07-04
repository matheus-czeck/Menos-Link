import Express from "express";
import LinkController from "../controllers/link.controller.js";
const router = Express.Router();
router.post("/encurtar", LinkController.encurtarLink);
router.post("/acessar", LinkController.verificaSenha);
router.get("/qrcode/:codigo", LinkController.gerarQrcode);
router.get("/estatisticas", LinkController.buscarEstatisticas);
router.get("/:codigo", LinkController.redirecionarLink);
export default router;
