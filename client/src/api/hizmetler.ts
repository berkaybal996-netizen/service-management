import type { Hizmet } from "../types";

const hizmetleriGetir = async (): Promise<Hizmet[]> => {
  const response = await fetch("http://localhost:3080/hizmetler/")
  return await response.json()
};

export default hizmetleriGetir;