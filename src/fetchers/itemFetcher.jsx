// import axios
import axios from 'axios'

// define and export getTypes function; gets types for dropdown menu
export const getTypes = async () => {
  try {
    const res = await axios.get('/api/inventory/types');
    return res.data.rows;
  } catch (err) {
    console.log(err);
  }
}

// define and export getFood function; gets fridge items for a user
export const getFood = async (email) => {
  try {
    const res = await axios.get(`/api/inventory/${email}`);
    return res.data.rows;
  } catch (err) {
    console.log(err);
  }
}

// define and export postFood function; add new fridge item for a user
export const postFood = async ({ type, purchaseDate, name, email }) => {
  try {
    const res = await axios.post('/api/inventory', { type, purchaseDate, name, email });
    return res.data.rows;
  } catch (err) {
    console.log(err);
  }
}

// define and export deletFood function; delete fridge items for a user
export const deleteFood = async (selectedRows, email) => {
  try {
    const res = await axios.delete('api/inventory', { data: { selectedRows, email } })
    return res.data.rows;
  } catch (err) {
    console.log(err);
  }
}
