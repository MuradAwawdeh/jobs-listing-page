import React from "react";
import useSectors from "@/hooks/useSectors.js";
import useCountries from "@/hooks/useCountries.js";
import useCities from "@/hooks/useCities.js";
import styles from "@/styles/Filters.module.scss";

const Filters = ({ handleFiltersChange }) => {
    const [selectedCountriesIds, setSelectedCountriesIds] = React.useState([]);
    const sectors = useSectors();
    const countries = useCountries();
    const cities = useCities([1]);

    const [sectorsCheckboxesState, setSectorsCheckboxesState] = React.useState(new Array(sectors.length).fill(false));
    const handleSectorsChange = (i) => {
        const updatedCheckboxState = sectorsCheckboxesState.map((item, index) => index === i ? !item : item);
        setSectorsCheckboxesState(updatedCheckboxState);
    };

    const [countriesCheckboxesState, setCountriesCheckboxesState] = React.useState(new Array(countries.length).fill(false));
    const handleCountriesChange = (i) => {
        const updatedCheckboxState = countriesCheckboxesState.map((item, index) => index === i ? !item : item);
        setCountriesCheckboxesState(updatedCheckboxState);
    };

    const [citiesCheckboxesState, setCitiesCheckboxesState] = React.useState(new Array(cities.length).fill(false));
    const handleCitiesChange = (i) => {
        console.log(i);
        // console.log(citiesCheckboxesState);
        const updatedCheckboxState = citiesCheckboxesState.map((item, index) => index === i ? !item : item);
        setCitiesCheckboxesState(updatedCheckboxState);
        // console.log(updatedCheckboxState);
    };

    React.useEffect(() => {
        const selectedSectorsIds = [];
        sectors.forEach((sector, index) => {
            if (sectorsCheckboxesState[index]) selectedSectorsIds.push(sector.id);
        });

        const selected = [];
        countries.forEach((country, index) => {
            if (countriesCheckboxesState[index]) selected.push(country.id);
        });
        setSelectedCountriesIds(selected);

        const selectedCitiesIds = [];
        cities.forEach((city, index) => {
            if (citiesCheckboxesState[index]) selectedCitiesIds.push(city.id);
        });

        // console.log({
        //     sectors: selectedSectorsIds,
        //     countries: selectedCountriesIds,
        //     cities: selectedCitiesIds
        // })
        handleFiltersChange({
            sectors: selectedSectorsIds,
            countries: selected,
            cities: selectedCitiesIds
        });
    }, [sectorsCheckboxesState, countriesCheckboxesState, citiesCheckboxesState]);

    return (
        <form className={styles.form}>
            <section>
                <label>Sector</label><br/>
                {sectors.map((sector, index) => (
                    <div key={sector.id}>
                        <input
                            type="checkbox"
                            name="sector"
                            value={sector.id}
                            checked={sectorsCheckboxesState[index]}
                            onChange={() => handleSectorsChange(index)}
                        /> {sector.name}
                    </div>
                ))}
            </section>
            <section>
                <label>Country</label><br/>
                {countries.map((country, index) => (
                    <div key={country.id}>
                        <input
                            type="checkbox"
                            name="country"
                            value={country.id}
                            checked={countriesCheckboxesState[index]}
                            onChange={() => handleCountriesChange(index)}
                        /> {country.name}
                    </div>
                ))}
            </section>
            <section>
                <label>City</label><br/>
                {cities.map((city, index) => (
                    <div key={city.id}>
                        <input
                            type="checkbox"
                            name="city"
                            value={city.id}
                            checked={citiesCheckboxesState[index]}
                            onChange={() => handleCitiesChange(index)}
                        /> {city.name}
                    </div>
                ))}
            </section>
        </form>
    );
};

export default Filters;