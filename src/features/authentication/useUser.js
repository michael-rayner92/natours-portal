import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../../services/apiAuth';

export function useUser() {
	const {
		isLoading,
		fetchStatus,
		data: user
	} = useQuery({
		queryKey: ['user'],
		queryFn: getCurrentUser
	});

	return { isLoading, fetchStatus, user, isAuthenticated: user?.role === 'authenticated' };
}
