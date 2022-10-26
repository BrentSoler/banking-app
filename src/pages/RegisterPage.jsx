import { Link } from "react-router-dom";
import RegisterForm from "../components/RegisterForm/RegisterForm";

const RegisterPage = () => {
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex flex-col lg:flex-row items-center justify-between">
				<div className="text-center lg:text-right">
					<h1 className="font-bold text-5xl text-primary">Register</h1>
					<h1 className="p-1">Banking App</h1>
				</div>
				<div className="card flex-shrink-0 w-[23rem] shadow-2xl bg-base-100">
					<div className="card-body gap-4">
						<h1 className="font-bold text-2xl">Register</h1>
						<RegisterForm />
					</div>
					<Link to="/">
						<p className="text-xs text-center p-1">Already have an account? Login</p>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterPage;
