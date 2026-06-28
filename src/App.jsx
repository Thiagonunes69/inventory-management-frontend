import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css"
import Login from "./login/login/Login";
import Registrar from "./login/registrar/Registrar";
import DashBoard from "./d/stockboard/Stockboard";
import Produtos from "./d/produtos/Produtos";
import Movimentacao from "./d/movimentacao/Movimentacao";
import ListagemProdutos from "./d/produtos/listarProdutos/ListagemProdutos";
import Relatorio from "./d/relatorio/Relatorio";
import EstoqueBaixo from "./d/estoqueBaixo/EstoqueBaixo"
import Configuracoes from "./Perfil/configuracao/Configuracoes";
import EditarPerfil from "./Perfil/configuracao/perfil/EditarPerfil";
import AlterarSenha from "./Perfil/configuracao/alterarSenha/AlterarSenha";
import Seguranca from "./Perfil/configuracao/seguranca/Seguranca";

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
        <Route path='/relatorio' element={<Relatorio/>}></Route>
        <Route path="/estoque-baixo" element={<EstoqueBaixo/>}></Route>
        <Route path="/configuracao" element={<Configuracoes/>}></Route>
        <Route path="/editarPerfil" element={<EditarPerfil/>}></Route>
        <Route path="/alterarSenha" element={<AlterarSenha/>}></Route>
        <Route path="/seguranca" element={<Seguranca/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
