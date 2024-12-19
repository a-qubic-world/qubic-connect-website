import { useState, useEffect } from "react"
import clsx from 'clsx'
import { useQubicConnect, Button, Dropdown, truncateMiddle, BalanceInfo, DropdownOption } from "@qubic/react-ui"

interface AccountInfoProps {
    className?: string;
}

const AccountInfo: React.FC<AccountInfoProps> = ({ className }) => {
    const [balance, setBalance] = useState<BalanceInfo>({balance: {balance: 0}})
    const [account, setAccount] = useState<number>(0)
    const [publicId, setPublicId] = useState<string>('')
    const {getMetaMaskPublicId, getBalance} = useQubicConnect()
    const [accounts, setAccounts] = useState<DropdownOption[]>([])
    
    const callBalance = async (pId: string) => {
        if (publicId === '') return
        setBalance(await getBalance(pId))
    }

    const fetchPublicKey = async (acc: number = 0) => {
        const key = await getMetaMaskPublicId(acc)
        setPublicId(key)
    }

    const updateBalance = async () => {
        await fetchPublicKey(account)
        await callBalance(publicId)
    }

    const buildAccountsList = async (from: number, to: number) => {
        const accountPromises: Promise<DropdownOption>[] = []
    
        for (let i = from; i <= to; i++) {
            accountPromises.push(
                getMetaMaskPublicId(i).then(publicId => ({
                    label: truncateMiddle(publicId, 50)
                }))
            )
        }        
        const accountsList = await Promise.all(accountPromises)    
        setAccounts(accountsList)
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
                options={accounts}
                selected={account}
                setSelected={async (a: number) => {
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
