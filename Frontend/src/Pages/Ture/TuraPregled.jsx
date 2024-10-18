import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { IoIosAdd } from "react-icons/io";
import { FaEdit, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Service from "../../services/TuraService"; 
import { RoutesNames } from "../../constans";
import TuraService from "../../services/TuraService";
import useLoading from "../../Hooks/useLoading";

export default function TurePregled(){
    const [ture,setTure] = useState();
    let navigate = useNavigate(); 
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiTure(){
        showLoading();
        await TuraService.get()
        .then((odgovor)=>{
            //console.log(odgovor);
            setTure(odgovor);
        })
        .catch((e)=>{console.log(e)});
        hideLoading();
    }

    async function obrisiTuru(tura_id) {
        showLoading();
        const odgovor = await TuraService.obrisi(tura_id);
        hideLoading();
        //console.log(odgovor);
        if(odgovor.greska){
            alert(odgovor.poruka);
            return;
        }
        dohvatiTure();
    }

    function formatirajDatum(datum) {
        if (datum == null) {
            return 'Nije definirano';
        }
        return moment.utc(datum).format('DD.MM.YYYY.');
    }

    useEffect(()=>{
        dohvatiTure();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);


    return (

        <Container>
            <Link to={RoutesNames.TURA_NOVI} className="btn btn-success siroko">
                <IoIosAdd
                size={25}
                /> Dodaj novu turu
            </Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Relacija</th>
                        <th>Udaljenost</th>
                        <th>Prijeđeni kilometri</th>
                        <th>Kamion</th>
                        <th>Vozač</th>
                        <th>Početak datum</th>
                        <th>Završetak datum</th>
                    </tr>
                </thead>
                <tbody>
                    {ture && ture.map((entitet,index)=>(
                        <tr key={index}>
                            <td>{entitet.relacija}</td>
                            <td>{entitet.udaljenost}</td>
                            <td>{entitet.prijedeni_km}</td>
                            <td>{entitet.potrosnja_goriva}</td>
                            <td>{entitet.kamion_reg}</td>
                            <td>{entitet.vozac_prezime}</td>
                            <td>{formatirajDatum(entitet.datum_pocetak)}</td>
                            <td>{formatirajDatum(entitet.datum_zavrsetak)}</td>
                            <td className="sredina">
                                    <Button
                                        variant='primary'
                                        onClick={()=>{navigate(`/ture/${entitet.tura_id}`)}}
                                    >
                                        <FaEdit 
                                    size={25}
                                    />
                                    </Button>
                               
                                
                                    &nbsp;&nbsp;&nbsp;
                                    <Button
                                        variant='danger'
                                        onClick={() => obrisiTuru(entitet.tura_id)}
                                    >
                                        <FaTrash
                                        size={25}/>
                                    </Button>

                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>

    );

}