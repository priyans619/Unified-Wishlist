
import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { extractPreview } from "../controllers/previewController";

const router = Router();

// POST /preview- validates request body with previewRequest.schema.json 
// and delegates extraction to controller
router.post("/", validateSchema("previewRequest.schema.json"), extractPreview);

export default router;
