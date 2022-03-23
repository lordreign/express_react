import axios from 'axios';

const instance = axios.create({
  // baseURL: process.env.VUE_APP_API_URL,
  baseURL: 'http://localhost:3030',
});

instance.interceptors.request.use(
  (config) => {
    // config.headers.accept = 'application/json;';
    config.headers['Content-Type'] = 'application/json; charset=utf-8';
    // 개발환경일때만..
    if (process.env.NODE_ENV === 'development') {
      config.headers['Access-Control-Allow-Origin'] = '*';
    }
    console.log('instance.interceptors.request', config.headers);
    // config.headers.Authorization = ' 토큰 값';
    console.debug('axios request interceptor', config);
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  },
);

instance.interceptors.response.use(
  (response) => {
    console.debug('axios response interceptor', response);
    // 500
    // 404 처리
    // 해당 방법으로 로그인 페이지 redirect 처리 할 수 있음.
    // router.push('/');
    return response;
  },
  (error) => Promise.reject(error),
);

export default {
  instance,
};
