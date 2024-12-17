import { useState, useEffect } from "react"
import clsx from 'clsx'
import { useQubicConnect, Button, InputMaxChars, InputNumbers, ConfirmTxModal } from "@qubic/react-ui"
import { isAddressValid, isAmountValid, truncateMiddle } from "@qubic/react-ui"

const SendForm = ({ className }) => {
    const {getPaymentTx, getSignedTx, broadcastTx, getMetaMaskPublicId, tickOffset} = useQubicConnect()
    const [amount, setAmount] = useState(0)
    const [receiver, setReceiver] = useState('')
    const [showConfirmTxModal, setShowConfirmTxModal] = useState(false)
    const {getTickInfo} = useQubicConnect()
    
    const sendTx = async () => {
        // check if receiver and amount are valid
        if (!isAddressValid(receiver) || !isAmountValid(amount)) {
            alert('Please fill in the form correctly.')
            return
        }
        // let user confirm the transaction
        setShowConfirmTxModal(true)
    }
    
    return (
        <div className={clsx('flex flex-col gap-4', className)}>
            <InputMaxChars 
                label="Receiver" max={60} placeholder="Public ID of receiver" 
                onChange={(val) => {
                    setReceiver(val)
                }}
            />
            <InputNumbers 
                label="Amount" placeholder="Amount of QUBIC" 
                onChange={(val) => {
                    setAmount(val)
                }}
            />
            <Button label="Send" primary={true} onClick={() => sendTx()} />

            <ConfirmTxModal
                open={showConfirmTxModal}
                onClose={() => setShowConfirmTxModal(false)}
                tx={{
                    title: 'Send Qubic',
                    description: `Are you sure you want to send ${amount} Qubic to ${truncateMiddle(receiver, 30)} now?`
                }}
                onConfirm={async () => {
                    // define target tick with default tickOffset of 10
                    const tickInfo = await getTickInfo()
                    const targetTick = tickInfo.tick + tickOffset
                    // build the payment transaction
                    const sender = await getMetaMaskPublicId()
                    const t = await getPaymentTx(sender, receiver, amount, targetTick)
                    // sign the transaction
                    const signedTx = await getSignedTx(t.tx, t.offset)
                    // broadcast the transaction
                    const txResult = await broadcastTx(signedTx.tx)
                    console.log('sendTx', receiver, amount, txResult)
                    // create ConfirmTxResult
                    return {
                        targetTick,
                        txResult
                    }
                }}
            />
        </div>
    )
}

export default SendForm