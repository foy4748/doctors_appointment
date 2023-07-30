import axios from "axios";

const client = axios.create({
	baseURL: import.meta.env.VITE_SERVER_ADDRESS,
	withCredentials: true,
	timeout: 3000,
	headers: {'X-Custom-Header': 'foobar'},
	xsrfCookieName: 'csrftoken',
	xsrfHeaderName: 'X-CSRFToken',

});

export default client;
