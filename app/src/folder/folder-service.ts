import type { Folder } from "../../../generated/prisma";
import {
  createFolderDao,
  deleteFolderDao,
  getFolderByIdDao,
  getFoldersDao,
  updateFolderDao
} from "./folder-dao";

export const createFolderService = async (folder: Omit<Folder, "id" | "createdAt" | "updatedAt">) => {
  return await createFolderDao(folder);
};

export const updateFolderService = async (id: string, folder: Omit<Folder, "updatedAt">) => {
  return await updateFolderDao(id, folder);
};

export const getFolderService = async () => {
  return await getFoldersDao();
};

export const getFolderByIdService = async (id: string) => {
  return await getFolderByIdDao(id);
};

export const deleteFolderService = async (id: string) => {
  return await deleteFolderDao(id);
};
