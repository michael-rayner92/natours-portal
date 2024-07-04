import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { useUser } from '../features/authentication/useUser';
import Spinner from './Spinner';

const FullPage = styled.div`
	height: 100vh;
	background-color: var(--color-grey-50);
	display: flex;
	align-items: center;
	justify-content: center;
`;

function ProtectedRoute({ children }) {
	const navigate = useNavigate();

	// 1. load the authenticated user
	const { isLoading, isAuthenticated, fetchStatus } = useUser();

	// 2. If there is NO authenticated user and NOT loading, redirect to the /login
	useEffect(
		function () {
			if (!isAuthenticated && !isLoading && fetchStatus !== 'fetching') {
				navigate('/login');
			}
		},
		[navigate, isAuthenticated, isLoading, fetchStatus]
	);

	// 3. While loading, show a spinner
	if (isLoading) {
		return (
			<FullPage>
				<Spinner />
			</FullPage>
		);
	}

	// 4. If there IS a user, render the app
	return children;
}

export default ProtectedRoute;
