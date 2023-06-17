export const Filter = ({ value, onFilter }) => {
  return (
    <>
      <label>
        Filter by name <br />
        <input
          type="text"
          placeholder="Enter name"
          value={value}
          onChange={onFilter}
        />
      </label>
    </>
  );
};
