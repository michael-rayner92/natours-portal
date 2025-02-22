import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis
} from 'recharts';
import styled from 'styled-components';
import DashboardBox from './DashboardBox';
import { useDarkMode } from '../../context/useDarkMode';
import Heading from '../../ui/Heading';
import { eachDayOfInterval, format, isSameDay, subDays } from 'date-fns';

const StyledSalesChart = styled(DashboardBox)`
	grid-column: 1 / -1;

	/* Hack to change grid line colors */
	& .recharts-cartesian-grid-horizontal line,
	& .recharts-cartesian-grid-vertical line {
		stroke: var(--color-grey-300);
	}
`;

const darkModeColors = {
	totalSales: { stroke: '#4f46e5', fill: '#4f46e5' },
	extrasSales: { stroke: '#22c55e', fill: '#22c55e' },
	text: '#e5e7eb',
	background: '#18212f'
};

const lightModeColors = {
	totalSales: { stroke: '#4f46e5', fill: '#c7d2fe' },
	extrasSales: { stroke: '#16a34a', fill: '#dcfce7' },
	text: '#374151',
	background: '#fff'
};

function SalesChart({ bookings, numDays }) {
	const { isDarkMode } = useDarkMode();

	const colors = isDarkMode ? darkModeColors : lightModeColors;

	const allDates = eachDayOfInterval({ start: subDays(new Date(), numDays - 1), end: new Date() });

	const data = allDates.map((date) => {
		return {
			label: format(date, 'MMM dd'),
			totalSales: bookings
				.filter((booking) => isSameDay(date, new Date(booking.created_at)))
				.reduce((acc, cur) => acc + cur.totalPrice, 0),
			extrasSales: bookings
				.filter((booking) => isSameDay(date, new Date(booking.created_at)))
				.reduce((acc, cur) => acc + cur.extrasPrice, 0)
		};
	});

	return (
		<StyledSalesChart>
			<Heading as="h2">
				Sales from {format(allDates.at(0), 'MMM dd yyyy')} &mdash;{' '}
				{format(allDates.at(-1), 'MMM dd yyyy')}
			</Heading>

			<ResponsiveContainer height={300} width="100%">
				<AreaChart data={data} height={300} width={700}>
					<CartesianGrid strokeDasharray="4" />
					<XAxis dataKey="label" tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
					<YAxis unit="$" tick={{ fill: colors.text }} tickLine={{ stroke: colors.text }} />
					<Tooltip contentStyle={{ backgroundColor: colors.background }} />
					<Area
						dataKey="totalSales"
						type="monotone"
						stroke={colors.totalSales.stroke}
						fill={colors.totalSales.fill}
						strokeWidth={2}
						name="Total sales"
						unit="$"
					/>
					<Area
						dataKey="extrasSales"
						type="monotone"
						stroke={colors.extrasSales.stroke}
						fill={colors.extrasSales.fill}
						strokeWidth={2}
						name="Extras sales"
						unit="$"
					/>
				</AreaChart>
			</ResponsiveContainer>
		</StyledSalesChart>
	);
}

export default SalesChart;
