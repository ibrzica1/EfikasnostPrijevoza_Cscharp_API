import { Button, Col, Container, Form, FormLabel, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import KamionService from "../../services/KamionService";
import { useEffect, useState } from "react";
import { RoutesNames } from "../../constans";
import useLoading from "../../Hooks/useLoading";


export default function KamioniPromjena() {

    const navigate = useNavigate();
    const routeParams = useParams();
    const [ kamion, setKamion ] = useState({});
    const { showLoading, hideLoading } = useLoading();


   async function dohvatiKamion() {
        showLoading();
        const odgovor = await KamionService.getBySifra(routeParams.kamion_id);
        hideLoading();
        if (odgovor.greska) {
            
            alert(odgovor.poruka);
            return;
        }
        odgovor.poruka.istek_registracije = moment.utc(odgovor.poruka.istek_registracije).format('yyyy-MM-DD');
        //console.log(odgovor.poruka)
        setKamion(odgovor.poruka);
    }

    useEffect(()=>{
        dohvatiKamion();
},[]);


    async function promjena(kamion) {
        showLoading();
        const odgovor = await KamionService.promjena(routeParams.kamion_id, kamion);
        hideLoading();
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.KAMION_PREGLED);
    }

    function obradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

        promjena({
            reg_oznaka: podaci.get('reg_oznaka'),
            marka: podaci.get('marka'),
            godina_proizvodnje: parseInt(podaci.get('godina_proizvodnje')),
            istek_registracije: moment.utc(podaci.get('istek_registracije')).toISOString(),
            prosjecna_potrosnja_goriva: parseFloat(podaci.get('prosjecna_potrosnja_goriva'))

        });
    }

    return (
        <Container>
            Promjena kamiona

            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="reg_oznaka">
                    <FormLabel>Registarska oznaka</FormLabel>
                    <Form.Control type="text" name="reg_oznaka" required
                    defaultValue={kamion.reg_oznaka} />
                </Form.Group>

                <Form.Group controlId="marka">
                    <FormLabel>Marka</FormLabel>
                    <Form.Control type="text" name="marka" 
                    defaultValue={kamion.marka}/>
                </Form.Group>

                <Form.Group controlId="godina_proizvodnje">
                    <FormLabel>Godina proizvodnje</FormLabel>
                    <Form.Control type="number" name="godina_proizvodnje" 
                    defaultValue={kamion.godina_proizvodnje}/>
                </Form.Group>

                <Form.Group controlId="istek_registracije">
                    <FormLabel>Istek registracije</FormLabel>
                    <Form.Control type="date" name="istek_registracije"
                    defaultValue={kamion.istek_registracije} />
                </Form.Group>

                <Form.Group controlId="prosjecna_potrosnja_goriva">
                    <FormLabel>Prosjecna potrosnja goriva</FormLabel>
                    <Form.Control type="number" name="prosjecna_potrosnja_goriva" step={0.01} 
                    defaultValue={kamion.prosjecna_potrosnja_goriva}/>
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RoutesNames.KAMION_PREGLED}
                            className="btn btn-danger siroko">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                        <Button variant="primary" type="submit" className="siroko">
                            Promjeni kamion
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}
