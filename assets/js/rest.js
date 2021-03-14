export const xhr = (url='', config = {}, method = 'GET') => {
  if(window) {
    if (window.localStorage.getItem('token')) {
      return fetch(process.env.baseUrl + url, {
        method,
        body: JSON.stringify(
          config.body,
        ),
        headers: {
          'authorization': `Bearer ${JSON.parse(window.localStorage.getItem('token'))}`,
          'Content-Type': 'application/json',
        },
      }).then(res => {
        if (res.ok) {
          return res.json();
        } else return Promise.reject(res);
      });
    }
  } else return new Promise()
};

export const get = (url, config) => xhr(url, config, 'GET');
export const post = (url, config) => xhr(url, config, 'POST');



