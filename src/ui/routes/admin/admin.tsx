import Layout from "../../layout/layout";
import EditRolesForm from "../../components/molecules/edit-roles-form/edit-roles-form";
import TabNavigator from "../../components/atoms/tab-navigator/tab-navigator";
import { ViewModel } from "./viewmodel";
import UserRoleItem from "../../components/atoms/user-role-item/user-role-item";
import NoResults from "../../components/atoms/no-results/no-results";
import Loading from "../../components/atoms/loading/loading";

export default function AdminRoute() {
  const {
    isLoading,
    tabs,
    activeTab,
    onTabClick,
    filteredUsers,
    roleOptions,
    onSubmit,
    onRemoveUser,
    isAdmin
  } = ViewModel();

  return (
    <Layout withHeader={true}>        
    {isAdmin && 
    <>
      <EditRolesForm
          onSubmit={onSubmit}
          roleOptions={roleOptions}
        />
      <TabNavigator
          tabs={tabs}
          activeTab={activeTab}           
          onTabClick={onTabClick}
      />

        {isLoading && <Loading/>}

        {!isLoading && filteredUsers.map((user) => (
            <UserRoleItem
              key={user.id}
              profile={user}
              onRemove={() => onRemoveUser(user)} 
            />
        ))}
          
        {!isLoading && filteredUsers.length === 0 && (
          <NoResults/>
        )}
    </>

    }
      
    </Layout>
  );
}