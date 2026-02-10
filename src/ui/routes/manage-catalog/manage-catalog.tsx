import Layout from "../../layout/layout";
import NoResults from "../../components/atoms/no-results/no-results";
import Loading from "../../components/atoms/loading/loading";
import ManageCatalog from "../../components/organisms/manage-catalog/manage-catalog";
import { ViewModel } from "./viewmodel";

export default function ManageCatalogRoute() {

	const {
		user,
        onClickOnInstruments,
        onClickOnPageTypes,
        onClickOnPostType,
        onClickOnStyles,
		onLogout
	} = ViewModel();

	return (
		<Layout 
			user={user}
			withHeader={true}
			headerProfile={user ? user.profile.toProfile() : undefined}
			onLogout={onLogout}
		>        
			<>
				<ManageCatalog
                    onClickOnInstruments={onClickOnInstruments}
                    onClickOnPageType={onClickOnPageTypes}
                    onClickOnPostType={onClickOnPostType}
                    onClickOnStyles={onClickOnStyles}    
                />

			</>
		</Layout>
	);
}
