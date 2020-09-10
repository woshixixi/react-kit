import * as React from 'react';
import Item from './item';

export default class DragPage extends React.Component {
    state = {
        isOver: false,
        currentIndex: 1000,
        dataSource: list,
        isDragging: false,
        insertIndx: 0,
    };

    refArr: any[] = [];
    counter: number = 0;
    // insertIdx: number = 0;

    onDragOver = (e) => {
        // this.setState({
        //     isOver: true,
        // });

        const ist = getIndex(this.refArr, e.pageY);
        console.log(ist);
        // this.insertIdx = ist;
        this.setState({
            isOver: true,
            isDragging: true,
            insertIndx: ist,
        });

        // if (this.insertIdx !== ist) {

        // const oD = this.state.dataSource;
        // const nD = [...oD.slice(0, this.insertIdx), boxContainer, ...oD.slice(this.insertIdx, oD.length)];
        // this.setState({
        //     dataSource: nD,
        // });
        // }

        // e.dataTransfer.setData('text/plain', ist);

        e.preventDefault();
    };

    onDrop = (e) => {
        // const ist = e.dataTransfer.getData('text/plain');
        this.counter = 0;

        const ist = this.state.insertIndx;

        const oD = this.state.dataSource;
        const nD = [...oD.slice(0, ist), added, ...oD.slice(ist, oD.length)];

        this.setState({
            dataSource: nD,
            isDragging: false,
        });
        e.preventDefault();
    };

    onDragEnter = (e) => {
        // console.log('drag enter', e);

        this.counter++;
        e.preventDefault();
        this.setState({
            isDragging: true,
            isOver: true,
        });
    };

    onDragLeave = (e) => {
        console.log('drag leave', e);
        this.counter--;
        if (this.counter === 0) {
            this.setState({
                isOver: false,
                isDragging: false,
            });
        }
    };

    // removeBox = () => {
    //     const oD = this.state.dataSource;
    //     const nD = oD.filter((o) => o.type !== 'box');
    //     // const nD = [...oD.slice(0, this.insertIdx), ...oD.slice(this.insertIdx + 1, oD.length)];
    //     this.setState({
    //         dataSource: nD,
    //     });
    // };

    onDragStart = (e) => {
        // e.dataTransfer.setData('text/plain', this.state.n + 1);
        // this.setState({
        //     isDragging: true,
        //     isOver: true,
        // });
    };

    getList = (n: number) => {
        let list: number[] = [];
        let i = 0;
        for (i = 0; i < n; i++) {
            list.push(i);
        }
        return list;
    };

    clickComp = (idx) => {
        this.setState({
            currentIndex: idx,
        });
        console.log('this.', this.refArr, this.refArr[0].offsetHeight, this.refArr);
    };

    render() {
        const { isOver, currentIndex, dataSource, insertIndx, isDragging } = this.state;

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
                    {dataSource.map((l, idx) => (
                        <div
                            ref={(r) => {
                                this.refArr[idx] = r;
                            }}
                            onClick={() => this.clickComp(idx)}
                            key={idx}
                            className={currentIndex === idx ? 'active' : ''}>
                            <Item top={isDragging && insertIndx === idx} {...l} />
                        </div>
                    ))}
                </div>
                <div className='drag config-area'>config area</div>
            </div>
        );
    }
}

const getIndex = (refArr, pageY) => {
    const rH = refArr.map((r) => r.offsetHeight);

    let lH = [...rH];
    for (let i = 0; i < rH.length; i++) {
        if (i > 0) {
            lH[i] = lH[i - 1] + lH[i];
        }
    }
    // console.log(rH, lH, pageY);
    for (let j = 0; j < lH.length; j++) {
        if (pageY <= lH[j]) {
            return j;
        }
    }
    return lH.length;
};

const list = [
    {
        type: 'button',
        config: {
            title: 'button Comp 001',
            color: 'blue',
        },
    },
    {
        type: 'img',
        config: {
            title: 'img',
            color: 'yellow',
        },
    },
    {
        type: 'text',
        config: {
            title: '这就是我的这个text足见啦，为了测试这个组件我可是废了不少心思来打字的阿哈哈哈拉萨地方为了宣传么。阿斯顿旅客均为哦支持你啦附近拍摄到！',
            color: '#387665',
        },
    },
];

const added = {
    type: 'button',
    config: {
        title: '新增赶牛',
        color: 'paleturquoise',
    },
};

const boxContainer = {
    type: 'box',
    config: {
        color: 'white',
    },
};
