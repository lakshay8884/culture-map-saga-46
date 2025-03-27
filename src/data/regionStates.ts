
// Data for states within each region of India
interface State {
  id: string;
  name: string;
  image?: string;
  description?: string;
}

export const regionStates: Record<string, State[]> = {
  north: [
    { id: 'delhi', name: 'Delhi', image: 'https://source.unsplash.com/featured/?delhi', description: 'The capital territory, known for Red Fort, Qutub Minar, and India Gate.' },
    { id: 'himachal', name: 'Himachal Pradesh', image: 'https://source.unsplash.com/featured/?himachal', description: 'Known for its scenic mountain views, temples, and hill stations like Shimla and Manali.' },
    { id: 'punjab', name: 'Punjab', image: 'https://source.unsplash.com/featured/?punjab', description: 'Famous for the Golden Temple, rich agricultural lands, and vibrant Bhangra dance.' },
    { id: 'uttarakhand', name: 'Uttarakhand', image: 'https://source.unsplash.com/featured/?uttarakhand', description: 'Known as the "Land of Gods", famous for Himalayan peaks, sacred rivers, and yoga.' }
  ],
  south: [
    { id: 'kerala', name: 'Kerala', image: 'https://source.unsplash.com/featured/?kerala', description: 'Known as "God\'s Own Country", famous for backwaters, beaches, and Kathakali dance.' },
    { id: 'tamilnadu', name: 'Tamil Nadu', image: 'https://source.unsplash.com/featured/?tamilnadu', description: 'Famous for ancient Dravidian temples, classical Bharatanatyam dance, and cuisine.' },
    { id: 'karnataka', name: 'Karnataka', image: 'https://source.unsplash.com/featured/?bangalore', description: 'Known for tech hub Bangalore, historic Mysore Palace, and Hampi ruins.' },
    { id: 'andhra', name: 'Andhra Pradesh', image: 'https://source.unsplash.com/featured/?andhra', description: 'Famous for Tirupati temple, coastal beauty, and spicy cuisine.' }
  ],
  east: [
    { id: 'bengal', name: 'West Bengal', image: 'https://source.unsplash.com/featured/?kolkata', description: 'Known for Kolkata\'s colonial architecture, Durga Puja, and Rabindranath Tagore\'s legacy.' },
    { id: 'odisha', name: 'Odisha', image: 'https://source.unsplash.com/featured/?odisha', description: 'Famous for Sun Temple, Jagannath Temple, and ancient tribal cultures.' },
    { id: 'assam', name: 'Assam', image: 'https://source.unsplash.com/featured/?assam', description: 'Known for tea plantations, Kaziranga National Park, and Bihu dance.' },
    { id: 'sikkim', name: 'Sikkim', image: 'https://source.unsplash.com/featured/?sikkim', description: 'A mountainous state with Buddhist monasteries and stunning Himalayan views.' }
  ],
  west: [
    { id: 'gujarat', name: 'Gujarat', image: 'https://source.unsplash.com/featured/?gujarat', description: 'Known for vibrant textiles, the Great Rann of Kutch, and Navratri festival.' },
    { id: 'maharashtra', name: 'Maharashtra', image: 'https://source.unsplash.com/featured/?mumbai', description: 'Home to Mumbai, Ajanta-Ellora caves, and rich Marathi culture.' },
    { id: 'rajasthan', name: 'Rajasthan', image: 'https://source.unsplash.com/featured/?rajasthan', description: 'The "Land of Kings" known for palaces, forts, and vibrant desert culture.' },
    { id: 'goa', name: 'Goa', image: 'https://source.unsplash.com/featured/?goa', description: 'Famous for beaches, Portuguese architecture, and unique Indo-Portuguese culture.' }
  ],
  central: [
    { id: 'mp', name: 'Madhya Pradesh', image: 'https://source.unsplash.com/featured/?khajuraho', description: 'Known as the "Heart of India", famous for Khajuraho temples and wildlife.' },
    { id: 'chhattisgarh', name: 'Chhattisgarh', image: 'https://source.unsplash.com/featured/?chhattisgarh', description: 'Rich in tribal heritage, forests, and waterfalls.' },
    { id: 'jharkhand', name: 'Jharkhand', image: 'https://source.unsplash.com/featured/?jharkhand', description: 'Known for mineral resources, tribal culture, and natural beauty.' },
    { id: 'up', name: 'Uttar Pradesh', image: 'https://source.unsplash.com/featured/?taj-mahal', description: 'Home to the Taj Mahal, Varanasi, and significant spiritual heritage.' }
  ],
  northeast: [
    { id: 'arunachal', name: 'Arunachal Pradesh', image: 'https://source.unsplash.com/featured/?arunachal', description: 'Known as the "Land of Dawn-Lit Mountains" with diverse tribal cultures.' },
    { id: 'manipur', name: 'Manipur', image: 'https://source.unsplash.com/featured/?manipur', description: 'Famous for Loktak Lake, classical Manipuri dance, and indigenous sports.' },
    { id: 'meghalaya', name: 'Meghalaya', image: 'https://source.unsplash.com/featured/?meghalaya', description: 'Known as "Abode of Clouds", famous for living root bridges and waterfalls.' },
    { id: 'nagaland', name: 'Nagaland', image: 'https://source.unsplash.com/featured/?nagaland', description: 'Known for Hornbill Festival, tribal heritage, and stunning hill landscapes.' }
  ]
};
