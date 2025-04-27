import type { Folder } from "../../../generated/prisma";
import { NotFoundError } from "../../error/not-found-error";
import { currentDate, currentDateAndHour } from "../../lib/current-date-hour";
import { prisma } from "../../lib/prisma";

export const createFolderDao = async (folder: Omit<Folder, "id" | "createdAt" | "updatedAt">): Promise<Folder> => {

  const nowDate = currentDate();
  const { fecha } = currentDateAndHour(nowDate);

  const dataFolder: Omit<Folder, "id"> = {
    ...folder,
    createdAt: fecha,
    updatedAt: fecha,
  }

  const newFolder = await prisma.folder.create({
    data: dataFolder,
  });

  return newFolder;
};

export const updateFolderDao = async (id: string, folder: Omit<Folder, "updatedAt">): Promise<Folder> => {
  const nowDate = currentDate();
  const { fecha } = currentDateAndHour(nowDate);

  const folderDb = await prisma.folder.findUnique({
    where: {
      id,
    },
  })

  if (!folderDb) throw new NotFoundError("Folder not found");

  const dataFolder: Omit<Folder, "id"> = {
    ...folder,
    updatedAt: fecha,
  }

  const folderUpdated = await prisma.folder.update({
    where: {
      id,
    },
    data: dataFolder,
  });

  return folderUpdated;
};

export const getFoldersDao = async (): Promise<FolderTypeI[]> => {
  const folders = await prisma.folder.findMany({
    select: {
      id: true,
      name: true,
      isOpen: true,
      requests: {
        select: {
          id: true,
          name: true,
          url: true,
          method: true,
        }
      }
    }
  })

  return folders;
};

export const getFolderByIdDao = async (id: string): Promise<FolderTypeI> => {
  const folder = await prisma.folder.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      isOpen: true,
      requests: {
        select: {
          id: true,
          name: true,
          url: true,
          method: true,
        }
      }
    }
  });

  if (!folder) throw new NotFoundError("Folder not found");

  return folder;
};

export const deleteFolderDao = async (id: string): Promise<Folder> => {

  const request = await prisma.request.count({
    where: {
      folderId: id,
    },
  });

  if (request > 0) throw new Error("The folder has requests, can't be deleted");

  const folder = await prisma.folder.delete({
    where: {
      id,
    },
  });

  return folder;
};

