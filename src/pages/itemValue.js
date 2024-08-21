import React,{useEffect} from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { fetchitemValues } from '../Redux/itemValuesSlice';

const ItemValues = () =>{
    const itemval = useSelector((state)=>state)
    const dispatch = useDispatch()

    console.log("Itemm Val",itemval);
    // useEffect(()=>{
    //     dispatch(fetchitemValues())
    // },[])
    // if(itemval.loading){
    //     return <h1>Loading</h1>
    // }else{
    //     console.log(itemval.data);
    // }

    return(
        <div>
            <h2>List of items</h2>
            {/* <button onClick={(e)=> dispatch(fetchitemValues())}>Fetch Data</button> */}
            {/* {
                itemval.data.map(e => <li>{e}</li>)
            } */}

            {/* {itemval.loading && <div>Loading ...</div>}
            {!itemval.loading && itemval.error ? <div>Error: {itemval.error}</div>: null}
            {!itemval.loading && itemval} */}

        </div>
    )
}

export default ItemValues;