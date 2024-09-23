import React, { useContext, useState, useEffect } from 'react'
import axios from 'axios';

import { SearchContext } from '../../contexts/SearchContext';

import Loading from '../../components/Loading';
import { Payment } from '@mercadopago/sdk-react';
import Pagamento from '../Pagamento';

const MeioPagamento = () => {
    const [totalCarrinho, setTotalCarrinho] = useState(0)
    const { loading, setLoading, carrinho, setCarrinho, carrinhoId } = useContext(SearchContext)
    const [preferenceId, setPreferenceId] = useState(null)
    const [paymentId, setPaymentId] = useState(null)

    useEffect(() => {
        const total = carrinho.reduce((acc, prod) => acc + prod.produto.preco_prod * prod.qtd, 0);
        setTotalCarrinho(total);

        const createPreference = async () => {
            try {
                const items = await carrinho.map(prod => ({
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

        createPreference()
        setLoading(false);
    }, [carrinho, setLoading]);

    function toBRL(preco) {
        return preco.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
        });
    }

    const initialization = {
        amount: totalCarrinho,
    };
    const customization = {
        paymentMethods: {
            ticket: "all",
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

    if(paymentId){
        return <Pagamento paymentId={paymentId} />
    }

    return (
        (loading && <Loading />) || (
            <div className="w-full max-w-md p-6 mx-auto bg-white shadow-md rounded-lg">
                {preferenceId ? (
                    <>
                        <Payment
                            initialization={initialization}
                            customization={customization}
                            onSubmit={onSubmit}
                            onReady={onReady}
                            onError={onError}
                        />
                        <p className="font-semibold text-lg text-gray-800">Valor: {toBRL(totalCarrinho)}</p>
                    </>
                ) : (
                    <Loading />
                )}

            </div>
        ))
}

export default MeioPagamento