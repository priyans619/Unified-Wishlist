import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { extractPreview } from "../controllers/previewController";

const router = Router();

router.post("/", validateSchema("previewRequest.schema.json"), extractPreview);

export default router;
