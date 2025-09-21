import { useNavigate } from "react-router-dom";

export default function ViewModel() {

    const navigate = useNavigate();
    
    const goToEditProfile = () => {
        navigate("/profile/edit");
    };

    return {
        goToEditProfile,
    };
}