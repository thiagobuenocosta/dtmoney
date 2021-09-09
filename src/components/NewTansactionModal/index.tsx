import { FormEvent, useState } from "react";
import Modal from "react-modal";
import { useTransactions } from "../../hooks/useTransactions";

import closeImg from "../../assets/close.svg"
import incomeImg from "../../assets/income.svg"
import outcomeImg from "../../assets/outcome.svg"

import { Container, TransactionTypeContainer, RadioBox } from "./styles";

interface NewTansactionModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTansactionModal({
    isOpen,
    onRequestClose,
}: NewTansactionModalProps) {
    const { createTransaction } = useTransactions();

    const [ title, setTitle ] = useState('');
    const [ amount, setAmount ] = useState(0);
    const [ type, setType ] = useState('deposit');
    const [ category, setCategory ] = useState('');

    async function handleCreateNewTansaction(event: FormEvent) {
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
        })
        setTitle('');
        setAmount(0);
        setType('deposit');
        setCategory('');
        onRequestClose();
    }

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            overlayClassName="react-modal-overlay"
            className="react-modal-content"
        >
            <button 
                type="button" 
                onClick={onRequestClose}
                className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar Modal" />
            </button>
            <Container onSubmit={handleCreateNewTansaction}>
                <h2>Cadastrar transação</h2>

                <input 
                    placeholder="Título"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <input 
                    type="number" 
                    placeholder="Valor" 
                    value={amount}
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer >
                    <RadioBox
                        type="button"
                        onClick={() => setType('deposit')}
                        isActive={ type === 'deposit' }
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada" />
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => setType('withdraw')}
                        isActive={ type === 'withdraw' }
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Sáida" />
                        <span>Saída</span>
                    </RadioBox>
                </TransactionTypeContainer>
                
                <input 
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button
                    type="submit"
                >
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}
