import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '35953983-a066171bf8548120346cceae4';

axios.defaults.params = {
  orientation: 'horizontal',
  image_type: 'photo',
  per_page: 12,
};

export const getImages = async (query, page) => {
  const { data } = await axios.get(
    `${BASE_URL}?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal`
  );

  return data;
};
