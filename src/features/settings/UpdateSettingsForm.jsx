import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Spinner from '../../ui/Spinner';
import { useSettings } from './useSettings';
import { useUpdateSettings } from './useUpdateSettings';

function UpdateSettingsForm() {
	const {
		isLoading,
		settings: { minBookingLength, maxBookingLength, maxGuestsPerBooking, breakfastPrice } = {}
	} = useSettings();

	const { isUpdating, updateSettings } = useUpdateSettings();

	if (isLoading) return <Spinner />;

	function handleUpdate(event) {
		const { value, id, defaultValue } = event.target;

		if (!value || !id || defaultValue === value) return;
		updateSettings({ [id]: value });
		event.target.defaultValue = value;
	}

	return (
		<Form>
			<FormRow label="Minimum nights/booking">
				<Input
					type="number"
					id="minBookingLength"
					disabled={isUpdating}
					defaultValue={minBookingLength}
					onBlur={handleUpdate}
				/>
			</FormRow>
			<FormRow label="Maximum nights/booking">
				<Input
					type="number"
					id="maxBookingLength"
					disabled={isUpdating}
					defaultValue={maxBookingLength}
					onBlur={handleUpdate}
				/>
			</FormRow>
			<FormRow label="Maximum guests/booking">
				<Input
					type="number"
					id="maxGuestsPerBooking"
					disabled={isUpdating}
					defaultValue={maxGuestsPerBooking}
					onBlur={handleUpdate}
				/>
			</FormRow>
			<FormRow label="Breakfast price">
				<Input
					type="number"
					id="breakfastPrice"
					disabled={isUpdating}
					defaultValue={breakfastPrice}
					onBlur={handleUpdate}
				/>
			</FormRow>
		</Form>
	);
}

export default UpdateSettingsForm;
