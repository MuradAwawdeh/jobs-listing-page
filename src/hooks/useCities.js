import React from "react";
import cities from "@/data/cities.json";

const useCities = (countryIds) => {
    return React.useMemo(() => cities.filter((city) => countryIds.includes(city.countryId) ), [countryIds]);
};

export default useCities;