
import type { Hizmet } from "../types";

interface HizmetSatiriProps {
      hizmet: Hizmet;

    hizmetDuzenle: (id: number) => void;
    hizmetSil: (id: number) => void;

}
function HizmetSatiri({
    hizmet,
    hizmetDuzenle,
    hizmetSil
}: HizmetSatiriProps) {
    return (
        <li
             
            className="flex items-center justify-between p-4 rounded-lg border border-amber-400 bg-gray-900"
        >
            <div>
                <h3 className="text-lg font-semibold">
                    {hizmet.ad}
                </h3>

                <span className="text-gray-400">
                    {hizmet.fiyat} TL
                </span>
            </div>

            <div className="flex gap-2">
                <button
                    className="px-3 py-1 rounded bg-blue-700 hover:bg-blue-500 text-white"
                    onClick={() => hizmetDuzenle(hizmet.id)}
                >
                    Düzenle
                </button>

                <button
                    className="px-3 py-1 rounded bg-red-700 hover:bg-red-500 text-white"
                    onClick={() => hizmetSil(hizmet.id)}
                >
                    Sil
                </button>
            </div>

        </li>)
}

export default HizmetSatiri;