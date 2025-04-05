"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtsecretKey = void 0;
exports.jwtsecretKey = process.env.JWT_SECRET_KEY || process.exit(1);
