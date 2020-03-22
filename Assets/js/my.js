//cust script
var actionSheetButtons = [
    [{ text: 'Choose some action', label: true },
    { text: 'Alert', icoIos: 'alert', icoMat: 'error', onClick: function () { Be.app.alert('He Hoou!'); } },
    { text: 'Second Alert', icoIos: 'add', icoMat: 'add', onClick: function () { Be.app.alert('Second Alert!'); } },
    { text: 'Nice Red Button ', icoIos: 'edit', icoMat: 'edit', color: 'red', onClick: function () { Be.app.alert('You have clicked red button!'); } }
    ], [{ text: 'Cancel', icoIos: '', icoMat: 'close' }]];
var actionGridButtons = [
  [
    {
      text: 'Button 1',
      icon: '<img src="http://demo.appbe.net/assets/img/people-1.jpg" width="48"/>', onClick: function () { Be.app.alert('Button 1-1'); }
    },
    {
      text: 'Button 2',
        icon: '<img src="http://demo.appbe.net/assets/img/people-2.jpg" width="48">', onClick: function () { Be.app.alert('Button 1-2'); }
    },
    {
      text: 'Button 3',
        icon: '<img src="http://demo.appbe.net/assets/img/people-3.jpg" width="48">', onClick: function () { Be.app.alert('Button 1-3'); }
    }
  ],
  [
    {
      text: 'Button 1',
          icon: '<img src="http://demo.appbe.net/assets/img/people-6.jpg" width="48"/>', onClick: function () { Be.app.alert('Button 2-1'); }
    },
    {
      text: 'Button 2',
        icon: '<img src="http://demo.appbe.net/assets/img/people-7.jpg" width="48">', onClick: function () { Be.app.alert('Button 2-2'); }
    },
    {
      text: 'Button 3',
        icon: '<img src="http://demo.appbe.net/assets/img/people-8.jpg" width="48">', onClick: function () { Be.app.alert('Button 2-3'); }
    }
  ]
];

