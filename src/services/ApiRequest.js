import pathToRegexp from 'path-to-regexp';

const urlPatterns = [
  '/api/status',
  '/api/storage',
  '/api/wallets',
  '/api/wallets/generate',
  '/api/wallets/:id',
  '/api/wallets/:id/assets',
  '/api/wallets/:id/assets/:assetId',
  '/api/wallets/:id/pdf',
  '/api/networks',
  '/api/networks/:networkId/terms',
  '/api/networks/:networkId/status',
  '/api/networks/:networkId/address/:address',
];

const getParams = ({ url }) => {
  const params = {};
  urlPatterns.forEach(p => {
    const keys = [];
    const re = pathToRegexp(p, keys);
    if (keys.length > 0) {
      const results = re.exec(url);
      if (results) {
        keys.forEach((key, i) => {
          params[key.name] = results[i + 1]; 
        });
      }
    }
  });
  return params;
};

const getUrlPattern = ({ url }) => {
  for (let i = 0; i < urlPatterns.length; i++) {
    if (pathToRegexp(urlPatterns[i]).test(url)) {
      return urlPatterns[i];
    }
  }
};

const makeRandomString = () => Math.random().toString(32).substring(2);

export const getRoot = () => {
  const root = localStorage.getItem("masterwallet_api_root") ||
    process.env.REACT_APP_API_URL || '/api';
  return root;
};

export const getLanguage = () => {
  return localStorage.getItem('masterwallet_lang') || process.env.REACT_APP_LANG || 'en';
};

export const isElectron = () => {
  if (window && typeof window.require === 'function') {
    const electron = window.require('electron');
    const isElectron = electron.remote.getGlobal('process').env.REACT_APP_IS_ELECTRON;
    return isElectron === 'true';
  }
  return false;
};

const fetchIPC = ({ method, url, options }) => {
  return new Promise((resolve, reject) => {
    const { ipcRenderer } = window.require('electron');
    if (ipcRenderer) {
      // Extract params from url
      options.params = getParams({ url });
      // Convert url to pattern, because IPCMain is bound to pattern, not particular url
      const _url = getUrlPattern({ url });
      const channel = `${method} ${_url}`;
      
      // Generate listener name to remove it later
      const listener = makeRandomString();
      options.params.listener = listener;
      global[listener] = (event, args) => {
        //console.log(Math.random(), options, channel, args);
        const response = JSON.parse(args);
        global[response.params.resolver](response);
      };

      // Function that calls promise resolve
      const resolver = makeRandomString();
      options.params.resolver = resolver;
      global[resolver] = (response) => { 
        resolve(response);
        // Remove listener from callback
        ipcRenderer.removeListener(channel, global[response.params.listener]);
        // Remove listener from global:
        //delete global[response.params.listener];
        // Remove resolver from global:
        //delete global[response.params.resolver];
      };
      ipcRenderer.on(channel, global[listener]);
      ipcRenderer.send(channel, options);
    } else {
      reject('Electron IPC Rendered not found');
    }
  });
};

const fetchPlainIPC = ({ url, options }) => {
  return new Promise((resolve, reject) => {
    const { ipcRenderer } = window.require('electron');
    if (ipcRenderer) {
      options.params = getParams({ url });
      const _url = getUrlPattern({ url });
      const channel = `GET ${_url}`;
      const listener = (event, args) => {
        resolve(args);
        ipcRenderer.removeListener(channel, listener);
      };
      ipcRenderer.on(channel, listener);
      ipcRenderer.send(channel, options);
    } else {
      reject('Electron IPC Rendered not found')
    }
  });
};

