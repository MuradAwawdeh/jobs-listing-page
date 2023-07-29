import React from "react";
import cities from "@/data/cities.json";

const useCities = (countryIds) => {
    return React.useMemo(() => {
        if (countryIds.length == 0)
            return cities;
        return cities.filter((city) => countryIds.includes(city.countryId) )
    }, [countryIds]);
};

export default useCities;