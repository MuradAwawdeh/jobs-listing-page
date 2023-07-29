import React from "react";
import { useForm, Controller } from "react-hook-form";
import useSectors from "@/hooks/useSectors.js";
import useCountries from "@/hooks/useCountries.js";
import useCities from "@/hooks/useCities.js";
import styles from "@/styles/JobsForm.module.scss";

const JobForm = ({ handleClose, handleAddNewJob, jobData = null }) => {
    const sectors = useSectors();
    const countries = useCountries();
    const [selecedCountry, setSelectedCountry] = React.useState(jobData  ? jobData.country.id : countries[0].id);
    const cities = useCities([selecedCountry]);

    const { control, handleSubmit, watch, setValue } = useForm({
        defaultValues: {
          title: jobData ? jobData.title : '',
          sector: jobData ? jobData.sector : sectors[0],
          country: jobData ? jobData.country : countries[0],
          city: jobData ? jobData.city : cities[0],
          description: jobData ? jobData.description : ""
        }
    });
    const onSubmit = data => handleAddNewJob(data);

    React.useEffect(() => {
        setSelectedCountry(watch("country").id);
    }, [watch("country")]);

    React.useEffect(() => {
        setValue("city", cities[0]);
    }, [cities]);

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
            <div className={styles.group}>
                <Controller
                    name="title"
                    rules={{
                        required: true
                    }}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <input disabled={jobData} className={error ? 'has-error' : ''} value={value} onChange={onChange} placeholder="Title" />
                    )}
                />
                <Controller
                    name="sector"
                    rules={{
                        required: true
                    }}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <select disabled={jobData} className={error ? 'has-error' : ''} value={value.id} onChange={(v) => {
                            onChange(sectors.find((val) => val.id == v.target.value));
                        }}>
                            {sectors.map((sector) => (
                                <option key={sector.id} value={sector.id}>{sector.name}</option>
                            ))}
                        </select>
                    )}
                />
            </div>
            <div className={styles.group}>
                <Controller
                    name="country"
                    rules={{
                        required: true
                    }}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <select disabled={jobData} className={error ? 'has-error' : ''} value={value.id} onChange={(v) => {
                            onChange(countries.find((val) => val.id == v.target.value));
                        }}>
                            {countries.map((country) => (
                                <option key={country.id} value={country.id}>{country.name}</option>
                            ))}
                        </select>
                    )}
                />
                <Controller
                    name="city"
                    rules={{
                        required: true
                    }}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <select disabled={jobData} className={error ? 'has-error' : ''} value={value.id} onChange={(v) => {
                            onChange(cities.find((val) => val.id == v.target.value));
                        }}>
                            {cities.map((city) => (
                                <option key={city.id} value={city.id}>{city.name}</option>
                            ))}
                        </select>
                    )}
                />
            </div>
            <div>
                <Controller
                    name="description"
                    rules={{
                        required: true
                    }}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <textarea disabled={jobData} className={`${styles.textarea} ${error ? 'has-error' : ''}`} rows={5} value={value} onChange={onChange} />
                    )}
                />
                
            </div>
            <div className={styles.buttons}>
                <button className="btn btn-secondary" onClick={() => handleClose()}>Cancel</button>
                {!jobData && <button className="btn btn-primary" type="submit">Add New Job</button>}
            </div>
        </form>
    );
};

export default JobForm;