import React from 'react';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import Footer from './Component/Page/Footer';
import Signup from './Component/Page/Signup';

import FruitList from './Component/Tab';
import Home from './Component/Page/Home/Home.jsx';
import AboutUs from './Component/Page/Aboutus';
import ContactUs from './Component/Page/Contactus';
import FruitDetails from './Component/Page/FruitsDetails';
import SummaryPage from './Component/Page/Summary';
import LogIn from './Component/Page/User/LogIn.js';
import TermsAndConditionsPage from './Component/Page/Tac';
import Navigation from './Component/Page/Navigation';
import PrivateDashboard from './Component/PrivateRoutes/PrivateDashboard';
import PLogin from './Component/PrivateRoutes/page/Login';
import FruitsForm from './Component/Page/FruitsForm';
import Offer from './Component/Page/Offer';
import Signupmog from './Component/Page/SignupMog';
import Cart from './Component/Page/Cart';
import Bcart from './Component/Page/Bcart';
import UserForm from './Component/Page/User/UserForm';
import Register from './Component/Page/Register.jsx';
import { UserProvider } from './Component/Page/User/UserContext.jsx';

function App() {
  return (
    <UserProvider>
    <div>
      <Navigation />

      <Routes>
       
          <Route path="/private/*" element={<PrivateDashboard />} />
          <Route path="/private/login" element={<PLogin />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/fruits" element={<FruitList />} />
          <Route path="/fruitform" element={<FruitsForm />} />
          <Route path="/fruits/:fruitId" element={<FruitDetails />} />
          <Route path="/aboutus/tac" element={<TermsAndConditionsPage />} />
          <Route path="/aboutus" element={<AboutUs />} />
          <Route path="/contactus" element={<ContactUs />} />
          <Route path="/order-summary" element={<SummaryPage />} />
          <Route path="/trmsandcdn" element={<TermsAndConditionsPage />} />
          <Route path="/offer" element={<Offer />} />
          <Route path="/SignIn" element={<LogIn/>} />
         
          <Route path="/" element={<Home />} />
          <Route path='/Signupmog' element={<Signupmog/>}/>
          <Route path='/bcart' element={<Bcart/>}/>
       
      </Routes>
      <Footer />
    </div>
    </UserProvider>
  );
}

export default App;
