import fs from "fs"
import path from "path"

/**
 * writes your data to a json in the temp dir.
 * @param toWrite
 * @param tempFileName
 */
export function writeTempFile(toWrite: unknown, tempFileName = "temp"): void {
  const tempPath = path.resolve("../../temp")
  if (!fs.existsSync(tempPath)) {
    fs.mkdirSync(tempPath)
  }

  fs.writeFileSync(`${tempPath}/${tempFileName}.json`, JSON.stringify(toWrite, null, "  "))
}
