import REQUESTS, { ApiResponse, PaymentDetails } from "~/api.ts";
import * as AppConfig from "~/App/config.ts";
import * as Helpers from "~/App/utils.ts";
import { KioskFormData } from "~/App/types.ts";
import { useFormContext } from "react-hook-form";

export const usePaymentHandler = () => {
  const { setValue, watch } = useFormContext<KioskFormData>();

  const order = watch("order");
  const totalPrice = Helpers.calculatePrice(order);

  const paymentHandler = async () => {
    console.log("\nProcessing Payment...\n");
    return REQUESTS.SendPayment(
      totalPrice,
      AppConfig.CardDetails,
      (response: ApiResponse<PaymentDetails>) => {
        const { success, data: sendPaymentResponse } = response;

        if (!success || !sendPaymentResponse) return;

        Helpers.paymentPrinter(sendPaymentResponse);
        return REQUESTS.SendOrder(order, sendPaymentResponse, (response) => {
          const { success, data: sendOrderResponse } = response;
          if (!success) return;
          setValue("completedOrder", sendOrderResponse);
          setValue("currentStep", AppConfig.steps.Finish);
          Helpers.orderPrinter(sendOrderResponse);
        });
      }
    );
  };

  return { paymentHandler, totalPrice };
};
