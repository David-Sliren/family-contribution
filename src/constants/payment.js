import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { ACCESSTOKEN } from "./env";

export const client = new MercadoPagoConfig({ accessToken: ACCESSTOKEN });

export const preference = new Preference(client);

export const payment = new Payment(client);
