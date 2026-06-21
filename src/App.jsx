import './App.css'
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Adlogin from './Pages/Adlogin';
import Admindash from './Admin/Admindash';
import Addoc from './Admin/Addoc';
import Viewdoc from './Admin/Viewdoc';
import Adpatient from './Admin/Adpatient';
import Viewpatient from './Admin/Viewpatient';
import Viewapp from './Admin/Viewapp';
import Viewfeed from './Admin/Viewfeed';
import Adnews from './Admin/Adnews';
import Viewenquiry from './Admin/Viewenquiry';
import Reg from './Pages/Reg';
import Login from './Pages/Login';
import Ddash from './Doctor/Ddash';
import Pdash from './Patient/Pdash';
import Pappointment from './Patient/Pappointment';
import Preqapp from './Patient/Preqapp';
import Editdoc from './Pages/Editdoc';
import Editpatient from './Pages/Editpatient';
import Dappointment from './Doctor/Dappointment';
import Dconapp from './Doctor/Dconapp';
import Dcanapp from './Doctor/Dcanapp';
import Dcomapp from './Doctor/Dcomapp';
import HomePage from './Pages/HomePage';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/reg' element={<Reg/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/admin' element={<Adlogin/>}></Route>
          <Route path='/ddash' element={<Ddash/>}></Route>
          <Route path='/penapp' element={<Dappointment/>}></Route>
          <Route path='/conapp' element={<Dconapp/>}></Route>
          <Route path='/canapp' element={<Dcanapp/>}></Route>
          <Route path='/comapp' element={<Dcomapp/>}></Route>
          <Route path='/pdash' element={<Pdash/>}></Route>
          <Route path='/preqapp' element={<Preqapp/>}></Route>
          <Route path='/papp' element={<Pappointment/>}></Route>
          <Route path='/admindash' element={<Admindash/>}></Route>
          <Route path='/addoc' element={<Addoc/>}></Route>
          <Route path='/viewdoc' element={<Viewdoc/>}></Route>
          <Route path='/editdoc' element={<Editdoc/>}></Route>
          <Route path='/editpatient' element={<Editpatient/>}></Route>
          <Route path='/adpatient' element={<Adpatient/>}></Route>
          <Route path='/viewpatient' element={<Viewpatient/>}></Route>
          <Route path='/viewapp' element={<Viewapp/>}></Route>
          <Route path='/viewfeed' element={<Viewfeed/>}></Route>
          <Route path='/adnews' element={<Adnews/>}></Route>
          <Route path='/viewenquiry' element={<Viewenquiry/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App

