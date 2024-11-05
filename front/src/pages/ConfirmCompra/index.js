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
    const [frete, setFrete] = useState(0)

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

    const handleSalvar = async () => {
        if (!nome || !endereco) {
            setError("Preencha todos os campos!")
            return
        }
        try{
            const response = await axios.post("http://localhost:3003/sistema/pedidos", {
                nome_recebedor: nome,
                cpf_recebedor: cpf,
                valorTotal : totalCarrinho,
                carrinhoId: carrinho[0].carrinhoId,
                usuarioId: user.id,
                enderecoId: endereco
            })
            if(response){
                navigate("/meioPagamento")
            }
        }
        catch(err){
            setError("Erro ao confirmar pagamento")
            console.error(err)
        }
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
        setTotalCarrinho(total + frete);
        setLoading(false);
    }, [carrinho, setLoading, frete]);

    const base_url = "http://localhost:3003/sistema/produtos/files/users/"
    
    return (
        loading ? <Loading /> : (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-center text-gray-900 mb-10">Finalizar Compra</h1>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl">Confirmar Dados</CardTitle>
                                <CardDescription>Confirme o endereço de entrega do produto e a forma de pagamento.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    <div>
                                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700">Nome do recebedor</label>
                                        <Input
                                            id="nome"
                                            placeholder="Nome do recebedor da entrega"
                                            className="mt-1"
                                            onChange={(e) => [setNome(e.target.value), setError('')]}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="cpf" className="block text-sm font-medium text-gray-700">CPF do recebedor</label>
                                        <Input
                                            id="cpf"
                                            placeholder="CPF do recebedor da entrega"
                                            className="mt-1"
                                            onChange={handleCpf}
                                            value={cpf}
                                        />
                                    </div>
                                    {enderecos.length > 0 ? (
                                        <div>
                                            <label htmlFor="enderecoId" className="block text-sm font-medium text-gray-700">Endereço de entrega</label>
                                            <select
                                                id="enderecoId"
                                                className="block h-10 w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                value={endereco}
                                                onChange={(e) => [setEndereco(e.target.value), setError(''), setFrete(7)]}
                                            >
                                                <option value="" disabled>Selecione um endereço</option>
                                                {enderecos.map((endereco) => (
                                                    <option key={endereco.id} value={endereco.id}>{endereco.logradouro}</option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <button
                                            variant="outline"
                                            className="px-4 py-2 border border-gray-300 rounded-md text-sm text-gray-700 bg-white hover:bg-gray-50"
                                            onClick={openModal}
                                        >
                                            Adicionar novo endereço
                                        </button>
                                    )}
                                </div>
                                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" onClick={handleSalvar} Text="Ir para o pagamento" />
                            </CardFooter>
                        </Card>

                        <Card className="shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl">Carrinho</CardTitle>
                                <CardDescription>Confirme o pedido.</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-6">
                                    {carrinho.map((prod) => (
                                        <div key={prod.id} className="flex items-center space-x-4 py-4 border-b border-gray-200 last:border-b-0">
                                            <img
                                                className="h-20 w-20 rounded-md object-cover"
                                                src={`${base_url}${prod.produto.imagem_prod}`}
                                                alt={prod.produto.nome_prod}
                                            />
                                            <div className="flex-1">
                                                <h3 className="text-lg font-semibold text-gray-900">{prod.produto.nome_prod}</h3>
                                                <p className="text-sm text-gray-600">{prod.qtd} x R$ {parseFloat(prod.produto.preco_prod).toFixed(2)}</p>
                                            </div>
                                            <p className="text-lg font-semibold text-gray-900">
                                                R$ {(prod.produto.preco_prod * prod.qtd).toFixed(2)}
                                            </p>
                                        </div>
                                    ))}
                                    <div className="flex justify-between items-center py-4 border-t border-gray-200">
                                        <p className="text-sm font-medium text-gray-700">Frete</p>
                                        <p className="text-lg font-semibold text-gray-900">R$ {frete.toFixed(2)}</p>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between items-center">
                                <p className="text-lg font-medium text-gray-700">Total</p>
                                <p className="text-2xl font-bold text-gray-900">R$ {totalCarrinho.toFixed(2)}</p>
                            </CardFooter>
                        </Card>
                    </div>
                </div>
                <Modal isOpen={isModalOpen} onClose={closeModal}>
                    <Endereco onClose={closeModal} endereco={enderecoEmEdicao} />
                </Modal>
            </div>
        )
    );
}

export default ConfirmCompra