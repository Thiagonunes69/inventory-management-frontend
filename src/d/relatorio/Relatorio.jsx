import "../Dashboard.css"
import "./relatorio.css"

import Horizontalbar from "../horizontalbarPasta/Horizontalbar"
import Sidebar from "../sidebarPasta/Sidebartemp"

import { useState, useEffect } from "react";
import { BiTransferAlt } from "react-icons/bi";
import { TbPackageImport,TbPackageExport,TbClock  } from "react-icons/tb";
import { AiFillProduct, AiOutlineCheck, AiOutlineClose, AiFillExclamationCircle, AiOutlineSearch} from "react-icons/ai";
import ListaMove from "../movimentacao/listarMovimentacao/ListaMove";
import Faturamento from "../stockboard/faturamentoPasta/Faturamento";
import GraficoPizza from "../graficoPizza/GraficoPizza";



function Relatorio() {


  const [busca, setBusca] = useState("");
  const [status, setStatus] = useState("todos"); 
  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");


// useEffect(() => {
//   const fetchResumo = async () => {
//     const response = await fetch(
//       "http://localhost:8080/api/transacoes/resumo",
//       {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       }
//     );
    
//     const data = await response.json();
//     data.ultimaTransicao = new Date(data.ultimaTransicao).toLocaleDateString("pt-BR");
//     setResumo(data);
//     console.log(data)
//   };

//   fetchResumo();
// }, []);
  return (
    <div className="main">
        <Sidebar/>
        <div className="DashBoard">
            <Horizontalbar/>
            <section className="topDivProdutos relatorio">
                <div>
                    <h1>Relatórios</h1>
                    <h2>Análise e acompanhe os dados do seu estoque.</h2>
                </div>
                <button onClick={() => setMostrarAdicionar(true)}>Gerar Relátorio</button>
            </section>
            <section className="produtosPesquisa relatorio">
                <div>
                    <h1>Tipo de Relátorio</h1>
                    <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="todos">Todos</option>
                        <option value="entradaSaida">Entrada e Saída</option>
                        <option value="sla">Sla</option>
                    </select>
                </div>
                <div>
                    <h1>Período</h1>
                    <div className="filtro-data">
                        <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)}/>
                        <span>até</span>
                        <input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} />
                    </div>
                </div>
                <div>
                    <h1>Categoría</h1>
                    <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="todos">Todos as Categorías</option>
                        <option value="ENTRADA">categoria</option>
                        <option value="SAIDA">categoria</option>
                    </select>
                </div>
                <div>
                    <h1>Produto</h1>
                    <select onChange={(e) => setStatus(e.target.value)}>
                        <option value="todos">Todos os Produtos</option>
                        <option value="ENTRADA">produto</option>
                        <option value="SAIDA">produto</option>
                    </select>
                </div>
            </section>
            <section className="relatorioBody">
                <div>
                    <div className="box relatorio">
                        <div className="boxTop">
                        <h1>Movimentações</h1>
                        </div>
                        <div className="boxBody">
                        <div>
                        </div>
                        <Faturamento/>
                        </div>
                    </div>
                    <div className="box relatorio">
                        <div className="boxTop">
                            <h1>Produtos Mais Movimentados</h1>
                            <p>Produtos com maior fluxo no período</p>
                        </div>
                        <div className="boxBody">

                        <GraficoPizza/>
                        </div>
                    </div>

                </div>
                <div className="box relatorio relatorioLista">
                    <div >
                        <h1>Produtos Mais Movimentados</h1>
                        <button><a href="/movimentacao">Ver Mais</a></button>
                    </div>
                    <div className="boxBody">
                        <ListaMove classname="listaRelatorio"/>
                    </div>
                    
                </div>
            </section>
            {/* {mostrarAdicionar && (<AdicionarMovimentacao fechar={() => setMostrarAdicionar(false)} />)} */}
        </div>
    </div>
  )
}

export default Relatorio
