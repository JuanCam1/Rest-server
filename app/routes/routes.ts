import { Router } from "express";
import folderRouter from "../src/folder/folder-routes";

const router = Router();

router.use("/folder", folderRouter);

export default router;