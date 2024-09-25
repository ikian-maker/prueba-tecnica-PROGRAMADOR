"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generarLinkPago = void 0;
// src/controllers/pagoPluxService.ts
const axios_1 = __importDefault(require("axios"));
const generarLinkPago = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Cambiamos el URL al sandbox
    const url = 'https://apipre.pagoplux.com/intv1/integrations/createTransactionWhatsappResource';
    // Las credenciales de autenticación para el sandbox
    const auth = {
        username: 'o3NXHGmfujN3Tyzp1cyCDu3xst', // tu ID Cliente
        password: 'TkBhZQP3zwMyx3JwC5HeFqzXM4p0jzsXp0hTbWRnI4riUtJT', // tu Clave Secreta
    };
    // Aquí tomamos los datos enviados en la petición POST
    const data = req.body;
    try {
        // Llamada a la API de PagoPlux utilizando axios
        const response = yield axios_1.default.post(url, data, {
            auth: auth,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        // Respuesta exitosa de la API
        res.json(response.data); // Envía la respuesta de PagoPlux al cliente
    }
    catch (error) {
        res.status(400).json({
            msg: 'Error',
            error
        });
    }
});
exports.generarLinkPago = generarLinkPago;
