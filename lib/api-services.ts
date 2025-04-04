// Mock API services for demonstration purposes

// Mock restaurant data
const mockRestaurants = [
  {
    id: "r1",
    name: "Spice Garden",
    cuisine: "North Indian",
    rating: 4.5,
    distance: "1.2 km",
    address: "42 MG Road, Bangalore",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "r2",
    name: "South Delight",
    cuisine: "South Indian",
    rating: 4.3,
    distance: "0.8 km",
    address: "15 Jayanagar 4th Block, Bangalore",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "r3",
    name: "Punjabi Dhaba",
    cuisine: "Punjabi",
    rating: 4.1,
    distance: "2.5 km",
    address: "78 Koramangala 6th Block, Bangalore",
    image: "/placeholder.svg?height=64&width=64",
  },
  {
    id: "r4",
    name: "Veg Paradise",
    cuisine: "Vegetarian",
    rating: 4.4,
    distance: "1.5 km",
    address: "23 Indiranagar 100ft Road, Bangalore",
    image: "/placeholder.svg?height=64&width=64",
  },
]

// Mock temple data
const mockTemples = [
  {
    id: "t1",
    name: "ISKCON Temple",
    deity: "Lord Krishna",
    distance: "3.2 km",
    address: "Hare Krishna Hill, Rajajinagar, Bangalore",
    timings: "4:30 AM - 8:30 PM",
  },
  {
    id: "t2",
    name: "Bull Temple",
    deity: "Nandi",
    distance: "2.1 km",
    address: "Bull Temple Road, Basavanagudi, Bangalore",
    timings: "6:00 AM - 8:00 PM",
  },
  {
    id: "t3",
    name: "Gavi Gangadhareshwara Temple",
    deity: "Lord Shiva",
    distance: "2.8 km",
    address: "Gavipuram Extension, Bangalore",
    timings: "6:30 AM - 7:30 PM",
  },
  {
    id: "t4",
    name: "Sri Someshwara Temple",
    deity: "Lord Shiva",
    distance: "1.5 km",
    address: "Halasuru, Bangalore",
    timings: "6:00 AM - 12:00 PM, 5:00 PM - 8:00 PM",
  },
]

// Mock government schemes data
const mockSchemes = [
  {
    id: "s1",
    name: "Pradhan Mantri Vaya Vandana Yojana (PMVVY)",
    description: "Pension scheme for senior citizens with guaranteed returns",
    eligibility: "Senior citizens aged 60 years and above",
    benefits: "Guaranteed pension with 7.4% annual returns for 10 years",
    documents: ["Aadhaar Card", "PAN Card", "Age Proof", "Address Proof"],
  },
  {
    id: "s2",
    name: "Senior Citizens Savings Scheme (SCSS)",
    description: "Government-backed savings scheme for seniors",
    eligibility: "Senior citizens aged 60 years and above",
    benefits: "Higher interest rates than regular FDs, tax benefits under Section 80C",
    documents: ["Aadhaar Card", "PAN Card", "Age Proof", "Address Proof"],
  },
  {
    id: "s3",
    name: "Rashtriya Vayoshri Yojana",
    description: "Scheme providing physical aids and assisted-living devices",
    eligibility: "Senior citizens belonging to BPL category",
    benefits: "Free of cost aids and assistive living devices",
    documents: ["Aadhaar Card", "BPL Card", "Age Certificate"],
  },
  {
    id: "s4",
    name: "Indira Gandhi National Old Age Pension Scheme",
    description: "Monthly pension for elderly poor",
    eligibility: "Senior citizens aged 60 years and above belonging to BPL category",
    benefits: "Monthly pension of Rs. 200-500",
    documents: ["Aadhaar Card", "BPL Card", "Age Certificate"],
  },
]

// Search nearby restaurants
export const searchNearbyRestaurants = async (query: string, latitude: number, longitude: number): Promise<any[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real app, we would use the coordinates and query to fetch from an API
  // For now, just return mock data
  return mockRestaurants
}

// Search nearby temples
export const searchNearbyTemples = async (latitude: number, longitude: number): Promise<any[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // In a real app, we would use the coordinates to fetch from Google Places API
  // For now, just return mock data
  return mockTemples
}

// Get government schemes
export const getGovernmentSchemes = async (): Promise<any[]> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // In a real app, we would fetch from API Setu
  // For now, just return mock data
  return mockSchemes
}

// Get scheme details
export const getSchemeDetails = async (schemeId: string): Promise<any> => {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Find the scheme by ID
  const scheme = mockSchemes.find((s) => s.id === schemeId)

  if (!scheme) {
    throw new Error("Scheme not found")
  }

  return scheme
}

