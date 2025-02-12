import { useState, useEffect } from "react"
import clsx from 'clsx'
import { useQubicConnect, truncateMiddle } from "@qubic/react-ui"

interface TransactionsHistoryProps {
    className?: string;
    publicKey?: string;
}

// we use the REST endpoint 
// https://rpc.qubic.org/v1/identities/PUBLIC_ID/transfer-transactions?startTick=100&endTick=17928623
// or v2 but still using v1
// https://rpc.qubic.org/v2/identities/PUBLIC_ID/transfer-transactions?start_tick=13686000&end_tick=18928162
// https://rpc.qubic.org/v2/identities/PUBLIC_ID/transfers?startTick=17728623&endTick=17928623

const TransactionsHistory: React.FC<TransactionsHistoryProps> = ({className, publicKey = ''}) => {    
    const { connected, getTransactionsHistory } = useQubicConnect()
    const [transactions, setTransactions] = useState<any[]>([])
    
    const classes = clsx('bg-white rounded-md p-2 text-xl text-black', className)
    
    useEffect(() => {
        const fetchTransactionsHistory = async () => {
            const txs = await getTransactionsHistory(publicKey)
            setTransactions(txs)
        }
        fetchTransactionsHistory()
    }, [getTransactionsHistory, connected, publicKey])

    if (!connected) return (
        <div className={classes}>
            Not Connected
        </div>
    )

    return (
        <div className={classes}>
            {transactions.map((tx:any, idx:number) => (
                <div key={idx}>{truncateMiddle(tx.sourceId, 50)} - {truncateMiddle(tx.destId, 50)} - {tx.amount} QUBIC</div>
            ))}
        </div>
    )
}

export default TransactionsHistory