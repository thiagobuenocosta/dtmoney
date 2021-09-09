import { Container } from "./styles";
import { useTransactions } from "../../hooks/useTransactions";

import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import totalImg from "../../assets/total.svg";

export function Summary() {
    const { transactions } = useTransactions();
     
    const sumary = transactions.reduce((acc, transaction) => {
        if (transaction.type === 'deposit') {
            acc.deposits += transaction.amount;
            acc.total += transaction.amount;
        } else {
            acc.withdraw += transaction.amount;
            acc.total -= transaction.amount;
        }

        return acc;
    }, {
        deposits: 0,
        withdraw: 0,
        total: 0,
    })

    return (
        <Container>
            <div>
                <header>
                    <p>Entradas</p>
                    <img src={incomeImg} alt="entradas-icon" />
                </header>
                <strong>
                    { sumary.deposits.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }
                </strong>
            </div>
            <div>
                <header>
                    <p>Saídas</p>
                    <img src={outcomeImg} alt="saidas-icon" />
                </header>
                <strong>
                    - { sumary.withdraw.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }
                </strong>
            </div>
            <div className="hightlight-backgound">
                <header>
                    <p>Total</p>
                    <img src={totalImg} alt="total-icon" />
                </header>
                <strong>
                    { sumary.total.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }
                </strong>
            </div>
        </Container>
    )
}