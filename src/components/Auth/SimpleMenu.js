import React from 'react';
import { Menu, MenuItem, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
import Language from "../Language";

class SimpleMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  render() {
    const { anchorEl } = this.state;
    const { children } = this.props;
    return (
      <div>
        <Button
          aria-owns={anchorEl ? 'simple-menu' : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >{children}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}><Link to="#/account"><Language resource="MY_ACC" /></Link></MenuItem>
          <MenuItem onClick={this.props.signout}><Language resource="LOGOUT" /></MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SimpleMenu;