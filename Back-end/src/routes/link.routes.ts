import Express from "express";
import LinkController from "../controllers/link.controller.ts";

const router = Express.Router();

router.post("/encurtar", LinkController.encurtarLink);
router.get("/:codigo", LinkController.redirecionarLink);

export default router;

