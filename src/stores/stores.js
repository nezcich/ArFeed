
import AppState from "./AppState";
import CreateHitState from "./CreateHitState";
import AnswerState from "./AnswerState";
import MiningState from "./MiningState";
import AnnState from "./AnnState";
import NebStore from "./NebStore";
import LanguageStore from "./LanguageStore";

export default {
	appState: new AppState(),
	createHitState: new CreateHitState(),
	answerState: new AnswerState(),
	miningState: new MiningState(),
	annState: new AnnState(),
	nebStore: new NebStore({ node_url: "https://arweave.net" }),
	languageStore: new LanguageStore(),
};
