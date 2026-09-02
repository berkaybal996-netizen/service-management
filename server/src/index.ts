import express from 'express'
import cors from "cors"
import pool from "./db";





const app = express() // → Gelen JSON verisini okuyabilmemizi sağlar. 

app.use(express.json(), cors()) // =>


app.get('/hizmetler', async (req, res) => { // → Hizmetleri getirir.


    try {
        const hizmetler = await pool.query("SELECT * FROM hizmetler;")
        res.json(hizmetler.rows)

    } catch (error) {
        console.error(error, "api get istegi atılamadı")
        res.status(500).json(error)
    }

})

app.post('/hizmetler', async (req, res) => { // → Yeni hizmet oluşturma isteğini yakalar.
    try {
        if (req.body.ad === "" || req.body.ad === undefined || req.body.fiyat < 0) {
            return res.status(400).json({
                mesaj: "Geçersiz hizmet bilgisi"
            })
        }
        const yeniHizmet = await pool.query(

            "INSERT INTO hizmetler (ad, fiyat)  VALUES ($1, $2) RETURNING *",

            [req.body.ad, req.body.fiyat])

        res.json(yeniHizmet.rows[0])
    } catch (error) {
        console.error(error, "api post istegi atılamadı")
        res.status(500).json(error)
    }


});




app.put('/hizmetler/:id', async (req, res) => { // →  

    try {
        if (req.body.fiyat < 0){
            return res.status(400).json({ mesaj: "Geçersiz fiyat bilgisi"})
        }
        const id = req.params.id
        const hizmet = await pool.query(
            "UPDATE hizmetler SET fiyat = $1 WHERE id = $2 RETURNING *",
            [req.body.fiyat, id]
        );
        res.json(hizmet.rows[0])

    } catch (error) {
        console.error(error, "api put istegi atılamadı")
        res.status(500).json(error)
    }

})

app.delete('/hizmetler/:id', async (req, res) => {
    try {
        const id = req.params.id
        const hizmet = await pool.query(
            "DELETE FROM hizmetler WHERE id=$1 RETURNING *",
            [id])
        res.json(hizmet.rows[0])
    } catch (error) {
        console.error(error, "api delete  istegi atılamadı")
        res.status(500).json(error)
    }


})

app.listen(3080, () => {
    console.log('App listening on port 3080')
})

// req → request → Kullanıcının/sunucunun bize gönderdiği şey
// res → response → Bizim karşı tarafa göndereceğimiz cevap