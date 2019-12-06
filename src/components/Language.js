import * as React from 'react';
import { observer, inject } from 'mobx-react';

@inject('store')
@observer
class Language extends React.Component{
	render(){
		const { resource } = this.props;
		const { languageStore } = this.props.store;
		const lresource = languageStore.get_resource();
		if (resource.indexOf('.') !== -1 ) {
			return (<span>
      				{lresource[resource.split('.')[0]][resource.split('.')[1]]}
    				</span>);
		}else{
			return lresource[resource];
		}
	}
}

export default Language;