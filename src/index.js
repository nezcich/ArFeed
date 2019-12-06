import("./styles/main.scss");
import React from "react";
import { render } from "react-dom";
import { HashRouter, BrowserRouter as Router } from "react-router-dom";
import { Provider } from "mobx-react";
import { AppContainer } from "react-hot-loader";

import { isProduction } from "./utils/constants";
import App from "./components/App";
import stores from "./stores/stores";


const renderApp = Component => {
	render(
			<AppContainer>
				<HashRouter>
					<Provider store={stores}>
						<App />
					</Provider>
				</HashRouter>
			</AppContainer>,
		document.getElementById("root")
	);
};

renderApp(App);

if (module.hot) {
	module.hot.accept(() => renderApp(App));
}
