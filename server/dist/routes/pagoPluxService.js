"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/routes/pagoplux.routes.ts
const express_1 = require("express");
const pagoPluxService_1 = require("../controllers/pagoPluxService");
const router = (0, express_1.Router)();
router.post('/integrations/createTransactionWhatsappResource', pagoPluxService_1.generarLinkPago);
exports.default = router;
