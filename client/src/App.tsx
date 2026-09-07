import { useEffect, useState } from "react";

import type { Hizmet } from "./types";

import HizmetListesi from "./components/HizmetListesi";
import HizmetFormu from "./components/HizmetFormu";
import Kategoriler from "./components/Kategoriler";

import hizmetleriGetir from "./api/hizmetler";

function App() {

  // =====================================================
  // STATE
  // =====================================================

  const [hizmetler, setHizmetler] = useState<Hizmet[]>([]);

  const [hizmetadi, setHizmetadi] = useState("");
  const [hizmetfiyati, setHizmetfiyati] = useState(0);

  const [duzenlenenHizmetId, setDuzenlenenHizmetId] =
    useState<number | null>(null);


  // =====================================================
  // HİZMETLERİ GETİR
  // =====================================================

  useEffect(() => {

    async function getir() {
      try {

        const hizmetverisi = await hizmetleriGetir();

        setHizmetler(hizmetverisi);

      } catch (error) {

        console.error("Hizmetler getirilemedi:", error);

      }
    }

    getir();

  }, []);


  // =====================================================
  // HİZMET EKLE
  // =====================================================

  const hizmetEkle = async () => {

    if (hizmetadi.trim() === "" || hizmetfiyati < 0) {

      alert("Ad boş bırakılamaz ve fiyat negatif olamaz.");

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

      setHizmetler([
        ...hizmetler,
        yeniHizmet
      ]);

      setHizmetadi("");
      setHizmetfiyati(0);

    } catch (error) {

      console.error("Ekleme başarısız:", error);

    }
  };


  // =====================================================
  // HİZMET SİL
  // =====================================================

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

      setHizmetler(
        hizmetler.filter(
          (hizmet) => hizmet.id !== id
        )
      );

    } catch (error) {

      console.error("Silme başarısız:", error);

    }
  };


  // =====================================================
  // HİZMET DÜZENLEME MODUNA GİR
  // =====================================================

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


  // =====================================================
  // HİZMET GÜNCELLE
  // =====================================================

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

      duzenlemeyiIptalEt();

    } catch (error) {

      console.error("Güncelleme başarısız:", error);

    }
  };


  // =====================================================
  // DÜZENLEMEYİ İPTAL ET
  // =====================================================

  const duzenlemeyiIptalEt = () => {

    setDuzenlenenHizmetId(null);

    setHizmetadi("");
    setHizmetfiyati(0);

  };


  // =====================================================
  // JSX
  // =====================================================

  return (
    <div>

      {/* HİZMETLER */}

      <HizmetListesi
        hizmetler={hizmetler}
        hizmetDuzenle={hizmetDuzenle}
        hizmetSil={hizmetSil}
      />

      <HizmetFormu
        hizmetadi={hizmetadi}
        hizmetfiyati={hizmetfiyati}
        setHizmetadi={setHizmetadi}
        setHizmetfiyati={setHizmetfiyati}
        duzenlenenHizmetId={duzenlenenHizmetId}
        hizmetGuncelle={hizmetGuncelle}
        duzenlemeyiIptalEt={duzenlemeyiIptalEt}
        hizmetEkle={hizmetEkle}
      />


      {/* KATEGORİLER */}

      <div>
        <h1>Kategoriler</h1>

        <Kategoriler />
      </div>

    </div>
  );
}

export default App;