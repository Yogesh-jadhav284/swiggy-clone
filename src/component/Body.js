import RestaurantCard from "./RestaurantCard";
import resLis from "../utils/mockdata";
import { useState, useEffect } from "react";
import Shimmer from "./shimmer";
import useOnlineStatus from "../utils/useonlineStatus";
import { vegItem } from "./RestaurantCard";
import{Link} from "react-router-dom";


const Body = () => {
  // First render shows mock data
  const [listofRestaurent, setListofRestaurent] = useState([]);
  const [filteredRestaurant, setFilteredRestaurant] = useState([]);
  const[searchText,setSearchText] = useState("");
 

  const RestaurantCardPromoted = vegItem(RestaurantCard);
  useEffect(() => {

    const fetchData = async () => {
  
      const data = await fetch(
        "https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9351929&lng=77.62448069999999&page_type=DESKTOP_WEB_LISTING"
      );

      const json = await data.json();
    //  console.log(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
       const restaurantsData =json?.data?.cards?.find((item)=>
             item?.card?.card?.id?.includes("restaurant_grid")
        )?.card?.card?.gridElements?.infoWithStyle?.restaurants;
        setListofRestaurent(restaurantsData);
      };
    fetchData();
  
 
  } ,[]);

  

  const OnlineStatus = useOnlineStatus();
  if(OnlineStatus === false) 
  return(<h4>oops !! we lost you , please check your connection</h4>);
    
  
  if (listofRestaurent.length === 0) {
  return <Shimmer />;
}

  return (

    
    <div className="body">
      
      
      <div className="filter flex">
        <div className = "search m-4 p-4">
          <input type = "text" className="border border-solid border-black" value = {searchText} 
          onChange ={(e)=>{setSearchText(e.target.value);}}/>
          <button className="px-4 py-2 bg-green-100 m-4 origin-top-left rounded-xl"
          onClick={() => {
    const filteredRestaurant = listofRestaurent.filter(
      (res) =>
        (res?.info?.name || "")
          .toLowerCase()
          .includes(searchText.toLowerCase())
    );
    setFilteredRestaurant(filteredRestaurant);
  }}
            // filter the restaurent cards and update ui
            // take from search bar
          >
            search
          </button>
        </div>
        <div className="m-4 p-4 flex items-center"><button
          className=" px-4 py-2 bg-gray-100 rounded-xl"
          onClick={() => {
            const filteredList = listofRestaurent.filter(
              (restaurant) =>
                (restaurant?.data?.avgRating ||
                  restaurant?.info?.avgRating) > 4
            );

            setListofRestaurent(filteredList);
          }}
        >
          Top Rated Restaurants
        </button></div>
        
      </div>

      <div className="rest-container flex flex-wrap ">
  {listofRestaurent.map((restaurant) => (
  <Link
    key={restaurant?.info?.id}
    to={"/restaurants/" + restaurant?.info?.id}
  >
    {restaurant?.info?.veg ? (
      <RestaurantCardPromoted resData={restaurant?.info} />
    ) : (
      <RestaurantCard resData={restaurant?.info} />
    )}
  </Link>
))}
      </div>
    </div>
  );
};

export default Body;