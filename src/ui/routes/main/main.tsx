import Layout from "../../layout/layout";
import MainFeed from "../../components/organisms/main-feed/main-feed";
import ViewModel from "./viewmodel";

export default function MainRoute() {
  const { 
    activeProfile, 
    onProfileClick 
} = ViewModel();
  if (!activeProfile) return null;

  return (
    <Layout withHeader>
      <MainFeed
        activeProfile={activeProfile}
        onProfileClick={onProfileClick}
      />
    </Layout>
  );
}
