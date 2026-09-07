import { useEffect, useState } from "react";
import type { ServiceCategory } from "../types";
import KategorileriGetir from "../api/serviceCategories";
import type { Service, Company } from "../types";
import ServiceGetir from "../api/Service";
import CompanyGetir from "../api/companies";




const Kategoriler = () => {
    const [kategoriler, setKategoriler] = useState<ServiceCategory[]>([]);
    const [kategoriID, setKategoriID] = useState(0)
    const [services, setServices] = useState<Service[]>([])
    const [companies, setCompanies] = useState<Companies[]>([])


    useEffect(() => {

        async function kategorilers() {
            try {
                const kategoriverisi = await KategorileriGetir();
                setKategoriler(kategoriverisi)
            } catch (error) {
                console.error("Kategoriler getirilemedi:", error);
            }

        } kategorilers()
    }, [])


    const KategoriSec = (id: number) => {
        setKategoriID(id)

    }
    useEffect(() => {
        if (kategoriID === 0) {
            return;
        }
        const getir = async () => {

            const companyGetir = await CompanyGetir(kategoriID)
            setCompanies(companyGetir);
        }
        getir()
    }, [kategoriID])

    return (
        <div>
            <ul className="grid grid-cols-2 gap-4 max-w-3xl mx-auto p-4">
                {kategoriler.map((kategori) => {
                    return (
                        <li onClick={() => KategoriSec(kategori.id)} key={kategori.id}>
                            {kategori.name}
                        </li>)
                })}
            </ul>
            <ul className="grid grid-cols-2 gap-4 max-w-3xl mx-auto p-4">
                {services.map((service) => {
                    return (
                        <li key={service.id}>
                            {service.name} - {service.company_name} - {service.price} TL
                        </li>
                    )
                })}
            </ul>
            {companies.map((company) => {
                return (
                    <div key={company.id}>
                        {company.company_name}
                    </div>
                )
            })}

        </div>
    )
}

export default Kategoriler