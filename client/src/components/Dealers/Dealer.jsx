import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import Header from "../Header/Header";
import './Dealers.css'
import '../../assets/style.css'
import review_icon from '../../assets/reviewicon.png'
const Dealer = () => {
    const [dealer,setDealer] = useState({}); // state for dealer data
    const [reviews,setReviews] = useState([]);
    const [unreviewed, setUnreviewed] = useState(false);
    const [postReview, setPostReview] = useState(<></>);

    let params = useParams(); // get the id from the url

    let id =params.id;

    let curr_url = window.location.href;  // get the current url
    let root_url = curr_url.substring(0,curr_url.indexOf("dealer")); // Extract the root URL by taking a substring from the start of the current URL up to the index of 'dealer'.

    let dealer_url = root_url+`djangoapp/dealer/${id}`;
    let review_url = root_url+`djangoapp/reviews/dealer/${id}`;
    let post_review_url = root_url+`postreview/${id}`;

    // get dealer details
    const get_dealer = async () => {
        const res = await fetch(dealer_url, {
            method: "GET"
          });        
        const data = await res.json();
        console.log(data);
        if (data.status === 200){
            let  dealer = Array.from(data.dealer);
            setDealer(dealer[0]); 
        } else {
            console.log("error");
        }   
    }

    // get reviews of the dealer
    const get_reviews = async () => {
        const res = await fetch(review_url, {
            method: "GET"
          });
        const data = await res.json();
        console.log(data);
        if (data.status === 200){
            if(data.reviews.length > 0){
                setReviews(data.reviews);
              } else {
                setUnreviewed(true);
              }
        } else {
            console.log("error");
        }
    }

    useEffect(() => {
        get_dealer();
        get_reviews();
        if(sessionStorage.getItem("username")) {
            setPostReview(<a href={post_review_url}><img src={review_icon} style={{width:'10%',marginLeft:'10px',marginTop:'10px'}} alt='Post Review'/></a>)
          }
    },[]);

    return(
        <div>
            <Header/>
            <div style={{marginTop: "10px"}}>
                <h1 style={{color:"grey"}}>{dealer.full_name}{postReview}</h1>
                <h4  style={{color:"grey"}}>City - {dealer.city}, Address - {dealer.address}, Zip - {dealer.zip}, State - {dealer.state} </h4>
            </div>
            <div className="reviews_panel">

                {reviews.length === 0 && unreviewed === false ? ( // if the reviews array is empty, display the loading message
                    <text>Loading Reviews....</text>
                    ):  unreviewed === true? <div>No reviews yet! </div> :
                    reviews.map(review => ( 
                        <div className="review_panel">
                            {/*Todo: put sentiment emoticon */}
                            <div className='review'>{review.review}</div>
                            <div className="reviewer">{review.name} {review.car_make} {review.car_model} {review.car_year}</div>
                        </div>
                ))};

            </div>
        </div>
    )

}    

export default Dealer;