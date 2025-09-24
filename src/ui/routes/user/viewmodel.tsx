import { useState } from "react";

export default function ViewModel() {

    const [isFollowing, setIsFollowing] = useState(false);

    const toggleFollow = () => {
        setIsFollowing(!isFollowing);
    };
    
    return {
        isFollowing, 
        toggleFollow
    };
}