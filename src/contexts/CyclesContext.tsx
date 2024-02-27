import { createContext, ReactNode, useReducer, useState } from 'react'

interface CreateCycleData {
  task: string
  minutesAmount: number
}
interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}
interface CyclesContextType {
  cycles: Cycle[]
  activeCycle: Cycle | undefined
  activeCycleId: string | null
  amountSecondsPassed: number
  markCurrentCycleAsFinished: () => void
  setSecondsPassed: (seconds: number) => void
  createNewCycle: (data: CreateCycleData) => void
  interruptCurrentCycle: () => void
}
export const CyclesContext = createContext({} as CyclesContextType)
interface CyclesContextProviderProps {
  children: ReactNode
}
export function CyclesContextProvider({
  children,
}: CyclesContextProviderProps) {
  const [cycles, dispatch] = useReducer((state: Cycle[], action: any) => {
    // if (action.type === 'ADD_NEW_CYCLE') {
    //   return [...state, action.payload.newCycle]
    //}
    console.log(state)
    console.log(action)
    return state
  }, [])

  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)
  const [amountSecondsPassed, setAmountSecondsPassed] = useState(0)

  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)
  function setSecondsPassed(seconds: number) {
    setAmountSecondsPassed(seconds)
  }

  function markCurrentCycleAsFinished() {
    dispatch({
      type: 'MARK_CURRENT_CYCLE_AS_FINISHED',
      payload: {
        activeCycleId,
      },
    })
    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, finishedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
  }

  function createNewCycle(data: CreateCycleData) {
    const id = String(new Date().getTime())
    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
      startDate: new Date(),
    }

    dispatch({
      type: 'ADD_NEW_CYCLE',
      payload: {
        newCycle,
      },
    })

    // setCycles((state) => [...state, newCycle])
    setActiveCycleId(id)
    setAmountSecondsPassed(0)
  }

  function interruptCurrentCycle() {
    dispatch({
      type: 'INTERRUPT_CURRENT_CYCLE',
      payload: {
        activeCycleId,
      },
    })

    // setCycles((state) =>
    //   state.map((cycle) => {
    //     if (cycle.id === activeCycleId) {
    //       return { ...cycle, interruptedDate: new Date() }
    //     } else {
    //       return cycle
    //     }
    //   }),
    // )
    setActiveCycleId(null)
  }

  return (
    <CyclesContext.Provider
      value={{
        cycles,
        activeCycle,
        activeCycleId,
        markCurrentCycleAsFinished,
        amountSecondsPassed,
        setSecondsPassed,
        createNewCycle,
        interruptCurrentCycle,
      }}
    >
      {children}
    </CyclesContext.Provider>
  )
}



// import { differenceInSeconds } from 'date-fns'
// import {
//   createContext,
//   ReactNode,
//   useEffect,
//   useReducer,
//   useState,
// } from 'react'
// import {
//   ActionTypes,
//   addNewCycleAction,
//   interruptCurrentCycleAction,
//   markCurrentCycleAsFinishedAction,
// } from '../reducers/cycles/actions'
// import { Cycle, cyclesReducer } from '../reducers/cycles/reducer'

// interface CreateCycleData {
//   task: string
//   minutesAmount: number
// }

// interface CyclesContextType {
//   cycles: Cycle[]
//   activeCycle: Cycle | undefined
//   activeCycleId: string | null
//   amountSecondsPassed: number
//   markCurrentCycleAsFinished: () => void
//   setSecondsPassed: (seconds: number) => void
//   createNewCycle: (data: CreateCycleData) => void
//   interruptCurrentCycle: () => void
// }

// export const CyclesContext = createContext({} as CyclesContextType)

// interface CyclesContextProviderProps {
//   children: ReactNode
// }



// export function CyclesContextProvider({
//   children,
// }: CyclesContextProviderProps) {
//     const [cycles,dispatch] = useReducer((state: Cycle[], action: any) => {
//       return state
//     })
//   }
  
  
// // export function CyclesContextProvider({
// //   children,
// // }: CyclesContextProviderProps) {
// //   const [cyclesState, dispatch] = useReducer(
// //     cyclesReducer,
// //     {
// //       cycles: [],
// //       activeCycleId: null,
// //     },
// //     (initialState) => {
// //       const storedStateAsJSON = localStorage.getItem(
// //         '@ignite-timer:cycles-state-1.0.0',
// //       )

// //       if (storedStateAsJSON) {
// //         return JSON.parse(storedStateAsJSON)
// //       }

// //       return initialState
// //     },
// //   )

//   const { cycles, activeCycleId } = cyclesState
//   const activeCycle = cycles.find((cycle:any) => cycle.id === activeCycleId)

//   const [amountSecondsPassed, setAmountSecondsPassed] = useState(() => {
//     if (activeCycle) {
//       return differenceInSeconds(new Date(), new Date(activeCycle.startDate))
//     }

//     return 0
//   })

//   useEffect(() => {
//     const stateJSON = JSON.stringify(cyclesState)

//     localStorage.setItem('@ignite-timer:cycles-state-1.0.0', stateJSON)
//   }, [cyclesState])

//   function setSecondsPassed(seconds: number) {
//     setAmountSecondsPassed(seconds)
//   }

//   function markCurrentCycleAsFinished() {
//     dispatch(markCurrentCycleAsFinishedAction())
//   }

//   function createNewCycle(data: CreateCycleData) {
//     const id = String(new Date().getTime())

//     const newCycle: Cycle = {
//       id,
//       task: data.task,
//       minutesAmount: data.minutesAmount,
//       startDate: new Date(),
//     }

//     dispatch(addNewCycleAction(newCycle))

//     setAmountSecondsPassed(0)
//   }

//   function interruptCurrentCycle() {
//     dispatch(interruptCurrentCycleAction())
//   }

//   return (
//     <CyclesContext.Provider
//       value={{
//         cycles,
//         activeCycle,
//         activeCycleId,
//         markCurrentCycleAsFinished,
//         amountSecondsPassed,
//         setSecondsPassed,
//         createNewCycle,
//         interruptCurrentCycle,
//       }}
//     >
//       {children}
//     </CyclesContext.Provider>
//   )
// }
