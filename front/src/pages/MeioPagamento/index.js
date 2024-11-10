import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';

import { SearchContext } from '../../contexts/SearchContext';

import Loading from '../../components/Loading';
import { Payment } from '@mercadopago/sdk-react';
import Pagamento from '../Pagamento';
import useAuth from '../../hooks/useAuth';
import { useParams } from 'react-router-dom';
const MeioPagamento = () => {
    const { id } = useParams()
    const { loading, setLoading } = useContext(SearchContext)
    const { user } = useAuth()
    const [preferenceId, setPreferenceId] = useState(null)
    const [paymentId, setPaymentId] = useState(null)
    const [pedido, setPedido] = useState({})
    const [itensPedido, setItensPedido] = useState([])

    useEffect(() => {
        const fetchPedido = async () => {
            try {
                const response = await axios.get(`http://localhost:3003/sistema/pedidos/${user.id}/${id}`)
                setPedido(response.data)
            }
            catch (err) {
                console.error(err)
            }
        }


        fetchPedido()
        setLoading(false);
    }, [id, user.id]);
    const fetchItensPedido = async () => {
        if (!pedido) return
        try {
            const response = await axios.get(`http://localhost:3003/sistema/itens-carrinho/${pedido.carrinhoId}`)
            setItensPedido(response.data)
        }
        catch (error) {
            console.error(error)
        }
    }

    const createPreference = async () => {
        if (!itensPedido || !pedido) return;
        try {
            const items = await itensPedido.map(prod => ({
                id: `${prod.produto.id}`,
                title: prod.produto.nome_prod,
                quantity: prod.qtd,
                unit_price: prod.produto.preco_prod
            }));
            console.log(items)
            const response = await axios.post("http://localhost:3003/sistema/create-preference", { items })

            setPreferenceId(response.data.preferenceId)
        }
        catch (error) {
            console.error("Erro ao criar a preferência de pagamento:", error);
        }
    }

    useEffect(() => {
        if (pedido) fetchItensPedido()
    }, [pedido])

    useEffect(() => {
        if (pedido) createPreference()
    }, [itensPedido])

    function toBRL(preco) {
        return preco.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        });
    }
    const customization = {
        paymentMethods: {
            bankTransfer: "all",
            creditCard: "all",
            debitCard: "all",
            mercadoPago: "all",
        },
    };
    const onSubmit = async (
        { selectedPaymentMethod, formData }
    ) => {
        // callback chamado ao clicar no botão de submissão dos dados
        return new Promise((resolve, reject) => {
            console.log(JSON.stringify("FORM DATA: ", formData))
            fetch("http://localhost:3003/sistema/pagamento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((response) => {
                    //CARREGAR QRCODE
                    setPaymentId(response.id)
                    resolve();
                })
                .catch((error) => {
                    // lidar com a resposta de erro ao tentar criar o pagamento
                    reject();
                });
        });
    };
    const onError = async (error) => {
        // callback chamado para todos os casos de erro do Brick
        console.log(error);
    };
    const onReady = async () => {
        console.log("brick protno")
    };

    if (paymentId) {
        return <Pagamento paymentId={paymentId} />
    }

    return (
        (loading && <Loading />) || (
            <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                {preferenceId && pedido ? (

                    <div className="max-w-7xl mx-auto">
                        <Payment
                            initialization={{
                                amount: parseFloat(pedido.valorTotal),
                            }}
                            customization={customization}
                            onSubmit={onSubmit}
                            onReady={onReady}
                            onError={onError}
                        />
                        <p className="font-semibold text-lg text-gray-800">Valor: {toBRL(pedido.valorTotal)}</p>
                       
                    </div>

                ) : (
                    <Loading />
                )}
            </div>
        )
    );
}

export default MeioPagamento