import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-boton-de-pagos',
  standalone: true,
  imports: [NavbarComponent, RouterModule],
  templateUrl: './boton-de-pagos.component.html',
  styleUrl: './boton-de-pagos.component.css',
})
export class BotonDePagosComponent implements OnInit {
  isFirstLoad: boolean = true;

  constructor() {}

  ngOnInit(): void {
    this.initializePaybox();
    this.setOnAuthorize();
    const isReloaded = sessionStorage.getItem('isReloaded');
    if (!isReloaded) {
      // Marcar la página como recargada
      sessionStorage.setItem('isReloaded', 'true');
      // Recargar la página
      window.location.reload();
    } else {
      // Eliminar la marca de recarga para permitir futuras recargas
      sessionStorage.removeItem('isReloaded');
    }
  }

  initializePaybox(): void {
    const data = {
      /* Requerido. Email del establecimiento o Id/Class del elemento html
      que posee el valor*/
      PayboxRemail: 'da.nielrolesppx@gmail.com',
      /* Opcional. Email del usuario que realiza el pago o Id/Class del
      elemento html que posee el valor */
      PayboxSendmail: 'jj@gmail.com',
      /* Rquerido. Nombre del usuario/cuenta PagoPlux o Id/Class del
      elemento html que posee el valor */
      PayboxRename: 'Ikian Diaz',
      /* Opcional. nombre de persona que realiza el pago o Id/Class del
      elemento html */
      PayboxSendname: 'John Jairo',
      /* Requerido. Valor Base 0. Valor que no incluye impuesto */
      PayboxBase0: '2.0',
      /* Requerido. Valor Base 12. Valor que si incluye impuesto */
      PayboxBase12: '10.0',
      /* Requerido. Descripcion del pago o Id/Class del elemento html que
      posee el valor */
      PayboxDescription: 'Descripcion del pago',
      /* Opcional. Lenguaje del Paybox
       * Español: es | (string) (Paybox en español)
       * Ingles: us | (string) (Paybox en Ingles)
       */
      PayboxLanguage: 'es',
      /*
       * Requerido. direccion del pago
       */
      PayboxDirection: 'Quito',
      /*
       * Requerido. Teléfono del cliente.
       */
      PayBoxClientPhone: '0961794362',
      /**
       * True -> produccion
       * False -> test
       */
      PayboxProduction: false,
      // ===============================LOS SIGUIENTES PARAMETROS SOLO SE USA EN PAGOS RECURRENTES============================================/*
      /* True -> en caso de realizar un pago recurrente almacena datos
      tarjeta
      * False -> si es pago normal
      */
      PayboxRecurrent: true,
      /**
      * Id o nombre del plan registrado en el comercio en la plataforma de
      pagoplux (el nombre debe ser exacto)
      */
      PayboxIdPlan: '171',
      /**
      * true -> los cobros se realizan de manera automatica segun la
      frecuencia del plan asignado en PAGOPLUX
      * false -> los cobros se realizan mediante solicitud
      */
      PayboxPermitirCalendarizar: true,
      /**
      * true -> El débito se realiza en el momento del pago
      * false -> El débito se realizará en la fecha de corte según el plan
      contratado
      */
      PayboxPagoInmediato: true,
      /**
      * true -> si desea realizar un pago de prueba de 1$ y reverso del
      mismo de manera automática
      * nota: PayboxPagoImediato debe ser igual false
      * false -> no se realizara ningún cobro de prueba
      */
      PayboxCobroPrueba: false,
      /*
       * Valor de identificación de tarjetahabiente
       */
      PayBoxClientIdentification: '1720448479',
      /**
      * Entorno de ejecución del botón de pagos valores: prod (ambiente
      de producción), sandbox (ambiente de pruebas)
      */

      //<----ESTAS VARIABLES SE USAN PARA PAGOS RECURRENTES CON MONTO VARIABLES ---->
      PayboxAmountVariablePlan: true,
      /**
      * Frecuencia del plan
      "SEM" SEMANAL
      "MEN" MENSUAL
      "BME" BIMESTRAL
      "TME" TRIMESTRAL
      "SME" SEMESTRAL
      "ANU" ANUAL
      */
      PayboxFrequencyPlan: 'MEN',
      /**
       * true ->tiene iva
       * false ->no tiene iva
       */
      PayboxTieneIvaPlan: true,
      /**
       * La descripción del plan, no debe superar los 200 caracteres.
       */
      PayboxDescriptionPlan: 'Descripcion plan',
      /**
      /* Requerido (string)
      * Entorno de ejecución del registro y listado de tarjetas: prod, sandbox
      */
      PayboxEnvironment: 'sandbox',
      /**
      * Se usa en TRUE cuando se necesita enlazar el paybox a un botón ya
      existente en el sitio del cliente, caso contrario FALSE o NULL
      * */
      PayboxPagoPlux: false,
      /**
       * Identificador del botón o elemento en el comercio del cliente
       * */
      PayboxIdElement: 'idElementoTest',
    };

    (window as any).data = data;
  }

  setOnAuthorize(): void {
    (window as any).onAuthorize = (response: any) => {
      if (response.status === 'succeeded') {
        console.log('Pago exitoso', response);

        // Aquí puedes procesar y utilizar los detalles de la respuesta del pago
        const detalle = {
          amount: response.amount,
          deferred: response.deferred,
          interest: response.interest,
          interestValue: response.interestValue,
          amountNoTaxes: response.amountNoTaxes,
          cardInfo: response.cardInfo,
          cardIssuer: response.cardIssuer,
          cardType: response.cardType,
          clientID: response.clientID,
          clientName: response.clientName,
          fecha: response.fecha,
          id_transaccion: response.id_transaccion,
          state: response.state,
          token: response.token,
          tipoPago: response.tipoPago,
        };

        // Imprime los detalles del pago en la consola
        console.log('Detalles de facturacion:', detalle);
      } else {
        console.log('Error en el pago', response);
      };
    };
  };
};