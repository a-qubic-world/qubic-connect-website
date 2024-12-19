import { useState, useEffect } from "react"
import clsx from 'clsx'
import { truncateMiddle, useQubicConnect } from "@qubic/react-ui"

interface PublicKeyProps {
    className?: string;
    truncated?: boolean;
}

const PublicKey: React.FC<PublicKeyProps> = ({className, truncated = false}) => {    
    const [publicKey, setPublicKey] = useState<string>('')
    const {connected, getMetaMaskPublicId} = useQubicConnect()
    
    const classes = clsx('bg-white rounded-md p-2 text-xl text-black', className)

    useEffect(() => {
        const fetchPublicKey = async () => {
            const key = await getMetaMaskPublicId(0)
            setPublicKey(key)
        }
        fetchPublicKey()
    }, [getMetaMaskPublicId])
    
    if (!connected) return (
        <div className={classes}>
            Not Connected
        </div>
    )

    return (
        <div className={classes}>
            {truncated ? truncateMiddle(publicKey, 50) : publicKey}
        </div>
    )
}

export default PublicKey
