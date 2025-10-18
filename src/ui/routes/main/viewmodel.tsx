import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRepositories } from "../../../core";
import useSession from "../../hooks/useSession";
import { type UserProfile, type GetOwnProfileReq } from "../../../domain";
import toast from "react-hot-toast";

export default function ViewModel() {
  const navigate = useNavigate();
  const { session } = useSession();
  const { userProfileRepository } = useRepositories();

  const [activeProfile, setActiveProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchActiveProfile = async () => {
      if (!session) {
        setLoading(false);
        return;
      }
      try {
        const p = await userProfileRepository.getOwnProfile({
          session,
        } as GetOwnProfileReq);
        setActiveProfile(p ?? null);
      } catch (_err) {
        toast.error("No se pudo obtener tu perfil.");
      } finally {
        setLoading(false);
      }
    };
    fetchActiveProfile().then();
  }, [session, userProfileRepository]);

  const onProfileClick = () => {
    navigate(`/profile`);
  };

  return {
    activeProfile,
    loading,
    onProfileClick,
  };
}
