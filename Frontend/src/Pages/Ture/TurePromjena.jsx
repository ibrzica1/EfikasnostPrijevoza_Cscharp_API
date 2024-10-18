import { Form, Row, Col, Table, Button } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { RoutesNames } from '../../constans';
import KamionService from '../../services/KamionService';
import VozacService from '../../services/VozacService';
import TuraService from '../../services/TuraService';
import moment from 'moment';
import useLoading from '../../Hooks/useLoading';


export default function TuraPromjena() {
  const navigate = useNavigate();
  const routeParams = useParams();
  const { showLoading, hideLoading } = useLoading();

  const [kamioni, setKamioni] = useState([]);
  const [kamion_id, setKamion_id] = useState(0);
  const [vozaci, setVozaci] = useState([]);
  const [vozac_id, setVozac_id] = useState(0);

  const [tura, setTura] = useState({});

 

  async function dohvatiKamion(){
    showLoading();
    const odgovor = await KamionService.get();
    hideLoading();
    setKamioni(odgovor);
  }

  async function dohvatiTura() {
    showLoading();
    const odgovor = await TuraService.getBySifra(routeParams.tura_id);
    hideLoading();
    if(odgovor.greska){
      alert(odgovor.poruka);
      return;
  }
    let tura = odgovor.poruka;
    odgovor.poruka.datum_pocetak = moment.utc(odgovor.poruka.datum_pocetak).format('yyyy-MM-DD');
    odgovor.poruka.datum_zavsetak = moment.utc(odgovor.poruka.datum_zavsetak).format('yyyy-MM-DD');
    setTura(tura);
    setKamion_id(tura.kamion_id); 
    setVozac_id(tura.vozac_id);
  }
  async function dohvatiVozac(){
    showLoading();
    const odgovor = await VozacService.get();
    hideLoading();
    setVozaci(odgovor);
  }
  


  async function dohvatiInicijalnePodatke() {
    showLoading();
    await dohvatiKamion();
    await dohvatiTura();
    await dohvatiVozac();
    hideLoading();
  }


  useEffect(()=>{
    dohvatiInicijalnePodatke();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function promjena(e){
    const odgovor = await TuraService.promjena(routeParams.tura_id,e);
    if(odgovor.greska){
        alert(odgovor.poruka);
        return;
    }
    navigate(RoutesNames.TURA_PREGLED);
}

  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    promjena({
      relacija: podaci.get('relacija'),
      udaljenost: parseFloat(podaci.get('udaljenost')),
      prijedeni_km: parseFloat(podaci.get('prijedeni_km')),
      potrosnja_goriva: parseFloat(podaci.get('potrosnja_goriva')),
      kamion_id: parseInt(kamion_id),
      vozac_id: parseInt(vozac_id),
      datum_pocetak: moment.utc(podaci.get('datum_pocetak')),
      datum_zavsetak: moment.utc(podaci.get('datum_zavrsetak'))
    });
  }

  return (
      <>
      Mjenjanje podataka ture
      <Row>
        <Col key='1' sm={12} lg={6} md={6}>
          <Form onSubmit={obradiSubmit}>
              <Form.Group controlId="relacija">
                  <Form.Label>Relacija</Form.Label>
                  <Form.Control type="text" name="relacija" required defaultValue={tura.relacija}/>
              </Form.Group>
              
              <Form.Group controlId="udaljenost">
                  <Form.Label>Udaljenost</Form.Label>
                  <Form.Control type="number" name="udaljenost" step={0.01} required defaultValue={tura.udaljenost}/>
              </Form.Group>

              <Form.Group controlId="prijedeni_km">
                  <Form.Label>Prijeđeni kilometri</Form.Label>
                  <Form.Control type="number" name="prijedeni_km" step={0.01} required defaultValue={tura.prijedeni_km}/>
              </Form.Group>

              <Form.Group controlId="potrosnja_goriva">
                  <Form.Label>Potrošnja goriva</Form.Label>
                  <Form.Control type="number" name="potrosnja_goriva" step={0.01} required defaultValue={tura.potrosnja_goriva}/>
              </Form.Group>

              <Form.Group className='mb-3' controlId='kamion'>
                <Form.Label>Kamion</Form.Label>
                <Form.Select
                value={kamion_id}
                onChange={(e)=>{setKamion_id(e.target.value)}}
                >
                {kamioni && kamioni.map((s,index)=>(
                  <option key={index} value={s.kamion_id}>
                    {s.reg_oznaka}
                  </option>
                ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className='mb-3' controlId='vozac'>
                <Form.Label>Vozač</Form.Label>
                <Form.Select
                value={vozac_id}
                onChange={(e)=>{setVozac_id(e.target.value)}}
                >
                {vozaci && vozaci.map((s,index)=>(
                  <option key={index} value={s.vozac_id}>
                    {s.prezime}
                  </option>
                ))}
                </Form.Select>
              </Form.Group>

              <Form.Group controlId="datum_pocetak">
                  <Form.Label>Datum početak</Form.Label>
                  <Form.Control type="date" name="datum_početak" required defaultValue={tura.datum_pocetak}/>
              </Form.Group>

              <Form.Group controlId="datum_zavsetak">
                  <Form.Label>Datum zavšetak</Form.Label>
                  <Form.Control type="date" name="datum_zavsetak" defaultValue={tura.datum_zavsetak}/>
              </Form.Group>


              <hr />
              <Row>
                  <Col xs={6} sm={6} md={3} lg={6} xl={6} xxl={6}>
                  <Link to={RoutesNames.TURA_PREGLED}
                  className="btn btn-danger siroko">
                  Odustani
                  </Link>
                  </Col>
                  <Col xs={6} sm={6} md={9} lg={6} xl={6} xxl={6}>
                  <Button variant="primary" type="submit" className="siroko">
                      Promjeni turu
                  </Button>
                  </Col>
              </Row>
          </Form>
        </Col>
        </Row>
        </>
  );
}