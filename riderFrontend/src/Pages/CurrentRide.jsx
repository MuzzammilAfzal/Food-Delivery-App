import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = import.meta.env.VITE_URL;

const CurrentRide = () => {
    const navigate = useNavigate();

    const [ride, setRide] = useState(null);
    const [atRestaurant, setAtRestaurant] = useState(false);
    const [onWay, setOnWay] = useState(false);

    useEffect(() => {
        if (!sessionStorage.getItem("token")) {
            navigate("/rider/auth/login", { replace: true });
        }
    }, [navigate]);

    useEffect(() => {
        const fetchRide = () => {
            fetch(`${url}/rider/currentRide`, {
                method: "GET",
                headers: {
                    token: sessionStorage.getItem("token"),
                },
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);

                    if (data && data._id) {
                        setRide(data);

                        setAtRestaurant(data.statusRider >= 6);
                        setOnWay(data.statusRider === 7);
                    } else {
                        setRide(null);
                        setAtRestaurant(false);
                        setOnWay(false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };

        fetchRide();

        const intervalId = setInterval(fetchRide, 5000);

        return () => clearInterval(intervalId);
    }, []);

    const updateRide = (status) => {
        fetch(`${url}/rider/updateRide`, {
            method: "POST",
            headers: {
                token: sessionStorage.getItem("token"),
                status: status,
                orderid: ride._id,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if (data) {
                    toast.success(data.message);
                } else {
                    toast.error("Something went wrong");
                }
            })
            .catch((err) => {
                console.log(err);
                toast.error("Server Error");
            });
    };

    if (!ride) {
        return (
            <div className="p-2 flex justify-center">
                <span className="font-extrabold">
                    No ride accepted!!!
                </span>
            </div>
        );
    }

    return (
        <div className="p-2 flex justify-center">
            <div className="overflow-y-auto flex flex-col-reverse">
                <div className="bg-blue-300 p-2 rounded-2xl font-medium md:w-[50vw]">
                    <span>Order Id : {ride._id}</span>

                    <div>
                        <span>Status : {ride.statusNumber}</span>

                        <br />

                        <span>{ride.restaurant?.refName}</span>

                        <br />

                        <span>{ride.restaurant?.address}</span>

                        <div className="flex justify-center flex-wrap gap-2">
                            <div className="w-full flex justify-center">
                                <button
                                    className="p-2 bg-blue-500 rounded-2xl border"
                                    onClick={() => {
                                        setAtRestaurant(true);
                                        updateRide(6);
                                    }}
                                >
                                    Arrived At the Restaurant
                                </button>
                            </div>

                            {atRestaurant && (
                                <div>
                                    <span className="font-bold text-2xl w-full flex justify-center">
                                        🡣
                                    </span>

                                    <button
                                        className="p-2 bg-blue-500 rounded-2xl border"
                                        onClick={() => {
                                            if (ride.statusNumber < 4) {
                                                toast.error(
                                                    "Order is still not ready"
                                                );
                                            } else {
                                                setOnWay(true);
                                                updateRide(7);
                                            }
                                        }}
                                    >
                                        Took the order and On the Way to Delivery
                                    </button>
                                </div>
                            )}

                            {onWay && (
                                <div>
                                    <span className="font-bold text-2xl w-full flex justify-center">
                                        🡣
                                    </span>

                                    <button
                                        className="p-2 bg-red-500 rounded-2xl border"
                                        onClick={() => {
                                            updateRide(8);
                                        }}
                                    >
                                        Arrived at the Door and Complete Order
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CurrentRide;