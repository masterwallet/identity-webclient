
export const getRoot = () => {
  const root = localStorage.getItem("masterwallet_api_root") ||
    process.env.REACT_APP_API_URL || '/api';
  return root;
};

export const getLanguage = () => {
  return localStorage.getItem('masterwallet_lang') || process.env.REACT_APP_LANG || 'en';
};

export const fetchJson = (url, options = {}) => {
  return fetch(getRoot() + url, options)
    .then(res => {
      console.warn(res); return res.json();
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

export const postJson = (url, body) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const options = { method: 'POST', headers, mode: 'cors', redirect: 'follow', body: JSON.stringify(body) };
  return fetch(getRoot() + url, options)
    .then(async res => {
      const contentType = res.headers.get('content-type');
      console.info('Content Type Received:', contentType);
      if (contentType.indexOf('text/html') !== -1) {
        const text = await res.text();
        console.warn(strip(text).trim().split("\n"));
        throw new Error(strip(text).trim().split("\n")[0]);
      } else if (contentType.indexOf('text/plain') !== -1) {
        const text = await res.text();
        console.warn(text);
        throw new Error(text);
      } else {
        return res.json();
      }
    }).then(obj => {
      if (obj.status === 'error' && obj.error) throw new Error(obj.error);
      return obj;
    });
};

export default {
  getRoot,
  getLanguage,
  fetchJson,
  postJson
};
