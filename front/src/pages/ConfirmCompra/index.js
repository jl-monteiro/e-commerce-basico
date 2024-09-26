import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Card, CardTitle, CardHeader, CardDescription, CardContent, CardFooter } from "../../components/ui/Card";
import Input from "../../components/form/Input";
import Button from "../../components/form/Button";
import useAuth from "../../hooks/useAuth";
import Loading from "../../components/Loading";
import { SearchContext } from "../../contexts/SearchContext";
import Endereco from "../Endereco";
import Modal from "../../components/Modal";


const ConfirmCompra = () => {
    const { user } = useAuth()
    const { loading, setLoading, carrinho } = useContext(SearchContext)

    const [totalCarrinho, setTotalCarrinho] = useState(0);

    const [nome, setNome] = useState("")
    const [enderecos, setEnderecos] = useState([])
    const [endereco, setEndereco] = useState("")
    const [cpf, setCpf] = useState("")

    const [error, setError] = useState("")
    const navigate = useNavigate();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [enderecoEmEdicao, setEnderecoEmEdicao] = useState(null)

    const fetchEndereco = async () => {
        const resEndereco = await axios.get(`http://localhost:3003/sistema/enderecos/usuario/${user.id}`)
        let enderecoss = resEndereco.data.enderecos
        setEnderecos(enderecoss)
    }

    const handleSalvar = () => {
        if (!nome || !endereco) {
            setError("Preencha todos os campos!")
            return
        }

        navigate("/meioPagamento")
    }

    const handleCpf = async (e) => {
        const value = e.target.value

        const onlyNum = value.replace(/\D/g, "")
        let cpfFormatado = onlyNum
        if (onlyNum.length > 3) {
            cpfFormatado = `${onlyNum.slice(0, 3)}.${onlyNum.slice(3, 6)}.${onlyNum.slice(6, 9)}-${onlyNum.slice(9, 11)}`
        }

        setCpf(cpfFormatado)
        setError('')
    }

    const openModal = (tipo, endereco = null) => {
        setEnderecoEmEdicao(endereco)
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEnderecoEmEdicao(null)
    };

    useEffect(() => {
        fetchEndereco()
        setLoading(false)
    }, [isModalOpen])


    useEffect(() => {
        const total = carrinho.reduce((acc, prod) => acc + prod.produto.preco_prod * prod.qtd, 0);
        setTotalCarrinho(total);
        setLoading(false);
    }, [carrinho, setLoading]);

    const base_url = "http://localhost:3003/sistema/produtos/files/users/"

    return (
        loading && <Loading /> || (
            <div className="flex flex-col items-center justify-center p-4">
                <div className="flex flex-wrap justify-center space-x-8">
                    <Card>
                        <CardHeader>
                            <CardTitle>Confirmar Dados</CardTitle>
                            <CardDescription>Confirme o endereço de entrega do produto e a forma de pagamento.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="nome">Nome do recebedor</label>
                                    <Input
                                        id="nome"
                                        placeholder="Nome do recebedor da entrega."
                                        onChange={(e) => [setNome(e.target.value), setError('')]}
                                    />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <label htmlFor="cpf">CPF do recebedor</label>
                                    <Input
                                        id="cpf"
                                        placeholder="CPF do recebedor da entrega."
                                        onChange={handleCpf}
                                        value={cpf}
                                    />
                                </div>
                                {enderecos.length > 0 ? (
                                    <select
                                        id="enderecoId"
                                        className="block h-10 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        value={endereco}
                                        onChange={(e) => [setEndereco(e.target.value), setError('')]}
                                    >
                                        <option value="" disabled>Selecione um endereço</option>
                                        {enderecos.map((endereco) => (
                                            <option key={endereco.id} value={endereco.id}>{endereco.logradouro}</option>
                                        ))}
                                    </select>
                                ) : (

                                    <button
                                        className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                                        onClick={openModal}
                                    >
                                        Adicionar novo endereço
                                    </button>
                                )}
                            </div>
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                        </CardContent>

                        <CardFooter>
                            <Button Text="Ir para o pagamento" onClick={handleSalvar} />
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
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <Endereco onClose={closeModal} endereco={enderecoEmEdicao} />
                </Modal>
            </div>

        ))
}

export default ConfirmCompra