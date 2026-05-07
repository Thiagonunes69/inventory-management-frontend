import "../Dashboard.css"
import "./produtos.css"
import Horizontalbar from "../horizontalbarPasta/horizontalbar"
import Sidebar from "../sidebarPasta/Sidebartemp"
import { useState, useEffect } from "react";
import { AiFillProduct, AiOutlineCheck, AiOutlineClose, AiFillExclamationCircle, AiOutlineSearch} from "react-icons/ai";
import ListagemProdutos from "./listarProdutos/ListagemProdutos";
import AdicionarProduto from "./adicionarProduto/AdicionarProduto";

function Produtos() {

  const [busca, setBusca] = useState("");
  const [categoria, setCategoria] = useState("todos");
  const [status, setStatus] = useState("todos"); 
  const [mostrarAdicionar, setMostrarAdicionar] = useState(false);
  const [resumo, setResumo] = useState({
  total: 0,
  emEstoque: 0,
  estoqueBaixo: 0,
  esgotados: 0,
});

useEffect(() => {
  const fetchResumo = async () => {
    const response = await fetch(
      "http://localhost:8080/api/produtos/resumo",
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    const data = await response.json();
    setResumo(data);
  };

  fetchResumo();
}, []);
  return (
    <div className="main">
        <Sidebar/>
        <div className="DashBoard">
            <Horizontalbar/>
            <section className="topDivProdutos">
                <div>
                    <h1>Produtos</h1>
                    <h2>Gerencie seu catálogo de produtos</h2>
                </div>
                <div className="produtosPesquisa">
                    <div className="bnt-pesquisarProduto">
                        <AiOutlineSearch/>
                        <input 
                            type="text" 
                            placeholder="Buscar..."
                            onChange={(e) => setBusca(e.target.value)}
                        />
                    </div>
                    <select onChange={(e) => setCategoria(e.target.value)}>
                        <option value="todos">Todas as Categorias</option>
                        <option value="Periféricos">Periféricos</option>
                        <option value="Acessórios">Acessórios</option>
                        <option value="Displays">Displays</option>
                    </select>
                    <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="todos">Todos status</option>
                        <option value="ok">Em estoque</option>
                        <option value="baixo">Estoque baixo</option>
                        <option value="esgotado">Esgotado</option>
                    </select>
                    <button onClick={() => setMostrarAdicionar(true)}>+ Novo Produto</button>
                </div>
            </section>
            <section className="bodyDashBoard">
                <div className="card noneAnimation">
                    <AiFillProduct/>
                    <div>
                        <h1>Total Produtos</h1>
                        <p>{resumo.total}</p>
                    </div>
                </div>
                <div className="card noneAnimation">
                    <AiOutlineCheck  className="green"/>
                    <div>
                        <h1>Em Estoque</h1>
                        <p>{resumo.emEstoque}</p>
                    </div>
                </div>
                <div className="card noneAnimation">
                    <AiFillExclamationCircle className="yellow"/>
                    <div>
                        <h1>Estoque Baixo</h1>
                        <p>{resumo.estoqueBaixo}</p>
                    </div>
                </div>
                <div className="card noneAnimation">
                    <AiOutlineClose className="red"/>
                    <div>
                        <h1>Esgotados</h1>
                        <p>{resumo.esgotados}</p>
                    </div>
                </div>
            </section>
            <section className="listas">
                <ListagemProdutos busca={busca} categoria={categoria} status={status}/>
            </section>
            {mostrarAdicionar && (<AdicionarProduto fechar={() => setMostrarAdicionar(false)} />)}
        </div>
    </div>
  )
}

export default Produtos
