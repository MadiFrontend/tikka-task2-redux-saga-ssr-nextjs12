import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUsersStart } from "../store/userSlice";
import { RootState, AppDispatch } from "../store/store";

export async function getServerSideProps() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users");
  const users = await res.json();
  return { props: { initialUsers: users } };
}

const Home = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: users, loading } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    if (!users.length) {
      dispatch(fetchUsersStart());
    }
  }, [dispatch, users.length]);

  return (
    <div>
      <h1>Users List</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
