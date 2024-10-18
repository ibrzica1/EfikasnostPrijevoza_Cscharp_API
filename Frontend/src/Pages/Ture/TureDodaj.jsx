import { Button, Col, Container, Form, Row} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import TuraService from '../../services/TuraService';
import { RoutesNames } from '../../constans';
import KamionService from '../../services/KamionService';
import VozacService from '../../services/VozacService';
import moment from 'moment';
import useLoading from '../../Hooks/useLoading';


export default function TureDodaj() {
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();

  const [kamion, setKamion] = useState([]);
  const [kamion_id, setKamion_id] = useState(0);
  const [vozac, setVozac] = useState([]);
  const [vozac_id, setVozac_id] = useState(0);

  async function dohvatiKamion(){
    showLoading();
    const odgovor = await KamionService.get();
    setKamion(odgovor);
    setKamion_id(odgovor[0].kamion_id);
    hideLoading();
  }
  

  async function dohvatiVozac(){
    showLoading();
    const odgovor = await VozacService.get();
    setVozac(odgovor);
    setVozac_id(odgovor[0].vozac_id);
    hideLoading();
  }

  

  useEffect(()=>{
    dohvatiKamion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);
  useEffect(()=>{
    dohvatiVozac();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  async function dodaj(e) {
    showLoading();
    const odgovor = await TuraService.dodaj(e);
    hideLoading();
    if(odgovor.greska){
      alert(odgovor.poruka);
   
      return;
    }
    navigate(RoutesNames.TURA_PREGLED);
  }
   


  function obradiSubmit(e) {
    e.preventDefault();

    const podaci = new FormData(e.target);


    dodaj({
      
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
      <Container>
      Dodavanje nove ture
      <Form onSubmit={obradiSubmit}>
          <Form.Group controlId="relacija">
              <Form.Label>Relacija</Form.Label>
              <Form.Control type="text" name="relacija" required />
          </Form.Group>
          <Form.Group controlId="udaljenost">
              <Form.Label>Udaljenost</Form.Label>
              <Form.Control type="number" name="udaljenost" step={0.01} required />
          </Form.Group>
          <Form.Group controlId="prijedeni_km">
              <Form.Label>Prijeđeni kilometri</Form.Label>
              <Form.Control type="number" name="prijedeni_km" step={0.01} required />
          </Form.Group>
          <Form.Group controlId="potrosnja_goriva">
              <Form.Label>Potrošnja goriva</Form.Label>
              <Form.Control type="number" name="potrosnja_goriva" step={0.01} required />
          </Form.Group>
          <Form.Group className='mb-3' controlId='kamion'>
            <Form.Label>Kamion</Form.Label>
            <Form.Select 
            onChange={(e)=>{setKamion_id(e.target.value)}}
            >
            {kamion && kamion.map((s,index)=>(
              <option key={index} value={s.kamion_id}>
                {s.reg_oznaka}
              </option>
            ))}
            </Form.Select>
          </Form.Group>
          <Form.Group className='mb-3' controlId='vozac'>
            <Form.Label>Vozač</Form.Label>
            <Form.Select 
            onChange={(e)=>{setVozac_id(e.target.value)}}
            >
            {vozac && vozac.map((s,index)=>(
              <option key={index} value={s.vozac_id}>
                {s.prezime}
              </option>
            ))}
            </Form.Select>
          </Form.Group>
          <Form.Group controlId="datum_pocetak">
              <Form.Label>Datum Početak</Form.Label>
              <Form.Control type="date" name="datum_pocetak" required />
          </Form.Group>


          <Form.Group controlId="datum_zavrsetak">
              <Form.Label>Datum zavšetak</Form.Label>
              <Form.Control type="date" name="datum_zavrsetak" required />
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
                  Dodaj novu turu
              </Button>
              </Col>
          </Row>
      </Form>
      </Container>
  </>
  );
  }
