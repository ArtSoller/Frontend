import React, {useEffect, useState} from 'react';
// material ui check
import Button from '@mui/material/Button';
// redux check
import { decrement, increment } from './counterSlice'
import { useAppSelector, useAppDispatch } from './hooks'
import styled from "styled-components"
import {Alert} from "@mui/material";



function Test() {
    const count = useAppSelector((state) => state.counter.value)
    const dispatch = useAppDispatch()
    const [value, setValue] = useState("Hello world")
    useEffect(() =>{alert("Ghbdtn")},[])
    const [name, setName] = useState("ArtyomS")

    return (
        <>
            <Styled>
                I'm styled component
            </Styled>
            <div>
                {value}
            </div>
            <div onClick={() => {
                setName((x) =>x + "m")
                setName((x) =>x + "d")}
            }>
                {name}
            </div>
            <Artyom age={54}/>
            {
                [1, 2, 3, 4, 5].map(x=><Artyom age={x}/>)
            }
            {
                3>2 && <Artyom age={34}/>
            }
            <div>
                <Button variant="contained" onClick={() => dispatch(decrement())}>Hello Orwell</Button>
            </div>
            <div onClick={() => {
                dispatch(increment())
            }}>
                hello Or
            </div>
        </>
    )
}

function Artyom ({age, name = "Artyom"}:{age:number, name?:string}) {
    return (
        <>
            <div>{age}</div>
            <div>{name}</div>
        </>
    )
}

const Styled = styled.div`
    background-color: blue;
`
export default Test;