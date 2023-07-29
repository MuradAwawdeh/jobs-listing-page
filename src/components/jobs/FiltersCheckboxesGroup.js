import React, { memo } from "react";

const FiltersCheckboxesGroup = ({ items, onChange }) => {
    const [checkboxesState, setCheckboxesState] = React.useState(new Array(items.length).fill(false));
    const handleChange = (i) => {
        const updatedCheckboxState = checkboxesState.map((item, index) => index === i ? !item : item);
        setCheckboxesState(updatedCheckboxState);
    };

    React.useEffect(() => {
        const selectedIds = [];
        items.forEach((item, index) => {
            if (checkboxesState[index]) selectedIds.push(item.id);
        });

        onChange(selectedIds);
    }, [checkboxesState]);

    React.useEffect(() => {
        setCheckboxesState(new Array(items.length).fill(false));
    }, [items]);

    return (
        <>
            {items.map((item, index) => (
                <div key={item.id}>
                    <input
                        type="checkbox"
                        value={item.id}
                        checked={checkboxesState[index]}
                        onChange={() => handleChange(index)}
                    /> {item.name}
                </div>
            ))}
        </>
    );
};

export default memo(FiltersCheckboxesGroup);