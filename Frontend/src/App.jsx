
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBarEfikasnost from './components/NavBarEfikasnost';
import { Route, Routes } from 'react-router-dom'
import { RoutesNames } from './constans'
import Pocetna from './Pages/Pocetna'
import VozaciPregled from './Pages/Vozaci/VozaciPregled';
import KamioniPregled from './Pages/Kamioni/KamioniPregled';
import CiklicnaPregled from './Pages/Ciklicna/CiklicnaPregled';
import KamioniDodaj from './Pages/Kamioni/KamioniDodaj';
import VozaciDodaj from './Pages/Vozaci/VozaciDodaj';
import KamioniPromjena from './Pages/Kamioni/KamioniPromjena';
import VozaciPromjena from './Pages/Vozaci/VozaciPromjena';
import TurePregled from './Pages/Ture/TuraPregled';
import TureDodaj from './Pages/Ture/TureDodaj';
import TuraPromjena from './Pages/Ture/TurePromjena';
import LoadingSpinner from './components/LoadingSpinner';

function App() {



  return (
    <>
    <LoadingSpinner/>
      <NavBarEfikasnost />
      <Routes>
        <Route path={RoutesNames.HOME} element={<Pocetna />} />
        <Route path={RoutesNames.VOZAC_PREGLED} element={<VozaciPregled />} />
        <Route path={RoutesNames.KAMION_PREGLED} element={<KamioniPregled />} />
        <Route path={RoutesNames.CIKLICNA_PREGLED} element={<CiklicnaPregled />} /> 
        <Route path={RoutesNames.KAMION_NOVI} element={<KamioniDodaj />} /> 
        <Route path={RoutesNames.VOZAC_NOVI} element={<VozaciDodaj />} /> 
        <Route path={RoutesNames.KAMION_PROMJENA} element={<KamioniPromjena />} /> 
        <Route path={RoutesNames.VOZAC_PROMJENA} element={<VozaciPromjena />} /> 
        <Route path={RoutesNames.TURA_PREGLED} element={<TurePregled />} />
        <Route path={RoutesNames.TURA_NOVI} element={<TureDodaj />} />
        <Route path={RoutesNames.TURA_PROMJENA} element={<TuraPromjena />} />
      </Routes>
    </>
  )
}

export default App
