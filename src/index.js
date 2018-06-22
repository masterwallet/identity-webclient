import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

/*

CLIENT SIDE 
   route /create
   [x] Create New
	route /create/wallet/ (select network)
	route /create/wallet/:network
   [x] Import Existing
        route /create/import (select network)
	route /create/import/:network
   route /assets
   route /assets/:network/:wallet
   route /assets/:network/receive
   route /assets/:network/send
   route /assets/:network/vote

*/