import React from "react";
import { FaFilter, FaPlus } from "react-icons/fa";
import { debounce } from "lodash";

const JobsHeaderBard = ({ handleNameFilterChange, onAddJobClicked, onFiltersClicked }) => {

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
            <button className="btn btn-primary" onClick={() => onAddJobClicked()}>
              <span className="add-title">Add New Job</span>
              <span className="add-icon"><FaPlus size={14} /></span>
            </button>
            <button className="btn btn-primary filters" onClick={() => onFiltersClicked()}>
              <FaFilter size={14} />
            </button>
          </div>
          <style jsx>{`
            div {
                display: flex;
                gap: 0.3rem;
            }
            input {
                flex-grow: 1;
                padding-left: 1rem;
            }
            .add-title {
              display: none;
            }
            @media(min-width: 700px) {
              div {
                gap: 1rem;
              }
              .filters {
                display: none;
              }
              .add-title {
                display: inline;
              }
              .add-icon {
                display: none;
              }
            }
          `}</style>
        </>
    );
};

export default JobsHeaderBard;