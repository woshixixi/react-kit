import * as React from 'react';

export default class DragPage extends React.Component {
    state = {
        isOver: false,
        n: 2,
    };

    onDragOver = (e) => {
        this.setState({
            isOver: true,
        });

        e.preventDefault();

        // console.log('drag over', e);
    };

    onDrop = (e) => {
        const n = +e.dataTransfer.getData('text/plain');

        console.log('on drop', n);
        this.setState({
            isOver: true,
            n,
        });

        e.preventDefault();
    };

    onDragEnter = (e) => {
        // console.log('drag enter', e);
        e.preventDefault();
        this.setState({
            isOver: true,
        });
    };

    onDragLeave = (e) => {
        // console.log('drag leave', e);
        this.setState({
            isOver: false,
        });
    };

    onDragStart = (e) => {
        e.dataTransfer.setData('text/plain', this.state.n + 1);
    };

    getList = (n: number) => {
        let list: number[] = [];
        let i = 0;
        for (i = 0; i < n; i++) {
            list.push(i);
        }
        return list;
    };

    render() {
        const { isOver, n } = this.state;

        return (
            <div className='drag-page'>
                <div className='drag  drag-list'>
                    component list
                    <div className='drag-com' onDragStart={this.onDragStart} draggable>
                        this component is draggable
                    </div>
                </div>
                <div
                    className={isOver ? 'drag drag-area yellow' : 'drag drag-area'}
                    onDragEnter={this.onDragEnter}
                    onDragLeave={this.onDragLeave}
                    onDrop={this.onDrop}
                    onDragOver={this.onDragOver}>
                    {this.getList(n).map((l) => (
                        <div className='btn-comp' key={l}>
                            <button className='component-btn'>component {l}</button>
                        </div>
                    ))}
                </div>
                <div className='drag config-area'>config area</div>
            </div>
        );
    }
}
