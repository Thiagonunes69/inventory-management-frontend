import { useState } from "react";
import '../Login.css'

function Login() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");

  function irLogin(){
    window.location.href = "/login";
  }
  const handleRegister = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:8080/auth/registrar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        nome,
        senha
      })
    });
    const text = await response.text();
    const data = text ? JSON.parse(text) : null;

    if (response.ok) {
      alert("Usuário criado!");
      window.location.href = "/login";
    }if (response.status === 409) {
        alert(data.message || "Usuário já existe");
    }else {
      alert(data.message || "Erro no cadastro");
    }

  } catch (error) {
    console.error(error);
  }
};
  return (
    <div className="forms">
      <section className="login">
        <div className="left-div">
            <h1>StockFlow</h1>
            <h1>Olá,<br/>seja bem vindo</h1>
            <p>Menos perdas, mais controle, melhores resultados.</p>
        </div>
        <div className="right-div">
            <div></div>
            <form onSubmit={handleRegister}>
                <label>Email: <input type="text" onChange={(e) => setEmail(e.target.value)}/></label>
                <label>Nome: <input type="text" onChange={(e) => setNome(e.target.value)}/></label>
                <label>Senha: <input type="password" onChange={(e) => setSenha(e.target.value)}/></label>
                <div className='bottom-form'>
                  <label><input type="checkbox"/>Remember me</label>
                  <a href="/registrar">Forgot password?</a>
                </div>
                <div className='submit'>
                    <input type="submit" value={"Sing Up"}/>
                    <input type="button" onClick={irLogin} value={"Login "}/>
                </div>
            </form>
            <div></div>
        </div>
      </section>
    </div>
  )
}

export default Login
