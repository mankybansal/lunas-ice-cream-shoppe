import { v4 } from "uuid";

export const generateClientId = () => `client-${v4()}`;
