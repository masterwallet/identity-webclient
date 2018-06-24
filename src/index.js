import React, { Component } from 'react';
import { render } from 'react-dom';
import App from './containers/App';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import { configure, history } from './store';
import Debounced from './services/Debounced';
// import registerServiceWorker from './registerServiceWorker';

const store = configure();
store.dispatch({ type: 'SCREEN_RESIZE' });

class Root extends Component {
	componentWillMount() {
		// const { dispatch } = store;
	}
	render() {
		return (
				<Provider store={store}>
					<ConnectedRouter history={history}><App /></ConnectedRouter>
				</Provider>
		)
	};
}

const root = document.getElementById('root');
if (root) {
	render(<Root />, document.getElementById('root'));
	window.addEventListener('resize', () => {
		Debounced.start('resize', () => {
			store.dispatch({type: 'SCREEN_RESIZE'})
		}, 250)
	});
}

// registerServiceWorker();
