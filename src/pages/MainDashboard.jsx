import Navbar from "../components/Dashboard/Navbar";
import UserTable from "../components/userTable/userTable";

const Dashboard = () => {
	return (
		<div>
			<Navbar />
			<div className="min-h-[90vh] flex justify-center p-8">
				<UserTable />
			</div>
		</div>
	);
};

export default Dashboard;
