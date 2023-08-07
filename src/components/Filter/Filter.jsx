import PropTypes from 'prop-types';
import css from "./Filter.module.css"

export function Filter ({filter, handleFilterChange}){
  return (
          <input
            className={css.inputs}
            type="text"
            name="filter"
            value={filter}
            onChange={handleFilterChange}
            placeholder="Search by name"
          />
        );
}

Filter.propTypes ={
  filter: PropTypes.string.isRequired,
  handleFilterChange: PropTypes.func.isRequired
}
