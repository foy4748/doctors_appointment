import axios from "axios";

const client = axios.create({
	baseURL: 'http://localhost:3001',
	withCredentials: true,
	timeout: 3000,
	xsrfCookieName: 'csrftoken',
	xsrfHeaderName: 'X-CSRFToken',

});

export default client;
