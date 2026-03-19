export const areas = [
  {
    id: "koramangala",
    name: "Koramangala",
    city: "Bangalore",
    averagePrice: 12500,
    priceRange: { min: 8000, max: 25000 },
    safetyScore: 8.5,
    demand: "High",
    description: "Startup hub, great cafes, high student and young professional population.",
    nearbyPlaces: [
      { name: "Christ University", type: "college", distance: "2.5 km" },
      { name: "Forum Mall", type: "mall", distance: "1.2 km" },
      { name: "Sony World Signal", type: "landmark", distance: "0.5 km" },
      { name: "St. John's Hospital", type: "hospital", distance: "3.0 km" }
    ],
    coordinates: { lat: 12.9352, lng: 77.6245 }
  },
  {
    id: "hsr-layout",
    name: "HSR Layout",
    city: "Bangalore",
    averagePrice: 11000,
    priceRange: { min: 7500, max: 20000 },
    safetyScore: 9.0,
    demand: "Very High",
    description: "Well-planned layout, wide roads, popular among techies and startup folks.",
    nearbyPlaces: [
      { name: "NIFT", type: "college", distance: "1.5 km" },
      { name: "Agara Lake", type: "landmark", distance: "2.0 km" },
      { name: "Narayana Multispeciality", type: "hospital", distance: "2.5 km" }
    ],
    coordinates: { lat: 12.9121, lng: 77.6446 }
  },
  {
    id: "indiranagar",
    name: "Indiranagar",
    city: "Bangalore",
    averagePrice: 15000,
    priceRange: { min: 10000, max: 35000 },
    safetyScore: 8.8,
    demand: "High",
    description: "Premium locality, excellent nightlife, high-end PGs and apartments.",
    nearbyPlaces: [
      { name: "Indiranagar Metro", type: "metro", distance: "1.0 km" },
      { name: "100ft Road", type: "landmark", distance: "0.2 km" },
      { name: "Manipal Hospital", type: "hospital", distance: "2.0 km" }
    ],
    coordinates: { lat: 12.9784, lng: 77.6408 }
  },
  {
    id: "electronic-city",
    name: "Electronic City",
    city: "Bangalore",
    averagePrice: 8500,
    priceRange: { min: 5000, max: 15000 },
    safetyScore: 7.5,
    demand: "Medium",
    description: "IT hub, affordable housing, slightly far from central Bangalore.",
    nearbyPlaces: [
      { name: "Infosys Campus", type: "office", distance: "1.5 km" },
      { name: "Wipro Avenue", type: "office", distance: "2.0 km" },
      { name: "PES University (South)", type: "college", distance: "4.0 km" }
    ],
    coordinates: { lat: 12.8399, lng: 77.6770 }
  },
  {
    id: "bellandur",
    name: "Bellandur",
    city: "Bangalore",
    averagePrice: 13000,
    priceRange: { min: 8500, max: 22000 },
    safetyScore: 7.8,
    demand: "High",
    description: "Close to major tech parks, heavily populated by IT professionals.",
    nearbyPlaces: [
      { name: "Eco Space", type: "office", distance: "1.0 km" },
      { name: "Sakra World Hospital", type: "hospital", distance: "2.0 km" },
      { name: "Intel", type: "office", distance: "2.5 km" }
    ],
    coordinates: { lat: 12.9304, lng: 77.6784 }
  }
];

export const getAreaById = (id) => areas.find(area => area.id === id) || null;
export const getAreasInCity = (city) => areas.filter(area => area.city.toLowerCase() === city.toLowerCase());
