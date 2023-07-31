import axios from "axios";


const client = axios.create({
	baseURL: 'http://127.0.0.1:3001',
	withCredentials: true,
	timeout: 3000,
	xsrfCookieName: "csrftoken",
	xsrfHeaderName: 'X-CSRFTOKEN',
	headers: {
		Authorization: `Token ${typeof window !== 'undefined' ? window.localStorage.getItem('token') : ''}`
	}
});

export default client;
