// server/middleware/validateSchema.ts
console.log("__dirname is:", __dirname);

import { Request, Response, NextFunction } from "express";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import path from "path";
import fs from "fs";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function validateSchema(schemaFileName: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      // go up from server → root → schemas
      const schemaPath = path.resolve(__dirname, "../../../schemas", schemaFileName);

      if (!fs.existsSync(schemaPath)) {
        return res.status(500).json({
          error: `Schema file not found: ${schemaPath}`,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({ error: "Schema validation failed" });
    }
  };
}
