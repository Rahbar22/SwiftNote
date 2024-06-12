import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './screen/LandingPage';
import Notes from './screen/Notes';
import LoginPage from './screen/LoginPage';
import RegisterPage from './screen/RegisterPage';
import CreateNote from './screen/createNote';
import EditNote from './screen/editNote';
import { useState } from 'react';
import ProfileScreen from './screen/ProfileScreen';

function App() {
  const [search, setSearch] = useState("");

  return (
    <Router>
    <Header setSearch={setSearch}></Header>
    <main>
      <Routes>
        <Route exact path="/" element={<LandingPage/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/register" element={<RegisterPage/>}/>
        <Route path="/createnote" element={<CreateNote/>}/>
        <Route path="/note/:id" element={<EditNote/>}/>
        <Route path='/mynotes' element={<Notes search={search}></Notes>}/>
        <Route path='/profile' element={<ProfileScreen/>}></Route>
      </Routes>
    </main>
    <Footer></Footer>
    </Router>
  );
}

export default App;
