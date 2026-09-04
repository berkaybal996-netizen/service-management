
interface HizmetFormuProps {
    duzenlenenHizmetId: number | null;

    hizmetadi: string;
    hizmetfiyati: number;
    setHizmetadi: (deger: string) => void;
    setHizmetfiyati: (deger: number) => void;
    hizmetEkle: () => void;
    hizmetGuncelle: () => void;
    duzenlemeyiIptalEt: () => void;
}

  function HizmetFormu({
    hizmetadi,
    hizmetfiyati,
    setHizmetadi,
    setHizmetfiyati,
    duzenlenenHizmetId,
    hizmetEkle,
    hizmetGuncelle,
    duzenlemeyiIptalEt
}: HizmetFormuProps) {
    return (
        <div className="max-w-2xl mx-auto mt-8 p-6 rounded-xl border border-amber-400 bg-gray-900">
            <h2 className="text-xl font-bold mb-5 text-center">
                {duzenlenenHizmetId !== null
                    ? "Hizmeti Güncelle"
                    : "Hizmet Ekleyin"}
            </h2>

            <div className="flex gap-3">
                {/* HİZMET ADI */}

                <input
                    value={hizmetadi}
                    className="flex-1 border border-amber-400 rounded px-3 py-2 outline-none"
                    placeholder="Hizmet adı"
                    onChange={(e) =>
                        setHizmetadi(e.target.value)
                    }
                />

                {/* FİYAT */}

                <input
                    value={hizmetfiyati}
                    type="number"
                    className="w-32 border border-amber-400 rounded px-3 py-2 outline-none"
                    placeholder="Fiyat"
                    onChange={(e) =>
                        setHizmetfiyati(
                            Number(e.target.value)
                        )
                    }
                />

                {/* ANA BUTON */}

                <button
                    className="px-5 py-2 rounded bg-amber-700 hover:bg-amber-500 text-white transition"
                    onClick={() => {
                        if (duzenlenenHizmetId !== null) {
                            hizmetGuncelle();
                        } else {
                            hizmetEkle();
                        }
                    }}
                >
                    {duzenlenenHizmetId !== null
                        ? "Güncelle"
                        : "Ekle"}
                </button>

                {/* İPTAL */}

                {duzenlenenHizmetId !== null && (
                    <button
                        className="px-5 py-2 rounded bg-gray-600 hover:bg-gray-500 text-white"
                        onClick={duzenlemeyiIptalEt}
                    >
                        İptal
                    </button>
                )}
            </div>
        </div>
    )
}

 export default HizmetFormu;