function doDevice(responseAsJSON) {
    Be.app.alert("device=" + responseAsJSON.device + "<br>manufacturer=" + responseAsJSON.manufacturer + "<br>deviceName=" + responseAsJSON.deviceName + "<br>version=" + responseAsJSON.version + "<br>platform=" + responseAsJSON.platform + "<br>idiom=" + responseAsJSON.idiom + "<br>deviceType=" + responseAsJSON.deviceType);
}
function doConnectivity(responseAsJSON) {
    Be.app.alert("access=" + responseAsJSON.access + "<br>profiles=" + responseAsJSON.profiles);
}
function doBattery(responseAsJSON) {
    Be.app.alert("level=" + responseAsJSON.level + "<br>state=" + responseAsJSON.state + "<br>source=" + responseAsJSON.source);
}
function doBatterySubscribe(responseAsJSON) {
    var level = parseInt(responseAsJSON['level']);
    var html = 'level=' + responseAsJSON['level'];
    html += '<br />state=' + responseAsJSON['state'];
    html += '<br />source=' + responseAsJSON['source'];
    $('#index-div-alert').html(html);
    if (level === 1.00) {
        var url = Be.config.url + '/assets/media/heart-spa.mp3';
        $('#imgApp').attr('src', Be.config.url + '/assets/img/charge-full.gif');
        Be.ext.playAudio(url, '1');
    }
}
function doBatteryUnsubscribe(responseAsJSON) {
    var html = 'level=' + responseAsJSON['level'];
    html += '<br />state=' + responseAsJSON['state'];
    html += '<br />source=' + responseAsJSON['source'];
    html += '<br />Battery event unsubscribed';
    $$('#index-div-alert').html(html);
}
function doCompass(responseAsJSON) {
    Be.app.alert("compass:" + responseAsJSON.result + "<br>datetime=" + responseAsJSON.datetime);
}
function doCompassSubscribe(responseAsJSON) {
    $('#index-div-compass').html("compass:" + responseAsJSON.result + "<br>datetime=" + responseAsJSON.datetime);
}
function doCompassUnsubscribe(responseAsJSON) {
    $('#index-div-compass').html("Compass event unsubscribed:<br>datetime=" + responseAsJSON.datetime);
}
function doLocationLast(responseAsJSON) {
    if (responseAsJSON.error === '1') Be.app.alert(responseAsJSON.body);
    else Be.app.alert("time=" + responseAsJSON.time + "<br>lat=" + responseAsJSON.lat + "<br>lng=" + responseAsJSON.lng + "<br>alt=" + responseAsJSON.alt + "<br>acc=" + responseAsJSON.acc + "<br>speed=" + responseAsJSON.speed + "<br>course=" + responseAsJSON.course);
}
function doLocationCurrent(responseAsJSON) {
    if (responseAsJSON.error === '1') Be.app.alert(responseAsJSON.body);
    else Be.app.alert("time=" + responseAsJSON.time + "<br>lat=" + responseAsJSON.lat + "<br>lng=" + responseAsJSON.lng + "<br>alt=" + responseAsJSON.alt + "<br>acc=" + responseAsJSON.acc + "<br>speed=" + responseAsJSON.speed + "<br>course=" + responseAsJSON.course);
}
function doLocationSubscribe(responseAsJSON) {

}
function doLocationUnsubscribe(responseAsJSON) {

}
function doBleFind(responseAsJSON) {
    if (responseAsJSON.error === '0') {
        Be.app.alert(responseAsJSON.id + '<br>' + responseAsJSON.name + '<br>' + responseAsJSON.rssi + '<br>' + responseAsJSON.state);
    } else {
        if (responseAsJSON.error === '1') {
            var available = responseAsJSON.available;
            var on = responseAsJSON.on;
            if (available === '0') Be.app.alert('您的设备不支持低功耗蓝牙功能。');
            else if (on === '0') Be.app.alert('请先打开当前设备的蓝牙功能。');
        } else {
            Be.app.alert('未发现低功耗蓝牙设备，请重新扫描。');
        }
    }
}
function doBleConnect(responseAsJSON) {
}
function doBleDisconnect(responseAsJSON) {
}
function doBleRead(responseAsJSON) {
}
function doBleWrite(responseAsJSON) {
}
function doBleSubscribe(responseAsJSON) {
}
function doBleUnsubscribe(responseAsJSON) {
}
function doScanner(responseAsJSON) {
    switch (responseAsJSON.flag) {
        case '0':
            Be.app.alert("code:<br>" + responseAsJSON.result);
            break;
        case '1':
            Be.app.alert("code:<br>" + responseAsJSON.result);
            break;
        case '2':
            if (responseAsJSON.error !== 0) {
                var qr = responseAsJSON.result;
                var pos = qr.indexOf('?');
                qr = qr.substr(pos + 1);
                qr = qr.replace('en=', '');
                qr = qr.replace('&qr=', ';');
                qr = qr.replace('&do=', ';');
                Be.router.navigate({ name: 'scan', web: qr, push: '0' });
            } else {
                Be.app.alert("二维码识别失败。");
            }
            break;
    }
}
function doScanTest() {
  Be.router.navigate({ name: 'scan', web: '0;a60@201903@1001;red' });
}
function doVideo(responseAsJSON) {
    Be.app.alert("path:<br>" + responseAsJSON.path);
}
function doCamera(responseAsJSON) {
    Be.app.alert("path:<br>" + responseAsJSON.path);
}
function doPick(responseAsJSON) {
    Be.app.alert("path:<br>" + responseAsJSON.path);
}
function doOCR(responseAsJSON) {
    if (responseAsJSON.code === '0') {
        if (responseAsJSON.type === '1') Be.app.alert("valid_date:" + responseAsJSON.valid_date + "<br>authority:" + responseAsJSON.authority);
        else Be.app.alert("name:" + responseAsJSON.name + "<br>sex:" + responseAsJSON.sex + "<br>nation:" + responseAsJSON.nation + "<br>birth:" + responseAsJSON.birth + "<br>address:" + responseAsJSON.address + "<br>id:" + responseAsJSON.id);
    } else {
        Be.app.alert("身份证识别失败。");
    }
}
function doFace(responseAsJSON) {
    if (responseAsJSON.code === '0') {
        Be.app.alert("msg:" + responseAsJSON.msg + "<br>similarity:" + responseAsJSON.similarity);
    } else {
        Be.app.alert("人脸识别失败。");
    }
}
function doRecord(responseAsJSON) {
    Be.app.alert("path:<br>" + responseAsJSON.result);
}
function doUpload(responseAsJSON) {
    var json = JSON.parse(responseAsJSON);
    if (json.error === '0') {
        Be.app.alert("file:" + json.file + "<br>duration:" + json.duration + "<br>size:" + json.size);
    } else {
        Be.app.alert("上传失败");
    }
}
function doDownload(responseAsJSON) {
    Be.app.alert("file:" + responseAsJSON.file + "<br>size:" + responseAsJSON.size + "<br>duration:" + responseAsJSON.duration);
}
function doSwipeoutDelete(rowId) {
    Be.app.confirm('您确认要删除当前条目吗？', function () {
        var $page = Be.router.getPage('swipe-delete');
        $page.find('ul li.' + rowId).remove();
        //其它处理
    });
}
function doSwipeReply(rowId) {
    Be.app.alert('doReply:' + rowId);
}
function doSwipeForward(rowId) {
    Be.app.alert('doForward:' + rowId);
}
function doSortable(oPage, data) {
    console.log('pageName=' + oPage.data('name'));
    console.log('fromIdx=' + data.fromIdx + ',toIdx=' + data.toIdx);
}
function doDateSelected(pageName, e, date) {
    console.log('pageName=' + pageName+',dateSelected=' + date.format('YYYY-MM-DD'));
}
function doMonthSelected(pageName,e, date, setEvent) {
    console.log('pageName=' + pageName +',monthSelected=' + date.format('YYYY-MM-DD'));
}
function doYearSelected(pageName,e, date, setEvent) {
    console.log('pageName=' + pageName +',yearSelected=' + date.format('YYYY-MM-DD'));
}
function doQr() {
    var currPage = document.querySelector('.page[data-name="home"]');
    var iTop = currPage.querySelector('.page-content').scrollTop;
    console.log('>>' + iTop);
}
//Page Events
//document.addEventListener("page.shown.home", homeShownEvt);
//document.addEventListener("page.hidden.home", homeHiddenEvt);
//document.addEventListener("page.shown.core-features", coreFeaturesHiddenEvt);
//document.addEventListener("page.shown.picker", pickerShownEvt);
//Be.dom.on("page.shown.home", homeShownEvt);
Be.dom.on("page.shown.picker", pickerShownEvt);
Be.dom.on("page.shown.notifications", notiShownEvt);
Be.dom.on("page.shown.progressbar", progressbarShownEvt);
Be.dom.on("page.shown.toast", toastShownEvt);
Be.dom.on("page.drag.end", shortEndEvt);
function shortEndEvt(e) {
    console.log("****page.drag.end");
    console.log(e.detail);
}
function homeShownEvt(e) {
    console.log("****page.shown.home");
    console.log(e);
    console.log(e.detail);
}
function homeHiddenEvt(e) {
    console.log("----page.hidden.home");
    console.log(e);
    console.log(e.detail);
}
function coreFeaturesHiddenEvt(e) {
    console.log("----page.shown.core-features");
    console.log(e);
    console.log(e.detail);
}
function pickerShownEvt(e) {
    var arrDevice = ["iPhone 4", "iPhone 4S", "iPhone 5", "iPhone 5S", "iPhone 6", "iPhone 6 Plus", "iPad 2", "iPad Retina", "iPad Air", "iPad mini", "iPad mini 2", "iPad mini 3"];
    var weekdayArr = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
    var timeArr = ["08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30", "21:00"];
    var numArr = ["1", "2", "3", "4", "5"];
    var UplinkData = [{ id: "1", value: "兰博基尼" }, { id: "2", value: "劳斯莱斯", childs: [{ id: "1", value: "曜影" }, { id: "2", value: "幻影", childs: [{ id: "1", value: "标准版" }, { id: "2", value: "加长版" }, { id: "3", value: "巅峰之旅" }, { id: "4", value: "流光熠世" }, { id: "5", value: "都会典藏版" }] }, { id: "3", value: "古思特", childs: [{ id: "1", value: "加长版" }, { id: "2", value: "永恒之爱" }, { id: "3", value: "英骥" }, { id: "4", value: "阿尔卑斯典藏版" }] }, { id: "4", value: "魅影", childs: [{ id: "1", value: "标准版" }, { id: "2", value: "Black Badge" }] }] }, { id: "3", value: "宾利", childs: [{ id: "1", value: "慕尚", childs: [{ id: "1", value: "标准版" }, { id: "2", value: "极致版" }] }, { id: "2", value: "欧陆", childs: [{ id: "1", value: "尊贵版" }, { id: "2", value: "敞篷标准版" }, { id: "3", value: "敞篷尊贵版" }] }] }, { id: "4", value: "法拉利", childs: [{ id: "1", value: "LaFerrari" }, { id: "2", value: "法拉利488" }, { id: "3", value: "GTC4Lusso" }] }, { id: "5", value: "玛莎拉蒂", childs: [{ id: "1", value: "总裁" }, { id: "2", value: "玛莎拉蒂GT" }, { id: "3", value: "Levante" }] }];
    var mobileSelect1 = new MobileSelect({ trigger: "#ks-picker-device", title: "", wheels: [{ data: arrDevice }], position: [2], callback: function (indexArr, data) { var $input = document.querySelector("#ks-picker-device"); $input.dataset.key = indexArr; } });
    var mobileSelect2 = new MobileSelect({ trigger: "#ks-picker-describe", title: "双项选择", wheels: [{ data: weekdayArr }, { data: timeArr }], position: [1, 2], transitionEnd: function (indexArr, data) { }, callback: function (indexArr, data) { var $input = document.querySelector("#ks-picker-describe"); $input.dataset.key = indexArr; }});
    var mobileSelect3 = new MobileSelect({ trigger: "#ks-picker-dependent", title: "车型选择", wheels: [{ data: UplinkData }], position: [2, 0], transitionEnd: function (indexArr, data) { }, callback: function (indexArr, data) { var $input = document.querySelector("#ks-picker-dependent"); $input.dataset.key = indexArr; } });
    var mobileSelect4 = new MobileSelect({ trigger: "#ks-picker-dependent-1", title: "地区选择", wheels: [{ data: [{ id: "1", value: "附近", childs: [{ id: "1", value: "1000米" }, { id: "2", value: "2000米" }, { id: "3", value: "3000米" }, { id: "4", value: "5000米" }, { id: "5", value: "10000米" }] }, { id: "2", value: "上城区" }, { id: "3", value: "下城区" }, { id: "4", value: "江干区" }, { id: "5", value: "拱墅区" }, { id: "6", value: "西湖区" }] }], transitionEnd: function (indexArr, data) { }, callback: function (indexArr, data) { var $input = document.querySelector("#ks-picker-dependent-1"); $input.dataset.key = indexArr; } });
    var mobileSelect5 = new MobileSelect({ trigger: "#ks-picker-mutil", title: "多项选择", wheels: [{ data: numArr }, { data: numArr }, { data: numArr }, { data: numArr }, { data: numArr }], position: [0, 1, 0, 1, 0], transitionEnd: function (indexArr, data) { }, callback: function (indexArr, data) { var $input = document.querySelector("#ks-picker-mutil"); $input.dataset.key = indexArr; } });
}
function notiShownEvt(e) {
    var oPage = Be.dom.page(e.detail.name); 
    var notiFull = { icon: '<i class="icon icon-be-18"></i>', title: 'AppBe', titleRightText: 'now', subtitle: 'This is a subtitle', text: 'This is a simple notification message', closeTimeout: 3000 };
    var notiWithButton = { icon: '<i class="icon icon-be-18"></i>', title: 'AppBe', subtitle: 'Notification with close button', text: 'Click (x) button to close me', closeButton: true };
    var notiCallbackOnClose = { icon: '<i class="icon icon-be-18"></i>', title: 'AppBe', titleRightText: 'now', subtitle: 'Notification with close on click', text: 'Click me to close', closeButton: true, onClick: function () { Be.app.alert('Notification closed'); } };
    //Be.dom.on('click', function () { Be.app.notification(notiFull); }, Be.dom.$('.open-full', oPage));
    Be.dom.on('click', function () { Be.app.notification(notiFull); }, Be.dom.$('.open-full', oPage));
    Be.dom.on('click', function () { Be.app.notification(notiWithButton); }, Be.dom.$('.open-with-button', oPage));
    Be.dom.on('click', function () { Be.app.notification(notiCallbackOnClose); }, Be.dom.$('.open-callback-on-close', oPage));
}
function progressbarShownEvt(e) {
    var evtClick1 = function (e) {
        var value = e.target.getAttribute('data-progress');
        var pbar = Be.dom.$('#pbar-1');
        Be.app.progressbar.set(pbar, value);
    };
    var evtClick2 = function (e) {
        var pbar = Be.app.progressbar.show(0, 'red');
        var progress = 0;
        function simulateLoading() {
            setTimeout(function () {
                var progressBefore = progress;
                progress += Math.random() * 20;
                Be.app.progressbar.set(pbar, progress);
                if (progressBefore < 100) { simulateLoading(); }
                else Be.app.progressbar.hide(pbar);
            }, Math.random() * 200 + 200);
        }
        simulateLoading();
    };
    var evtClick3 = function () {
        Be.app.progressbar.show('', 'green');
    };
    var arrButton = Be.dom.$$('.ks-demo-progressbar-inline .button');
    [].forEach.call(arrButton, function (oButton) { Be.dom.on('click', evtClick1, oButton); });
    Be.dom.on('click', evtClick2, Be.dom.$('.ks-demo-progressbar-overlay .button'));
    Be.dom.on('click', evtClick3, Be.dom.$('.ks-demo-progressbar-infinite-overlay .button'));
}
function toastShownEvt(e) {
    var oPage = Be.dom.page(e.detail.name);
    var notiBottom = { text: 'This is default bottom positioned toast', closeTimeout: 2000 };
    var notiTop = { text: 'Top positioned toast', position: 'top' };
    var notiCenter = { text: 'I\'m on center',position: 'center',closeTimeout: 2000};
    var notiIcon = {icon:'star',text: 'I\'m with icon', position: 'center', closeTimeout: 2000 };
    var notiButton = { text: 'Toast with additional close button', closeButton: true };
    var notiCustom = { text: 'Custom close button', closeButton: true, closeButtonText: 'Close Me', closeButtonColor: 'red' };
    var notiCallback = { text: 'Callback on close', closeButton: true, onClick: function () { Be.app.alert('Toast closed'); } };

    Be.dom.on('click', function (e) { Be.app.toast(notiBottom); }, Be.dom.$('.toast-bottom',oPage));
    Be.dom.on('click', function (e) { Be.app.toast(notiTop); },  Be.dom.$('.toast-top',oPage));
    Be.dom.on('click', function () { Be.app.toast(notiCenter); },  Be.dom.$('.toast-center',oPage));
    Be.dom.on('click', function () { Be.app.toast(notiIcon); },  Be.dom.$('.toast-icon',oPage));
    Be.dom.on('click', function () { Be.app.toast(notiButton); },  Be.dom.$('.toast-close',oPage));
    Be.dom.on('click', function () { Be.app.toast(notiCustom); },  Be.dom.$('.toast-custom',oPage));
    Be.dom.on('click', function () { Be.app.toast(notiCallback); },  Be.dom.$('.toast-callback',oPage));
}
/*
$(document).on('page.shown', '.page[data-name="home"]', function (event, target) {
    var oPageContent = $(this).find('div.page-content');
    Be.util.setupWebApp(oPageContent);
});
$(document).on('page.shown', function (event, target) {
    console.log(event);
    console.log(target);
    var oPageContent = $(this).find('div.page-content');
    console.log(oPageContent.data('name'));
    Be.util.setupWebApp(oPageContent);
});
*/

