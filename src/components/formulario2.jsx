"use client";

import { useState } from "react";

export default function ConsultaCep() {
    const [erro, setErro] = useState("");
    const [endereco, setEndereco] = useState({
        cep: "",
        rua: "",
        numero: "",
        bairro: "",
        estado: "",
        cidade: "",
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setEndereco((prev) => ({...prev, [name]: value,}));
    }

    async function buscarCep() {
        setErro("");

        const cepValido = endereco.cep.replace(/\D/g, "");
        console.log(cepValido);
        if (cepValido.length !== 8) {
            setErro("CEP deve conter 8 números.");
            return;
        }

        try {
            const resposta = await fetch(`https://viacep.com.br/ws/${cepValido}/json/`);
            const dados = await resposta.json();

            if (dados.erro) {
                setErro("CEP não encontrado!");
                return;
            }

            setEndereco((prev) => ({
                ...prev,
                rua: dados.logradouro,
                bairro: dados.bairro,
                cidade: dados.localidade,
                estado: dados.uf,
            }));

        } catch (error) {
            setErro("Erro ao consultar a API do ViaCEP.");
        }
    }

    return (
        <div>
            <h2>Formulário de Endereço</h2>
            <form className="flex flex-col gap-2">
                <input type="text" name="cep" placeholder="CEP" value={endereco.cep} onChange={handleChange} onBlur={buscarCep}/>
                {erro && (<p className="text-center text-sm text-red-500">{erro}</p>)}
                <input type="text" name="rua" placeholder="Rua" value={endereco.rua} onChange={handleChange}/>
                <input type="text" name="numero" placeholder="Número" value={endereco.numero} onChange={handleChange}/>
                <input type="text" name="bairro" placeholder="Bairro" value={endereco.bairro} onChange={handleChange}/>
                <input type="text" name="cidade" placeholder="Cidade" value={endereco.cidade}onChange={handleChange}/>
                <input type="text" name="estado" placeholder="Estado" value={endereco.estado} onChange={handleChange}/>
            </form>
    </div>
  );
}
