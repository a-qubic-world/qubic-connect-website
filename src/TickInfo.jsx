import { useState, useEffect } from "react"
import clsx from 'clsx'
import { useQubicConnect, Button } from "@qubic/react-ui"

const TickInfo = ({className, truncated = false}) => {    
    const [tickInfo, setTickInfo] = useState(0)
    const {getTickInfo} = useQubicConnect()
    
    const callTickInfo = async () => setTickInfo(await getTickInfo())

    useEffect(() => {
        callTickInfo()
    }, [])
    
    return (
        <div className={clsx('flex gap-4', className)}>
            <span className="bg-white rounded-md p-4 text-xl text-black">
                Tick: {tickInfo.tick}
            </span>
            <span className="bg-white rounded-md p-4 text-xl text-black">
                Epoch: {tickInfo.epoch}
            </span>
            <Button 
                onClick={() => callTickInfo()} 
                label="Refresh" 
            />
        </div>
    )
}

export default TickInfo