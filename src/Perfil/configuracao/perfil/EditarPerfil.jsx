import { useEffect, useState } from "react";
import "../configuracoes.css";

import Sidebar from "../../../d/sidebarPasta/Sidebartemp";
import Horizontalbar from "../../../d/horizontalbarPasta/Horizontalbar";

import {
  FaUser,
  FaCamera
} from "react-icons/fa";

import { apiFetch } from "../../../segurança/Api";

export default function EditarPerfil() {

  const [usuario, setUsuario] = useState({
    nome: "",
    email: "",
    nomeEmpresa: "",
    senha: "",
    foto: ""
  });

  useEffect(() => {
    buscarMeusDados();
  }, []);

  async function buscarMeusDados() {

    try {

      const response = await apiFetch("/api/usuarios/eu/meusDados");

      if (!response.ok) {
        throw new Error("Erro ao buscar usuário.");
      }

      const data = await response.json();

      setUsuario(data);

    } catch (error) {

      console.error(error);

    }

  }

  async function salvarAlteracoes() {

    try {

      const response = await apiFetch("/api/usuarios/eu/editarMeusDados", {
        method: "PUT",
        body: JSON.stringify({
          nome: usuario.nome,
          email: usuario.email,
          nomeEmpresa: usuario.nomeEmpresa
        })
      });

      if (!response.ok) {

        const mensagem = await response.text();
        throw new Error(mensagem || "Erro ao atualizar perfil.");

      }

      const data = await response.json();

      setUsuario(data);

      alert("Perfil atualizado com sucesso!");

    } catch (error) {

      alert(error.message);

    }

  }

  return (
    <div className="dashboard-container main">

      <Sidebar />

      <div className="dashboard-content">

        <Horizontalbar />

        <main className="config-page">

          <div className="config-top">

            <span className="breadcrumb">
              <a href="/configuracao">Configurações</a> &gt; <b>Editar Perfil</b>
            </span>

            <h1>Perfil</h1>

            <p>
              Visualize e atualize suas informações pessoais.
            </p>

          </div>

          <div className="perfil-container">

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

            <div className="perfil-form-card">

              <div className="input-group">

                <label>Nome Completo</label>

                <input
                  type="text"
                  value={usuario.nome}
                  onChange={(e) =>
                    setUsuario({
                      ...usuario,
                      nome: e.target.value
                    })
                  }
                />

              </div>

              <div className="input-group">

                <label>Nome Empresa</label>

                <input
                  type="text"
                  value={usuario.nomeEmpresa}
                  onChange={(e) =>
                    setUsuario({
                      ...usuario,
                      nomeEmpresa: e.target.value
                    })
                  }
                />

              </div>

              <div className="input-group">

                <label>E-mail</label>

                <input
                  type="email"
                  value={usuario.email}
                  onChange={(e) =>
                    setUsuario({
                      ...usuario,
                      email: e.target.value
                    })
                  }
                />

              </div>

              <div className="input-group">

                <label>Senha</label>

                <input
                  type="password"
                  value={usuario.senha}
                  readOnly
                />

              </div>

              <div className="perfil-actions">

                <button
                  className="btn-salvar"
                  onClick={salvarAlteracoes}
                >
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