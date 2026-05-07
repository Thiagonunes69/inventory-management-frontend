import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css"
import Login from "./login/login/Login";
import Registrar from "./login/registrar/Registrar";
import DashBoard from "./d/stockboard/Stockboard";
import Produtos from "./d/produtos/Produtos";
import Movimentacao from "./d/movimentacao/Movimentacao";
import ListagemProdutos from "./d/produtos/listarProdutos/ListagemProdutos";

function App() {
  
  return (

    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/registrar' element={<Registrar/>}></Route>
        <Route path='/dashBoard' element={<DashBoard/>}></Route>
        <Route path='/produtos' element={<Produtos/>}></Route>
        <Route path='/movimentacao' element={<Movimentacao/>}></Route>
        <Route path='/testes' element={<ListagemProdutos/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
