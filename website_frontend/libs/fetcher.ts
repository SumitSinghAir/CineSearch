import axios from 'axios';
// axios.defaults.baseURL = "http://10.145.121.45:5000";
const fetcher = (url: string) => axios.get(url).then(res => res.data);

export default fetcher;
