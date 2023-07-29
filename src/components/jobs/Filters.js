import React from "react";
import useSectors from "@/hooks/useSectors.js";
import useCountries from "@/hooks/useCountries.js";
import useCities from "@/hooks/useCities.js";
import FiltersCheckboxesGroup from "@/components/jobs/FiltersCheckboxesGroup.js";
import styles from "@/styles/Filters.module.scss";

const Filters = ({ handleFiltersChange }) => {
    const [selectedCountriesIds, setSelectedCountriesIds] = React.useState([]);
    const filters = React.useRef({
        sectors: [],
        countries: [],
        cities: []
    });
    const sectorsList = useSectors();
    const countriesList = useCountries();
    const citiesList = useCities(selectedCountriesIds);

    const handleSectorsChange = (sectors) => {
        filters.current.sectors = sectors;
        handleFiltersChange(filters.current);
    };

    const handleCountriesChange = (countries) => {
        filters.current.countries = countries;
        setSelectedCountriesIds(countries);
        handleFiltersChange(filters.current);
    };

    const handleCitiesChange = (cities) => {
        filters.current.cities = cities;
        handleFiltersChange(filters.current);
    };

    return (
        <form className={styles.form}>
            <section>
                <label>Sector</label><br/>
                <FiltersCheckboxesGroup items={sectorsList} onChange={handleSectorsChange} />
            </section>
            <section>
                <label>Country</label><br/>
                <FiltersCheckboxesGroup items={countriesList} onChange={handleCountriesChange} />
            </section>
            {citiesList.length > 0 && (<section>
                <label>City</label><br/>
                <FiltersCheckboxesGroup items={citiesList} onChange={handleCitiesChange} />
            </section>)}
        </form>
    );
};

export default Filters;