import React, { useState } from "react";
import axios from "axios";

import Input from "../../components/form/Input";
import Button from "../../components/form/Button";

const CadCategoria = ({ onClose, categoria }) => {
    const [nome_categoria, setNome_categoria] = useState(categoria ? categoria.nome_categoria : "")
    const [error, setError] = useState("")
    const handleSalvar = async () => {
        if(!nome_categoria){
            setError("Preencha os campos!")
            return
        }
        try {
            await axios.post("http://localhost:3003/sistema/categorias", {nome_categoria})
            onClose()
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Cadastro de categoria</h1>

            <div>
                <label className="block mb-2">Nome da categoria</label>
                <Input
                    type="text"
                    placeholder="Digite o nome da categoria"
                    value={nome_categoria}
                    onChange={(e) => [setNome_categoria(e.target.value), setError("")]}
                    className="mb-4"
                />

                <label className="block mb-2 text-red-500">{error}</label>
                <Button Text="Cadastrar" onClick={handleSalvar} className="mt-4" />
            </div>
        </div>
    )
}

export default CadCategoria