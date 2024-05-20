import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import Header from "../Header/Header";
const Dealer = () => {
    const [dealer,setDealer] = useState({}); // state for dealer data

    let params = useParams(); // get the id from the url

    let id =params.id;

    let curr_url = window.location.href;  // get the current url
    let root_url = curr_url.substring(0,curr_url.indexOf("dealer")); // Extract the root URL by taking a substring from the start of the current URL up to the index of 'dealer'.

    let dealer_url = root_url+`djangoapp/dealer/${id}`;

    const get_dealer = async () => {
        const res = await fetch(dealer_url, {
            method: "GET"
          });        
        const data = await res.json();
        if (data.status === 200){
            let  dealer = Array.from(data.dealer);
            setDealer(dealer[0]); 
        } else {
            console.log("error");
        }   
    }
    useEffect(() => {
        get_dealer();
    },[]);

    return(
        <div>
            <Header/>
            <div style={{marginTop: "10px"}}>
            <h4  style={{color:"grey"}}>City - {dealer.city}, Address - {dealer.address}, Zip - {dealer.zip}, State - {dealer.state} </h4>
            </div>
        </div>
    )
}

export default Dealer;