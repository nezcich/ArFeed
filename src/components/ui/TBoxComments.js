import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import ThreeBoxComments from '3box-comments-react';
import Box from '3box';

@inject("store")
@observer
export default class TBoxComments extends Component {
    constructor(props) {
        super(props);
        this.store = this.props.store;
        this.state = {
            box: {},
            myProfile: {},
            myAddress: '',
            isReady: false,
        }
    }

    componentDidMount() {
        this.handleLogin();
    }

    handleLogin = async () => {
        const addresses = await window.ethereum.enable();
        const myAddress = addresses[0];

        const box = await Box.openBox(myAddress, window.ethereum, {});
        const myProfile = await Box.getProfile(myAddress);

        box.onSyncDone(() => this.setState({ box }));
        this.setState({ box, myProfile, myAddress, isReady: true });
    }

    render() {
        const {
            box,
            myAddress,
            myProfile,
            isReady
        } = this.state;
        const { id } = this.props;

        return (
            <div style={{ margin: "30px auto", display: "flex", justifyContent: "center" }}>
                <ThreeBoxComments
                    // required
                    spaceName='Arfeed'
                    threadName={id}
                    adminEthAddr="0x2a0D29C819609Df18D8eAefb429AEC067269BBb6"

                    // case A & B
                    box={box}
                    currentUserAddr={myAddress}

                // case B
                // loginFunction={this.handleLogin}

                // case C
                // ethereum={window.ethereum}

                // optional
                // members={false}
                // showCommentCount={10}
                // threadOpts={{}}
                // spaceOpts={{}}
                // useHovers={true}
                // currentUser3BoxProfile={myProfile}
                // userProfileURL={address => `https://userprofiles.co/user/${address}`}
                />
            </div>
        );
    }
}