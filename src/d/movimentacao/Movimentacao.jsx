import "../Dashboard.css";

import Horizontalbar from "../horizontalbarPasta/Horizontalbar";
import Sidebar from "../sidebarPasta/Sidebartemp";

import { useState, useEffect } from "react";

import { BiTransferAlt } from "react-icons/bi";

import {
  TbPackageImport,
  TbPackageExport,
  TbClock
} from "react-icons/tb";

import { AiOutlineSearch } from "react-icons/ai";

import ListaMove from "./listarMovimentacao/ListaMove";
import AdicionarMovimentacao from "./adicionarMovimentacao/AdicionarMovimentacao";

// IMPORTA SUA FUNÇÃO
import { apiFetch } from "../../services/api";

function Movimentacao() {

  const [busca, setBusca] = useState("");

  const [status, setStatus] = useState("todos");

  const [resumo, setResumo] = useState({
    entrada: 0,
    saida: 0,
    total: 0,
    ultimaTransicao: 0,
  });

  const [dataInicio, setDataInicio] = useState("");
  const [dataFim, setDataFim] = useState("");

  const [mostrarAdicionar, setMostrarAdicionar] = useState(false);

  useEffect(() => {

    const fetchResumo = async () => {

      try {

        const response = await apiFetch(
          "/api/transacoes/resumo"
        );

        if (!response.ok) {
          throw new Error("Erro HTTP: " + response.status);
        }

        const data = await response.json();

        data.ultimaTransicao = new Date(
          data.ultimaTransicao
        ).toLocaleDateString("pt-BR");

        setResumo(data);

        console.log(data);

      } catch (erro) {

        console.log("Erro ao buscar resumo:", erro);

      }

    };

    fetchResumo();

  }, []);

  return (

    <div className="main">

      <Sidebar />

      <div className="DashBoard">

        <Horizontalbar />

        <section className="topDivProdutos">

          <div>

            <h1>Movimentações</h1>

            <h2>
              Acompanhe todas as entradas e saídas de produtos do estoque.
            </h2>

          </div>

          <div className="produtosPesquisa">

            <div className="bnt-pesquisarProduto">

              <AiOutlineSearch />

              <input
                type="text"
                placeholder="Buscar..."
                onChange={(e) => setBusca(e.target.value)}
              />

            </div>

            <select onChange={(e) => setStatus(e.target.value)}>

              <option value="todos">Todos os Tipos</option>
              <option value="ENTRADA">Entrada</option>
              <option value="SAIDA">Saida</option>

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

            <button onClick={() => setMostrarAdicionar(true)}>
              + Nova Movimentação
            </button>

          </div>

        </section>

        <section className="bodyDashBoard">

          <div className="card noneAnimation">

            <BiTransferAlt />

            <div>
              <h1>Total Movimentações</h1>
              <p>{resumo.total}</p>
            </div>

          </div>

          <div className="card noneAnimation">

            <TbPackageImport className="green" />

            <div>
              <h1>Entradas</h1>
              <p>{resumo.entrada}</p>
            </div>

          </div>

          <div className="card noneAnimation">

            <TbPackageExport className="red" />

            <div>
              <h1>Saidas</h1>
              <p>{resumo.saida}</p>
            </div>

          </div>

          <div className="card noneAnimation">

            <TbClock className="blue" />

            <div>
              <h1>Ultima movimentação</h1>
              <p>{resumo.ultimaTransicao}</p>
            </div>

          </div>

        </section>

        <section className="listas">

          <ListaMove
            busca={busca}
            status={status}
            dataInicio={dataInicio}
            dataFim={dataFim}
          />

        </section>

        {mostrarAdicionar && (
          <AdicionarMovimentacao
            fechar={() => setMostrarAdicionar(false)}
          />
        )}

      </div>

    </div>

  );
}

export default Movimentacao;