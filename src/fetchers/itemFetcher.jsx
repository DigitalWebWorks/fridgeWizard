import axios from 'axios'

export const postFood = async ({ type, expDate2, name, email, category }) => {
    try {
      console.log(category)
        const res = await axios.post('/api/inventory', { type, expDate: expDate2, name, email, category });
        return res.data;
      } catch (err) {
        console.log(err);
      }
}

export const getFood = async (email) => {
  try {
    const res = await axios.get(`/api/inventory/${email}`);
    return res.data;
  } catch (err) {
    console.log(err);
  }
}

export const deleteFood = async (fridgeContents, email) => {
  try {
    await axios.delete('api/inventory', { data: { fridgeContents, email } })
  } catch (err) {
    console.log(err);
  }
}
