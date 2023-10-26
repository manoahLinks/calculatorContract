import { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useContractReads, useContractWrite, usePrepareContractWrite, useWaitForTransaction } from 'wagmi';
import calculatorAbi from "../utils/abi.json";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const [number, setNumber] = useState();

  const { data } = useContractReads({
    contracts: [
      {
        address: '0xc63A24f469E1eFe196968D9126a289f3b462E8F3',
        abi: calculatorAbi,
        functionName: 'owner',
      },
      {
        address: '0xc63A24f469E1eFe196968D9126a289f3b462E8F3',
        abi: calculatorAbi,
        functionName: 'stateValue',
      },
    ],
  })

  const { config } = usePrepareContractWrite({
    address: '0xc63A24f469E1eFe196968D9126a289f3b462E8F3',
    abi: calculatorAbi,
    functionName: 'setState',
    args: [number]
  })

  const { config: config2 } = usePrepareContractWrite({
    address: '0xc63A24f469E1eFe196968D9126a289f3b462E8F3',
    abi: calculatorAbi,
    functionName: 'multiplyState',
    args: [number]
  })

  const { config: config3 } = usePrepareContractWrite({
    address: '0xc63A24f469E1eFe196968D9126a289f3b462E8F3',
    abi: calculatorAbi,
    functionName: 'divideState',
    args: [number]
  })

  const { data: writeData, isLoading: writeLoading, isSuccess, write } = useContractWrite(config)
  const { data: writeData2, isLoading: writeLoading2, isSuccess: isSuccess2, write: write2 } = useContractWrite(config2)
  const { data: writeData3, isLoading: writeLoading3, isSuccess: isSuccess3, write: write3 } = useContractWrite(config3)

  const { data: waitData, isError: waitError, isLoading: waitLoading, isSuccess: waitSuccess } = useWaitForTransaction({
    hash: writeData?.hash,
    onSuccess(data){
      console.log(data)
      toast.success('Successfully set new value')
    },

    onError(error){
      console.log(error)
      toast.error(error.message)
    }
  })

  const { data: waitData2, isError: waitError2, isLoading: waitLoading2, isSuccess: waitSuccess2 } = useWaitForTransaction({
    hash: writeData2?.hash,
    onSuccess(data){
      console.log(data)
      toast.success('Successfully multiplied')
    },

    onError(error){
      console.log(error)
      toast.error(error.message)
    }
  })

  const { data: waitData3, isError: waitError3, isLoading: waitLoading3, isSuccess: waitSuccess3 } = useWaitForTransaction({
    hash: writeData3?.hash,
    onSuccess(data){
      console.log(data)
      toast.success('Successfully divided')
    },

    onError(error){
      console.log(error)
      toast.error(error.message)
    }
  })

  const handleSetValue = async (e) => {
    e.preventDefault()
    write?.()
    isSuccess()
    waitSuccess()
  }

  const handleMultiplication = async (e) => {
    e.preventDefault()
    write2?.()
    isSuccess2()
    waitSuccess2()
  }


  const handleDivision = async (e) => {
    e.preventDefault()
    write3?.()
    isSuccess3()
    waitSuccess3()
  }

  return (
    <div className='w-full h-screen flex flex-col bg-gradient-to-tr from-blue-400 to-lime-300'>
      <div className='flex justify-end'>
        <ConnectButton />
      </div>

      <div className='flex-1 flex'>
        <div className='m-auto p-5 gap-y-4 flex flex-col bg-white w-5/12 rounded-md shadow-lg shadow-lime-500'>
          <span className='flex items-center gap-x-2'>
            <h4 className='text-xs'>Owner:</h4>
            <h4 className='font-light text-xs text-lime-500'>{String(data?.[0].result) ?? 'not found'}</h4>
          </span>
          <span className='flex flex-col items-center'>
            <h4 className=''>State Value</h4>
            <h4 className='font-bold text-3xl text-lime-500'>{String(data?.[1].result) ?? 'not found'}</h4>
          </span>
          <hr />
          <form className='flex p-2 flex-col gap-y-4'>
            <input
              type="number"
              className='border-slate-300 rounded-[2px] w-6/12 placeholder-slate-300 m-auto'
              placeholder='enter no.'
              value={number}
              onChange={(e)=>{setNumber(e.target.value)}}

            />

            <div className='flex items-center justify-center gap-x-4'>
              <button onClick={handleSetValue} className='p-2 rounded-md bg-blue-500 text-white hover:bg-opacity-50'>{writeLoading || waitLoading ? `setting ...` : `set`}</button>
              <button onClick={handleMultiplication} className='p-2 rounded-md bg-lime-500 text-white hover:bg-opacity-50'>{writeLoading2 || waitLoading2 ? `multiplying ...` : `multiply`}</button>
              <button onClick={handleDivision} className='p-2 rounded-md border border-lime-500 text-lime-500 hover:bg-lime-100'>{writeLoading3 || waitLoading3 ? `dividing ...` : `divide`}</button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default App
