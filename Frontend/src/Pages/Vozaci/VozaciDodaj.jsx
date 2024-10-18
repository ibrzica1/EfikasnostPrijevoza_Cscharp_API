import { Button, Col, Container, Form, FormLabel, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { RoutesNames } from "../../constans";
import moment from "moment";
import VozacService from "../../services/VozacService";
import useLoading from "../../Hooks/useLoading";

export default function VozaciDodaj() {
    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    async function dodaj(vozac) {
        showLoading();
        const odgovor = await VozacService.dodaj(vozac);
        hideLoading();
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        navigate(RoutesNames.VOZAC_PREGLED);
    }

    function obradiSubmit(e) {
        e.preventDefault();

        const podaci = new FormData(e.target);

        dodaj({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            datum_rodenja: moment.utc(podaci.get('datum_rodenja')),
            istek_ugovora: moment.utc(podaci.get('istek_ugovora'))

        });

    }
    return (
        <Container>
            Dodavanje novog vozaca

            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="ime">
                    <FormLabel>Ime</FormLabel>
                    <Form.Control type="text" name="ime" />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <FormLabel>Prezime</FormLabel>
                    <Form.Control type="text" name="prezime" />
                </Form.Group>

               
                <Form.Group controlId="datum_rodenja">
                    <FormLabel>Datum rodenja</FormLabel>
                    <Form.Control type="date" name="datum_rodenja" />
                </Form.Group>

                <Form.Group controlId="istek_ugovora">
                    <FormLabel>Istek ugovora</FormLabel>
                    <Form.Control type="date" name="istek_ugovora" />
                </Form.Group>

                <hr />
                <Row>
                    <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                        <Link to={RoutesNames.VOZAC_PREGLED}
                            className="btn btn-danger siroko">
                            Odustani
                        </Link>
                    </Col>
                    <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                        <Button variant="primary" type="submit" className="siroko">
                            Dodaj novog vozača
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    )
}