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
        loading: true,
        toastText: '',
        isResult: false,
        isMin: true,
        isDisable: true,
    };

    componentDidMount() {
        this.fetchPage();
    }

    get isMin() {
        return window.screen.height < 667 || false;
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

    get isBetaUrl() {
        return window.location.href.includes('beta-game') || false;
    }

    fetchPage = () => {
        const url = this.isBetaUrl ? 'https://beta.foroo.co.uk/api/v1/activities' : 'https://foroo.co.uk/api/v1/activities';
        axios
            // .get('https://mock.souche-inc.com/mock/5da5615d40053079d4748060/czhang/beta-api.foroo.co.uk/api/api/v1/activitys', {
            .get(url, {
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
                    this.setState({ loading: false });
                } else if (res.data.status === 1) {
                    this.setState({
                        listData: this.getRealListData(res.data.data.data),
                        sinInDays: Number(res.data.data.sin_in_days),
                        totalPoint: res.data.data.user_points,
                        hasSinIn: res.data.data.sign_in,
                        isDisable: false,
                        loading: false,
                    });
                } else {
                    this.showToast(res.data.msg);
                }
            })
            .catch((err) => {
                this.showToast('network failed');
            });
    };

    getRealListData = (dataList) => {
        return dataList.map((i) => ({
            type: i.type,
            point: i.extra ? (i.extra.point ? i.point + i.extra.point : i.point) : i.point,
        }));
    };

    get todayPoints() {
        const { sinInDays, listData } = this.state;
        return listData[sinInDays - 1].point || 0;
    }

    onCheckIn = () => {
        const pointUrl = this.isBetaUrl ? 'https://beta.foroo.co.uk/api/v1/points' : 'https://foroo.co.uk/api/v1/points';
        if (this.state.hasSinIn || this.state.isDisable) {
            return;
        }
        this.setState({ loading: true });
        axios
            // .get(
            //     'https://mock.souche-inc.com/mock/5da5615d40053079d4748060/czhang/beta-api.foroo.co.uk/api/api/v1/points',
            //     {
            .post(
                pointUrl,
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
                    this.setState({ loading: false });
                } else if (res.data.status === 1) {
                    const { sinInDays } = this.state;
                    this.setState({ sinInDays: sinInDays + 1, loading: false, hasSinIn: true, totalPoint: res.data.data, isResult: true });
                } else {
                    this.showToast(res.data.msg);
                }
            })
            .catch((err) => {
                this.showToast('network failed');
            });
    };

    showToast = (text) => {
        this.setState({ toastText: text, loading: false, isDisable: false }, this.stopToast);
    };

    stopToast = () => {
        setTimeout(() => {
            this.setState({ toastText: '' });
        }, 1000);
    };

    onCloseResultBox = () => {
        this.setState({ isResult: false });
    };

    render() {
        const { listData, sinInDays, totalPoint, hasSinIn, loading, toastText, isResult } = this.state;
        const firstTreeDays = listData.slice(0, 3);
        const secondTreeDays = listData.slice(3, 6);
        const lastDay = listData[6];
        const isMin = this.isMin || false;
        return (
            <div className='app'>
                {loading ? (
                    <>
                        <div className='mengban'></div>
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
                {/* 结果box */}
                {isResult ? (
                    <>
                        <div className='mengban'></div>
                        <div className='resultBox'>
                            {sinInDays >= 7 ? (
                                <>
                                    <img className='pointWin' src={Resource.get('couponWin')} />
                                    <p className='result-box-title'>Congrats!</p>
                                    <p className='result-box-text-body'>You have earned {this.todayPoints} points and a additional 15% off coupon!</p>
                                </>
                            ) : (
                                <>
                                    <img className='pointWin' src={Resource.get('pointWin')} />
                                    <p className='result-box-title'>Succeeded</p>
                                    <p className='result-box-text-body'>You have earned {this.todayPoints} points</p>
                                </>
                            )}
                            <div className='ok-check-in-active' onClick={this.onCloseResultBox}>
                                Ok
                            </div>
                        </div>
                    </>
                ) : null}
                <div className='points' onClick={this.jumpToRules}>
                    <span className='left-point'>
                        <img className='point' src={Resource.get('point')} />
                        <span>{totalPoint}</span>
                    </span>
                    <img className='right-point' src={Resource.get('rightArrow')} />
                </div>
                <div className='body-radius'>
                    <div className={isMin ? 'body-title-min' : 'body-title'}>KEEP CHECKING IN EVERY DAY TO GET MORE POINTS!</div>
                    <div className='cards'>
                        {firstTreeDays.map((d, index) => (
                            <>
                                <div className={sinInDays >= index + 1 ? 'card-body-red' : 'card-body'} key={index}>
                                    <div className='card-top'>Day&nbsp;{index + 1}</div>
                                    {sinInDays >= index + 1 ? (
                                        <img className='card-point' src={Resource.get('checked')} />
                                    ) : (
                                        <img className='card-point' src={Resource.get('point')} />
                                    )}
                                    <span className={sinInDays >= index + 1 ? 'card-point-text-white' : 'card-point-text'}>{d.point}</span>
                                </div>
                                {index !== 2 ? <div className='empty-line'></div> : null}
                            </>
                        ))}
                    </div>
                    <div className={isMin ? 'cards-bottom-min' : 'cards-bottom'}>
                        {secondTreeDays.map((d, index) => (
                            <>
                                <div className={sinInDays >= index + 4 ? 'card-body-red' : 'card-body'} key={index + 3}>
                                    <div className='card-top'>Day&nbsp;{index + 4}</div>
                                    {sinInDays >= index + 4 ? (
                                        <img className='card-point' src={Resource.get('checked')} />
                                    ) : (
                                        <img className='card-point' src={Resource.get('point')} />
                                    )}
                                    <span className={sinInDays >= index + 4 ? 'card-point-text-white' : 'card-point-text'}>{d.point}</span>
                                </div>
                                <div className='empty-line-bottom'></div>
                            </>
                        ))}
                        <div className={sinInDays >= 7 ? 'card-body-red' : 'card-body'} key={7}>
                            <div className='card-top'>Day&nbsp;{7}</div>
                            {sinInDays >= 7 ? (
                                <img className='card-point' src={Resource.get('coupon')} />
                            ) : (
                                <img className='card-point' src={Resource.get('gift')} />
                            )}
                            <span className={sinInDays >= 7 ? 'card-point-text-white' : 'card-point-text-last'}>{lastDay.point}</span>
                        </div>
                    </div>

                    {hasSinIn ? (
                        <div className={isMin ? 'check-in-gray-min' : 'check-in-gray'}>Well done</div>
                    ) : (
                        <div className={isMin ? 'check-in-active-min' : 'check-in-active'} onClick={this.onCheckIn}>
                            Check In
                        </div>
                    )}

                    <img className='wheel' onClick={this.jumpToWheel} src={Resource.get('wheel')} />
                </div>
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

    jumpToRules = () => {
        // https://roo.co.uk/points-rule/
        window.location.href = 'https://foroo.co.uk/points-rule/';
        // 'https://security.feishu.cn/link/safety?target=https%3A%2F%2Fforoo.co.uk%2Fpoints-rule%2F&lang=zh-CN&scene=messenger&logParams=%7B%22location%22%3A%22messenger%22%7D';
    };
}
