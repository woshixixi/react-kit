import * as React from 'react';

import Resource from '../resource';
import './app.css';

export default class App extends React.Component<any, any> {
    state = { liked: false, name: 'parent1', them: 'them001' };

    onClickLike = () => {
        const oldLike = this.state.liked;
        this.setState({ liked: !oldLike });
    };

    render() {
        return (
            <div className='app'>
                {/* <img className='bg' src={Resource.get('calender')} /> */}
                hello
            </div>
        );
    }
}
