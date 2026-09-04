
import type { Hizmet } from "../types";
import HizmetSatiri from "./HizmetSatiri";


interface HizmetListesiProps {
    hizmetler: Hizmet[];

    hizmetDuzenle: (id: number) => void;
    hizmetSil: (id: number) => void;

}


function HizmetListesi({
    hizmetler,
    hizmetDuzenle,
    hizmetSil
}: HizmetListesiProps) {
    return (<ul className="grid grid-cols-2 gap-4 max-w-3xl mx-auto p-4">
        {hizmetler.map((hizmet) => {
            return (
                <HizmetSatiri
                    key={hizmet.id}
                    hizmet={hizmet}
                    hizmetDuzenle={hizmetDuzenle}
                    hizmetSil={hizmetSil} />
            );
        })}
    </ul>)
}

export default HizmetListesi;