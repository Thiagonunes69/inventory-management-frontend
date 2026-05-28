import "./sidebar.css"
import { FaUser, FaBox, FaHistory, FaChartBar, FaExclamationTriangle } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import logo from "../../logo/logoTemp.svg";

function Sidebar() {

  return (
    <>
      <div className="sidebar">

        <div className="sidebarTop">
          <img src={logo} alt="Logo" />
        </div>

        <div className="sidebarBody">

          <a href="/dashboard">
            <MdOutlineDashboard />
            <span>StockBoard</span>
          </a>

          <a href="/produtos">
            <FaBox />
            <span>Produtos</span>
          </a>

          <a href="/movimentacao">
            <FaHistory />
            <span>Movimentações</span>
          </a>

          <a href="/relatorio">
            <FaChartBar />
            <span>Relatórios</span>
          </a>

          <a href="/estoque-baixo">
            <FaExclamationTriangle />
            <span>Estoque Baixo</span>
          </a>

        </div>
        <a className="sidebarBottom" href="/configuracao">
          <FaUser />
          <div>
            <h1>nome</h1>
            <p>role</p>
          </div>
        </a>
      </div>
    </>
  )
}

export default Sidebar