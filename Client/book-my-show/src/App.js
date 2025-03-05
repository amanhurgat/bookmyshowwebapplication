import logo from './logo.svg';
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import SingleMovie from './Pages/SingleMovie/SingleMovie';
import BookShow from './Pages/BookShow/BookShow';
import ForgetPassWord from './Pages/ForgetPassword/ForgetPassword';
import Reset from './Pages/Reset/Reset';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/movie/:id' element={<SingleMovie/>}></Route>
          <Route path='/movie/:movieId/book-show/:showId' element={<BookShow/>} />
          <Route path='/forget' element={<ForgetPassWord/>}/>
          <Route path='/reset' element={<Reset/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
