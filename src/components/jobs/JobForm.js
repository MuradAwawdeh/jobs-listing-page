import React from "react";
import { useForm, Controller } from "react-hook-form";
import useSectors from "@/hooks/useSectors.js";
import useCountries from "@/hooks/useCountries.js";
import useCities from "@/hooks/useCities.js";
import styles from "@/styles/JobsForm.module.scss";

const JobForm = ({ handleClose, handleAddNewJob }) => {
    const sectors = useSectors();
    const countries = useCountries();
    const cities = useCities([1]);

    const { control, handleSubmit } = useForm({
        defaultValues: {
          title: '',
          sector: sectors[0],
          country: countries[0],
          city: cities[0],
          description: ""
        }
    });
    const onSubmit = data => handleAddNewJob(data);

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
                        <input className={error ? 'has-error' : ''} value={value} onChange={onChange} placeholder="Title" />
                    )}
                />
                <Controller
                    name="sector"
                    rules={{
                        required: true
                    }}
                    control={control}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <select className={error ? 'has-error' : ''} value={value} onChange={onChange}>
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
                        <select className={error ? 'has-error' : ''} value={value} onChange={onChange}>
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
                        <select className={error ? 'has-error' : ''} value={value} onChange={onChange}>
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
                        <textarea className={`${styles.textarea} ${error ? 'has-error' : ''}`} rows={5} value={value} onChange={onChange} />
                    )}
                />
                
            </div>
            <div className={styles.buttons}>
                <button className="btn btn-secondary" onClick={() => handleClose()}>Cancel</button>
                <button className="btn btn-primary" type="submit">Add New Job</button>
            </div>
        </form>
    );
};

export default JobForm;