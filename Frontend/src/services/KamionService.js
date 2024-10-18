import { HttpService } from "./HttpService"

async function getBySifra(kamion_id){
    return await HttpService.get('/Kamion/' + kamion_id)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Ne postoji kamion!'}
    })
}

async function get() {
    return await HttpService.get('/Kamion')
        .then((odgovor) => {
            return odgovor.data;
        })
        .catch((e)=>{console.error(e)})
}

async function obrisi(kamion_id) { 
    return await HttpService.delete('/Kamion/' + kamion_id)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Kamion se ne može obrisati'}
    })
}

async function dodaj(kamion) { 
    return await HttpService.post('/Kamion', kamion)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Kamion se ne može dodati'}
    })
}

async function promjena(kamion_id,kamion) {
    return await HttpService.put('/Kamion/' + kamion_id,kamion)
    .then((odgovor)=>{
        return {greska: false, poruka: odgovor.data}
    })
    .catch((e)=>{
        return {greska: true, poruka: 'Kamion se ne može promjeniti!'}
    })
}

export default {
    get,
    obrisi,
    getBySifra,
    promjena,
    dodaj
}