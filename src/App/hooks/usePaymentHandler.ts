import REQUESTS, { ApiResponse, PaymentDetails } from "~/api";
import * as AppConfig from "~/App/config";
import * as Helpers from "~/App/utils/app.ts";
import { KioskFormData } from "~/App/types";
import { useFormContext } from "react-hook-form";

export const usePaymentHandler = () => {
  const { setValue, watch } = useFormContext<KioskFormData>();

  const order = watch("order");
  const totalPrice = Helpers.calculateOrderPrice(order);
  const totalTax = totalPrice * AppConfig.SalesTaxRate;

  const totalAmount = totalPrice + totalTax;

  const paymentHandler = async () => {
    console.log("\nProcessing Payment...\n");
    return REQUESTS.SendPayment(
      totalAmount,
      AppConfig.CardDetails,
      (response: ApiResponse<PaymentDetails>) => {
        const { success, data: sendPaymentResponse } = response;

        if (!success || !sendPaymentResponse) return;

        Helpers.printPayment(sendPaymentResponse);
        return REQUESTS.SendOrder(order, sendPaymentResponse, (response) => {
          const { success, data: sendOrderResponse } = response;
          if (!success) return;
          setValue("completedOrder", sendOrderResponse);
          setValue("currentStep", AppConfig.Steps.Finish);
          Helpers.printOrder(sendOrderResponse);
        });
      }
    );
  };

  return { paymentHandler, totalTax, totalPrice, totalAmount };
};
