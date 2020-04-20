import * as React from 'react';
import axios from 'axios';

import Resource from '../resource';
import './app.css';

declare global {
    interface Window {
        callBridge: (s: any) => {};
    }
}

export default class App extends React.Component<any, any> {
    state = {
        listData: [
            {
                type: 1,
                point: 20,
            },
            {
                type: 1,
                point: 40,
            },
            {
                type: 1,
                point: 50,
            },
            {
                point: 60,
                type: 1,
                extra: {
                    point: 30,
                },
            },
            {
                type: 1,
                point: 70,
            },
            {
                type: 1,
                point: 80,
            },
            {
                point: 100,
                type: 2,
                extra: {
                    type: '4',
                    discount: '0% OFF',
                },
            },
        ],
        sinInDays: 0,
        hasSinIn: false,
        totalPoint: 0,
        loading: false,
        toastText: '',
    };

    componentDidMount() {
        this.fetchPage();
    }

    // token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjo0NCwidG9rZW5fdmVyc2lvbiI6IjVlOTQ2OGQxM2NjMzkifQ.ABI4fKPrYPb6jWKI7hlJalCVl1PLng8H6PRgd6_hhwI';

    get token() {
        const tail = window.location.href.split('?');
        let resTail = '';
        if (tail.length > 1) {
            // token=aaa&bbb=ccc"
            resTail = tail[1];
            if (resTail.includes('&')) {
                const resultArr = resTail.split('&');
                const r = resultArr.find((i) => i.startsWith('token='));
                return r ? r.split('=')[1] : '';
            } else {
                return resTail.split('=')[1];
            }
        }
        return '';
    }

    fetchPage = () => {
        axios
            // .get('https://mock.souche-inc.com/mock/5da5615d40053079d4748060/czhang/beta-api.foroo.co.uk/api/api/v1/activitys', {
            .get('https://beta-api.foroo.co.uk/api/v1/activities', {
                headers: {
                    token: this.token,
                },
                params: {
                    type: 1,
                },
            })
            .then((res) => {
                if (res.data.status === 5000) {
                    window.callBridge({
                        action: 'login',
                        target_url: window.location.href, // 登陆后去往的地址
                    });
                } else if (res.data.status === 1) {
                    this.setState({
                        listData: res.data.data.data,
                        sinInDays: res.data.data.sin_in_days,
                        totalPoint: res.data.data.user_points,
                        hasSinIn: res.data.data.sign_in,
                    });
                } else {
                    this.showToast(res.data.msg);
                }
            });
    };

    onCheckIn = () => {
        if (this.state.hasSinIn) {
            return;
        }
        this.setState({ loading: true });
        axios
            // .get('https://mock.souche-inc.com/mock/5da5615d40053079d4748060/czhang/beta-api.foroo.co.uk/api/api/v1/points', {
            .post(
                'https://beta-api.foroo.co.uk/api/v1/points',
                {
                    type: 2,
                },
                {
                    headers: {
                        token: this.token,
                    },
                }
            )
            .then((res) => {
                if (res.data.status === 5000) {
                    window.callBridge({
                        action: 'login',
                        target_url: window.location.href, // 登陆后去往的地址
                    });
                } else if (res.data.status === 1) {
                    const { sinInDays } = this.state;
                    this.setState({ sinInDays: sinInDays + 1, loading: false, hasSinIn: true, totalPoint: res.data.data.user_points });
                } else {
                    this.showToast(res.data.msg);
                }
            });
    };

    showToast = (text) => {
        this.setState({ toastText: text }, this.stopToast);
    };

    stopToast = () => {
        setTimeout(() => {
            this.setState({ toastText: '' });
        }, 1000);
    };

    render() {
        const { listData, sinInDays, totalPoint, hasSinIn, loading, toastText } = this.state;
        const firstTreeDays = listData.slice(0, 3);
        const secondTreeDays = listData.slice(3, 6);
        const lastDay = listData[6];
        return (
            <div className='app'>
                {loading ? (
                    <>
                        <div className='mengban'></div>
                        {/* <span className='loading'>Loading...</span> */}
                        <div className='lds-ring'>
                            <div></div>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </>
                ) : null}
                {toastText ? (
                    <div className='toastBg'>
                        <span className='toastText'>{toastText}</span>
                    </div>
                ) : null}
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

                {hasSinIn ? (
                    <img className='check-in-gray' src={Resource.get('checkInGray')} />
                ) : (
                    <div className='check-circle' onClick={this.onCheckIn}>
                        <img className='check-in' src={Resource.get('checkIn')} />
                    </div>
                )}

                <img className='wheel' onClick={this.jumpToWheel} src={Resource.get('wheel')} />
                <img className='totalPoint' src={Resource.get('totalPoint')}></img>
                <p className='totalPointNumber'>{totalPoint}</p>
            </div>
        );
    }

    jumpToWheel = () => {
        // window.location.href = 'rotation_game.html' + window.location.search;
        // https://beta-game.foroo.co.uk/sign_game.html'
        window.callBridge({
            action: 'jump_rotary_table',
            target_url: window.location.origin + '/rotation_game.html' + window.location.search,
        });
    };

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
