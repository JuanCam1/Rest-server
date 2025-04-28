import { Router } from "express";
import {
  createFolder,
  getFolders,
  getFolderById,
  updateFolder,
  deleteFolder
} from "./folder-controller";
import { createFolderSchema, updateFolderSchema } from "./folder-middleware";
import { validationErrors } from "../../middleware/validation-middleware";
import { idSchema } from "../../middleware/id-middleware";

const folderRouter = Router();

folderRouter.post("/", createFolderSchema, validationErrors, createFolder);
folderRouter.patch("/", updateFolderSchema, validationErrors, updateFolder);
folderRouter.get("/", getFolders);
folderRouter.get("/:id", idSchema, validationErrors, getFolderById);
folderRouter.delete("/:id", idSchema, validationErrors, deleteFolder);


export default folderRouter;