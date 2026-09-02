import { useEffect, useState } from "react"

function App() {
  const [hizmetler, setHizmetler] = useState<hizmet[]>([])
  interface hizmet {
    id: number,
    ad: string,
    fiyat: number
  }


  useEffect(() => {
    async function hizmets() {
      const response = await fetch('http://localhost:3080/hizmetler');
      const hizmetverisi = await response.json()
      setHizmetler(hizmetverisi)
    }
    hizmets()

  }, []);
  return (
    <div>
      {hizmetler.map((hizmet) => {
        return <li key={hizmet.id}>
          {hizmet.ad}<br></br>
          {hizmet.fiyat}
        </li>
      })}

    </div>
  )
}

export default App