import "../Dashboard.css"
import "./stockboard.css"
import Sidebar from "../sidebarPasta/Sidebartemp";
import Horizontalbar from "../horizontalbarPasta/horizontalbar";
import { AiFillProduct, AiFillAlert, AiOutlineCodeSandbox, AiFillDollarCircle } from "react-icons/ai";
import Faturamento from "./faturamentoPasta/Faturamento";
import BestSaller from "./bestSaller/BestSaller";
import PedidosRecentes from "./pedidosRecentes/PedidosRecentes";
import LowVolume from "./LowVolume/LowVolume";

function DashBoard() {
  
  return (
    <div className="main">
      <Sidebar/>
      <section className="DashBoard">
        <Horizontalbar/>
        <section className="bodyDashBoard">
          <div className="card">
            <AiFillProduct/>
            <div>
              <h1>Total Produtos</h1>
              <p>190</p>
            </div>
          </div>
          <div className="card">
            <AiFillAlert/>
            <div>
              <h1>Estoque Baixo</h1>
              <p>15</p>
            </div>
          </div> 
          <div className="card">
            <AiOutlineCodeSandbox/>
            <div>
              <h1>Entradas</h1>
              <p>0</p>
            </div>
          </div>
          <div className="card">
            <AiOutlineCodeSandbox/>
            <div>
              <h1>Saida</h1>
              <p>3</p>
            </div>
          </div>
          <div className="box left faturamento">
            <div className="boxTop">
              <h1>Vendas Overview</h1>
            </div>
            <div className="boxBody">
              <div>
                <h2>Essa Semana</h2>
                <select name="data" id="dataForm">
                  <option value="semana">Semana</option>
                  <option value="mes">Mês</option>
                  <option value="ano">Ano</option>
                  <option value="anos">5 Anos</option>
                </select>
              </div>
              <Faturamento/>
            </div>
          </div>
          <div className="box">
            <div className="boxTop">
              <h1>Itens Mais Vendidos</h1>
            </div>
            <div className="boxBody">
              <div>
                <h2>Essa Semana</h2>
                <select name="data" id="dataForm">
                  <option value="semana">Semana</option>
                  <option value="mes">Mês</option>
                  <option value="ano">Ano</option>
                  <option value="anos">5 Anos</option>
                </select>
              </div>
              <BestSaller/>
            </div>
          </div>
          <div className="box bottom">
            <div className="boxTop">
              <h1>Pedidos Recentes</h1>
            </div>
            <div className="boxBody">
              <div>
                <h2></h2>
                <h2></h2>
              </div>
              <PedidosRecentes/>
            </div>
          </div>
          <div className="box bottom right">
            <div className="boxTop">
              <h1>Itens Mais Vendidos</h1>
            </div>
            <div className="boxBody">
              <div>
                <h2>Essa Semana</h2>
                <select name="data" id="dataForm">
                  <option value="semana">Semana</option>
                  <option value="mes">Mês</option>
                  <option value="ano">Ano</option>
                  <option value="anos">5 Anos</option>
                </select>
              </div>
              <LowVolume/>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}

export default DashBoard
