import { useState, useEffect } from "react"
import clsx from 'clsx'
import { useQubicConnect, Button, Dropdown, truncateMiddle } from "@qubic/react-ui"

const AccountInfo = ({ className }) => {
    const [balance, setBalance] = useState({balance: {balance: 0}})
    const [account, setAccount] = useState(0)
    const [publicId, setPublicId] = useState('')
    const {getMetaMaskPublicId, getBalance} = useQubicConnect()
    const [accounts, setAccounts] = useState([])
    
    const callBalance = async (pId) => {
        if (publicId === '') return
        setBalance(await getBalance(pId))
    }
    const fetchPublicKey = async (acc = 0) => setPublicId(await getMetaMaskPublicId(acc))
    const updateBalance = async () => {
        await fetchPublicKey(account)
        await callBalance(publicId)
    }

    const buildAccountsList = async (from, to) => {
        const accountPromises = []
    
        for (let i = from; i <= to; i++) {
            accountPromises.push(getMetaMaskPublicId(i).then(publicId => ({
                label: truncateMiddle(publicId, 50)
            })))
        }        
        const accounts = await Promise.all(accountPromises)    
        setAccounts(accounts)
    }

    // initial call
    useEffect(() => {
        buildAccountsList(0, 4)
        updateBalance()
    }, [])
    
    return (
        <div className={clsx('flex gap-4', className)}>
            <Dropdown 
                label="Select Account" 
                options={accounts} selected={account} 
                setSelected={async (a) => {
                    setAccount(a)
                    const publicId = await getMetaMaskPublicId(a)
                    callBalance(publicId)
                }}
            />
            <span className="bg-white rounded-md p-4 text-xl text-black">
                Balance: {balance.balance.balance} QUBIC
            </span>            
            <Button 
                onClick={() => updateBalance()} 
                label="Refresh"
            />
        </div>
    )
}

export default AccountInfo