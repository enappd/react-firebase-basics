import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
    const location = useLocation();

    useEffect(() => {
        console.log(location.state);
    }, []);

    return (
        <div class="container">
            <div class="row">
                <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
                <div class="card card-signin my-5">
                    <div class="card-body">
                        <h5 class="card-title text-center">Profile Info</h5>
                        <div className="text-center">
                            {location.state.photo && <img className="mt-5" style={{width: 200, height: 200}} src={location.state.photo}/>}
                            {location.state.name && <h3 className="mt-5">{location.state.name}</h3>}
                            {location.state.email && <h3>{location.state.email}</h3>}
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );
}