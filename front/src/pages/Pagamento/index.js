import React, { useContext, useState, useEffect } from 'react'
import { SearchContext } from '../../contexts/SearchContext';

import Loading from '../../components/Loading';
import { IoMdClipboard } from "react-icons/io";

import { initMercadoPago, Payment } from '@mercadopago/sdk-react'
initMercadoPago('APP_USR-15eb2b97-8397-4e03-a0cb-efe245ed9274');

const Pagamento = () => {
    const [totalCarrinho, setTotalCarrinho] = useState(0)
    const { loading, setLoading, carrinho, setCarrinho, carrinhoId } = useContext(SearchContext)

    useEffect(() => {
        const total = carrinho.reduce((acc, prod) => acc + prod.produto.preco_prod * prod.qtd, 0);
        setTotalCarrinho(total);
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
        preferenceId: "<PREFERENCE_ID>",
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
        console.log(formData)
        return new Promise((resolve, reject) => {
            fetch("localhost:3003/sistema/pagamento", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            })
                .then((response) => response.json())
                .then((response) => {
                    // receber o resultado do pagamento
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
        /*
          Callback chamado quando o Brick estiver pronto.
          Aqui você pode ocultar loadings do seu site, por exemplo.
        */
       <Loading/>
    };

    return (
        (loading && <Loading />) || (
            <div className="w-full max-w-md p-6 mx-auto bg-white shadow-md rounded-lg">
                <Payment
                    initialization={initialization}
                    customization={customization}
                    onSubmit={onSubmit}
                    onReady={onReady}
                    onError={onError}
                />

                <p className="font-semibold text-lg text-gray-800">Valor: R$ {toBRL(totalCarrinho)}</p>
            </div>
        ))
}

export default Pagamento