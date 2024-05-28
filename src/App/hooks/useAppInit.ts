import { useFormContext } from "react-hook-form";
import { useCallback } from "react";
import * as Helpers from "~/App/utils";
import REQUESTS from "~/api";
import * as AppConfig from "~/App/config";
import { KioskFormData } from "~/App/types";

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
