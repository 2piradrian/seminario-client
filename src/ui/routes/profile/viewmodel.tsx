import { useNavigate } from "react-router-dom";
import useSesion from "../../hooks/useSesion";

export default function ViewModel() {

    const { } = useSesion();
    const navigate = useNavigate();

    
    const goToEditProfile = () => {
        navigate("/profile/edit");
    };

    return {
        goToEditProfile,
    };
}