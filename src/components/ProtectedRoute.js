import { Navigate, Outlet } from "react-router-dom";

export function ProtectedRoute({ children, user }) {
	if (!user) {
		return <Navigate replace to="/login" />;
	}

	return children ? children : <Outlet />;
}
