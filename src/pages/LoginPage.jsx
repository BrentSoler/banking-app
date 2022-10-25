import LoginForm from "../components/LoginForm/LoginForm";

const LoginPage = () => {
	return (
		<div className="hero min-h-screen bg-base-200">
			<div className="hero-content flex flex-col lg:flex-row items-center justify-between">
				<div className="text-center lg:text-right">
					<h1 className="font-bold text-5xl text-primary">BANKING APP</h1>
					<h1 className="p-1">Ewan ko ilalagay.</h1>
				</div>
				<div className="card flex-shrink-0 w-[23rem] shadow-2xl bg-base-100">
					<div className="card-body gap-4">
						<h1 className="font-bold text-2xl">Login</h1>
						<LoginForm />
					</div>
					<p className="text-xs text-center p-1">No Account? Sign up</p>
				</div>
			</div>
		</div>
	);
};

export default LoginPage;
