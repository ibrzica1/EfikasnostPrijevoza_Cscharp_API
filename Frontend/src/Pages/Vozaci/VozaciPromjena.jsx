import { Button, Col, Container, Form, Image, FormLabel, Row } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { APP_URL, RoutesNames } from "../../constans";
import moment from "moment";
import VozacService from "../../services/VozacService";
import { useEffect, useState, useRef } from "react";
import useLoading from "../../Hooks/useLoading";
import { Cropper } from "react-cropper";
import 'cropperjs/dist/cropper.css';
import nepoznato from '../../assets/nepoznato.jpg';

export default function VozaciPromjena() {
    const navigate = useNavigate();
    const routeParams = useParams();
    const [vozac, setVozac] = useState({});
    const { showLoading, hideLoading } = useLoading();
    const [trenutnaSlika, setTrenutnaSlika] = useState('');
    const [slikaZaCrop, setSlikaZaCrop] = useState('');
    const [slikaZaServer, setSlikaZaServer] = useState('');
    const cropperRef = useRef(null);


    async function dohvatiVozac(){
        showLoading();
        const odgovor = await VozacService.getBySifra(routeParams.vozac_id);
        hideLoading();
        if (odgovor.greska) {
            alert(odgovor.poruka);
            return;
        }
        odgovor.poruka.datum_rodenja = moment.utc(odgovor.poruka.datum_rodenja).format('yyyy-MM-DD');
        odgovor.istek_ugovora = moment.utc(odgovor.poruka.istek_ugovora).format('yyyy-MM-DD');
        setVozac(odgovor.poruka);
        if(odgovor.poruka.slika!=null){
            setTrenutnaSlika(APP_URL + odgovor.poruka.slika + `?${Date.now()}`); 
          }else{
            setTrenutnaSlika(nepoznato);
          }
    }


    useEffect(()=>{

        dohvatiVozac();
       
},[]);

    

    async function promjena(vozac) {
        showLoading();
        const odgovor = await VozacService.promjena(routeParams.vozac_id, vozac);
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

        promjena({
            ime: podaci.get('ime'),
            prezime: podaci.get('prezime'),
            datum_rodenja: moment.utc(podaci.get('datum_rodenja')),
            istek_ugovora: moment.utc(podaci.get('istek_ugovora'))

        });

    }

    function onCrop() {
        setSlikaZaServer(cropperRef.current.cropper.getCroppedCanvas().toDataURL());
      }
      function onChangeImage(e) {
        e.preventDefault();
    
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setSlikaZaCrop(reader.result);
        };
        try {
          reader.readAsDataURL(files[0]);
        } catch (error) {
          console.error(error);
        }
      }
    
      async function spremiSliku() {
        showLoading();
        const base64 = slikaZaServer;
    
        const odgovor = await VozacService.postaviSliku(routeParams.vozac_id, {Base64: base64.replace('data:image/png;base64,', '')});
        if(!odgovor.ok){
          hideLoading();
          prikaziError(odgovor.podaci);
        }
        setTrenutnaSlika(slikaZaServer);
        hideLoading();
      }    
    return (
        <>
            Promjena vozaca
            <Row>
            <Col key='1' sm={12} lg={6} md={6}>
            <Form onSubmit={obradiSubmit}>
                <Form.Group controlId="ime">
                    <FormLabel>Ime</FormLabel>
                    <Form.Control type="text" name="ime"
                    defaultValue={vozac.ime} />
                </Form.Group>

                <Form.Group controlId="prezime">
                    <FormLabel>Prezime</FormLabel>
                    <Form.Control type="text" name="prezime" 
                    defaultValue={vozac.prezime}/>
                </Form.Group>


                <Form.Group controlId="datum_rodenja">
                    <FormLabel>Datum rodenja</FormLabel>
                    <Form.Control type="date" name="datum_rodenja"
                    defaultValue={vozac.datum_rodenja} />
                </Form.Group>

                <Form.Group controlId="istek_ugovora">
                    <FormLabel>Istek ugovora</FormLabel>
                    <Form.Control type="date" name="istek_ugovora"
                    defaultValue={vozac.istek_ugovora} />
                </Form.Group>

                <Row className='mb-4'>
              <Col key='1' sm={12} lg={6} md={12}>
                <p className='form-label'>Trenutna slika</p>
                <Image
                  
                  src={trenutnaSlika}
                  className='slika'
                />
              </Col>
              <Col key='2' sm={12} lg={6} md={12}>
                {slikaZaServer && (
                  <>
                    <p className='form-label'>Nova slika</p>
                    <Image
                      src={slikaZaServer || slikaZaCrop}
                      className='slika'
                    />
                  </>
                )}
              </Col>
            </Row>

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
                        Promjeni vozača
                    </Button>
                    </Col>
                </Row>
            </Form> 
            </Col>
        <Col key='2' sm={12} lg={6} md={6}>
        <input className='mb-3' type='file' onChange={onChangeImage} />
              <Button disabled={!slikaZaServer} onClick={spremiSliku}>
                Spremi sliku
              </Button>

              <Cropper
                src={slikaZaCrop}
                style={{ height: 400, width: '100%' }}
                initialAspectRatio={1}
                guides={true}
                viewMode={1}
                minCropBoxWidth={50}
                minCropBoxHeight={50}
                cropBoxResizable={false}
                background={false}
                responsive={true}
                checkOrientation={false}
                cropstart={onCrop}
                cropend={onCrop}
                ref={cropperRef}
              />
        </Col>
      </Row>
        </>
    )
}
