$(document).ready(function () {
    var isMin = window.screen.height < 539 || false;
    var isRunning = false;

    if (isMin) {
        // 所有使用-min class
        $('#wheelLayer').removeClass('wheel-layer');
        $('#wheelLayer').addClass('wheel-layer-min');
        $('#wheelWithLightImg').removeClass('wheelWithLightImg');
        $('#wheelWithLightImg').addClass('wheelWithLightImg-min');
        $('#turntable').removeClass('gb-turntable');
        $('#turntable').addClass('gb-turntable-min');
        $('#gbTurnTableBtn').removeClass('gb-turntable-btn');
        $('#gbTurnTableBtn').addClass('gb-turntable-btn-min');
        $('#pin').removeClass('pinImage');
        $('#pin').addClass('pinImage-min');
        // rule modal
        $('#model').removeClass('rule-model');
        $('#model').addClass('rule-model-min');
        $('#model').addClass('none-class');
        $('#model').hide();
        $('#modelBody').removeClass('model-body-min');
        $('#modelBody').addClass('model-body-min');
        $('#closeModel').removeClass('close-model');
        $('#closeModel').addClass('close-model-min');

        // 大奖
        $('#box').removeClass('toy');
        $('#box').addClass('toy-min');
    }

    $('#mengban').hide();
    $('#light').hide();
    $('#box').removeClass('none-class');
    $('#box').hide();

    $('#toastBg').removeClass('none-class');
    $('#toastBg').hide();
    $('#toastText').hide();

    $('#loading').hide();

    $('#model').addClass('none-class');
    $('#model').hide();

    // 优惠券
    // $('#offPrize').hide();
    // $('#offPrizeCount').hide();

    // 积分
    // $('#pointPrize').hide();
    // $('#pointPrizeCount').hide();
    // $('#pointPrizeText').hide();
    // $('#pointPrizeContainer').hide();

    // rules
    // $('#model').hide();
    // $('#closeModel').hide();

    // confirm
    // $('#confirm').hide();

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
    // var firstTime = false; // 是否第一次免费
    var _zFree = 0;
    var isBetaUrl = window.location.href.includes('beta-game');
    // var isBetaUrl = true;

    gbTurntable.init({
        id: 'turntable',
        isMin: isMin,
        config: function (callback) {
            // 获取奖品信息
            // 奖项 text 属性不能为空，用于显示或抽中奖品提示
            // img 为奖品图片地址，如果不为空则转盘奖品按图片方式显示
            callback && callback(turnTableData);
        },
        getPrize: function (callback) {
            if (isRunning) {
                return;
            }

            const prizeUrl = isBetaUrl ? 'https://beta.foroo.co.uk/api/v1/activities/fortune_wheel' : 'https://foroo.co.uk/api/v1/activities/fortune_wheel';
            // 获取中奖信息
            $('#loading').show();
            $('#mengban').show();
            $.ajax({
                // url: 'https://mock.souche-inc.com/mock/5da5615d40053079d4748060/czhang/getPrize',
                // url: 'https://mock.souche-inc.com/mock/5da5615d40053079d4748060/czhang/getPrize_copy_error',
                url: prizeUrl,
                data: { free: _zFree },
                headers: { token: token },
                success: function (res) {
                    isRunning = true;
                    if (res.status === 5000) {
                        ForooAppCaller.postMessage(JSON.stringify({ action: 'login', target_url: window.location.href }));
                        $('#loading').hide();
                        $('#mengban').hide();
                    } else if (res.status === 1) {
                        $('#loading').hide();
                        $('#mengban').hide();
                        num = res.data.prize - 1;
                        // num 奖品id restTimes 可抽奖次数
                        _zFree = res.data.is_share ? 2 : res.data.free_first_times ? 1 : 0;

                        restTimes = res.data.play_times;
                        $('#count').html(`${restTimes}`);
                        callback && callback([num, restTimes]);
                    } else {
                        // 出错
                        $('#loading').hide();

                        // confirm
                        $('#confirmText').html(res.msg);
                        $('#mengban').show();
                        $('#confirm').show();
                        // showToast(res.msg);
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
            isRunning = false;

            $('#pin').attr('src', 'resource/pin.png');
            const prizeData = responseData[num];
            if (prizeData.type === 1) {
                // 得到积分奖励
                totalPoint = totalPoint + prizeData.point - (_zFree == 0 ? 20 : 0);
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

    const activitiesUrl = isBetaUrl ? 'https://beta.foroo.co.uk/api/v1/activities' : 'https://foroo.co.uk/api/v1/activities';
    // 获取转盘页面结构
    $.ajax({
        url: activitiesUrl,
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
                totalPoint = Number(data.data.point);
                $('#coin').html(totalPoint);
                responseData = data.data.data;
                restTimes = data.data.play_times;
                _zFree = data.data.is_share ? 2 : data.data.free_first_times ? 1 : 0;
                $('#count').html(`${restTimes}`);
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
        if ($('#box').css('display') !== 'none' || $('#model').css('display') !== 'none' || $('#confirm').css('display') !== 'none') {
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

    // 点击 rules
    $('#rules').click(function () {
        if (isRunning) {
            return;
        }
        $('#mengban').show();
        $('#model').show();
        $('#closeModel').show();
    });

    // 点击关闭rules
    $('#closeModel').click(function () {
        $('#mengban').hide();
        $('#model').hide();
        $('#closeModel').hide();
    });

    // 点击confirm 取消
    $('#confirmOk').click(function () {
        $('#confirm').hide();
        $('#mengban').hide();
    });

    $('#pin').click(function () {
        // console.log('pin clicked');
        $('#pin').attr('src', 'resource/pin_press.png');
    });
});
