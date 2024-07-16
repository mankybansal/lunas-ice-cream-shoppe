import { useCallback, useState } from "react";
import { useFormContext } from "react-hook-form";

import REQUESTS from "~/api";
import * as AppConfig from "~/App/config";
import { KioskFormData } from "~/App/types";
import * as Helpers from "~/App/utils/app";

export const useAppInit = () => {
  const { setValue } = useFormContext<KioskFormData>();
  const [loading, setLoading] = useState(false);

  const appInit = useCallback(async () => {
    setLoading(true);
    Helpers.printAppInit();
    const result = await REQUESTS.GetMenu(({ success, data }) => {
      if (!success) return;
      setValue("menu", data);
      setValue("currentStep", AppConfig.Steps.Start);
      Helpers.printMenu(data);
    });
    setLoading(false);
    return result;
  }, [setValue]);

  return { appInit, loading };
};
