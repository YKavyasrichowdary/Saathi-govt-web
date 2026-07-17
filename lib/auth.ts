import { getServerSession } from "next-auth";
import { authOptions } from "./authOptions";

export const getSession = async () => {
  return await getServerSession(authOptions)
};
export { authOptions };

