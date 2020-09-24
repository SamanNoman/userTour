import React, { useEffect, useState } from "react";

import UserList from "../components/UsersList";
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Users = () => {
  const [loadedData, setLoadedData] = useState(false);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  useEffect(() => {
    const fetchUsers = async () => {
      
      try {
       const responseData = await sendRequest(process.env.REACT_APP_BACKEND_URL + "/users");

        setLoadedData(responseData.users);
      } catch (err) {};
     
    };

    fetchUsers();
  }, [sendRequest]);


  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner />
        </div>
      )}
     {!isLoading && loadedData && <UserList items={loadedData} />}
    </React.Fragment>
  );
};

export default Users;
