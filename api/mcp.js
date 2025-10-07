import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const server = new Server({
      name: "Zeal",
      version: "1.0.0"
    }, {
      capabilities: {
        tools: {}
      }
    });

    // Register your tools here
    // server.setRequestHandler(...)

    const transport = new SSEServerTransport("/api/mcp", res);
    await server.connect(transport);
    
    await transport.handlePostMessage(req.body, res);
  } else if (req.method === 'GET') {
    // Handle SSE connection
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    
    // Keep connection alive
  }
}
