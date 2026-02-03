import { getAllUserTransactions } from "@/app/actions/user";
import TransactionsList from "@/components/profile/TransactionsList";

export const dynamic = 'force-dynamic';

export default async function UserTransactionsPage() {
    const transactions = await getAllUserTransactions();

    return (
        <TransactionsList initialTransactions={transactions} />
    );
}
