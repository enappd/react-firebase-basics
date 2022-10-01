import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
    const { state } = useLocation();

    useEffect(() => {
        console.log(state);
    }, []);

    return (
        <div>Hello from Home</div>
    );
}