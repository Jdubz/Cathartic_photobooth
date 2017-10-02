import axios from 'axios';

const postPhoto = (photo) => {
  return axios.post('/photo', { photo });
};

module.exports = {
  postPhoto,
};
