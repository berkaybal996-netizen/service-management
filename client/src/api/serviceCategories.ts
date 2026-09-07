import type { ServiceCategory } from "../types";


 
    const KategorileriGetir = async (): Promise<ServiceCategory[]> => {
        const response = await fetch("http://localhost:3080/service-categories")
        return await response.json()
    };


export default KategorileriGetir