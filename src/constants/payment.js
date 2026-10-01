import { MercadoPagoConfig, Preference, Payment } from "mercadopago";
import { ACCESSTOKEN_MP } from "./env";

export const client = new MercadoPagoConfig({ accessToken: ACCESSTOKEN_MP });

export const preference = new Preference(client);

export const payment = new Payment(client);
