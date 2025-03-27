
import React, { useState, useEffect } from 'react';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { festivals, Festival, getFestivalsByRegion, getFestivalsByState, getFestivalsByReligion } from '@/data/festivalData';
import { regions } from '@/data/culturalData';
import { format } from 'date-fns';

const religions = ["All", "Hinduism", "Islam", "Christianity", "Sikhism", "Buddhism", "Jainism", "Cultural"];

interface FestivalCalendarProps {
  initialRegion?: string;
  initialState?: string;
}

const FestivalCalendar: React.FC<FestivalCalendarProps> = ({ 
  initialRegion = "nationwide", 
  initialState = "all" 
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [selectedRegion, setSelectedRegion] = useState(initialRegion);
  const [selectedState, setSelectedState] = useState(initialState);
  const [selectedReligion, setSelectedReligion] = useState("All");
  const [filteredFestivals, setFilteredFestivals] = useState<Festival[]>([]);
  const [highlightedDates, setHighlightedDates] = useState<Date[]>([]);
  const [selectedDayFestivals, setSelectedDayFestivals] = useState<Festival[]>([]);

  // Get states based on selected region
  const getStatesForRegion = (region: string) => {
    if (region === "nationwide") {
      return [{ id: "all", name: "All States" }];
    }
    
    const regionKey = region as keyof typeof regionStates;
    if (regionStates[regionKey]) {
      return [{ id: "all", name: "All States" }, ...regionStates[regionKey]];
    }
    
    return [{ id: "all", name: "All States" }];
  };

  const states = getStatesForRegion(selectedRegion);

  // Filter festivals based on selected filters
  useEffect(() => {
    let filtered = festivals;

    // Filter by region
    if (selectedRegion !== "nationwide") {
      filtered = getFestivalsByRegion(selectedRegion);
    }

    // Filter by state
    if (selectedState !== "all") {
      filtered = filtered.filter(festival => 
        festival.state === selectedState || festival.state === "all"
      );
    }

    // Filter by religion
    if (selectedReligion !== "All") {
      filtered = filtered.filter(festival => 
        festival.religion === selectedReligion
      );
    }

    setFilteredFestivals(filtered);

    // Update highlighted dates
    const dates = filtered.map(festival => festival.date);
    setHighlightedDates(dates);

    // Update selected day festivals
    if (selectedDate) {
      updateSelectedDayFestivals(selectedDate, filtered);
    }
  }, [selectedRegion, selectedState, selectedReligion, selectedDate]);

  // Update festivals for the currently selected date
  const updateSelectedDayFestivals = (date: Date, festivals: Festival[]) => {
    const dayFestivals = festivals.filter(festival => 
      festival.date.getDate() === date.getDate() &&
      festival.date.getMonth() === date.getMonth()
    );
    setSelectedDayFestivals(dayFestivals);
  };

  // Handle date selection
  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    if (date) {
      updateSelectedDayFestivals(date, filteredFestivals);
    } else {
      setSelectedDayFestivals([]);
    }
  };

  // Handle region change
  const handleRegionChange = (value: string) => {
    setSelectedRegion(value);
    setSelectedState("all"); // Reset state when region changes
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Filters section */}
        <Card className="md:col-span-4">
          <CardHeader>
            <CardTitle>Festival Filters</CardTitle>
            <CardDescription>Filter festivals by region, state and religion</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Region</label>
              <Select value={selectedRegion} onValueChange={handleRegionChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a region" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nationwide">All India</SelectItem>
                  {regions.map((region) => (
                    <SelectItem key={region.id} value={region.id}>{region.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">State</label>
              <Select value={selectedState} onValueChange={setSelectedState}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  {states.map((state) => (
                    <SelectItem key={state.id} value={state.id}>{state.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Religion</label>
              <Select value={selectedReligion} onValueChange={setSelectedReligion}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a religion" />
                </SelectTrigger>
                <SelectContent>
                  {religions.map((religion) => (
                    <SelectItem key={religion} value={religion}>{religion}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Calendar section */}
        <Card className="md:col-span-8">
          <CardHeader>
            <CardTitle>Festival Calendar</CardTitle>
            <CardDescription>
              Major festivals across {selectedRegion === "nationwide" ? "India" : `the ${selectedRegion}ern region`}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              className="rounded-md border p-3 pointer-events-auto"
              modifiers={{
                festival: highlightedDates,
              }}
              modifiersStyles={{
                festival: {
                  fontWeight: 'bold',
                  backgroundColor: 'rgba(209, 121, 83, 0.2)', // terracotta with opacity
                  color: '#d17953',
                  borderRadius: '4px'
                }
              }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Festival List for selected date */}
      {selectedDate && (
        <Card>
          <CardHeader>
            <CardTitle>
              Festivals on {format(selectedDate, 'MMMM d, yyyy')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {selectedDayFestivals.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {selectedDayFestivals.map((festival) => (
                  <div key={festival.id} className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                    <div className="h-40 overflow-hidden">
                      <img 
                        src={festival.image} 
                        alt={festival.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'https://source.unsplash.com/featured/?festival,india';
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-medium">{festival.name}</h3>
                        <Badge variant="outline">{festival.religion}</Badge>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">
                        {festival.region === "nationwide" ? "All India" : `${festival.region}ern region`}
                        {festival.state !== "all" && `, ${festival.state}`}
                      </p>
                      <p className="text-sm">{festival.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No festivals on this date with the current filters.</p>
                <p className="text-sm text-gray-400 mt-2">Try changing your filters or selecting a different date.</p>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default FestivalCalendar;
