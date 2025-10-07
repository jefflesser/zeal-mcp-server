import { toolPaths } from "../tools/paths.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Discovers and loads available tools from the tools directory
 * @returns {Array} Array of tool objects
 */
export async function discoverTools() {
  const tools = await Promise.all(
    toolPaths.map(async (file) => {
      try {
        // Use absolute path for imports in serverless
        const toolPath = path.resolve(__dirname, `../tools/${file}`);
        const module = await import(`../tools/${file}`);
        const { apiTool } = module;
        return { ...apiTool, path: file };
      } catch (error) {
        console.error(`Failed to load tool ${file}:`, error);
        return null;
      }
    })
  );

  // Filter out failed imports
  const validTools = tools.filter(Boolean);

  // deduplicate tool names
  const nameCounts = {};

  return validTools.map((tool) => {
    const name = tool.definition?.function?.name;
    if (!name) return tool;

    nameCounts[name] = (nameCounts[name] || 0) + 1;

    if (nameCounts[name] > 1) {
      tool.definition.function.name = `${name}_${nameCounts[name]}`;
    }

    return tool;
  });
}
