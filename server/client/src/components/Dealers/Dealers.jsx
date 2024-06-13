// React component to display the list of dealerships

import React, {useEffect, useState} from 'react'

import Header from '../Header/Header'

//import './Dealers.css'

import review_icon from "../../assets/reviewicon.png"

import '../../assets/bootstrap.min.css'

const Dealers = () => {

  const [dealersList, setDealersList] = useState([]);
  const [states, setStates] = useState([]);

  let dealers_url = window.location.origin + "/djangoapp/get_dealers"

  let dealers_url_by_state = window.location.origin + "/djangoapp/get_dealers/"

  const get_dealers = async () => { // function to get and set all the dealers and their states
    try {
          const response = await fetch(dealers_url,{
              method: "GET"
            }); // fetch the dealers
          const data = await response.json(); // convert the response to json
          if (data.status === 200) { // if the request is successful
            let all_dealers = Array.from(data.dealers); // convert the response to an array
            let all_states = [];
            all_dealers.forEach(dealer => { // loop through the array and get the states
              all_states.push(dealer.state); // push the state to the states array
            });
            setDealersList(all_dealers); // set the dealersList state
            setStates(Array.from(new Set (all_states))); // set the states state
          };

        } catch (error) {
          console.error(error); // if the request is not successful, log the error
        }
  }
  useEffect(() => { // use effect to call the get_dealers function
    get_dealers();
  }, []); // empty dependency array to only run once

  const get_dealers_by_state = async (state) => {
    dealers_url_by_state = dealers_url_by_state + state; // set the url to the state
    try {
          const response = await fetch(dealers_url_by_state,{ // fetch the dealers by state
              method: "GET"
            });
            const data = await response.json(); // convert the response to json
            if (data.status === 200) {
              let state_dealers = Array.from(data.dealers); 
              setDealersList(state_dealers); // set the dealersList state
            }
        } catch (error) {
          console.error(error);
        }
  }

  let isLoggedIn = sessionStorage.getItem("username") != null ? true : false // checks if the user is logged in or not
  return ( 
    <div>
      <Header/>
      <div className="container-fluid mt-4">
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Dealer Name</th>
                  <th scope="col">City</th>
                  <th scope="col">Address</th>
                  <th scope="col">Zip</th>
                  <th scope="col">
                    <select
                      name="state"
                      id="state"
                      className="form-control"
                      onChange={(e) => get_dealers_by_state(e.target.value)}
                    >
                      <option value="" selected disabled>State</option>
                      <option value="All">All states</option>
                      {states.map((state, index) => (
                        <option key={index} value={state}>{state}</option>
                      ))}
                    </select>
                  </th>
                  { isLoggedIn ? (  // if the user is logged in, display the review button
                        <th scope='col'>Review Dealer</th> 
                      ) : <></>
                  }
                </tr>
              </thead>
              <tbody>
                {dealersList.map((dealer, index) => (
                  <tr key={index}>
                    <td>{dealer.id}</td>
                    <td><a href={`/dealer/${dealer.id}`}>{dealer.full_name}</a></td>
                    <td>{dealer.city}</td>
                    <td>{dealer.address}</td>
                    <td>{dealer.zip}</td>
                    <td>{dealer.state}</td>
                    {isLoggedIn && (
                      <td>
                        <a href={`/postreview/${dealer.id}`}>
                          <img src={review_icon} className="review_icon" alt="Post Review" style={{ width: '20px', height: '20px' }} />
                        </a>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
    </div>
  </div>
  
  )
}

export default Dealers;

