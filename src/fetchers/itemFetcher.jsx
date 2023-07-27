import axios from 'axios'

export const postFood = async ({ type, purchaseDate, name, email }) => {
    try {
        const res = await axios.post('/api/inventory', { type, purchaseDate, name, email });
        return res.data.rows;
      } catch (err) {
        console.log(err);
      }
}

export const getFood = async (email) => {
  try {
    const res = await axios.get(`/api/inventory/${email}`);
    return res.data.rows;
  } catch (err) {
    console.log(err);
  }
}

export const deleteFood = async (selectedRows, email) => {
  try {
    await axios.delete('api/inventory', { data: { selectedRows, email } })
  } catch (err) {
    console.log(err);
  }
}
