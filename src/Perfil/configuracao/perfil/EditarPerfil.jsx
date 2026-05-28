import "../configuracoes.css";

import Sidebar from "../../../d/sidebarPasta/Sidebartemp";
import Horizontalbar from "../../../d/horizontalbarPasta/Horizontalbar";

import {
  FaUser,
  FaCamera
} from "react-icons/fa";

export default function EditarPerfil() {

  return (
    <div className="dashboard-container main">

      <Sidebar />

      <div className="dashboard-content">

        <Horizontalbar />

        <main className="config-page">

          {/* TOPO */}
          <div className="config-top">

            <span className="breadcrumb">
              Configurações &gt; <b>Editar Perfil</b>
            </span>

            <h1>Editar Perfil</h1>

            <p>
              Atualize suas informações pessoais.
            </p>

          </div>

          {/* CONTEÚDO */}
          <div className="perfil-container">

            {/* FOTO */}
            <div className="perfil-foto-card">

              <h3>Foto de Perfil</h3>

              <div className="foto-preview">
                <FaUser />
              </div>

              <button className="btn-foto">
                <FaCamera />
                Alterar Foto
              </button>

              <span>
                JPG, PNG ou GIF. Máx 2MB.
              </span>

            </div>

            {/* FORM */}
            <div className="perfil-form-card">

              <div className="input-group">

                <label>Nome Completo</label>

                <input
                  type="text"
                  value="Thianunes Pereira"
                />

              </div>

              <div className="input-group">

                <label>E-mail</label>

                <input
                  type="email"
                  value="thianunes246@gmail.com"
                />

              </div>

              <div className="input-group">

                <label>Telefone</label>

                <input
                  type="text"
                  value="(11) 99999-9999"
                />

              </div>

              <div className="input-group">

                <label>Cargo</label>

                <input
                  type="text"
                  value="Administrador"
                />

              </div>

              <div className="input-group">

                <label>Loja</label>

                <select>

                  <option>Loja Central</option>
                  <option>Loja Norte</option>
                  <option>Loja Sul</option>

                </select>

              </div>

              <div className="perfil-actions">

                <button className="btn-salvar">
                  Salvar Alterações
                </button>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}