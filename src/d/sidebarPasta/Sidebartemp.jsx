import "./sidebar.css"
import { FaUser,FaBox,FaHistory,FaChartBar,FaExclamationTriangle    } from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import logo from "../../logo/logoTemp.svg";
function Sidebar() {
  
  return (
    <>
        <div className="sidebar">
            <div className="sidebarTop">
              <img src={logo} alt="" />
            </div>
            <div className="sidebarBody">
              <div><MdOutlineDashboard/><a href="/dashboard">StockBoard</a></div>
              <div><FaBox/><a href="/produtos">Produtos</a></div>
              <div><FaHistory/><a href="movimentacao">Movimentações</a></div>
              <div><FaChartBar/>Relatórios</div>
              <div><FaExclamationTriangle/>Estoque Baixo</div>
            </div>
            <div className="sidebarBottom">
              <FaUser/>
              <div>
                <h1>nome</h1>
                <p>role</p>
              </div>
            </div>
        </div>
    </>
  )
}

export default Sidebar
