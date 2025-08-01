export const AMENITY_ICONS = [
	{ amenity: 'Garden View', icon: 'fa-solid fa-tree-city' },
	{ amenity: 'Private Entrance', icon: 'fa-solid fa-door-closed' },
	{ amenity: 'Private Backyard', icon: 'fa-solid fa-tree' }, // if unavailable, fallback to 'fa-tree'
	{ amenity: 'Free Parking on Premises', icon: 'fa-solid fa-parking' },
	{ amenity: 'Hot Water', icon: 'fa-solid fa-hot-tub' }, // or 'fa-solid fa-water'
	{ amenity: 'Wi-Fi', icon: 'fa-solid fa-wifi' },
	{ amenity: 'Induction Stove', icon: 'fa-solid fa-burn' },
	{ amenity: 'In-Unit Washer', icon: 'fa-solid fa-soap' }, // 'fa-washer' isn't official, 'fa-soap' is a decent fit
	{ amenity: 'Heating and Cooling', icon: 'fa-solid fa-thermometer-half' },
	{ amenity: 'Smoke Alarm', icon: 'fa-solid fa-bell' }, // or 'fa-solid fa-fire'
	{ amenity: 'Fire Extinguisher', icon: 'fa-solid fa-fire-extinguisher' },
	{ amenity: 'Carbon Monoxide Alarm', icon: 'fa-solid fa-triangle-exclamation' }, // general alert icon
	{ amenity: 'First Aid Kit', icon: 'fa-solid fa-kit-medical' },
	{ amenity: 'Security Cameras', icon: 'fa-solid fa-video' },
	{ amenity: 'Balcony or Terrace', icon: 'fa-solid fa-umbrella-beach' },
	{ amenity: 'Pet-Friendly', icon: 'fa-solid fa-paw' },
	{ amenity: 'Swimming Pool', icon: 'fa-solid fa-person-swimming' }, // 'fa-swimmer' in older versions
	{ amenity: 'Fitness Center', icon: 'fa-solid fa-dumbbell' },
	{ amenity: 'Elevator Access', icon: 'fa-solid fa-up-down' }, // fallback: 'fa-solid fa-arrow-up-down'
	{ amenity: '24/7 Security', icon: 'fa-solid fa-shield-halved' },
	{ amenity: 'Backup Power', icon: 'fa-solid fa-bolt' },
	{ amenity: 'Wheelchair Accessible', icon: 'fa-solid fa-wheelchair' },
	{ amenity: 'Baby Crib / High Chair', icon: 'fa-solid fa-baby' },
	{ amenity: 'Workspace / Desk Area', icon: 'fa-solid fa-laptop' },
	{ amenity: 'Smart TV', icon: 'fa-solid fa-tv' },
	{ amenity: 'Kitchen Essentials', icon: 'fa-solid fa-utensils' },
	{ amenity: 'Cleaning Service', icon: 'fa-solid fa-broom' }
];


export const PLACEHOLDER_PROPERTIES = [
	{
		name: 'SK Suites Apartments',
		location: 'AltStadt',
		type: 'Condo',
		price: 20000,
		availability: false,
		isRental: true,
		rooms: 2,
		imageUrl: '../../../../assets/images/img2.webp'
	},
	{
		name: '',
		location: 'Pilintz',
		type: 'Tiny Home',
		price: 25000,
		availability: true,
		isRental: true,
		rooms: 1,
		imageUrl: '../../../../assets/images/img3.webp'
	},
	{
		name: '',
		location: 'Stralsund',
		type: 'Bungalow',
		price: 2200000,
		availability: true,
		isRental: false,
		rooms: 5,
		imageUrl: '../../../../assets/images/img4.avif'
	}
];


export const PLACEHOLDER_MAP_POINTS = [
	{
		name: "Kiambu Heights",
		description: "Modern apartments with serene surroundings near Kiambu Road.",
		lat: -1.1612,
		lng: 36.8304,
	},
	{
		name: "Greenfield Residency",
		description: "Quiet, gated estate close to Ridgeways and Thindigua.",
		lat: -1.1595,
		lng: 36.8387
	},
	{
		name: "Palm View Apartments",
		description: "Spacious 2 & 3 bedroom units near Kiambu Institute.",
		lat: -1.1619,
		lng: 36.8441
	},
	{
		name: "Thindigua Towers",
		description: "Luxury living just minutes from Nairobi CBD.",
		lat: -1.1643,
		lng: 36.8449
	},
	{
		name: "Sunset Gardens Kiambu",
		description: "Affordable family-friendly units with play areas.",
		lat: -1.1657,
		lng: 36.8299
	},
	{
		name: "Royal Nest Apartments",
		description: "Secure and elegant living near Kiambu Mall.",
		lat: -1.1628,
		lng: 36.8267
	},
	{
		name: "Oak Villas Kiambu",
		description: "Minimalist apartments with a rooftop view of Karura Forest.",
		lat: -1.1583,
		lng: 36.8342
	},
	{
		name: "Starlight Residency",
		description: "Perfect for students & young professionals near Kiambu Institute.",
		lat: -1.1601,
		lng: 36.8415
	},
	{
		name: "Twiga Homes",
		description: "Budget-friendly flats near Kiambu Town center.",
		lat: -1.1625,
		lng: 36.8370
	},
	{
		name: "Nairobi Ridgeview",
		description: "Stylish apartments near Kiambu Golf Club.",
		lat: -1.1679,
		lng: 36.8409
	}
];
