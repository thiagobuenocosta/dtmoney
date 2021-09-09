import { useTransactions } from "../../hooks/useTransactions";
import moment from "moment";
import { Container } from "./styles";

export function TransactionsTable() {
    const { transactions } = useTransactions();

    return (
        <Container>
            <table>
                <thead>
                    <tr>
                        <th>Título</th>
                        <th>Preço</th>
                        <th>Categoria</th>
                        <th>Data</th>
                    </tr>
                </thead>

                <tbody>
                    { transactions.map( transaction => (
                        <tr key={ transaction.id }>
                            <td>{ transaction.title }</td>
                            <td className={ transaction.type }>
                                { transaction.type === 'withdraw' && '- ' }
                                { transaction.amount.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}) }
                            </td>
                            <td>{ transaction.category }</td>
                            <td>{ moment( transaction.createdAt ).format('DD/MM/YYYY') }</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </Container>
    )
}