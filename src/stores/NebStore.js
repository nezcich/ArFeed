import { observable, action, toJS } from "mobx";
import { defBytes, defAddr } from '../utils/constants';



function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}

import Arweave from 'arweave/web';
const APP_NAME = "ArFeed";
export default class NebStore {
    @observable arweave;
    @observable node_url;

    constructor({ node_url }) {
        this.infuraURL = {
            testnet: "arweave.net",
            mainnet: "arweave.net",
        };
        this.arweave = Arweave.init();
        this.node_url = node_url || this.infuraURL.mainnet;
    }
    tx_status = async (txhash) => {
        const transaction = await this.arweave.transactions.get(txhash);
        return transaction;
    }
    sendTransaction = async (transaction, jwk) => {
        const anchor_id = (await this.arweave.api.get('/tx_anchor')).data
        transaction.last_tx = anchor_id

        await this.arweave.transactions.sign(transaction, jwk);

        await this.arweave.transactions.post(transaction);
    }
    createFeed = async ({ title, description, sections, cover, wallet, tags }, jwk) => {
        var sections = toJS(sections);
        let transaction = await this.arweave.createTransaction({
            data: JSON.stringify({ title, description, sections, cover, wallet, tags })
        }, jwk);
        transaction.addTag('App-Name', APP_NAME);
        transaction.addTag('Content-Kind', "FEED");

        await this.sendTransaction(transaction, jwk);
        return transaction.id;
    }
    fetchTimestamp = async (id) => {
        let tx = await this.fetchBlockHash(id);
        let blockDetails = await this.fetchBlockDetails(tx.block_indep_hash);
        return blockDetails.timestamp;
    }
    fetchBlockHash = async (txid) => {
        const response = await fetch(`https://arweave.net/tx/${txid}/status`);
        const data = await response.json();
        return data;
    };
    fetchBlockDetails = async (blockHash) => {
        const response = await fetch(`https://arweave.net/block/hash/${blockHash}`);
        const data = await response.json();
        return data;
    };
    sendTip = async ({ amt, id, wallet }, jwk) => {
        const transaction = await this.arweave.createTransaction({
            target: wallet,
            quantity: this.arweave.ar.arToWinston(amt * 75 / 100),
            reward: this.arweave.ar.arToWinston(amt * 25 / 100),
        }, jwk);
        transaction.addTag("App-Name", APP_NAME);
        transaction.addTag("Content-Kind", "TIP");
        transaction.addTag("txid", id);
        await this.sendTransaction(transaction, jwk);
    }
    getTips = async (id) => {
        const txids = await this.arweave.arql({
            op: "and",
            expr1: {
                op: "equals",
                expr1: "App-Name",
                expr2: APP_NAME
            },
            expr2: {
                op: "and",
                expr1: {
                    op: "equals",
                    expr1: "txid",
                    expr2: id
                },
                expr2: {
                    op: "equals",
                    expr1: "Content-Kind",
                    expr2: "TIP"
                },
            },
        });
        if (txids.length === 0) return [];

        const transactions = await Promise.all(
            txids.map(txid => this.arweave.transactions.get(txid))
        );

        return await Promise.all(
            transactions.map(async transaction => {
                return {
                    owner: await this.arweave.wallets.ownerToAddress(transaction.get("owner")),
                    amount: transaction.get("quantity"),
                };
            })
        );
    };

    fetchFeeds = async () => {
        const txids = await this.arweave.arql({
            op: "and",
            expr1: {
                op: "equals",
                expr1: "App-Name",
                expr2: APP_NAME
            },
            expr2: {
                op: "equals",
                expr1: "Content-Kind",
                expr2: "FEED"
            },
        });
        if (txids.length === 0) return [];
        const transactions = await Promise.all(
            txids.map(txid => this.arweave.transactions.get(txid))
        );

        return await Promise.all(
            transactions.map(async transaction => {
                return this.fetchFeedDetails(transaction)
            })
        );
    }
    fetchFeedDetails = async (tx) => {
        var f = JSON.parse(tx.get('data', { decode: true, string: true }));
        let owner = await this.arweave.wallets.ownerToAddress(tx.get("owner"));
        let balance = 0;
        if (f.wallet) {
            balance = this.arweave.ar.winstonToAr(await this.arweave.wallets.getBalance(f.wallet));
            balance = parseFloat(parseFloat(balance).toFixed(3));
        }
        let startedOn = 0;
        try {
            startedOn = await this.fetchTimestamp(tx.id);
        } catch (e) { }
        let tips = await this.getTips(tx.id);
        let tipAmt = tips.map(o => parseInt(o.amount)).reduce((a, b) => a + b, 0);
        return {
            ...f,
            id: tx.id,
            owner,
            balance,
            startedOn,
            tips: parseFloat(parseFloat(this.arweave.ar.winstonToAr(tipAmt)).toFixed(3)),
            tippers: tips.map(o => o.owner).filter(onlyUnique)
        };
    }
    fetchARQL = async (arql) => {
        const txids = await this.arweave.arql({ ...arql });
        if (txids == "Invalid Query") {
            return await this.arweave.api.post("/arql", { query: query });
        }
        if (txids.length === 0) return [];

        const transactions = await Promise.all(
            txids.map(txid => this.arweave.transactions.get(txid))
        );

        return await Promise.all(transactions.map(async transaction => {
            return JSON.parse(transaction.get("data", { decode: true, string: true }));
        }));
    }
    fetchAllTx = async (address) => {
        const response = await fetch(`https://arweave.net/wallet/${address}/txs/`);
        return await response.json();
    }
}