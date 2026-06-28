import "../configuracoes.css";

import Sidebar from "../../../d/sidebarPasta/Sidebartemp";
import Horizontalbar from "../../../d/horizontalbarPasta/Horizontalbar";

import {
    FaShieldAlt,
    FaDesktop,
    FaMobileAlt,
    FaStore,
    FaLink,
    FaTimesCircle
} from "react-icons/fa";

export default function Seguranca() {

    return (
        <div className="dashboard-container main">

            <Sidebar />

            <div className="dashboard-content">

                <Horizontalbar />

                <main className="config-page">

                    {/* TOPO */}
                    <div className="config-top">

                        <span className="breadcrumb">
                            <a href="/configuracao">Configurações</a> &gt; <b>Segurança</b>
                        </span>

                        <h1>Segurança  - em breve</h1>

                        <p>
                            Gerencie sessões ativas, dispositivos conectados e integrações com marketplaces.
                        </p>

                    </div>

                    <div className="perfil-container">

                        {/* CARD ESQUERDO */}
                        <div className="perfil-foto-card">

                            <h3>Status da Conta</h3>

                            <div className="foto-preview">
                                <FaShieldAlt />
                            </div>

                            <button className="btn-foto">
                                Conta Protegida
                            </button>

                            <span>
                                Mantenha sua senha segura e revise periodicamente os dispositivos conectados.
                            </span>

                        </div>

                        {/* CARD DIREITO */}
                        <div className="perfil-form-card">

                            <h3>Dispositivos Conectados</h3>

                            <div className="config-card">

                                <div className="config-left">

                                    <div className="config-icon">
                                        <FaDesktop />
                                    </div>

                                    <div className="config-info">
                                        <h2>Windows - Chrome</h2>
                                        <p>São Paulo • Sessão Atual</p>
                                    </div>

                                </div>

                                <button className="btn-salvar">
                                    Atual
                                </button>

                            </div>

                            <div className="config-card">

                                <div className="config-left">

                                    <div className="config-icon">
                                        <FaMobileAlt />
                                    </div>

                                    <div className="config-info">
                                        <h2>Android</h2>
                                        <p>Último acesso há 2 dias</p>
                                    </div>

                                </div>

                                <button className="btn-foto">
                                    Encerrar
                                </button>

                            </div>
                            <div className="perfil-actions">

                                    <button className="btn-foto">
                                        <FaTimesCircle />
                                        Encerrar Todas as Sessões
                                    </button>

                                </div>
                            <hr />

                            <h3>Integrações com Marketplaces</h3>

                            <div className="config-card">

                                <div className="config-left">

                                    <div className="config-icon">
                                        <FaStore />
                                    </div>

                                    <div className="config-info">
                                        <h2>Shopee</h2>
                                        <p>Conta não conectada</p>
                                    </div>

                                </div>

                                <button className="btn-salvar">
                                    Em breve
                                </button>

                            </div>

                            <div className="config-card">

                                <div className="config-left">

                                    <div className="config-icon">
                                        <FaStore />
                                    </div>

                                    <div className="config-info">
                                        <h2>Mercado Livre</h2>
                                        <p>Conta não conectada</p>
                                    </div>

                                </div>

                                <button className="btn-salvar">
                                    Em breve
                                </button>

                            </div>

                            <div className="config-card">

                                <div className="config-left">

                                    <div className="config-icon">
                                        <FaStore />
                                    </div>

                                    <div className="config-info">
                                        <h2>TikTok Shop</h2>
                                        <p>Conta não conectada</p>
                                    </div>

                                </div>

                                <button className="btn-salvar">
                                    Em breve
                                </button>

                            </div>

                            <div className="config-card">

                                <div className="config-left">

                                    <div className="config-icon">
                                        <FaLink />
                                    </div>

                                    <div className="config-info">
                                        <h2>Outras Integrações</h2>
                                        <p>Amazon, Magalu, Shein e futuras plataformas.</p>
                                    </div>

                                </div>

                                <button className="btn-salvar">
                                    Em breve
                                </button>

                            </div>

                        </div>

                    </div>

                </main>

            </div>

        </div>
    );
}