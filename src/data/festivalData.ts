
// Festival data for different states and regions of India
export interface Festival {
  id: string;
  name: string;
  date: Date;
  region: string;
  state: string;
  description: string;
  image: string;
  religion?: string;
}

export const festivals: Festival[] = [
  {
    id: "diwali",
    name: "Diwali",
    date: new Date(2024, 10, 12), // November 12, 2024
    region: "nationwide",
    state: "all",
    description: "The festival of lights is one of India's most important celebrations, symbolizing the victory of light over darkness.",
    image: "https://source.unsplash.com/featured/?diwali",
    religion: "Hinduism"
  },
  {
    id: "holi",
    name: "Holi",
    date: new Date(2025, 2, 15), // March 15, 2025
    region: "nationwide",
    state: "all",
    description: "The festival of colors celebrates the arrival of spring and the triumph of good over evil.",
    image: "https://source.unsplash.com/featured/?holi",
    religion: "Hinduism"
  },
  {
    id: "eid",
    name: "Eid ul-Fitr",
    date: new Date(2024, 4, 10), // May 10, 2024
    region: "nationwide",
    state: "all",
    description: "A significant religious holiday celebrated by Muslims worldwide marking the end of Ramadan.",
    image: "https://source.unsplash.com/featured/?eid",
    religion: "Islam"
  },
  {
    id: "durga-puja",
    name: "Durga Puja",
    date: new Date(2024, 9, 10), // October 10, 2024
    region: "east",
    state: "bengal",
    description: "A major celebration honoring the goddess Durga, featuring elaborate pandals, rituals, and cultural events.",
    image: "https://source.unsplash.com/featured/?durgapuja",
    religion: "Hinduism"
  },
  {
    id: "onam",
    name: "Onam",
    date: new Date(2024, 8, 15), // September 15, 2024
    region: "south",
    state: "kerala",
    description: "Kerala's harvest festival celebrates King Mahabali and features boat races, floral decorations, and feasts.",
    image: "https://source.unsplash.com/featured/?onam",
    religion: "Hinduism"
  },
  {
    id: "pongal",
    name: "Pongal",
    date: new Date(2025, 0, 15), // January 15, 2025
    region: "south",
    state: "tamilnadu",
    description: "A four-day harvest festival dedicated to the Sun God, featuring the preparation of the special Pongal dish.",
    image: "https://source.unsplash.com/featured/?pongal",
    religion: "Hinduism"
  },
  {
    id: "bihu",
    name: "Bihu",
    date: new Date(2025, 0, 14), // January 14, 2025
    region: "northeast",
    state: "assam",
    description: "Assam's harvest festival with traditional dance, music, and feasting.",
    image: "https://source.unsplash.com/featured/?bihu",
    religion: "Cultural"
  },
  {
    id: "navratri",
    name: "Navratri",
    date: new Date(2024, 9, 3), // October 3, 2024
    region: "west",
    state: "gujarat",
    description: "Nine nights of dance and celebration honoring the goddess Durga, featuring Garba and Dandiya dances.",
    image: "https://source.unsplash.com/featured/?navratri",
    religion: "Hinduism"
  },
  {
    id: "ganesh-chaturthi",
    name: "Ganesh Chaturthi",
    date: new Date(2024, 8, 7), // September 7, 2024
    region: "west",
    state: "maharashtra",
    description: "A festival celebrating the birthday of Lord Ganesha with elaborate public installations and processions.",
    image: "https://source.unsplash.com/featured/?ganeshchaturthi",
    religion: "Hinduism"
  },
  {
    id: "christmas",
    name: "Christmas",
    date: new Date(2024, 11, 25), // December 25, 2024
    region: "nationwide",
    state: "all",
    description: "A celebration of the birth of Jesus Christ with church services, decorations, and gift-giving.",
    image: "https://source.unsplash.com/featured/?christmas,india",
    religion: "Christianity"
  },
  {
    id: "pushkar-fair",
    name: "Pushkar Camel Fair",
    date: new Date(2024, 10, 18), // November 18, 2024
    region: "west",
    state: "rajasthan",
    description: "An annual livestock fair and cultural festival with camel races, folk performances, and trading.",
    image: "https://source.unsplash.com/featured/?pushkar",
    religion: "Cultural"
  },
  {
    id: "kumbh-mela",
    name: "Kumbh Mela",
    date: new Date(2025, 1, 10), // February 10, 2025
    region: "north",
    state: "up",
    description: "The world's largest religious gathering, held every 12 years at four river bank pilgrimage sites.",
    image: "https://source.unsplash.com/featured/?kumbhmela",
    religion: "Hinduism"
  }
];

// Helper functions to work with festivals
export function getFestivalsByRegion(region: string): Festival[] {
  if (region === "nationwide") {
    return festivals;
  }
  return festivals.filter(
    festival => festival.region === region || festival.region === "nationwide"
  );
}

export function getFestivalsByState(state: string): Festival[] {
  if (state === "all") {
    return festivals;
  }
  return festivals.filter(
    festival => festival.state === state || festival.state === "all"
  );
}

export function getFestivalsByReligion(religion: string): Festival[] {
  return festivals.filter(festival => festival.religion === religion);
}

export function getFestivalsByMonth(month: number): Festival[] {
  return festivals.filter(festival => festival.date.getMonth() === month);
}

export function getFestivalsByDate(date: Date): Festival[] {
  return festivals.filter(
    festival => 
      festival.date.getDate() === date.getDate() &&
      festival.date.getMonth() === date.getMonth()
  );
}

export function addFestival(festival: Omit<Festival, 'id'>): Festival {
  const newFestival = {
    ...festival,
    id: `festival-${Date.now()}`
  };
  
  // In a real application, this would save to a database
  // Here we're just returning the new festival
  return newFestival;
}
