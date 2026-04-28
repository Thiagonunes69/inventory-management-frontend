import { useState } from "react";
import '../Login.css'

function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  function irRegistrar(){
    window.location.href = "/registrar";
  }
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log(email,senha)
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          senha
        })
        
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("nome", JSON.stringify(data));
        alert("Login realizado!");
        window.location.href = "/dashboard";

      } else {
        alert(data.message || "Erro no login");
      }

    } catch (error) {
      console.error("Erro:", error);
      alert("Erro ao conectar com o servidor");
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
            <form onSubmit={handleLogin}>
                <label>Email: <input type="text" onChange={(e) => setEmail(e.target.value)}/></label>
                <label>Senha: <input type="password" onChange={(e) => setSenha(e.target.value)}/></label>
                <div className='bottom-form'>
                  <label><input type="checkbox"/>Remember me</label>
                  <a href="/registrar">Forgot password?</a>
                </div>
                <div className='submit'>
                    <input type="submit" value={"Login"}/>
                    <input type="button" onClick={irRegistrar} value={"Sing Up"}/>
                </div>
            </form>
            <div></div>
        </div>
      </section>
    </div>
  )
}

export default Login
