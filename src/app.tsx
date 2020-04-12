import * as React from 'react';
import axios from 'axios';

import Resource from '../resource';
import './app.css';

export default class App extends React.Component<any, any> {
    state = {
        listData: [
            { type: 1, point: 20 },
            { type: 1, point: 30 },
            { type: 1, point: 40 },
            { type: 1, point: 50 },
            { type: 1, point: 60 },
            { type: 1, point: 70 },
            { type: 1, point: 80 },
            { type: 2, point: 90, gifts: { coupon_id: 1, source_type: 1 } }
        ],
        sinInDays: 0,
        hasSinIn: false
    };

    componentDidMount() {
        this.fetchPage();
    }

    fetchPage = () => {
        axios
            .get('https://mock.souche-inc.com/mock/5da5615d40053079d4748060/czhang/beta-api.foroo.co.uk/api/api/v1/activitys', {
                headers: {
                    token: 'aaa'
                },
                params: {
                    type: 1
                }
            })
            .then((res) => {
                this.setState({ listData: res.data.data.data, sinInDays: res.data.data.sin_in_days });
            });
    };

    onCheckIn = () => {
        if (this.state.hasSinIn) {
            return;
        }
        axios
            .get('https://mock.souche-inc.com/mock/5da5615d40053079d4748060/czhang/beta-api.foroo.co.uk/api/api/v1/points', {
                headers: {
                    token: 'aaa'
                },
                params: {
                    type: 2
                }
            })
            .then((res) => {
                const { sinInDays } = this.state;
                this.setState({ sinInDays: sinInDays + 1, hasSinIn: true });
            });
    };

    fetchCheckIn = () => {};

    render() {
        console.log(this.state.listData);
        const { listData, sinInDays } = this.state;
        const firstTreeDays = listData.slice(0, 3);
        const secondTreeDays = listData.slice(3, 6);
        const lastDay = listData[6];
        return (
            <div className='app'>
                <div className='header'>
                    <img className='title' src={Resource.get('title')} />
                    <img className='close' src={Resource.get('close')} />
                </div>
                <div className='cards'>
                    {firstTreeDays.map((d, index) => (
                        <div className='single-card' key={index}>
                            <div className='card-body'>
                                <div className='card-top'>Day{index}</div>
                                {index < this.state.sinInDays ? this.renderCheckedCard() : this.renderEmptyCard()}
                            </div>

                            <div className='card-point'>
                                <span>+{d.point}</span>
                                <img className='point' src={Resource.get('point')} />
                            </div>
                        </div>
                    ))}
                </div>
                <div className='cards-bottom'>
                    {secondTreeDays.map((d, index) => (
                        <div className='single-card' key={index}>
                            <div className='card-body'>
                                <div className='card-top'>Day{index + 3}</div>
                                {index < this.state.sinInDays - 3 ? this.renderCheckedCard() : this.renderEmptyCard()}
                            </div>

                            <div className='card-point'>
                                <span>+{d.point}</span>
                                <img className='point' src={Resource.get('point')} />
                            </div>
                        </div>
                    ))}
                    <div className='single-card'>
                        <div className='card-body'>
                            <div className='card-top'>Day{7}</div>
                            {sinInDays >= 7 ? this.renderCouponCard() : this.renderGiftCard()}
                        </div>

                        <div className='card-point'>
                            <span>+{lastDay.point}</span>
                            <img className='point' src={Resource.get('point')} />
                        </div>
                    </div>
                </div>
                <div className='check-circle' onClick={this.onCheckIn}>
                    <img className='check-in' src={Resource.get('checkIn')} />
                </div>
                <img className='wheel' src={Resource.get('wheel')} />
            </div>
        );
    }

    // gift last day
    renderGiftCard = () => {
        return (
            <div className='day-check'>
                <img className='gift' src={Resource.get('gift')} />
            </div>
        );
    };

    renderCheckedCard = () => {
        return (
            <div className='day-check'>
                <img className='tick' src={Resource.get('tick')} />
            </div>
        );
    };

    renderEmptyCard = () => {
        return <div className='day-check'></div>;
    };

    renderCouponCard = () => {
        return (
            <div className='day-check'>
                <img className='coupon' src={Resource.get('coupon')} />
            </div>
        );
    };
}