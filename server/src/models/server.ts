import express, {Application} from 'express';
import cors from 'cors';
import routesUser from '../routes/user';
import routesPagoPlux from '../routes/pagoPluxService';
import db from '../db/connection';



class Server {
    private app: Application;
    private port: string;

    constructor() {
        this.app = express();
        this.port = process.env.PORT || '3001';  
        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();              
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Aplicacion corriendo en el puerto ' + this.port);
        })
    }

    routes() {
        // lamado a la API para login y registro del formulario
        this.app.use('/api/users', routesUser);
        // llamdo a la API para generacion de link de pago
        this.app.use('/integrations/createTransactionWhatsappResource', routesPagoPlux);
        // llamando a la API para consultar por medio del link de pago  
        this.app.use("/consultar-estado", routesPagoPlux);
    }

    middlewares() {
        // cors
        this.app.use(cors());

        // Parseo body
        this.app.use(express.json());
    }

    async dbConnect() {
        try {
            await db.authenticate();
            console.log('Base de datos conectada')
        } catch (error) {
            console.log(error);
            console.log('Error al conectarse a la base de datos')
        }
        
    }

}

export default Server;