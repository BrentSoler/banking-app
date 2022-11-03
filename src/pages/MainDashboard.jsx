import Navbar from "../components/Dashboard/Navbar";
import UserTable from "../components/userTable/userTable";
import AccountList from "../components/Dashboard/AccountList";

const Dashboard = () => {
	return (
		<div>
			<Navbar />
			<div className="min-h-[90vh] flex justify-center p-8">
				<UserTable />
			</div>
      <AccountList />
		</div>
	);
};

export default Dashboard;
