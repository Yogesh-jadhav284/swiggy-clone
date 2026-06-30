import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";

const RestaurantMenu = () => {
    const [resInfo, setResInfo] = useState(null);
    const [categories, setCategories] = useState([]);
    const {resId} = useParams();
    

    useEffect(() => {
        fetchMenu();
    }, []);

    const fetchMenu = async () => {
        const data = await fetch(
            "https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9352403&lng=77.624532&restaurantId="+resId+"&catalog_qa=undefined&submitAction=ENTER"
        );

        const json = await data.json();
        console.log(json);

        // Restaurant Information
        const restaurantInfo = json?.data?.cards?.find(
            (item) =>
                item?.card?.card?.["@type"]?.includes("food.v2.Restaurant")
        )?.card?.card?.info;

        setResInfo(restaurantInfo);

        // Get all Item Categories
        const allCategories = json?.data?.cards
            ?.find((item) => item?.groupedCard)
            ?.groupedCard?.cardGroupMap?.REGULAR?.cards
            ?.filter((item) =>
                item?.card?.card?.["@type"]?.includes("ItemCategory")
            );

        setCategories(allCategories || []);
    };

    if (!resInfo) return <h1>Loading...</h1>;

    const { name, cuisines, avgRating, costForTwo } = resInfo;

    return (
        <div className="menu">
            <h1>{name}</h1>

            <h3>{cuisines.join(", ")}</h3>

            <h3>⭐ {avgRating}</h3>

            <h3>₹ {costForTwo / 100} FOR TWO</h3>

            <hr />

            {categories.map((category) => (
                <div
                    key={category?.card?.card?.categoryId}
                    style={{ marginBottom: "30px" }}
                >
                    <h2>
                        {category?.card?.card?.title} (
                        {category?.card?.card?.itemCards?.length})
                    </h2>

                    {category?.card?.card?.itemCards?.map((item) => (
                        <div
                            key={item?.card?.info?.id}
                            style={{
                                borderBottom: "1px solid #ddd",
                                padding: "10px 0",
                            }}
                        >
                            <h3>{item?.card?.info?.name}</h3>

                            <p>
                                ₹
                                {(item?.card?.info?.price ||
                                    item?.card?.info?.defaultPrice) / 100}
                            </p>

                            <p>{item?.card?.info?.description}</p>

                            <p>
                                ⭐{" "}
                                {item?.card?.info?.ratings
                                    ?.aggregatedRating?.rating || "N/A"}
                            </p>
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default RestaurantMenu;