import "./horizontalbar.css"
import { FaUser} from "react-icons/fa";
function Horizontalbar() {
  const usuario = JSON.parse(localStorage.getItem("nome"));
  return (
    <>
        <div className="horizontalbar">
            <div><h1>Bem vindo, {usuario?.nome}!</h1></div>
            <div><FaUser/></div>
        </div>
    </>
  )
}

export default Horizontalbar