// Amcharts  
// Column & Bar
Be.dom.on("page.shown.chart-simple-column", chartSimpleColumnShownEvt);
Be.dom.on("page.shown.chart-column-with-rotated-series", chartColumnWithRotatedSeriesShownEvt);
Be.dom.on("page.shown.chart-column-and-line-mix", chartColumnAndLineMixShownEvt);
Be.dom.on("page.shown.chart-3d-column", chart3dColumnShownEvt);
Be.dom.on("page.shown.chart-clustered-bar", chartClusteredBarShownEvt);
Be.dom.on("page.shown.chart-3d-bar", chart3dBarShownEvt);
function chartSimpleColumnShownEvt(e) {
    var chart = AmCharts.makeChart("chartdiv1", {
        "type": "serial",
        //"dataProvider": chartData,
        "dataLoader": {
            "url": "/Assets/data/chart.json",
            "format": "json"
        },
        "valueAxes": [{
            "gridColor": "#FFFFFF",
            "gridAlpha": 0.2,
            "dashLength": 0
        }],
        "gridAboveGraphs": true,
        "startDuration": 1,
        "graphs": [{
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillAlphas": 0.8,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "visits"
        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "country",
        "categoryAxis": {
            "gridPosition": "start",
            "gridAlpha": 0,
            "tickPosition": "start",
            "tickLength": 20
        }
    });
}
function chartColumnWithRotatedSeriesShownEvt(e) {
    var data = Be.dom.$('#dat-column-rotated').innerText;
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chartdiv2", {
        "type": "serial",
        "marginRight": 70,
        "dataProvider": chartData,
        "valueAxes": [{
            "axisAlpha": 0,
            "position": "left",
            "title": "Visitors from country"
        }],
        "startDuration": 1,
        "graphs": [{
            "balloonText": "<b>[[category]]: [[value]]</b>",
            "fillColorsField": "color",
            "fillAlphas": 0.9,
            "lineAlpha": 0.2,
            "type": "column",
            "valueField": "visits"
        }],
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "country",
        "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 45
        }

    });
    Be.dom.$('#chartdiv2').style.height = (Be.height - 60) + 'px';
}
function chartColumnAndLineMixShownEvt(e) {
    var oPage = Be.dom.page(e.detail.name);
    var oContainer = Be.dom.$('#dat-column-and-line', oPage);
    var data = Be.dom.text(oContainer);
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chartdiv3", {
        "type": "serial",
        "addClassNames": true,
        "autoMargins": false,
        "marginLeft": 30,
        "marginRight": 8,
        "marginTop": 10,
        "marginBottom": 26,
        "balloon": {
            "adjustBorderColor": false,
            "horizontalPadding": 10,
            "verticalPadding": 8,
            "color": "#ffffff"
        },

        "dataProvider": chartData,
        "valueAxes": [{
            "axisAlpha": 0,
            "position": "left"
        }],
        "startDuration": 1,
        "graphs": [{
            "alphaField": "alpha",
            "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
            "fillAlphas": 1,
            "title": "Income",
            "type": "column",
            "valueField": "income",
            "dashLengthField": "dashLengthColumn"
        }, {
            "id": "graph2",
            "balloonText": "<span style='font-size:12px;'>[[title]] in [[category]]:<br><span style='font-size:20px;'>[[value]]</span> [[additional]]</span>",
            "bullet": "round",
            "lineThickness": 3,
            "bulletSize": 7,
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "useLineColorForBulletBorder": true,
            "bulletBorderThickness": 3,
            "fillAlphas": 0,
            "lineAlpha": 1,
            "title": "Expenses",
            "valueField": "expenses",
            "dashLengthField": "dashLengthLine"
        }],
        "categoryField": "year",
        "categoryAxis": {
            "gridPosition": "start",
            "axisAlpha": 0,
            "tickLength": 0
        }
    });
    Be.dom.$('#chartdiv3').style.height = (Be.height - 60) + 'px';
}
function chart3dColumnShownEvt(e) {
    var oPage = Be.dom.page(e.detail.name);
    var oContainer = Be.dom.$('#dat-3d-column', oPage);
    var data = Be.dom.text(oContainer);
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chartdiv4", {
        "type": "serial",
        "startDuration": 2,
        "dataProvider": chartData,
        "valueAxes": [{
            "position": "left",
            "title": "Visitors"
        }],
        "graphs": [{
            "balloonText": "[[category]]: <b>[[value]]</b>",
            "fillColorsField": "color",
            "fillAlphas": 1,
            "lineAlpha": 0.1,
            "type": "column",
            "valueField": "visits"
        }],
        "depth3D": 20,
        "angle": 30,
        "chartCursor": {
            "categoryBalloonEnabled": false,
            "cursorAlpha": 0,
            "zoomable": false
        },
        "categoryField": "country",
        "categoryAxis": {
            "gridPosition": "start",
            "labelRotation": 90
        }
    });
    Be.dom.$('#chartdiv4').style.height = (Be.height - 120) + 'px';
}
function chartClusteredBarShownEvt(e) {
    var oPage = Be.dom.page(e.detail.name);
    var oContainer = Be.dom.$('#dat-clustered-bar', oPage);
    var data = Be.dom.text(oContainer);
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chartdiv5", {
        "type": "serial",
        "categoryField": "year",
        "rotate": true,
        "startDuration": 1,
        "categoryAxis": {
            "gridPosition": "start",
            "position": "left"
        },
        "trendLines": [],
        "graphs": [
            {
                "balloonText": "Income:[[value]]",
                "fillAlphas": 0.8,
                "id": "AmGraph-1",
                "lineAlpha": 0.2,
                "title": "Income",
                "type": "column",
                "valueField": "income"
            },
            {
                "balloonText": "Expenses:[[value]]",
                "fillAlphas": 0.8,
                "id": "AmGraph-2",
                "lineAlpha": 0.2,
                "title": "Expenses",
                "type": "column",
                "valueField": "expenses"
            }
        ],
        "guides": [],
        "valueAxes": [
            {
                "id": "ValueAxis-1",
                "position": "top",
                "axisAlpha": 0
            }
        ],
        "allLabels": [],
        "balloon": {},
        "titles": [],
        "dataProvider": chartData
    });
}
function chart3dBarShownEvt(e) {
    console.log(e);
    var oPage = Be.dom.page(e.detail.name);
    var oContainer = Be.dom.$('#dat-3d-bar', oPage);
    var data = Be.dom.text(oContainer);
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chartdiv6", {
        "theme": "none",
        "type": "serial",
        "dataProvider": chartData,
        "valueAxes": [{
            "title": "Income in millions, USD"
        }],
        "graphs": [{
            "balloonText": "Income in [[category]]:[[value]]",
            "fillAlphas": 1,
            "lineAlpha": 0.2,
            "title": "Income",
            "type": "column",
            "valueField": "income"
        }],
        "depth3D": 20,
        "angle": 30,
        "rotate": true,
        "categoryField": "year",
        "categoryAxis": {
            "gridPosition": "start",
            "fillAlpha": 0.05,
            "position": "left"
        }
    });
}
/*
// Line & Area 
$(document).on('page.shown', '.page[data-name="line-chart-with-scroll-and-zoom"]', function (event, target) {
    var oPage = $(this);
    Be.native.landscape(oPage, '#chartdiv7');
    var chartData = generateChartData7();
    var chart = AmCharts.makeChart("chartdiv7", {
        "type": "serial",
        "marginRight": 80,
        "autoMarginOffset": 20,
        "marginTop": 7,
        "dataProvider": chartData,
        "valueAxes": [{
            "axisAlpha": 0.2,
            "dashLength": 1,
            "position": "left"
        }],
        "mouseWheelZoomEnabled": true,
        "graphs": [{
            "id": "g1",
            "balloonText": "[[value]]",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "hideBulletsCount": 50,
            "title": "red line",
            "valueField": "visits",
            "useLineColorForBulletBorder": true,
            "balloon": {
                "drop": true
            }
        }],
        "chartScrollbar": {
            "autoGridCount": true,
            "graph": "g1",
            "scrollbarHeight": 40
        },
        "chartCursor": {
            "limitToGraph": "g1"
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "axisColor": "#DADADA",
            "dashLength": 1,
            "minorGridEnabled": true
        }
    });

    chart.addListener("rendered", zoomChart);
    zoomChart();

    // this method is called when chart is first inited as we listen for "rendered" event
    function zoomChart() {
        // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
        chart.zoomToIndexes(chartData.length - 40, chartData.length - 1);
    }
});
$(document).on('page.hidden', '.page[data-name="line-chart-with-scroll-and-zoom"]', function (event, target) {
    Be.native.unlock();
});
$(document).on('page.shown', '.page[data-name="line-different-colors-ups-downs"]', function (event, target) {
    var oPage = $(this);
    Be.native.landscape(oPage, '#chartdiv8');
    var chartData = generateChartData8();
    var chart = AmCharts.makeChart("chartdiv8", {
        "type": "serial",
        "marginRight": 80,
        "autoMarginOffset": 20,
        "marginTop": 20,
        "dataProvider": chartData,
        "valueAxes": [{
            "id": "v1",
            "axisAlpha": 0.1
        }],
        "graphs": [{
            "useNegativeColorIfDown": true,
            "balloonText": "[[category]]<br><b>value: [[value]]</b>",
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletBorderColor": "#FFFFFF",
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "lineColor": "#fdd400",
            "negativeLineColor": "#67b7dc",
            "valueField": "visits"
        }],
        "chartScrollbar": {
            "scrollbarHeight": 5,
            "backgroundAlpha": 0.1,
            "backgroundColor": "#868686",
            "selectedBackgroundColor": "#67b7dc",
            "selectedBackgroundAlpha": 1
        },
        "chartCursor": {
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "axisAlpha": 0,
            "minHorizontalGap": 60
        }
    });

    chart.addListener("dataUpdated", zoomChart);
    //zoomChart();

    function zoomChart() {
        if (chart.zoomToIndexes) {
            chart.zoomToIndexes(130, chartData.length - 1);
        }
    }
});
$(document).on('page.hidden', '.page[data-name="line-different-colors-ups-downs"]', function (event, target) {
    Be.native.unlock();
});
$(document).on('page.shown', '.page[data-name="smoothed-line-chart"]', function (event, target) {
    var oPage = $(this);
    Be.native.landscape(oPage, '#chartdiv9');
    var data = $('#dat-smoothed-line').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chartdiv9", {
        "type": "serial",
        "marginTop": 0,
        "marginRight": 80,
        "dataProvider": chartData,
        "valueAxes": [{
            "axisAlpha": 0,
            "position": "left"
        }],
        "graphs": [{
            "id": "g1",
            "balloonText": "[[category]]<br><b><span style='font-size:14px;'>[[value]]</span></b>",
            "bullet": "round",
            "bulletSize": 8,
            "lineColor": "#d1655d",
            "lineThickness": 2,
            "negativeLineColor": "#637bb6",
            "type": "smoothedLine",
            "valueField": "value"
        }],
        "chartScrollbar": {
            "graph": "g1",
            "gridAlpha": 0,
            "color": "#888888",
            "scrollbarHeight": 55,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "autoGridCount": true,
            "selectedGraphFillAlpha": 0,
            "graphLineAlpha": 0.2,
            "graphLineColor": "#c2c2c2",
            "selectedGraphLineColor": "#888888",
            "selectedGraphLineAlpha": 1

        },
        "chartCursor": {
            "categoryBalloonDateFormat": "YYYY",
            "cursorAlpha": 0,
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "valueLineAlpha": 0.5,
            "fullWidth": true
        },
        "dataDateFormat": "YYYY",
        "categoryField": "year",
        "categoryAxis": {
            "minPeriod": "YYYY",
            "parseDates": true,
            "minorGridAlpha": 0.1,
            "minorGridEnabled": true
        }
    });

    chart.addListener("rendered", zoomChart);
    if (chart.zoomChart) {
        chart.zoomChart();
    }

    function zoomChart() {
        chart.zoomToIndexes(Math.round(chart.dataProvider.length * 0.4), Math.round(chart.dataProvider.length * 0.55));
    }
});
$(document).on('page.hidden', '.page[data-name="smoothed-line-chart"]', function (event, target) {
    Be.native.unlock();
});
$(document).on('page.shown', '.page[data-name="zoomable-value-axis"]', function (event, target) {
    var data = $('#dat-zoomabel-value-axis').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chartdiv10", {
        "type": "serial",
        "marginRight": 40,
        "marginLeft": 40,
        "autoMarginOffset": 20,
        "dataDateFormat": "YYYY-MM-DD",
        "valueAxes": [{
            "id": "v1",
            "axisAlpha": 0,
            "position": "left",
            "ignoreAxisWidth": true
        }],
        "balloon": {
            "borderThickness": 1,
            "shadowAlpha": 0
        },
        "graphs": [{
            "id": "g1",
            "balloon": {
                "drop": true,
                "adjustBorderColor": false,
                "color": "#ffffff",
                "type": "smoothedLine"
            },
            "fillAlphas": 0.2,
            "bullet": "round",
            "bulletBorderAlpha": 1,
            "bulletColor": "#FFFFFF",
            "bulletSize": 5,
            "hideBulletsCount": 50,
            "lineThickness": 2,
            "title": "red line",
            "useLineColorForBulletBorder": true,
            "valueField": "value",
            "balloonText": "<span style='font-size:18px;'>[[value]]</span>"
        }],
        "chartCursor": {
            "valueLineEnabled": true,
            "valueLineBalloonEnabled": true,
            "cursorAlpha": 0,
            "zoomable": false,
            "valueZoomable": true,
            "valueLineAlpha": 0.5
        },
        "valueScrollbar": {
            "autoGridCount": true,
            "color": "#000000",
            "scrollbarHeight": 50
        },
        "categoryField": "date",
        "categoryAxis": {
            "parseDates": true,
            "dashLength": 1,
            "minorGridEnabled": true
        },
        "dataProvider": chartData
    });
});
$(document).on('page.shown', '.page[data-name="line-with-changing-color"]', function (event, target) {
    var data = $('#dat-line-changing-color').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chartdiv11", {
        "type": "serial",
        "marginRight": 80,
        "dataProvider": chartData,
        "balloon": {
            "cornerRadius": 6,
            "horizontalPadding": 15,
            "verticalPadding": 10
        },
        "valueAxes": [{
            "duration": "mm",
            "durationUnits": {
                "hh": "h ",
                "mm": "min"
            },
            "axisAlpha": 0
        }],
        "graphs": [{
            "bullet": "square",
            "bulletBorderAlpha": 1,
            "bulletBorderThickness": 1,
            "fillAlphas": 0.3,
            "fillColorsField": "lineColor",
            "legendValueText": "[[value]]",
            "lineColorField": "lineColor",
            "title": "duration",
            "valueField": "duration"
        }],
        "chartScrollbar": {

        },
        "chartCursor": {
            "categoryBalloonDateFormat": "YYYY MMM DD",
            "cursorAlpha": 0,
            "fullWidth": true
        },
        "dataDateFormat": "YYYY-MM-DD",
        "categoryField": "date",
        "categoryAxis": {
            "dateFormats": [{
                "period": "DD",
                "format": "DD"
            }, {
                "period": "WW",
                "format": "MMM DD"
            }, {
                "period": "MM",
                "format": "MMM"
            }, {
                "period": "YYYY",
                "format": "YYYY"
            }],
            "parseDates": true,
            "autoGridCount": false,
            "axisColor": "#555555",
            "gridAlpha": 0,
            "gridCount": 50
        }
    });
    
    chart.addListener("dataUpdated", zoomChart);

    function zoomChart() {
        chart.zoomToDates(new Date(2012, 0, 3), new Date(2012, 0, 11));
    }
});
$(document).on('page.shown', '.page[data-name="area-with-time-based-data"]', function (event, target) {
    var chartData = generateChartData12();
    var chart = AmCharts.makeChart("chartdiv12", {
        "type": "serial",
        "theme": "none",
        "marginRight": 80,
        "dataProvider": chartData,
        "valueAxes": [{
            "position": "left",
            "title": "Unique visitors"
        }],
        "graphs": [{
            "id": "g1",
            "fillAlphas": 0.4,
            "valueField": "visits",
            "balloonText": "<div style='margin:5px; font-size:19px;'>Visits:<b>[[value]]</b></div>"
        }],
        "chartScrollbar": {
            "graph": "g1",
            "scrollbarHeight": 80,
            "backgroundAlpha": 0,
            "selectedBackgroundAlpha": 0.1,
            "selectedBackgroundColor": "#888888",
            "graphFillAlpha": 0,
            "graphLineAlpha": 0.5,
            "selectedGraphFillAlpha": 0,
            "selectedGraphLineAlpha": 1,
            "autoGridCount": true,
            "color": "#AAAAAA"
        },
        "chartCursor": {
            "categoryBalloonDateFormat": "JJ:NN, DD MMMM",
            "cursorPosition": "mouse"
        },
        "categoryField": "date",
        "categoryAxis": {
            "minPeriod": "mm",
            "parseDates": true
        },
        "export": {
            "enabled": true,
            "dateFormat": "YYYY-MM-DD HH:NN:SS"
        }
    });

    chart.addListener("dataUpdated", zoomChart);
    // when we apply theme, the dataUpdated event is fired even before we add listener, so
    // we need to call zoomChart here
    zoomChart();
    // this method is called when chart is first inited as we listen for "dataUpdated" event
    function zoomChart() {
        // different zoom methods can be used - zoomToIndexes, zoomToDates, zoomToCategoryValues
        chart.zoomToIndexes(chartData.length - 250, chartData.length - 100);
    }
});

// generate some random data, quite different range
function generateChartData7() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 5);

    for (var i = 0; i < 1000; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        var visits = Math.round(Math.random() * (40 + i / 5)) + 20 + i;

        chartData.push({
            date: newDate,
            visits: visits
        });
    }
    return chartData;
}

function generateChartData8() {
    var chartData = [];
    var firstDate = new Date();
    firstDate.setDate(firstDate.getDate() - 150);

    for (var i = 0; i < 150; i++) {
        // we create date objects here. In your data, you can have date strings
        // and then set format of your dates using chart.dataDateFormat property,
        // however when possible, use date objects, as this will speed up chart rendering.
        var newDate = new Date(firstDate);
        newDate.setDate(newDate.getDate() + i);

        var visits = Math.round(Math.random() * 100 - 50);

        chartData.push({
            date: newDate,
            visits: visits
        });
    }
    return chartData;
}

// generate some random data, quite different range
function generateChartData12() {
    var chartData = [];
    // current date
    var firstDate = new Date();
    // now set 500 minutes back
    firstDate.setMinutes(firstDate.getDate() - 1000);

    // and generate 500 data items
    for (var i = 0; i < 500; i++) {
        var newDate = new Date(firstDate);
        // each time we add one minute
        newDate.setMinutes(newDate.getMinutes() + i);
        // some random number
        var visits = Math.round(Math.random() * 40 + 10 + i + Math.random() * i / 5);
        // add data item to the array
        chartData.push({
            date: newDate,
            visits: visits
        });
    }
    return chartData;
}

// Pie & Funnel 
var dataTimePie;
$(document).on('page.shown', '.page[data-name="simple-pie-chart"]', function (event, target) {
    var data = $('#dat-simple-pie').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chart-simple-pie", {
        "type": "pie",
        "dataProvider": chartData,
        "valueField": "litres",
        "titleField": "country",
        "balloon": {
            "fixedPosition": true
        }
    });
});
$(document).on('page.shown', '.page[data-name="animated-time-line-pie-chart"]', function (event, target) {
    var data = $('#dat-line-pie').text();
    dataTimePie = JSON.parse(data);
    var currentYear = 1995;
    data = dataTimePie[currentYear];
    currentYear++;
    var chart = AmCharts.makeChart("chart-line-pie", {
        "type": "pie",
        "theme": "none",
        "dataProvider": data,
        "valueField": "size",
        "titleField": "sector",
        "startDuration": 0,
        "innerRadius": 80,
        "pullOutRadius": 20,
        "marginTop": 30,
        "titles": [{
            "text": "South African Economy"
        }],
        "allLabels": [{
            "y": "54%",
            "align": "center",
            "size": 25,
            "bold": true,
            "text": "1995",
            "color": "#555"
        }, {
            "y": "49%",
            "align": "center",
            "size": 15,
            "text": "Year",
            "color": "#555"
        }],
        "listeners": [{
            "method": function (event, target) {
                var chart = e.chart;
                function loop() {
                    chart.allLabels[0].text = currentYear;
                    var data = getCurrentData();
                    chart.animateData(data, {
                        duration: 1000,
                        complete: function () {
                            setTimeout(loop, 3000);
                        }
                    });
                }
                loop();
            }
        }]
    });
});
$(document).on('page.shown', '.page[data-name="3d-pie-chart"]', function (event, target) {
    var data = $('#dat-3d-pie').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chart-3d-pie", {
        "type": "pie",
        "dataProvider": chartData,
        "valueField": "value",
        "titleField": "country",
        "outlineAlpha": 0.4,
        "depth3D": 15,
        "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
        "angle": 30
    });
});
$(document).on('page.shown', '.page[data-name="donut-chart"]', function (event, target) {
    var data = $('#dat-donut-chart').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chart-donut-chart", {
        "type": "pie",
        "dataProvider": chartData,
        "titleField": "title",
        "valueField": "value",
        "labelRadius": 5,
        "radius": "42%",
        "innerRadius": "60%",
        "labelText": "[[title]]"
    });
});
$(document).on('page.shown', '.page[data-name="3d-donut-chart"]', function (event, target) {
    var data = $('#dat-3d-donut').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chart-3d-donut", {
        "type": "pie",
        "titles": [{
            "text": "Visitors countries",
            "size": 16
        }],
        "dataProvider": chartData,
        "valueField": "visits",
        "titleField": "country",
        "startEffect": "elastic",
        "startDuration": 2,
        "labelRadius": 15,
        "innerRadius": "50%",
        "depth3D": 10,
        "balloonText": "[[title]]<br><span style='font-size:14px'><b>[[value]]</b> ([[percents]]%)</span>",
        "angle": 15
    });
});
$(document).on('page.shown', '.page[data-name="donut-with-radial-gradient"]', function (event, target) {
    var data = $('#dat-donut-radial').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chart-donut-radial", {
        "type": "pie",
        "innerRadius": "40%",
        "gradientRatio": [-0.4, -0.4, -0.4, -0.4, -0.4, -0.4, 0, 0.1, 0.2, 0.1, 0, -0.2, -0.5],
        "dataProvider": chartData,
        "balloonText": "[[value]]",
        "valueField": "litres",
        "titleField": "country",
        "balloon": {
            "drop": true,
            "adjustBorderColor": false,
            "color": "#FFFFFF",
            "fontSize": 16
        }
    });
});
$(document).on('page.shown', '.page[data-name="pyramid-chart"]', function (event, target) {
    var data = $('#dat-pyramid-chart').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chart-pyramid-chart", {
        "type": "funnel",
        "dataProvider": chartData,
        "balloon": {
            "fixedPosition": true
        },
        "valueField": "value",
        "titleField": "title",
        "marginRight": 240,
        "marginLeft": 50,
        "startX": -500,
        "rotate": true,
        "labelPosition": "right",
        "balloonText": "[[title]]: [[value]]n[[description]]"
    });

});
$(document).on('page.shown', '.page[data-name="funnel-chart"]', function (event, target) {
    var data = $('#dat-funnel-chart').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chart-funnel-chart", {
        "type": "funnel",
        "dataProvider": chartData,
        "titleField": "title",
        "marginRight": 160,
        "marginLeft": 15,
        "labelPosition": "right",
        "funnelAlpha": 0.9,
        "valueField": "value",
        "startX": 0,
        "neckWidth": "40%",
        "startAlpha": 0,
        "outlineThickness": 1,
        "neckHeight": "30%",
        "balloonText": "[[title]]:<b>[[value]]</b>"
    });
});
$(document).on('page.shown', '.page[data-name="3d-funnel-chart"]', function (event, target) {
    var data = $('#dat-3d-funnel-chart').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chart-3d-funnel-chart", {
        "type": "funnel",
        "dataProvider": chartData,
        "balloon": {
            "fixedPosition": true
        },
        "valueField": "value",
        "titleField": "title",
        "marginRight": 240,
        "marginLeft": 50,
        "startX": -500,
        "depth3D": 100,
        "angle": 40,
        "outlineAlpha": 1,
        "outlineColor": "#FFFFFF",
        "outlineThickness": 2,
        "labelPosition": "right",
        "balloonText": "[[title]]: [[value]]n[[description]]"
    });
});
function getCurrentData() {
    var data = dataTimePie[currentYear];
    currentYear++;
    if (currentYear > 2014)
        currentYear = 1995;
    return data;
}

// Gauges & Radar 
$(document).on('page.shown', '.page[data-name="angular-gauge"]', function (event, target) {
    var data = $('#dat-angular-gauge').text();
    var chartData = JSON.parse(data);
    var gaugeChart = AmCharts.makeChart("chart-angular-gauge", {
        "type": "gauge",
        "axes": [{
            "axisThickness": 1,
            "axisAlpha": 0.2,
            "tickAlpha": 0.2,
            "valueInterval": 20,
            "bands": chartData,
            "bottomText": "0 km/h",
            "bottomTextYOffset": -20,
            "endValue": 220
        }],
        "arrows": [{}],
        "export": {
            "enabled": true
        }
    });

    setInterval(randomValue, 2000);

    // set random value
    function randomValue() {
        var value = Math.round(Math.random() * 200);
        if (gaugeChart) {
            if (gaugeChart.arrows) {
                if (gaugeChart.arrows[0]) {
                    if (gaugeChart.arrows[0].setValue) {
                        gaugeChart.arrows[0].setValue(value);
                        gaugeChart.axes[0].setBottomText(value + " km/h");
                    }
                }
            }
        }
    }
});
$(document).on('page.shown', '.page[data-name="animated-gauge"]', function (event, target) {
    var data = $('#dat-animated-gauge').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chart-animated-gauge", {
        "type": "gauge",
        "axes": [{
            "topTextFontSize": 20,
            "topTextYOffset": 70,
            "axisColor": "#31d6ea",
            "axisThickness": 1,
            "endValue": 100,
            "gridInside": true,
            "inside": true,
            "radius": "50%",
            "valueInterval": 10,
            "tickColor": "#67b7dc",
            "startAngle": -90,
            "endAngle": 90,
            "unit": "%",
            "bandOutlineAlpha": 0,
            "bands": chartData
        }],
        "arrows": [{
            "alpha": 1,
            "innerRadius": "35%",
            "nailRadius": 0,
            "radius": "170%"
        }]
    });

    setInterval(randomValue, 2000);

    // set random value
    function randomValue() {
        var value = Math.round(Math.random() * 100);
        chart.arrows[0].setValue(value);
        chart.axes[0].setTopText(value + " %");
        // adjust darker band to new value
        chart.axes[0].bands[1].setEndValue(value);
    }
});
$(document).on('page.shown', '.page[data-name="angular-gauge-with-two-axes"]', function (event, target) {
    var data = $('#dat-gauge-two-axes').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chart-gauge-two-axes", {
        "type": "gauge",
        "axes": chartData,
        "arrows": [{
            "color": "#67b7dc",
            "innerRadius": "20%",
            "nailRadius": 0,
            "radius": "85%"
        }]
    });

    setInterval(randomValue, 2000);

    // set random value
    function randomValue() {
        var value = Math.round(Math.random() * 240);
        chart.arrows[0].setValue(value);
    }
});
$(document).on('page.shown', '.page[data-name="radar-chart"]', function (event, target) {
    var data = $('#dat-radar-chart').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chart-radar-chart", {
        "type": "radar",
        "dataProvider": chartData,
        "valueAxes": [{
            "axisTitleOffset": 20,
            "minimum": 0,
            "axisAlpha": 0.15
        }],
        "startDuration": 2,
        "graphs": [{
            "balloonText": "[[value]] litres of beer per year",
            "bullet": "round",
            "lineThickness": 2,
            "valueField": "litres"
        }],
        "categoryField": "country"
    });
});
$(document).on('page.shown', '.page[data-name="polar-chart"]', function (event, target) {
    var data = $('#dat-polar-chart').text();
    var chartData = JSON.parse(data);
    var chart = AmCharts.makeChart("chart-polar-chart", {
        "type": "radar",
        "dataProvider": chartData,
        "valueAxes": [{
            "gridType": "circles",
            "minimum": 0,
            "autoGridCount": false,
            "axisAlpha": 0.2,
            "fillAlpha": 0.05,
            "fillColor": "#FFFFFF",
            "gridAlpha": 0.08,
            "guides": [{
                "angle": 225,
                "fillAlpha": 0.3,
                "fillColor": "#0066CC",
                "tickLength": 0,
                "toAngle": 315,
                "toValue": 14,
                "value": 0,
                "lineAlpha": 0

            }, {
                "angle": 45,
                "fillAlpha": 0.3,
                "fillColor": "#CC3333",
                "tickLength": 0,
                "toAngle": 135,
                "toValue": 14,
                "value": 0,
                "lineAlpha": 0
            }],
            "position": "left"
        }],
        "startDuration": 1,
        "graphs": [{
            "balloonText": "[[category]]: [[value]] m/s",
            "bullet": "round",
            "fillAlphas": 0.3,
            "valueField": "value"
        }],
        "categoryField": "direction"
    });
});
$(document).on('page.shown', '.page[data-name="polar-scatter"]', function (event, target) {
    var dataS1 = $('#dat-polar-scatter-s1').text();
    var dataS2 = $('#dat-polar-scatter-s2').text();
    var dataS3 = $('#dat-polar-scatter-s3').text();
    var chartDataS1 = JSON.parse(dataS1);
    var chartDataS2 = JSON.parse(dataS2);
    var chartDataS3 = JSON.parse(dataS3);
    var chart = AmCharts.makeChart("chart-polar-scatter", {
        "type": "radar",
        "dataProvider": [],
        "valueAxes": [{
            "gridType": "circles",
            "minimum": 0
        }],
        "startDuration": 1,
        "polarScatter": {
            "minimum": 0,
            "maximum": 359,
            "step": 1
        },
        "legend": {
            "position": "bottom"
        },
        "graphs": [{
            "title": "Trial #1",
            "balloonText": "[[category]]: [[value]] m/s",
            "bullet": "round",
            "lineAlpha": 0,
            "series": chartDataS1
        }, {
            "title": "Trial #2",
            "balloonText": "[[category]]: [[value]] m/s",
            "bullet": "round",
            "lineAlpha": 0,
            "series": chartDataS2
        }, {
            "title": "Trial #3",
            "balloonText": "[[category]]: [[value]] m/s",
            "bullet": "round",
            "lineAlpha": 0,
            "series": chartDataS3
        }]
    });
});
*/

