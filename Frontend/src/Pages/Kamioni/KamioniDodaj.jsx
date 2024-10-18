import { Button, Col, Container, Form, FormLabel, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constans";
import moment from "moment";
import KamionService from "../../services/KamionService";
import useLoading from "../../Hooks/useLoading";

export default function KamioniDodaj() {

    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();
    async function dodaj(kamion) {
        showLoading();
        const odgovor = await KamionService.dodaj(kamion);
        hideLoading();
        if(odgovor.greska)
        {
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.KAMION_PREGLED);
    }

    function obradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

        dodaj({
            reg_oznaka: podaci.get('reg_oznaka'),
            marka: podaci.get('marka'),
            godina_proizvodnje: parseInt(podaci.get('godina_proizvodnje')),
            istek_registracije: moment.utc(podaci.get('istek_registracije')),
            prosjecna_potrosnja_goriva: parseFloat(podaci.get('prosjecna_potrosnja_goriva'))

        });
    }

        return (
            <Container>
                Dodavanje novog kamiona

                <Form onSubmit={obradiSubmit}>
                    <Form.Group controlId="reg_oznaka">
                        <FormLabel>Registarska oznaka</FormLabel>
                        <Form.Control type="text" name="reg_oznaka" />
                    </Form.Group>

                    <Form.Group controlId="marka">
                        <FormLabel>Marka</FormLabel>
                        <Form.Control type="text" name="marka" />
                    </Form.Group>

                    <Form.Group controlId="godina_proizvodnje">
                        <FormLabel>Godina proizvodnje</FormLabel>
                        <Form.Control type="number" name="godina_proizvodnje" />
                    </Form.Group>

                    <Form.Group controlId="istek_registracije">
                        <FormLabel>Istek registracije</FormLabel>
                        <Form.Control type="date" name="istek_registracije" />
                    </Form.Group>

                    <Form.Group controlId="prosjecna_potrosnja_goriva">
                        <FormLabel>Prosjecna potrosnja goriva</FormLabel>
                        <Form.Control type="number" name="prosjecna_potrosnja_goriva" step={0.01} />
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
                                Dodaj novi kamion
                            </Button>
                        </Col>
                    </Row>
                </Form>
            </Container>
        )
    }
