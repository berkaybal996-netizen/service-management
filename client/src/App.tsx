import { useEffect, useState } from "react";
import HizmetSatiri from "./components/HizmetSatiri";
import type { Hizmet } from "./types";
 


function App() {
  const [hizmetler, setHizmetler] = useState<Hizmet[]>([]);

  const [hizmetadi, setHizmetadi] = useState("");
  const [hizmetfiyati, setHizmetfiyati] = useState(0);

  const [duzenlenenHizmetId, setDuzenlenenHizmetId] =
    useState<number | null>(null);

  // HİZMETLERİ GETİR
  useEffect(() => {
    async function hizmets() {
      try {
        const response = await fetch(
          "http://localhost:3080/hizmetler"
        );

        const hizmetverisi = await response.json();

        setHizmetler(hizmetverisi);
      } catch (error) {
        console.error("Hizmetler getirilemedi:", error);
      }
    }

    hizmets();
  }, []);

  // HİZMET EKLE
  const hizmetEkle = async () => {
    if (hizmetadi.trim() === "" || hizmetfiyati < 0) {
      alert("kutu içerikleri:  sayı eksi girilemez. Ad boş bırakılamaz ")
      return;
    }
    try {

      const response = await fetch(
        "http://localhost:3080/hizmetler",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ad: hizmetadi,
            fiyat: hizmetfiyati,
          }),
        }
      );

      if (!response.ok) {
        console.log("Hizmet eklenemedi");
        return;
      }

      const yeniHizmet = await response.json();

      setHizmetler([...hizmetler, yeniHizmet]);

      setHizmetadi("");
      setHizmetfiyati(0);

      console.log("Hizmet başarıyla eklendi");
    } catch (error) {
      console.error("Ekleme başarısız:", error);
    }
  };

  // HİZMET SİL
  const hizmetSil = async (id: number) => {
    try {
      const response = await fetch(
        `http://localhost:3080/hizmetler/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        console.log("Hizmet silinemedi");
        return;
      }

      const yeniListe = hizmetler.filter(
        (hizmet) => hizmet.id !== id
      );

      setHizmetler(yeniListe);
    } catch (error) {
      console.error("Silme başarısız:", error);
    }
  };

  // DÜZENLE BUTONUNA BASILINCA
  const hizmetDuzenle = (id: number) => {
    const duzenlenen = hizmetler.find(
      (hizmet) => hizmet.id === id
    );

    if (!duzenlenen) {
      console.log("Hizmet bulunamadı");
      return;
    }

    setDuzenlenenHizmetId(id);

    setHizmetadi(duzenlenen.ad);

    setHizmetfiyati(duzenlenen.fiyat);
  };

  // HİZMET GÜNCELLE
  const hizmetGuncelle = async () => {
    if (duzenlenenHizmetId === null) {
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:3080/hizmetler/${duzenlenenHizmetId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            fiyat: hizmetfiyati,
          }),
        }
      );

      if (!response.ok) {
        console.log("Güncelleme başarısız");
        return;
      }

      const guncellenenHizmet = await response.json();

      const yeniListe = hizmetler.map((hizmet) => {
        if (hizmet.id === duzenlenenHizmetId) {
          return guncellenenHizmet;
        }

        return hizmet;
      });

      setHizmetler(yeniListe);

      // DÜZENLEME MODUNDAN ÇIK
      setDuzenlenenHizmetId(null);

      // FORMU TEMİZLE
      setHizmetadi("");
      setHizmetfiyati(0);

      console.log("Hizmet güncellendi");
    } catch (error) {
      console.error("Güncelleme başarısız:", error);
    }
  };

  // DÜZENLEMEYİ İPTAL ET
  const duzenlemeyiIptalEt = () => {
    setDuzenlenenHizmetId(null);

    setHizmetadi("");

    setHizmetfiyati(0);
  };

  return (
    <div>
      {/* HİZMET LİSTESİ */}

      <ul className="grid grid-cols-2 gap-4 max-w-3xl mx-auto p-4">
        {hizmetler.map((hizmet) => {
          return (
            <HizmetSatiri
            key={hizmet.id}
              hizmet={hizmet}
              hizmetDuzenle={hizmetDuzenle}
              hizmetSil={hizmetSil} />
          );
        })}
      </ul>

      {/* FORM */}

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
    </div>
  );
}

export default App;