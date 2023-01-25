import { Typography, useTheme } from '@mui/material';
import FlexBetween from 'components/FlexBetween';
import WidgetWrapper from 'components/WidgetWrapper';

const AdvertWidget = () => {
	const { palette } = useTheme();
	const dark = palette.neutral.dark;
	const main = palette.neutral.main;
	const medium = palette.neutral.medium;

	return (
		<WidgetWrapper>
			<FlexBetween>
				<Typography color={dark} variant="h5" fontWeight="500">
					Sponsored
				</Typography>
				<Typography color={medium}>Crate Ad</Typography>
			</FlexBetween>
			<img
				width="100%"
				height="auto"
				style={{ borderRadius: '0.75rem', margin: '0.75rem 0' }}
				src={`${process.env.REACT_BASE_URL}/assets/info4.jpeg`}
				alt="advert"
			/>
			<FlexBetween gap="0.5rem">
				<Typography color={main}>MikaCosmetics</Typography>
				<Typography color={medium}>mikacosmetics.com</Typography>
			</FlexBetween>
			<Typography color={medium} m="0.5rem 0">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur aliquam natus
				possimus illum
			</Typography>
		</WidgetWrapper>
	);
};

export default AdvertWidget;
