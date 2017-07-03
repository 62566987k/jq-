var cookies = {
    /***************************************************************************
    * * 功能： 写入cookie操作 * 参数： name cookie名称 * value cookie值 * expires 过期时间 *
    * path 路径 * domain 域
    **************************************************************************/
    set: function (name, value, expires, path, domain) {
        expires = new Date(new Date().getTime() + (((typeof expires == "undefined") ? 12 * 7200 : expires)) * 1000);
        var tempcookie = name + "=" + value +
            ((expires) ? "; expires=" + expires.toGMTString() : "") +
            ((path) ? "; path=" + path : "; path=/") +
            ((domain) ? "; domain=" + domain : "");
        (tempcookie.length < 4096) ? document.cookie = tempcookie : alert("The cookie is bigger than cookie lagrest");
    },

    /***************************************************************************
    * * 功能： 获取cookie操作 * 参数： name cookie名称
    **************************************************************************/
    get: function (name) {
        var xarr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
        if (xarr != null)
            return decodeURIComponent(xarr[2]);
        return "";
    },

    /***************************************************************************
    * * 功能： 删除cookie操作 * 参数： name cookie名称 * path 路径 * domain 域
    **************************************************************************/
    del: function (name, path, domain) {
        if (this.get(name))
            document.cookie = name + "=" +
            ((path) ? "; path=" + path : "; path=/") +
            ((domain) ? "; domain=" + domain : "") +
            ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
    },

    /***************************************************************************
    * * 功能： 删除当前所有的cookie操作
    **************************************************************************/
    remove: function (path, domain) {
        var keys = document.cookie.match(/[^ =;]+(?=\=)/g);
        if (keys) {
            for (var i = keys.length; i--; )
            // document.cookie = keys[i] + '=;expires=;expires=Thu, 01-Jan-1970
            // 00:00:01 GMT';
                document.cookie = keys[i] + "=" +
            ((path) ? "; path=" + path : "; path=/") +
            ((domain) ? "; domain=" + domain : "") +
            ";expires=Thu, 01-Jan-1970 00:00:01 GMT";
        }
    },

    day: function (xd) {
        return xd * 24 * 3600;
    },
    hour: function (xh) {
        return xh * 3600;
    }
}
/*******************************************************************************
* * 功能： 格式化时间字符串，支持多种时间格式化类型 * 参数： format 日期对象 * 示例： new
* Date().format("yyyy年MM月dd日 hh:mm:ss");
******************************************************************************/
Date.prototype.format = function (format) {
    var o = {
        "M+": this.getMonth() + 1, // month
        "d+": this.getDate(), // day
        "h+": this.getHours(), // hour
        "m+": this.getMinutes(), // minute
        "s+": this.getSeconds(), // second
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter
        "S": this.getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
}
/*******************************************************************************
* * 功能： 格式化时间字符串，支持多种时间格式化类型 * 参数： format 日期对象 * 示例：
* "2016/2/3".format("yyyy年MM月dd日 hh:mm:ss");
******************************************************************************/
String.prototype.formatDate = function (format) {
    if (validator.isDate(this) || validator.isDateTime(this)) {
        var date = new Date(this.toString().replace(/\-+/g, '/'));
        return date.format(format);
    } else {
        try {
            var date = new Date(this);
            return date.format(format);
        } catch (e) {
            return "-";
        }

    }
}
/** 接受毫秒转日期* */
Number.prototype.formatDate = function (format) {
    try {
        var date = new Date(+this.toString());
        return date.format(format);
    } catch (e) {
        return "-";
    };
}

/*******************************************************************************
* * 功能： 金额格式化方法, * 参数： s输入金额, n为保留几位小数 * 示例： "201643432".formatMoney(2);
******************************************************************************/
String.prototype.formatMoney = function (n) {
    if (isNaN(this)) return "";
    var _n = n;
    n = n > 0 && n <= 20 ? n : 2;
    var s = parseFloat((this + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
    var l = s.split('.')[0].split('').reverse(), r = s.split('.')[1];
    t = '';
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
    }
    return _n == 0 ? t.split('').reverse().join('').replace(/^-,/g, '-') : t.split('').reverse().join('').replace(/^-,/g, '-') + '.' + r;
}

var pendingReqs = {};
$.ajaxPrefilter(function (options, originalOptions, xhr) {
    var hash = 17;
    var strictKey = options.strictKey || JSON.stringify(options.data || '');
  
    if (strictKey.length > 2) {
        for (i = 0; i < strictKey.length; i++) {
            char = strictKey.charCodeAt(i);
            hash = char + (hash << 6) + (hash << 16) - hash;
        }
    }
    
    var key = options.url + hash.toString();
    if ((options.url.indexOf('/contract') > -1) && pendingReqs[key]) {
        pendingReqs[key].abort();
        pendingReqs[key] = null;
    }
    if (!pendingReqs[key]) {
        pendingReqs[key] = xhr;
        xhr.pendingRequestKey = key;
        xhr.requestUrl = options.url;
        xhr.requestData = options.data;
    } else {
        xhr.abort(), $.isFunction(options.abortcb) && options.abortcb();
    }

    var complete = options.complete;
    options.complete = function (xhr, textStatus) {
        pendingReqs[xhr.pendingRequestKey] = null;
        if ($.isFunction(complete)) {
            complete.apply(this, arguments);
        }
    };
});

/*******************************************************************************
* * 功能：URL相关操作
******************************************************************************/
var utils = {
    // 字符串转千分位数字
    stringtoThousands: function (str) {
        var num = parseInt(str);
        if (num && (num != "NaN")) {
            return (num.toFixed(2) + '').replace(/\d{1,3}(?=(\d{3})+(\.\d*)?$)/g, '$&,');
        }
        return "";
    },
    // 字符串转日期（2016-09-09-->Date）
    stringtoDate: function (str) {
        if (str) {
            return str.split("-").join('');
        }
        return "";
    },
    // 查询url参数值
    getParameter: function (t) {
        var e = new RegExp("[&,?]" + t + "=([^\\&]*)", "i"),
            i = e.exec(location.search);
        return i ? i[1] : ""
    },
    changeParameter: function (url, arg, arg_val) {
        var pattern = arg + "=([^&]*)",
            replaceText = arg + "=" + arg_val;
        if (url.match(pattern)) {
            var tmp = "/(" + arg + "=)([^&]*)/gi";
            return tmp = url.replace(eval(tmp), replaceText)
        }
        return url.match("[?]") ? url + "&" + replaceText : url + "?" + replaceText
    },
    getQueryString: function (t, e) {
        var i = new RegExp("[&,?]" + t + "=([^\\&]*)", "i"),
            n = i.exec(e || location.href);
        return n ? n[1] : ""
    },
    getQueryMap: function (t) {
        var e, i, n = {},
            r = /[\?\&][^\?\&]+=[^\?\&#]+/g,
            o = /[\?\&]([^=\?]+)=([^\?\&#]+)/;
        if (t = t || location.href, e = t.match(r), !e) return n;
        for (var s = 0,
                a = e.length; a > s; s++) i = e[s].match(o),
            null !== i && (n[i[1]] = i[2]);
        return n
    },
    // 把url参数转换成json对象
    parseQueryString: function (url) {
        var reg_url = /^[^\?]+\?([\w\W]+)$/,
        reg_para = /([^&=]+)=([\w\W]*?)(&|$|#)/g,
        arr_url = reg_url.exec(url), ret = {};
        if (arr_url) {
            if (arr_url && arr_url[1]) {
                var str_para = arr_url[1], result;
                while ((result = reg_para.exec(str_para)) != null) {
                    ret[result[1]] = result[2];
                }
            }
        }
        else if (url) {
            var str_para = url, result;
            while ((result = reg_para.exec(str_para)) != null) {
                ret[result[1]] = result[2];
            }
        }
        return ret;

    },
    urlEncode: function (param, key) {
        var paramStr = "";
        if (param instanceof String || param instanceof Number || param instanceof Boolean) {
            paramStr += "&" + key + "=" + encodeURIComponent(param);
        } else {
            $.each(param, function (i) {
                var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
                paramStr += '&' + utils.urlEncode(this, k);
            });
        }
        return paramStr.substr(1);
    },
    getHost: function () {
        var curWwwPath = window.document.location.href;

        // 获取主机地址之后的目录如：/Tmall/index.jsp
        var pathName = window.document.location.pathname;
        var pos = curWwwPath.indexOf(pathName);

        // 获取主机地址，如： http://localhost:8080
        var hostPath = curWwwPath.substring(0, pos);
        return hostPath;
    }
}
String.prototype.transferBR = function () {
    var string = this;
    try {
        string = string.replace(/\r\n/g, "<br>")
        string = string.replace(/\n/g, "<br>");
    } catch (e) {
    }
    return string;
}

/*******************************************************************************
* * 功能： 替换成HTML换行符<br>
******************************************************************************/
String.prototype.transferBR = function () {
    var string = this;
    try {
        string = string.replace(/\r\n/g, "<br>")
        string = string.replace(/\n/g, "<br>");
    } catch (e) {
    }
    return string;
}

/*******************************************************************************
* 
* /******************************************************************************* *
* 功能： 处理数字精度问题
******************************************************************************/
Number.prototype.toFixed = function (scale) {
    var s = this + "";
    if (!scale) scale = 0;
    if (s.indexOf(".") == -1) s += ".";
    s += new Array(scale + 1).join("0");
    if (new RegExp("^(-|\\+)?(\\d+(\\.\\d{0," + (scale + 1) + "})?)\\d*$").test(s)) {
        var s = "0" + RegExp.$2, pm = RegExp.$1, a = RegExp.$3.length, b = true;
        if (a == scale + 2) {
            a = s.match(/\d/g);
            if (parseInt(a[a.length - 1]) > 4) {
                for (var i = a.length - 2; i >= 0; i--) {
                    a[i] = parseInt(a[i]) + 1;
                    if (a[i] == 10) {
                        a[i] = 0;
                        b = i != 1;
                    }
                    else
                        break;
                }
            }
            s = a.join("").replace(new RegExp("(\\d+)(\\d{" + scale + "})\\d$"), "$1.$2");
        }
        if (b) s = s.substr(1);
        return (pm + s).replace(/\.$/, "");
    }
    return this + "";
}
/****************************************eval("("+test+")"); ***************************************
* * 功能：去掉字符左右空格
******************************************************************************/
String.prototype.trim = function () {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}
