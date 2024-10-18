import { useEffect, useState } from "react";
import { Button, Card, Pagination, Row, Col, Form,  Container, Table } from "react-bootstrap";
import VozacService from "../../services/VozacService";
import moment from "moment";
import { Link } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import { APP_URL, RoutesNames } from "../../constans";
import { useNavigate } from "react-router-dom";
import nepoznato from '../../assets/nepoznato.jpg';
import useLoading from "../../Hooks/useLoading";
import { FaEdit, FaTrash } from "react-icons/fa";

export default function VozaciPregled() {

    const [vozaci, setVozaci] = useState();
    const [stranica, setStranica] = useState(1);
    const [uvjet, setUvjet] = useState('');

    const navigate = useNavigate();
    const { showLoading, hideLoading } = useLoading();

    /*async function dohvatiVozace() {
        await VozacService.get()
            .then((odgovor) => {
                setVozaci(odgovor);
            })
            .catch((e) => { console.log(e) });

    }*/

            async function dohvatiVozace() {

                showLoading();
                const odgovor = await VozacService.getStranicenje(stranica,uvjet);
                hideLoading();
                if(odgovor.greska){
                    alert(odgovor.poruka);
                    
                    return;
                }
                if(odgovor.poruka.length==0){
                    setStranica(stranica-1);
                    return;
                }
                setVozaci(odgovor.poruka);
                hideLoading();
            }

    useEffect(() => {
        dohvatiVozace();
    }, [stranica, uvjet]);

    function formatirajDatum(datum) {
        if (datum == null) {
            return 'Nije definirano';
        }
        return moment.utc(datum).format('DD.MM.YYYY.');
    }

    async function obrisiAsync(vozac_id) {
        showLoading();
        const odgovor = await VozacService.obrisi(vozac_id);
        hideLoading();
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        dohvatiVozace();
    }

    function obrisi(vozac_id) {
        obrisiAsync(vozac_id);
    }

    function slika(vozac){
        if(vozac.slika!=null){
            return APP_URL + vozac.slika+ `?${Date.now()}`;
        }
        return nepoznato;
    }

    function promjeniUvjet(e) {
        if(e.nativeEvent.key == "Enter"){
            console.log('Enter')
            setStranica(1);
            setUvjet(e.nativeEvent.srcElement.value);
            setVozaci([]);
        }
    }

    function povecajStranicu() {
        setStranica(stranica + 1);
      }
    
      function smanjiStranicu() {
        if(stranica==1){
            return;
        }
        setStranica(stranica - 1);
      }

    /*return (

        <Container>
            <Link to={RoutesNames.VOZAC_NOVI} className="btn btn-success siroko">
            <IoIosAdd
                size={25}
                />
             Dodaj novog vozača</Link>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>Ime</th>
                        <th>Prezime</th>
                        <th>Datum rođenja</th>
                        <th>Istek ugovora</th>
                        <th>Akcija</th>
                    </tr>
                </thead>
                <tbody>
                    {vozaci && vozaci.map((vozac, index) => (
                        <tr key={index}>
                            <td>{vozac.ime}</td>
                            <td>{vozac.prezime}</td>
                            <td className={'sredina'}>
                                {formatirajDatum(vozac.datum_rodenja)}</td>
                            <td className={'sredina'}>
                                {formatirajDatum(vozac.istek_ugovora)}</td>
                            <td>
                                <Button
                                    variant="primary"
                                    onClick={() => navigate(`/Vozaci/${vozac.vozac_id}`)}>
                                    Promjeni
                                </Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button
                                    variant="danger"
                                    onClick={() => obrisi(vozac.vozac_id)}>
                                    Obriši
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

        </Container>
    )*/

        return(
            <>
        <Row>
        <Col key={1} sm={12} lg={4} md={4}>
            <Form.Control
            type='text'
            name='trazilica'
            placeholder='Traži vozača [Enter]'
            maxLength={255}
            defaultValue=''
            onKeyUp={promjeniUvjet}
            />
        </Col>
        <Col key={2} sm={12} lg={4} md={4}>
            {vozaci && vozaci.length > 0 && (
                    <div style={{ display: "flex", justifyContent: "center" }}>
                        <Pagination size="lg">
                        <Pagination.Prev onClick={smanjiStranicu} />
                        <Pagination.Item disabled>{stranica}</Pagination.Item> 
                        <Pagination.Next
                            onClick={povecajStranicu}
                        />
                    </Pagination>
                </div>
            )}
        </Col>
        <Col key={3} sm={12} lg={4} md={4}>
            <Link to={RoutesNames.VOZAC_NOVI} className="btn btn-success gumb">
                <IoIosAdd
                size={25}
                /> Dodaj
            </Link>
        </Col>
    </Row>
    
        
    <Row>
        
    { vozaci && vozaci.map((p) => (
   
   <Col key={p.vozac_id} sm={12} lg={3} md={3}>
      <Card style={{ marginTop: '1rem' }}>
      <Card.Img variant="top" src={slika(p)} className="slika"/>
        <Card.Body>
          <Card.Title>{p.ime} {p.prezime}</Card.Title>
        
          <Row>
              <Col>
              <Link className="btn btn-primary gumb" to={`/vozac/${p.vozac_id}`}><FaEdit /></Link>
              </Col>
              <Col>
              <Button variant="danger" className="gumb"  onClick={() => obrisi(p.vozac_id)}><FaTrash /></Button>
              </Col>
            </Row>
        </Card.Body>
      </Card>
    </Col>
  ))
}
</Row>
<hr />
      {vozaci && vozaci.length > 0 && (
        <div style={{ display: "flex", justifyContent: "center" }}>
            <Pagination size="lg">
            <Pagination.Prev onClick={smanjiStranicu} />
            <Pagination.Item disabled>{stranica}</Pagination.Item> 
            <Pagination.Next
                onClick={povecajStranicu}
            />
            </Pagination>
        </div>
        )}
</>
)
}