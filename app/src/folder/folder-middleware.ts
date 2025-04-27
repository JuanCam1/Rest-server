import { check } from "express-validator";

export const builderStateSchema = [
  check("state").exists().isIn(["Active", "Inactive", "All"])
]

export const createFolderSchema = [
  check("name").exists(),
  check("isOpen").exists().isBoolean(),
]

export const updateFolderSchema = [
  check("id").exists(),
  check("name").exists(),
  check("isOpen").exists().isBoolean(),
  check("createdAt").exists(),
]

export const createMultipleBuilderSchema = [
  check("init").exists(),
  check("limit").exists().isFloat({
    min: 0,
    max: 100
  })
]
