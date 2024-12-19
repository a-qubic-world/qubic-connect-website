import { useState, useEffect } from "react"
import clsx from 'clsx'
import { useQubicConnect, Button, TickInfoType } from "@qubic/react-ui"

interface TickInfoProps {
    className?: string;
    truncated?: boolean;
}

const TickInfo: React.FC<TickInfoProps> = ({className}) => {    
    const [tickInfo, setTickInfo] = useState<TickInfoType>({ tick: 0, epoch: 0 })
    const {getTickInfo} = useQubicConnect()
    
    const callTickInfo = async () => {
        const info = await getTickInfo()
        setTickInfo(info)
    }

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
