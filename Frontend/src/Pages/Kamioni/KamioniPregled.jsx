import KamionService from "../../services/KamionService";
import { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import moment from "moment";
import { IoIosAdd } from "react-icons/io";
import { GrValidate } from "react-icons/gr";
import { RoutesNames } from "../../constans";
import { Link, useNavigate } from "react-router-dom";
import useLoading from "../../Hooks/useLoading";


export default function KamioniPregled() {
    const [kamioni, setKamioni] = useState();

    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    async function dohvatiKamione() {
       /* showLoading();
        await KamionService.get()
            .then((odgovor) => {
                setKamioni(odgovor);
            })
            .catch((e) => { console.log(e) });
            hideLoading(); */
            showLoading();
            await KamionService.get()
                .then((odgovor) => {
                    console.log('API odgovor:', odgovor);
                    // Ensure odgovor is an array before setting the state
                    if (Array.isArray(odgovor)) {
                        setKamioni(odgovor);
                    } else {
                        setKamioni([]); // Set an empty array if the response is not as expected
                    }
                })
                .catch((e) => {
                    console.log(e);
                    setKamioni([]); // Handle error by setting kamioni as an empty array
                });
            hideLoading();  

    }

    useEffect(() => {
        showLoading(); 
        dohvatiKamione();
        hideLoading();
    }, []);

    function formatirajDatum(datum) {
        if (datum == null) {
            return 'Nije definirano'
        }
        return moment.utc(datum).format('DD.MM.YYYY.');
    }

    async function obrisiAsync(kamion_id) {
        showLoading();
        const odgovor = await KamionService.obrisi(kamion_id);
        hideLoading();
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        dohvatiKamione();
    }

    function obrisi(kamion_id) {
        obrisiAsync(kamion_id);
    }


    return (
        <Container>
            <Link to={RoutesNames.KAMION_NOVI} className="btn btn-success siroko">
            < IoIosAdd
                size={25}
                /> Dodaj novi kamion</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Registarska oznaka</th>
                        <th>Marka</th>
                        <th>Godina proizvodnje</th>
                        <th>Istek registracije</th>
                        <th>Prosječna potrošnja goriva</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {kamioni && kamioni.map((kamion, index) => (
                        <tr key={index}>
                            <td>{kamion.reg_oznaka}</td>
                            <td>{kamion.marka}</td>
                            <td className={'desno'}>
                                {kamion.godina_proizvodnje}</td>
                            <td className={'sredina'}>
                                {formatirajDatum(kamion.istek_registracije)}</td>
                            <td className='desno'>{kamion.prosjecna_potrosnja_goriva}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => navigate(`/Kamioni/${kamion.kamion_id}`)}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={() => obrisi(kamion.kamion_id)}>
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    )

}