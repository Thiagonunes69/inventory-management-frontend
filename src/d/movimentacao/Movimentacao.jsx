import "../Dashboard.css"

import Horizontalbar from "../horizontalbarPasta/horizontalbar"
import Sidebar from "../sidebarPasta/Sidebartemp"
import { useState, useEffect } from "react";
import { BiTransferAlt } from "react-icons/bi";
import { TbPackageImport,TbPackageExport,TbClock  } from "react-icons/tb";
import { AiFillProduct, AiOutlineCheck, AiOutlineClose, AiFillExclamationCircle, AiOutlineSearch} from "react-icons/ai";
import ListaMove from "./listarMovimentacao/ListaMove";
import AdicionarMovimentacao from "./adicionarMovimentacao/AdicionarMovimentacao";


function Movimentacao() {

const [dataInicio, setDataInicio] = useState("");
const [dataFim, setDataFim] = useState("");

const [mostrarAdicionar, setMostrarAdicionar] = useState(false);
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
                            
                        />
                    </div>
                    <select>
                        <option value="todos">Todas as Categorias</option>
                        <option value="Periféricos">Periféricos</option>
                        <option value="Acessórios">Acessórios</option>
                        <option value="Displays">Displays</option>
                    </select>
                    <select>
                        <option value="todos">Todos os Tipos</option>
                        <option value="ok">Entrada</option>
                        <option value="baixo">Saida</option>
                        <option value="esgotado">Esgotado</option>
                    </select>

                    <div className="filtro-data">
                        <input
                            type="date"
                            value={dataInicio}
                            onChange={(e) => setDataInicio(e.target.value)}
                        />
                        <span>até</span>
                        <input
                            type="date"
                            value={dataFim}
                            onChange={(e) => setDataFim(e.target.value)}
                        />
                        </div>
                    <button onClick={() => setMostrarAdicionar(true)}>+ Nova Movimentação</button>
                </div>
            </section>
            <section className="bodyDashBoard">
                <div className="card noneAnimation">
                    <BiTransferAlt/>
                    <div>
                        <h1>Total Movimentações</h1>
                        <p>1</p>
                    </div>
                </div>
                <div className="card noneAnimation">
                    <TbPackageImport  className="green"/>
                    <div>
                        <h1>Entradas</h1>
                        <p>1</p>
                    </div>
                </div>
                <div className="card noneAnimation">
                    <TbPackageExport className="red"/>
                    <div>
                        <h1>Saidas</h1>
                        <p>1</p>
                    </div>
                </div>
                <div className="card noneAnimation">
                    <TbClock className="blue"/>
                    <div>
                        <h1>Ultima movimentação</h1>
                        <p>1</p>
                    </div>
                </div>
            </section>
            <section className="listas">
                <ListaMove/>
            </section>
            {mostrarAdicionar && (<AdicionarMovimentacao fechar={() => setMostrarAdicionar(false)} />)}
        </div>
    </div>
  )
}

export default Movimentacao
