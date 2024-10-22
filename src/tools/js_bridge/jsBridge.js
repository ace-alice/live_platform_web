(function () {
    function JSBridge () {
      // 方法集合
      var _handlers = {};
      // 回调集合
      var _callbacks = {};
      var _promises = {};
      // 方法标识ID
      var _id = 0;
      // debug模式
      var _debug = false;
      // 支持的渠道
      var _channel = ["flutter"];
  
      var _isFlutterInAppWebView = false;
  
      // 打印日志
      function _log () {
        if (_debug) {
          var args = Array.prototype.slice.call(arguments);
          console.log.apply(null, args);
        }
      }
  
      // 是否支持Iframe渠道
      function _isIframeChannel () {
        return _isFlutterInAppWebView && _channel.indexOf("iframe") > -1;
      }
  
      // 是否支持flutter渠道
      function _isFlutterChannel () {
        return _isFlutterInAppWebView && _channel.indexOf("flutter") > -1;
      }
  
      // 是否支持reactnative渠道
      function _isReactNativeChannel () {
        return _channel.indexOf("reactnative") > -1;
      }
  
      // 初始化
      function _init (config) {
        console.log("jsbridge初始化成功");
        if (config) {
          if (config.debug) {
            _debug = !!config.debug;
          }
          if (config.isFlutterInAppWebView) {
            _isFlutterInAppWebView = config.isFlutterInAppWebView;
          }
          if (
            config.channel &&
            Object.prototype.toString.apply(config.channel) ===
            "[object Array]"
          ) {
            _channel = config.channel;
            if (_isIframeChannel()) {
              window.addEventListener("message", (event) => {
                // eslint-disable-next-line no-eval
                window.eval(event.data);
              });
            }
          }
          if (_isFlutterInAppWebView) {
            window.addEventListener(
              "flutterInAppWebViewPlatformReady",
              (event) => {
                // eslint-disable-next-line no-eval
                window.eval(event.data);
              }
            );
          }
        }
  
        _registerHandler(
          "#evalJavaScript#",
          function (data, success, fail) {
            try {
              success(
                // eslint-disable-next-line no-new-func
                Function(
                  '"use strict";return (' + data.toString() + ")"
                )()
              );
            } catch (error) {
              _log(error);
              fail(error.toSring());
            }
          }
        );
        _callHandler("#jsbridgeReady#", {
          data: true,
          success: function (data) {
            _log("[#jsbridgeReady#] success response: " + data);
          },
          fail: function (err) {
            _log("[#jsbridgeReady#] fail response: " + err);
          },
        });
      }
  
      // 注册方法
      function _registerHandler (handlerName, handler) {
        _handlers[handlerName] = handler;
      }
  
      // 注销方法
      function _unregisterHandler (handlerName) {
        if (!_handlers[handlerName]) {
          return;
        }
        delete _handlers[handlerName];
      }
  
      // 调用方法
      // const {data, success, fail} = payload
      function _callHandler (handlerName, payload) {
        return _receiverCall(handlerName, payload);
      }
  
      // 监听jsbridge消息
      function _onMessageReceived (messageString) {
        var decodeString = decodeURIComponent(messageString);
        var jsonData = JSON.parse(decodeString);
        _log("[WebViewJSBridge receiveMessage]: ", jsonData);
        var message = jsonData;
  
        if (message.type === "request") {
          _senderCall(message);
        }
        if (message.type === "response") {
          _receiverCallResponse(message);
        }
      }
  
      // 发送jsbridge消息
      function _postMessage (jsonData) {
        _log("[WebViewJSBridge postMessage]: ", jsonData);
        var jsonString = JSON.stringify(jsonData);
        var encodeString = encodeURIComponent(jsonString);
        // if (_isIframeChannel()) {
        //     if (self != top) {
        //         // iframe load current page
        //         window.parent.postMessage(encodeString, "*");
        //     }
        // }
        if (_isFlutterChannel()) {
          window.FlutterWebView &&
            window.FlutterWebView.postMessage(encodeString);
        }
        if (_isReactNativeChannel()) {
          window.ReactNativeWebView &&
            window.ReactNativeWebView.postMessage(encodeString);
        }
        if (_isFlutterInAppWebView) {
          if (window.flutter_inappwebview) {
            if (window.flutter_inappwebview.callHandler) {
              window.flutter_inappwebview.callHandler(
                "FlutterWebView",
                encodeString
              );
            } else if (window.flutter_inappwebview._callHandler) {
              window.flutter_inappwebview._callHandler('FlutterWebView', setTimeout(function () { }), JSON.stringify([encodeString]));
            } else {
              console.log('window.flutter_inappwebview.callHandler 未注册')
            }
          }
        }
      }
  
      // 接收者调用方法
      function _receiverCall (handlerName, payload) {
        if (!handlerName) {
          throw Error("WebViewJSBridge: handler name can not be null!!!");
        }
  
        var message = {
          id: _id++,
          type: "request",
          resolved: false,
          rejected: false,
        };
        message.action = handlerName;
        if (payload) {
          if (payload.data) {
            message.data = payload.data;
          }
  
          if (payload.success) {
            if (!_callbacks[message.id]) {
              _callbacks[message.id] = {};
            }
            _callbacks[message.id].success = payload.success;
          }
          if (payload.fail) {
            if (!_callbacks[message.id]) {
              _callbacks[message.id] = {};
            }
            _callbacks[message.id].fail = payload.fail;
          }
        }
  
        _postMessage(message);
  
        if (!_callbacks[message.id]) {
          // 没有callback时，尝试使用Promise
          if (
            /native code/.test(Promise.toString()) &&
            typeof Promise !== "undefined"
          ) {
            return new Promise(
              (resolve, reject) =>
                (_promises[message.id] = { resolve, reject })
            );
          }
        }
      }
  
      // 接收者调用方法的回调
      function _receiverCallResponse (message) {
        var id = message.id;
        var data = message.data;
        var isResolved = message.resolved;
        var isRejected = message.rejected;
  
        if (_callbacks[id]) {
          if (isResolved) {
            _callbacks[id].success && _callbacks[id].success(data);
          }
          if (isRejected) {
            _callbacks[id].fail && _callbacks[id].fail(data);
          }
          delete _callbacks[id];
        }
        if (_promises[id]) {
          if (isResolved) {
            _promises[id].resolve(data);
          }
          if (isRejected) {
            _promises[id].reject(data);
          }
          delete _promises[id];
        }
      }
  
      // 发送者调用方法
      function _senderCall (message) {
        // 成功的回调
        function _successResponse (data) {
          message = {
            action: message.action,
            data: data,
            id: message.id,
            type: "response",
            resolved: true,
            rejected: false,
          };
          _senderCallResponse(message);
        }
  
        // 失败的回调
        function _failResponse (err) {
          message = {
            action: message.action,
            data: err,
            id: message.id,
            type: "response",
            resolved: false,
            rejected: true,
          };
          _senderCallResponse(message);
        }
  
        var handlerName = message.action;
        if (handlerName in _handlers) {
          var handler = _handlers[handlerName];
          var promise = handler(
            message.data,
            function (data) {
              _successResponse(data);
            },
            function (err) {
              _failResponse(err);
            }
          );
          if (
            Object.prototype.toString.call(promise) ===
            "[object Promise]"
          ) {
            promise
              .then(function (data) {
                _successResponse(data);
              })
              .catch(function (err) {
                _failResponse(err.toString());
              });
          }
        } else {
          _failResponse(`handler name -> ${handlerName} can't find!!!`);
        }
      }
  
      // 发送者调用方法的回调
      function _senderCallResponse (message) {
        _postMessage(message);
      }
  
      return {
        init: _init,
        registerHandler: _registerHandler,
        unregisterHandler: _unregisterHandler,
        callHandler: _callHandler,
        onMessageReceived: function (messageString) {
          console.log("接收到消息" + messageString);
          setTimeout(function () {
            _onMessageReceived(messageString);
          }, 0);
        },
      };
    }
  
    if (window.WebViewJSBridge) {
      return;
    }
    window.WebViewJSBridge = new JSBridge();
  
    setTimeout(() => {
      var doc = document;
      var readyEvent = doc.createEvent("Event");
      var jobs = window.WVJBCallbacks || [];
      readyEvent.initEvent("WebViewJSBridgeReady", true, false);
      readyEvent.bridge = window.WebViewJSBridge;
      delete window.WVJBCallbacks;
      for (var i = 0; i < jobs.length; i++) {
        var job = jobs[i];
        job(window.WebViewJSBridge);
      }
      doc.dispatchEvent(readyEvent);
    }, 0);
  })();
  