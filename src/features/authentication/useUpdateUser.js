import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-hot-toast';
import { updateCurrentUser as updateCurrentUserApi } from '../../services/apiAuth';

export function useUpdateCurrentUser() {
	const queryClient = useQueryClient();

	const { isLoading: isUpdating, mutate: updateCurrentUser } = useMutation({
		mutationFn: updateCurrentUserApi,
		onSuccess: () => {
			toast.success('User successfully updated');
			queryClient.invalidateQueries({ queryKey: ['user'] });
		},
		onError: (err) => toast.error(err.message)
	});

	return { isUpdating, updateCurrentUser };
}
