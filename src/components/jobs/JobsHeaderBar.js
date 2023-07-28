import React from "react";
import { debounce } from "lodash";

const JobsHeaderBard = ({handleNameFilterChange}) => {

    const onChange = React.useCallback(
      debounce((e) => {
        handleNameFilterChange(e.target.value)
      }, 300),
      []
    );
  
    return (
        <>
          <div>
            <input type="text" onChange={onChange} placeholder="Search By Job Title" />
            <button className="btn btn-primary">Add New Job</button>
          </div>
          <style jsx>{`
            div {
                display: flex;
                gap: 1rem;
            }
            input {
                flex-grow: 1;
                padding-left: 1rem;
            }
          `}</style>
        </>
    );
};

export default JobsHeaderBard;