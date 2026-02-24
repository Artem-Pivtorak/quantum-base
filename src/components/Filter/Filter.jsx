import { useDispatch, useSelector } from 'react-redux';
import { setFilter } from '../../redux/filterSlice'; 
import { selectFilter } from '../../redux/filterSlice';

const Filter = () => {
  const dispatch = useDispatch();
  const filter = useSelector(selectFilter);

  const handleChange = (e) => {
    dispatch(setFilter(e.target.value));
  };

  return (
    <input
      type="text"
      placeholder="Пошук контакту"
      value={filter}
      onChange={handleChange}
      style={{ padding: '8px', marginBottom: '15px', width: '100%' }}
    />
  );
};

export default Filter;
