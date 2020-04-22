$(document).ready(function () {
    $('#mengban').hide();
    $('#light').hide();
    $('#box').hide();

    $('#loading').hide();

    // 优惠券
    $('#offPrize').hide();
    $('#offPrizeCount').hide();

    // 积分
    $('#pointPrize').hide();
    $('#pointPrizeCount').hide();
    $('#pointPrizeText').hide();
    $('#pointPrizeContainer').hide();

    $('#toastBg').hide();
    $('#toastText').hide();

    function showToast(text) {
        $('#toastText').html(text);
        $('#toastBg').show();
        $('#toastText').show();

        setTimeout(() => {
            $('#toastBg').hide();
            $('#toastText').hide();
        }, 1000);
    }

    var totalPoint = 0;
    var restTimes = 5;
    var turnTableData = [
        { text: '10P', img: './resource/point.png' },
        { text: '0% OFF', img: './resource/coupon.png' },
        { text: '30P', img: './resource/point.png' },
        { text: '0% OFF', img: './resource/coupon.png' },
        { text: '60P', img: './resource/point.png' },
        { text: '0% OFF', img: './resource/coupon.png' },
        {
            text: 'GIFT',
            img: './resource/gift.png',
        },
        { text: '0% OFF', img: './resource/coupon.png' },
    ]; // 转盘盘面
    var responseData; // 转盘数据
    var num = 2; //奖品ID
    var firstTime = false; // 是否第一次免费

    gbTurntable.init({
        id: 'turntable',
        config: function (callback) {
            // 获取奖品信息
            // 奖项 text 属性不能为空，用于显示或抽中奖品提示
            // img 为奖品图片地址，如果不为空则转盘奖品按图片方式显示
            callback && callback(turnTableData);
        },
        getPrize: function (callback) {
            // 获取中奖信息
            $('#loading').show();
            $('#mengban').show();
            $.ajax({
                url: 'https://beta-api.foroo.co.uk/api/v1/activities/fortune_wheel',
                data: { free: firstTime },
                headers: { token: token },
                success: function (res) {
                    if (res.status === 5000) {
                        ForooAppCaller.postMessage(JSON.stringify({ action: 'login', target_url: window.location.href }));
                        $('#loading').hide();
                        $('#mengban').hide();
                    } else if (res.status === 1) {
                        $('#loading').hide();
                        $('#mengban').hide();
                        num = res.data.prize - 1;
                        // num 奖品id restTimes 可抽奖次数
                        firstTime = res.data.free_first_times;

                        restTimes = res.data.play_times;
                        $('#count').html(`${restTimes}/5`);
                        callback && callback([num, restTimes]);
                    } else {
                        $('#loading').hide();
                        $('#mengban').hide();
                        showToast(res.msg);
                    }
                },
                error: function (XMLHttpRequest, textStatus, errorThrown) {
                    $('#loading').hide();
                    $('#mengban').hide();
                    showToast(textStatus);
                },
            });
        },
        gotBack: function (data) {
            // alert('恭喜抽中' + data);
            const prizeData = responseData[num];
            if (prizeData.type === 1) {
                // 得到积分奖励
                totalPoint = totalPoint + prizeData.point;
                $('#coin').html(totalPoint);

                $('#pointPrizeCount').html(prizeData.point);
                $('#mengban').show();
                $('#light').show();
                $('#pointPrize').show();
                $('#pointPrizeContainer').show();
                $('#pointPrizeCount').show();
                $('#pointPrizeText').show();

                $('#closePrize').show();
            } else if (prizeData.type === 2) {
                // 得到 优惠券 & 满减
                if (prizeData.extra.type === 1) {
                    // 满减
                } else {
                    //  优惠券
                    $('#offPrizeCount').html(prizeData.extra.discount);
                    $('#mengban').show();
                    $('#light').show();
                    $('#offPrize').show();
                    $('#offPrizeCount').show();

                    $('#closePrize').show();
                }
            } else if (prizeData.type === 3) {
                // 获得大奖 恐龙出现
                $('#box').show();
                $('#mengban').show();
                $('#light').show();
            }
        },
    });

    function getToken() {
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

    var token = getToken();

    // 获取转盘页面结构
    $.ajax({
        url: 'https://beta-api.foroo.co.uk/api/v1/activities',
        // url: 'https://mock.souche-inc.com/mock/5da5615d40053079d4748060/czhang/zhuanpan',
        data: { type: 2 },
        headers: {
            token: token,
        },
        success: function (data) {
            if (data.status === 5000) {
                ForooAppCaller.postMessage(JSON.stringify({ action: 'login', target_url: window.location.href }));
                $('#loading').hide();
                $('#mengban').hide();
            } else if (data.status === 1) {
                totalPoint = data.data.point;
                $('#coin').html(totalPoint);
                responseData = data.data.data;
                restTimes = data.data.play_times;
                firstTime = data.data.free_first_times;
                $('#count').html(`${restTimes}/5`);
                turnTableData = responseData.map((r) => {
                    if (r.type === 3) {
                        return {
                            text: 'GIFT',
                            img: './resource/gift.png',
                        };
                    } else if (r.type === 1) {
                        return {
                            text: `${r.point}P`,
                            img: './resource/point.png',
                        };
                    } else if (r.type === 2) {
                        if (r.extra.type === '4') {
                            return {
                                text: `${r.extra.discount}`,
                                img: './resource/coupon.png',
                            };
                        } else {
                            // 满减
                            return {
                                text: 'OFF',
                                img: './resource/coupon.png',
                            };
                        }
                    }
                });
                gbTurntable.draw({ id: 'turntable', prizes: turnTableData });
            } else {
                showToast(data.msg);
            }
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#loading').hide();
            $('#mengban').hide();
            showToast(textStatus);
        },
    });

    // 其他奖励 点击蒙版|奖品
    // 优惠券
    $('#offPrize').click(function () {
        $('#mengban').hide();
        $('#light').hide();
        $('#offPrize').hide();
        $('#offPrizeCount').hide();
    });
    $('#offPrizeCount').click(function () {
        $('#mengban').hide();
        $('#light').hide();
        $('#offPrize').hide();
        $('#offPrizeCount').hide();
    });

    // 积分
    $('#pointPrize').click(function () {
        $('#mengban').hide();
        $('#light').hide();
        $('#pointPrize').hide();
        $('#pointPrizeContainer').hide();
    });
    $('#pointPrizeContainer').click(function () {
        $('#mengban').hide();
        $('#light').hide();
        $('#pointPrize').hide();
        $('#pointPrizeContainer').hide();
    });

    $('#shareBtn').click(function () {
        ForooAppCaller.postMessage(JSON.stringify({ action: 'share' }));
    });

    // 点击叉叉
    $('#closePrize').click(function () {
        $('#mengban').hide();
        $('#light').hide();
        $('#box').hide();
    });

    // 点击蒙版 积分、优惠券都消失
    $('#mengban').click(function () {
        if ($('#box').css('display') !== 'none') {
            return;
        }
        $('#mengban').hide();
        $('#light').hide();
        $('#offPrize').hide();
        $('#offPrizeCount').hide();
        $('#pointPrize').hide();
        $('#pointPrizeContainer').hide();
    });
    $('#light').click(function () {
        if ($('#box').css('display') !== 'none') {
            return;
        }
        $('#mengban').hide();
        $('#light').hide();
        $('#offPrize').hide();
        $('#offPrizeCount').hide();
        $('#pointPrize').hide();
        $('#pointPrizeContainer').hide();
    });
});
