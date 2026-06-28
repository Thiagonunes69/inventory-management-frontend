import "./configuracoes.css";

import Sidebar from "../../d/sidebarPasta/Sidebartemp";

import {
  FaUser,
  FaLock,
  FaBell,
  FaCog,
  FaShieldAlt,
  FaChevronRight
} from "react-icons/fa";
import Horizontalbar from "../../d/horizontalbarPasta/Horizontalbar";

export default function Configuracoes() {

  const opcoes = [
    {
      link:"editarPerfil",
      icon: <FaUser />,
      titulo: "Editar Perfil",
      descricao: "Atualize suas informações pessoais e de contato"
    },
    {
      link:"alterarSenha",
      icon: <FaLock />,
      titulo: "Alterar Senha",
      descricao: "Altere sua senha de acesso à plataforma"
    },
    {
      link:"#",
      icon: <FaBell />,
      titulo: "Notificações - em breve",
      descricao: "Gerencie suas preferências de notificações"
    },
    {
      link:"#",
      icon: <FaCog />,
      titulo: "Preferências - em breve",
      descricao: "Configurações gerais da plataforma"
    },
    {
      link:"/seguranca",
      icon: <FaShieldAlt />,
      titulo: "Segurança",
      descricao: "Gerencie sessões e dispositivos conectados"
    }
  ];

  return (
    <div className="dashboard-container main">

      <Sidebar />

      <div className="dashboard-content">

        {/* HEADER */}
        <Horizontalbar/>

        {/* CONTEÚDO */}
        <main className="config-page">

          <div className="config-top">

            <h1>Configurações</h1>

            <p>
              Gerencie suas preferências e configurações da conta.
            </p>

          </div>

          {/* CARDS */}
          <div className="config-list">

            {opcoes.map((item, index) => (
              <a href={item.link}>
              <div className="config-card" key={index}>

                <div className="config-left">

                  <div className="config-icon">
                    {item.icon}
                  </div>

                  <div className="config-info">

                    <h2>{item.titulo}</h2>

                    <p>{item.descricao}</p>

                  </div>

                </div>

                <FaChevronRight className="arrow-icon" />

              </div>
              </a>

            ))}

          </div>

        </main>

      </div>

    </div>
  );
}