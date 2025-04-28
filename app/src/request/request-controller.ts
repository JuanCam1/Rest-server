import type { Request, Response } from "express";
import { StatusCodes } from 'http-status-codes';
import type { Folder } from "../../../generated/prisma";

import {
  createFolderService,
  getFolderService,
  getFolderByIdService,
  updateFolderService,
  deleteFolderService
} from "./request-service";
import { sendResponse } from "../../util/sendResponse";
import { matchedData } from "express-validator";
import { validateErrorCatch } from "../../util/validateError";

export const createFolder = async (req: Request, res: Response) => {
  try {
    const folderReq = matchedData<Omit<Folder, "id" | "createdAt" | "updatedAt">>(req);
    const folder = await createFolderService(folderReq);
    sendResponse(res, "success", StatusCodes.OK, "created folder", folder);
  } catch (error) {
    validateErrorCatch(res, error);
  }
}

interface FolderTypeI {
  id: string;
  folder: Omit<Folder, "updatedAt">
}

export const updateFolder = async (req: Request, res: Response) => {
  try {
    const { id, folder } = matchedData<FolderTypeI>(req);
    const builders = await updateFolderService(id, folder);
    sendResponse(res, "success", StatusCodes.OK, "updated folder", builders);
  } catch (error) {
    validateErrorCatch(res, error);
  }
}

export const getFolders = async (_req: Request, res: Response) => {
  try {
    const folders = await getFolderService();
    sendResponse(res, "success", StatusCodes.OK, "getAllFolders", folders);
  } catch (error) {
    validateErrorCatch(res, error);
  }
};

export const getFolderById = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData<{ id: string }>(req);
    const builders = await getFolderByIdService(id);
    sendResponse(res, "success", StatusCodes.OK, "getFolderById", builders);
  } catch (error) {
    validateErrorCatch(res, error);
  }
}

export const deleteFolder = async (req: Request, res: Response) => {
  try {
    const { id } = matchedData<{ id: string }>(req);
    const builders = await deleteFolderService(id);
    sendResponse(res, "success", StatusCodes.OK, "deleted folder", builders);
  } catch (error) {
    validateErrorCatch(res, error);
  }
}

