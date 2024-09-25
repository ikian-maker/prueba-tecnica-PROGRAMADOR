import { Request, Response} from 'express';
// src/controllers/pagoPluxService.ts
import axios from 'axios';

export const generarLinkPago = async (req: Request, res: Response) => {
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
        const response = await axios.post(url, data, {
            auth: auth,
            headers: {
                'Content-Type': 'application/json',
            },
        });

        // Respuesta exitosa de la API
        res.json(response.data); // Envía la respuesta de PagoPlux al cliente

    } catch (error) {
        res.status(400).json({
            msg: 'Error',
            error
        })
    }
};

const usuario = "o3NXHGmfujN3Tyzp1cyCDu3xst"; 
const clave = "TkBhZQP3zwMyx3JwC5HeFqzXM4p0jzsXp0hTbWRnI4riUtJT";

// Codificar usuario:clave en Base64
const authHeader = Buffer.from(`${usuario}:${clave}`).toString("base64");



// Función para consultar el estado de la transacción
export const consultarEstadoTransaccion = async (idTransaction: string) => {
  try {
    const response = await axios.get(
      `https://apipre.pagoplux.com/intv1/integrations/getTransactionByIdStateResource?idTransaction=${idTransaction}`,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Basic ${authHeader}`, // Agregar el encabezado de autenticación
        },
      }
    );

    // Manejo de la respuesta
    return response.data;
  } catch (error) {
    console.error("Error consultando el estado de la transacción:", error);
    throw new Error("Error consultando el estado de la transacción");
  }
};