function doUploadFile(inputId) {
    var uploadInput = document.getElementById(inputId);
    var postUrl = Be.config.url + '/' + Be.config.handlerPostName + '.ashx';
    postUrl = Be.util.appendString(postUrl);

    //console.log(uploadInput.files); // File listing!
    //console.log('--------------------');
    for (var i = 0, fileCount = uploadInput.files.length; i < fileCount; i++) {
        //console.log(uploadInput.files[i]);
        Be.util.upload(uploadInput.files[i], inputId, postUrl);
    }
}
function doUploadPhoto(inputId) {
    var uploadInput = document.getElementById(inputId);
    var postUrl = Be.config.url + '/' + Be.config.handlerPostName + '.ashx';
    postUrl = Be.util.appendString(postUrl);
    var quality = 0.8, zoomRate = 2, ignoreSize = 1024 * 512; //设置压缩大于512KB的文件

    for (var i = 0, fileCount = uploadInput.files.length; i < fileCount; i++) {
        console.log(uploadInput.files[i]);
        Be.util.compressImage(uploadInput.files[i], quality, zoomRate, ignoreSize, function (file) {
            //console.log(file);
            Be.util.upload(file, inputId, postUrl);
            uploadInput.value = ''; //加不加都行，解决无法上传重复图片的问题。
        });
    }
}
function doEncrypt() {
    var clear = Be.dom.$('#clear'), cipher = Be.dom.$('#cipher');
    // Encrypt
    var ciphertext = Be.util.crypto.encrypt(clear.value);
    cipher.value = ciphertext;
}
function doDecrypt() {
    var clear = Be.dom.$('#clear1'), cipher = Be.dom.$('#cipher');
    // Encrypt
    var plaintext = Be.util.crypto.decrypt(cipher.value);
    clear.value = plaintext;
}
function doMD5() {
    var clear = Be.dom.$('#txtOrg'), cipher = Be.dom.$('#txtEncypt');
    // Encrypt
    var ciphertext = Be.util.md5(clear.value);
    cipher.value = ciphertext;
}

function doCheckWifi(ssid) {
   Be.native.postMessage("check-wifi", function (responseAsJSON) {
            Be.app.alert('check:' + responseAsJSON.result);
        }.toString(), { "ssid": ssid });
    }
function doConnectWifi(ssid, password) {
        Be.native.postMessage("connect-wifi", function (responseAsJSON) {
            Be.app.alert('connect:' + responseAsJSON.result);
        }.toString(), { "ssid": ssid, "password": password });
}

//init home page
Be.config.color = 'red';
Be.app.init();
if (Be.config.type === 'web') Be.util.loadScript(Be.config.url + '/Assets/js/amcharts.min.js');