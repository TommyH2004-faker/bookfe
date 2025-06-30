import React, {useEffect, useState} from 'react';
import {jwtDecode} from "jwt-decode";

const Test = () => {
    const [username, setUsername] = useState<string|null>(null);
    useEffect(() => {
        const token =localStorage.getItem('token');
        if(token){
            const userData = jwtDecode(token);
            console.log(userData);
            if(userData){
                setUsername(userData.sub+"");
            }
        }
    }, []);


    return (
        <div>

            <h1>Xin chao: {username}</h1>
        </div>
    );
}
export default Test;