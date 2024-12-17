import { useState, useEffect } from "react"
import clsx from 'clsx'
import { truncateMiddle, useQubicConnect } from "@qubic/react-ui"

const PublicKey = ({className, truncated = false}) => {    
    const [publicKey, setPublicKey] = useState('')
    const {connected, getMetaMaskPublicId} = useQubicConnect()
    
    const classes = clsx('bg-white rounded-md p-2 text-xl text-black', className)

    useEffect(() => {
        const fetchPublicKey = async () => setPublicKey(await getMetaMaskPublicId(0))
        fetchPublicKey()
    }, [])
    
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