
import AppState from "./AppState";
import CreateHitState from "./CreateHitState";
import NebStore from "./NebStore";
import LanguageStore from "./LanguageStore";

export default {
	appState: new AppState(),
	createHitState: new CreateHitState(),
	nebStore: new NebStore({ node_url: "https://arweave.net" }),
	languageStore: new LanguageStore(),
};
