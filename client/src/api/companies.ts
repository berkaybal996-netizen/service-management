import type { Company } from "../types";

export const CompanyGetir = async  (category_id:number): Promise<Company[]> => {
  const response = await
 fetch(`http://localhost:3080/companies?category_id=${category_id}`)
  return await response.json()
};

export default CompanyGetir;