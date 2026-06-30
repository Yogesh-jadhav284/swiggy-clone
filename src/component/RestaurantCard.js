const RestaurantCard = ({ resData }) => {
  const {
    name,
    cuisines,
    avgRating,
    image,
    cloudinaryImageId,
  } = resData;

  

// const fetchData = async ()=>{
// const MENU_API =
//   "https://corsproxy.io/?https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9716&lng=77.5946&restaurantId=12345";
//   const data = await fetch(MENU_API);
// const json = await data.json();
// console.log(json);}
  



  const imageUrl =
    image ||
    (cloudinaryImageId
      ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_508,h_320,c_fill/${cloudinaryImageId}`
      : "https://images.unsplash.com/photo-1550547660-d9450f859349");

  return (
    <div className="m-4 p-4 w-[300px] bg-gray-200 hover:scale-105">
      <img className="res-logo" src={imageUrl} alt="restaurant" />

      <h3 className="py-4 font-bold  text-lg">{resData.name}</h3>

<h4 className="py-1">{resData.cuisines.join(", ")}</h4>

<h4 className="py-1">⭐ {resData.avgRating}</h4>

<h4  className="py-1">{resData.costForTwo}</h4>

<h4  className="py-1">{resData.sla?.deliveryTime} mins</h4>
    </div>
  );
};

export const vegItem = (RestaurantCard) => {
  return (props) => {
    return (
      <div>
        <label className="absolute bg-green-600 text-white px-2 py-1 rounded-lg m-2">
          Promoted
        </label>

        <RestaurantCard {...props} />
      </div>
    );
  };
};

export default RestaurantCard;