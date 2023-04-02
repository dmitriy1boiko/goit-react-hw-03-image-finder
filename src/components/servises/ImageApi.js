import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api';
const API_KEY = '33638819-a8512ecaf41a74638f038e248';

// export const getSearchedImagesApi = async (q, page = 1) => {
//   const { data } = await axios.get('/', {
//     params: {
//       key: API_KEY,
//       q,
//       image_type: 'photo',
//       orientation: 'horizontal',
//       safesearch: true,
//       per_page: 12,
//       page,
//     },
//   });

//   return data;
// };

export const getSearchedImagesApi = (q, page = 1) => {
  return axios
    .get('/', {
      params: {
        key: API_KEY,
        q,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        per_page: 12,
        page,
      },
    })
    .then(res => res.data);
};
