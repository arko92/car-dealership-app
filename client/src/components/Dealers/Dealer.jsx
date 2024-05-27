import React,{useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import Header from "../Header/Header";
import './Dealers.css'
import '../../assets/style.css'
import review_icon from '../../assets/reviewicon.png'
import '../../assets/bootstrap.min.css'
import sentiment_emoticon from '../../assets/positive.png'
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
            <div className="container-fluid mt-2">
                <div className="row justify-content-center">
                    <div className="col-md-8 col-lg-6">
                    <div className="d-flex flex-column align-items-center mb-3">
                        <h1 className="text-secondary mb-2">{dealer.full_name}{postReview}</h1>
                        <h5 className="text-muted">
                        {dealer.city}, {dealer.address}, {dealer.zip}, {dealer.state}
                        </h5>
                    </div>
                    </div>
                </div>
            </div>
            <div className="reviews_panel">

                {reviews.length === 0 && unreviewed === false ? ( // if the reviews array is empty, display the loading message
                    <h4 className="text-secondary d-flex flex-column container-fluid align-items-center">Loading Reviews....</h4>
                    ):  unreviewed === true? <h4 className="text-secondary d-flex flex-column container-fluid align-items-center">No reviews yet! </h4> :
                    reviews.map(review => ( 

                        <div className="container-fluid mt-2">
                        <div className="row justify-content-center">
                            <div className="col-md-8 col-lg-6">
                            <div className="card p-3 mb-1 bg-white rounded " style={{border: "1px solid grey", boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1), 0 6px 20px rgba(0, 0, 0, 0.19)'}} >
                                <div className="card-body">
                                <div className="d-flex mb-1 flex-column flex-md-row align-items-center">
                                    {/* Todo: put sentiment emoticon*/}
                                    <img src={sentiment_emoticon} alt="Sentiment emoticon" style={{ width: '64px', height: '64px' }} className="img-fluid rounded-circle mb-2 mb-md-0 mr-md-3"/>
                                    <div className="text-center text-md-left">
                                        <h5 className="card-title mb-1">{review.name}</h5>
                                        <p className="text-muted mb-0">
                                            Car make: {review.car_make} | Car model: {review.car_model} | Car year: {review.car_year}
                                        </p>
                                        <p className="card-text">{review.review}</p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            </div>
                        </div>
                        </div>


                ))};

            </div>
        </div>
    )
}    

export default Dealer;