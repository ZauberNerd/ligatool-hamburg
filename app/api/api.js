/* @flow */
import { create } from 'apisauce';
import baseUrl from './url';

const api: API = create({
  baseURL: `${baseUrl}/index.php?option=com_sportsmanagerapi&q=`
});

if (__DEV__) {
  api.addMonitor(response => {
    console.tron.apisauce(response);
  });
}

api.addRequestTransform(request => {
  if (request.params) {
    if (request.params.id) {
      request.url = `${request.url}/${request.params.id}`;
    }
    if (request.params.route) {
      request.url = request.params.route.indexOf('/') === -1
        ? `${request.url}/${request.params.route}`
        : `${request.url}${request.params.route}`;
    }
  }
});

export default api;
