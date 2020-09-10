import * as React from 'react';
import Resource from '../../resource';

interface IConfig {
    title: string;
    color: string;
}

interface IProps {
    type: string;
    config: IConfig;
    top: boolean;
}

export default class Item extends React.Component<IProps> {
    render() {
        const { type, config, top } = this.props;
        const hMap = {
            button: 116,
            img: 153,
            text: 288,
            box: 100,
        };
        const h = hMap[type];

        return (
            <>
                <div className={top ? 'box-container' : 'box-container hidden'}>将组件拖拽到这里</div>
                <div className='btn-comp' style={{ background: `${config.color || 'white'}`, height: `${h}px` }}>
                    {type === 'button' && <button>{config.title}</button>}
                    {type === 'img' && <img src={Resource.get('test')} />}
                    {type === 'text' && <button>{config.title}</button>}
                </div>
            </>
        );
    }
}
