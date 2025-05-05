import UserFinder from "./components/UserFinder";
import UsersContext from "./store/users-context.ts";

const DUMMY_USERS = [
	{ id: 'u1', name: 'Max' },
	{ id: 'u2', name: 'Manuel' },
	{ id: 'u3', name: 'Julie' },
  ];
function App() {
	const usersContext = {
		users: DUMMY_USERS,
	};
	return (
		<div>
			<UsersContext.Provider value={usersContext}>
				<UserFinder />
			</UsersContext.Provider>
		</div>
	);
}

export default App;
