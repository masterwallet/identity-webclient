export const getRoot = () => {
  const root = localStorage.getItem("masterwallet_api_root") ||
    process.env.REACT_APP_API_URL || '/api';
  return root;
};

export const getLanguage = () => {
  return localStorage.getItem('masterwallet_lang') || process.env.REACT_APP_LANG || 'en';
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
  return fetch(getRoot() + url, options)
    .then(async res => {
      if (res.status === 404) throw new Error('Not Found');
      // const contentType = res.headers.get('content-type');
      return res.text();
    });
};

export const fetchJson = (url, options = {}) => {
  return fetch(getRoot() + url, options)
    .then(handleJsonResponse);
};

export const postJson = (url, body) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  const options = { method: 'POST', headers, mode: 'cors', redirect: 'follow', body: JSON.stringify(body) };
  return fetch(getRoot() + url, options)
    .then(handleJsonResponse)
    .then(obj => {
      if (obj.status === 'error' && obj.error) throw new Error(obj.error);
      return obj;
    });
};

export default {
  getRoot,
  getLanguage,
  fetchJson,
  fetchPlain,
  postJson
};
