import { useState, useEffect } from "react";

const filmek = "../../public/rajzfilmek.json";

type Film = {
    id: number;
    cim: string;
    studio: string;
    megjelenesEve: number;
    premier: string;
}

export default function Filmek() {
    const [rajzfilmek, setRajzfilmek] = useState<Film[]>([])

    useEffect(() => {
        async function adatBetoltes() {
            try{
                const response = await fetch(filmek);
                const data: Film[] = await response.json();
                setRajzfilmek(data);
            } catch (error) {
                console.log(error);
            }
        }
        adatBetoltes();
    }, [])


    const FilmekSzama = rajzfilmek.length


    let fiatal = rajzfilmek[0]

    for(let item of rajzfilmek) {
        if(item.megjelenesEve > fiatal.megjelenesEve){
            fiatal = item
        }
    }

    let idos = rajzfilmek[0]

    for(let item of rajzfilmek){
        if(item.megjelenesEve < idos.megjelenesEve){
            idos = item
        }
    }

    

return (
    <>
        <h2>RajzFilmek</h2>



        <div className="row">
            {rajzfilmek.map((f)=> (
                <div className="col-md-4" key={f.id}>
                    <div className="card mb-3">
                        <div className="card-body">
                            <h5 className="card-title">{f.cim}</h5>
                            <h6 className="card-subtitle mb-2 text-muted">{f.studio}</h6>
                            <p className="card-text">Megjelenés éve: {f.megjelenesEve}</p>
                        </div>
                    </div>
                </div>
            ))}
            
        </div>

        <p>Filmek Száma: {FilmekSzama}db</p>
        <p>Legfiatalabb: {fiatal?.cim} - {fiatal?.megjelenesEve}</p>
        <p>Legidősebb: {idos?.cim} - {idos?.megjelenesEve}</p>
    </>
)
}

