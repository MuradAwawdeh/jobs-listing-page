import React from "react";
import countries from "@/data/countries.json";

const useCountries = () => {
    return React.useMemo(() => countries, []);
};

export default useCountries;