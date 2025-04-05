"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const node_server_1 = require("@hono/node-server");
const routes_1 = require("./routes/routes");
(0, node_server_1.serve)(routes_1.allRoutes);
console.log("server is running at http://localhost:3000/");
