import { useState } from "react";
import "../configuracoes.css";

import Sidebar from "../../../d/sidebarPasta/Sidebartemp";
import Horizontalbar from "../../../d/horizontalbarPasta/Horizontalbar";

import {
  FaLock,
  FaKey
} from "react-icons/fa";

import { apiFetch } from "../../../segurança/Api";

export default function AlterarSenha() {

  const [senhas, setSenhas] = useState({
    senhaAtual: "",
    senhaNova: "",
    senhaConfirmacao: ""
  });

  async function alterarSenha() {

    try {

      const response = await apiFetch(
        "/api/usuarios/eu/redefinirSenhaLogado",
        {
          method: "PUT",
          body: JSON.stringify(senhas)
        }
      );

      const mensagem = await response.text();

      if (!response.ok) {
        throw new Error(mensagem);
      }

      alert(mensagem);

      setSenhas({
        senhaAtual: "",
        senhaNova: "",
        senhaConfirmacao: ""
      });

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

          {/* TOPO */}
          <div className="config-top">

            <span className="breadcrumb">
              <a href="/configuracao">Configurações</a> &gt; <b>Alterar Senha</b>
            </span>

            <h1>Alterar Senha</h1>

            <p>
              Atualize sua senha para manter sua conta protegida.
            </p>

          </div>

          {/* CONTEÚDO */}
          <div className="perfil-container">

            {/* CARD LATERAL */}
            <div className="perfil-foto-card">

              <h3>Segurança da Conta</h3>

              <div className="foto-preview">
                <FaLock />
              </div>

              <button className="btn-foto">
                <FaKey />
                Dicas de Segurança
              </button>

              <span>
                Utilize uma senha forte com letras, números e caracteres especiais.
              </span>

            </div>

            {/* FORM */}
            <div className="perfil-form-card">

              <div className="input-group">

                <label>Senha Atual</label>

                <input
                  type="password"
                  placeholder="Digite sua senha atual"
                  value={senhas.senhaAtual}
                  onChange={(e) =>
                    setSenhas({
                      ...senhas,
                      senhaAtual: e.target.value
                    })
                  }
                />

              </div>

              <div className="input-group">

                <label>Nova Senha</label>

                <input
                  type="password"
                  placeholder="Digite a nova senha"
                  value={senhas.senhaNova}
                  onChange={(e) =>
                    setSenhas({
                      ...senhas,
                      senhaNova: e.target.value
                    })
                  }
                />

              </div>

              <div className="input-group">

                <label>Confirmar Nova Senha</label>

                <input
                  type="password"
                  placeholder="Confirme a nova senha"
                  value={senhas.senhaConfirmacao}
                  onChange={(e) =>
                    setSenhas({
                      ...senhas,
                      senhaConfirmacao: e.target.value
                    })
                  }
                />

              </div>

              <div className="perfil-actions">

                <button
                  className="btn-salvar"
                  onClick={alterarSenha}
                >
                  Alterar Senha
                </button>

              </div>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
}