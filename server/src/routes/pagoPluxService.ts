// src/routes/pagoplux.routes.ts
import { Router } from 'express';
import { generarLinkPago, consultarEstadoTransaccion } from '../controllers/pagoPluxService';

const router = Router();

// Generador de Link de pagos metodo POST
router.post('/integrations/createTransactionWhatsappResource', generarLinkPago);

// Consulta de transaccio metodo GET
router.get("/:idTransaction", async (req, res) => {
  const { idTransaction } = req.params;
  // llamada a la API y manejo de respuesta
  try {
    const resultado = await consultarEstadoTransaccion(idTransaction);
    res.json(resultado);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error consultando el estado de la transacción" });
  }
});


export default router;