const strip = (html) => {
  let returnText = "" + html;
  returnText=returnText.replace(/<head.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/head>/gi, "");

  //-- remove BR tags and replace them with line break
  returnText=returnText.replace(/<br>/gi, "\n");
  returnText=returnText.replace(/<br\s\/>/gi, "\n");
  returnText=returnText.replace(/<br\/>/gi, "\n");

  //-- remove P and A tags but preserve what's inside of them
  returnText=returnText.replace(/<p.*>/gi, "\n");
  returnText=returnText.replace(/<a.*href="(.*?)".*>(.*?)<\/a>/gi, " $2 ($1)");

  //-- remove all inside SCRIPT and STYLE tags
  returnText=returnText.replace(/<script.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/script>/gi, "");
  returnText=returnText.replace(/<style.*>[\w\W]{1,}(.*?)[\w\W]{1,}<\/style>/gi, "");
  //-- remove all else
  returnText=returnText.replace(/<(?:.|\s)*?>/g, "");

  //-- get rid of more than 2 multiple line breaks:
  returnText=returnText.replace(/(?:(?:\r\n|\r|\n)\s*){2,}/gim, "\n\n");

  //-- get rid of more than 2 spaces:
  returnText = returnText.replace(/ +(?= )/g,'');

  //-- get rid of html-encoded characters:
  returnText=returnText.replace(/&nbsp;/gi," ");
  returnText=returnText.replace(/&amp;/gi,"&");
  returnText=returnText.replace(/&quot;/gi,'"');
  returnText=returnText.replace(/&lt;/gi,'<');
  returnText=returnText.replace(/&gt;/gi,'>');
  returnText=returnText.replace(/&#0?39;/gi,'\'');
  return returnText;
};


// the server might not response with JSON as expected
// for example, NodeJS server may return error in plain text
// or it could be NGINX error message
const handleJsonResponse = async (res) => {
  const contentType = res.headers.get('content-type');
  // console.info('Content Type Received:', contentType);
  if (contentType.indexOf('text/html') !== -1) {

    const text = await res.text();
    // at this branch, something went wrong on the server
    // and instead of expected JSON we received HTML page instead.
    // The intention here - is to convert it to the nice human error

    // case for Express server error
    const m = /<body>\s*<pre>([^<]*)<\/pre>\s*<\/body>/.exec(text);
    if (m.length > 1) { console.error('ERROR:', m[1]); throw new Error(m[1]); }

    // take first line from HTML document otherwise
    const trimmed = strip(text).trim().split("\n")
    throw new Error(trimmed[0]);

  } else if (contentType.indexOf('text/plain') !== -1) {

    const text = await res.text();
    throw new Error(text);
  } else {

    return res.json();
  }
};

export const fetchPlain  = (url, options = {}) => {
  if (isElectron()) {
    return fetchPlainIPC({ url, options });
  } else {
    return fetch(getRoot() + url, options)
      .then(async res => {
        if (res.status === 404) throw new Error('Not Found');
        return res.text();
      });
  }
};

export const fetchBlob = (url, options = {}) => {
  return fetch(getRoot() + url, options)
  .then(async res => {
    if (res.status === 404) throw new Error('Not Found');
    return res.blob();
  });
};

export const fetchJson = (url, options = {}) => {
  if (isElectron()) {
    return fetchIPC({ method: 'GET', url, options });
  } else {
    return fetch(getRoot() + url, options)
      .then(handleJsonResponse);
  }
};

export const postJson = (url, body) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const options = { method: 'POST', headers, mode: 'cors', redirect: 'follow', body: JSON.stringify(body) };

  if (isElectron()) {
    return fetchIPC({ method: 'POST', url, options});
  } else {
    return fetch(getRoot() + url, options)
      .then(handleJsonResponse)
      .then(obj => {
        if (obj.status === 'error' && obj.error) throw new Error(obj.error);
        return obj;
      });
  }
};

export const fetchDelete = (url, options = {}) => {
  if (isElectron()) {
    return fetchIPC({ method: 'DELETE', url, options });
  } else {
    options.method = 'DELETE';
    return fetch(getRoot() + url, options).then(handleJsonResponse);
  }
};

export default {
  getRoot,
  getLanguage,
  fetchJson,
  fetchBlob,
  fetchPlain,
  postJson
};
