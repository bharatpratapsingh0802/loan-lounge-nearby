
import React from "react";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";

interface Option {
  value: string;
  label: string;
}

interface LocationSearchProps {
  states: Option[];
  cities: Option[];
  selectedState: string | null;
  selectedCity: string | null;
  onStateChange: (state: string | null) => void;
  onCityChange: (city: string | null) => void;
}

const LocationSearch: React.FC<LocationSearchProps> = ({
  states,
  cities,
  selectedState,
  selectedCity,
  onStateChange,
  onCityChange,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-center gap-3 mb-4">
      <div className="w-full md:w-48">
        <Select value={selectedState ?? ""} onValueChange={v => onStateChange(v || null)}>
          <SelectTrigger>
            <SelectValue placeholder="Select State" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All States</SelectItem>
            {states.map((state) => (
              <SelectItem key={state.value} value={state.value}>
                {state.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="w-full md:w-48">
        <Select 
          value={selectedCity ?? ""} 
          onValueChange={v => onCityChange(v || null)} 
          disabled={!selectedState}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select City" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Cities</SelectItem>
            {cities.map((city) => (
              <SelectItem key={city.value} value={city.value}>
                {city.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default LocationSearch;
