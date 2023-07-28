import React from "react";
import sectors from "@/data/sectors.json";

const useSectors = () => {
    return React.useMemo(() => sectors, []);
};

export default useSectors;