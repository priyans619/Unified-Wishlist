import Ajv from "ajv";
import addFormats from "ajv-formats";
import fs from "fs";
import path from "path";

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

/**
 * Validate a JS object against a JSON schema.
 * Throws an error if validation fails.
 */
export function validateResponseSchema(schemaFileName: string, data: any) {
  const schemaPath = path.resolve(__dirname, "../../../schemas", schemaFileName);

  if (!fs.existsSync(schemaPath)) {
    throw new Error(`Response schema file not found: ${schemaPath}`);
  }

  const schema = JSON.parse(fs.readFileSync(schemaPath, "utf-8"));
  const validate = ajv.compile(schema);

  const valid = validate(data);
  if (!valid) {
    console.error("Response validation errors:", validate.errors);
    throw new Error("Response validation failed");
  }

  return true;
}
