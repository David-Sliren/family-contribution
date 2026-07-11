import { BASE_URL } from "@/constants/env.js";
import { preference } from "@/constants/payment.js";

export class PaymentCheckout {
  static async createContribution(userId, purpose, amount) {
    try {
      const payment = await preference.create({
        body: {
          items: [
            {
              id: "colaboracion-familiar",
              title: `Proposito de contribucion ${purpose?.toUpperCase() || "MEDICINA"} -  Estas Contribuyendo para la recuperacion de Aleida Martinez`,
              description: `Contribucion para la recuperacion de Aleida Martinez`,
              quantity: 1,
              unit_price: amount,
              currency_id: "COP",
            },
          ],
          payment_methods: {
            installments: 1,
            excluded_payment_methods: [{ id: "efecty" }],
            excluded_payment_types: [{ id: "bank_transfer" }],
          },
          external_reference: JSON.stringify({
            userId,
            purpose,
            amount,
          }),
          notification_url: `${BASE_URL}/api/payment/webhook`,
          back_urls: {
            failure: `${BASE_URL}/?estado=failure`,
            pending: `${BASE_URL}/?estado=pending`,
            success: `${BASE_URL}/?estado=success`,
          },
          auto_return: "approved",
          statement_descriptor: "Colaboracion a Aleida",
        },
      });

      return payment;
    } catch (error) {
      throw error;
    }
  }
}
