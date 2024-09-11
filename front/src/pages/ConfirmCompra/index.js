import React, { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "../../components/ui/Card";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import { SearchContext } from "../../contexts/SearchContext";

const ConfirmCompra = () => {
    const { user } = useAuth()
    const { loading, setLoading, carrinho } = useContext(SearchContext)

    const [totalCarrinho, setTotalCarrinho] = useState(0);

    const [nome, setNome] = useState("")
    const [enderecos, setEnderecos] = useState([])
    const [endereco, setEndereco] = useState("")

    const fetchEndereco = async () => {
        const resEndereco = await axios.get(`http://localhost:3003/sistema/enderecos/usuario/${user.id}`)
        let enderecoss = resEndereco.data.enderecos
        setEnderecos(enderecoss)
    }

    const handleChangeEndereco = (e) => {
        setEndereco(e.target.value)
    }

    const handleChangeNome = (e) => {
        setNome(e.target.value)
    }

    const handleSalvar = (e) => {

    }

    useEffect(() => {
        fetchEndereco()
        setLoading(false)
    }, [])


    useEffect(() => {
        const total = carrinho.reduce((acc, prod) => acc + prod.produto.preco_prod * prod.qtd, 0);
        setTotalCarrinho(total);
        setLoading(false);
    }, [carrinho, setLoading]);

    const base_url = "http://localhost:3003/sistema/produtos/files/users/"

    return (
        loading && <Loading /> || (
            <div className="flex flex-col items-center justify-center  bg-gray-100 p-4">
                <div className="flex flex-wrap justify-center space-x-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Confirmar Dados</CardTitle>
                            <CardDescription>Confirme o endereço de entrega do produto e a forma de pagamento.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="name">Nome do recebedor</label>
                                    <Input
                                        id="name"
                                        placeholder="Nome do recebedor da entrega."
                                        onChange={handleChangeNome}
                                    />
                                </div>
                                <select
                                    id="enderecoId"
                                    className="block h-10 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    value={endereco}
                                    onChange={handleChangeEndereco}
                                >
                                    <option value="" disabled>Selecione um endereço</option>
                                    {enderecos.map((endereco) => (
                                        <option key={endereco.id} value={endereco.id}>{endereco.logradouro}</option>
                                    ))}
                                </select>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <Button Text="Confirmar" onClick={handleSalvar} />
                        </CardFooter>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Carrinho</CardTitle>
                            <CardDescription>Confirme o pedido.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-6">
                                {carrinho.map((prod) => (
                                    <div
                                        key={prod.id}
                                        className="flex items-center justify-between border-b border-gray-300 pb-4 last:border-none"
                                    >
                                        <div>
                                            <img
                                                className="h-16 w-full object-contain md:w-16"
                                                src={`${base_url}${prod.produto.imagem_prod}`}
                                                alt={prod.produto.nome_prod}
                                            />
                                            <h3 className="text-lg font-semibold text-gray-800">
                                                {prod.produto.nome_prod}
                                            </h3>
                                            <p className="text-gray-600">
                                                {prod.qtd} x R$ {parseFloat(prod.produto.preco_prod).toFixed(2)}
                                            </p>
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <div className="text-right">
                                                <p className="font-semibold text-gray-800">
                                                    R$ {(prod.produto.preco_prod * prod.qtd).toFixed(2)}
                                                </p>
                                            </div>


                                        </div>
                                    </div>
                                ))}

                            </div>
                        </CardContent>
                        <CardFooter>
                            <p className="text-2xl font-bold text-gray-900">
                                R$ {totalCarrinho.toFixed(2)}
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        ))
}

export default ConfirmCompra