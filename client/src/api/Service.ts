import type { Service } from "../types";

 
export const ServiceGetir = async (category_id:number): Promise<Service[]> => {


    const response = await 
    fetch(`http://localhost:3080/services?category_id=${category_id}`)
    return await response.json()


}
export default ServiceGetir