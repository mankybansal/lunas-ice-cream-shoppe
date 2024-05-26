import { useFormContext } from "react-hook-form";
import { useCallback } from "react";
import * as Helpers from "~/App/utils.ts";
import REQUESTS from "~/api.ts";
import * as AppConfig from "~/App/config.ts";
import { KioskFormData } from "~/App/types.ts";

export const useAppInit = () => {
  const { setValue } = useFormContext<KioskFormData>();

  const appInit = useCallback(() => {
    Helpers.appInitPrinter();
    return REQUESTS.GetMenu(({ success, data }) => {
      if (!success) return;
      setValue("menu", data);
      setValue("currentStep", AppConfig.Steps.Start);
      Helpers.menuPrinter(data);
    });
  }, [setValue]);

  return { appInit };
};
