/**
 * @fileoverview Resources handler.
 *
 * @license Copyright 2017 The Coding with Chrome Authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * @author mbordihn@google.com (Markus Bordihn)
 */
goog.provide('cwc.utils.Resources');

goog.require('goog.net.XhrIo');


/**
 * @param {!string} uri
 * @return {Promise}
 */
cwc.utils.Resources.getUriAsText = function(uri) {
  return new Promise(function(resolve, reject) {
  	let xhr = new goog.net.XhrIo();
  	goog.events.listen(xhr, goog.net.EventType.SUCCESS, function(e) {
  	  let xhrResponse = /** @type {!goog.net.XhrIo} */ (e.target);
	  resolve(xhrResponse.getResponseText() || '');
    });
    goog.events.listen(xhr, goog.net.EventType.ERROR, function(e) {
      reject(new Error(
      	  'Unable to open uri ' + uri + ':' + e.target.getLastError()));
    });
    goog.events.listen(xhr, goog.net.EventType.TIMEOUT, function(e) {
      reject(new Error('Timeout for uri ' + uri));
    });
    xhr.send(uri);
  });
};


/**
 * @param {!string} uri
 * @return {Promise}
 */
cwc.utils.Resources.getUriAsBlob = function(uri) {
  return new Promise(function(resolve, reject) {
  	let xhr = new goog.net.XhrIo();
  	xhr.setResponseType(goog.net.XhrIo.ResponseType.BLOB);
  	goog.events.listen(xhr, goog.net.EventType.SUCCESS, function(e) {
  	  let xhrResponse = /** @type {!goog.net.XhrIo} */ (e.target);
	  resolve(xhrResponse.getResponse());
    });
    goog.events.listen(xhr, goog.net.EventType.ERROR, function(e) {
      reject(new Error(
      	  'Unable to open uri ' + uri + ':' + e.target.getLastError()));
    });
    goog.events.listen(xhr, goog.net.EventType.TIMEOUT, function(e) {
      reject(new Error('Timeout for uri ' + uri));
    });
    xhr.send(uri);
  });
};


/**
 * @param {!string} uri
 * @return {Promise}
 */
cwc.utils.Resources.getUriAsBase64 = function(uri) {
  return new Promise(function(resolve, reject) {
  	let xhr = new goog.net.XhrIo();
  	xhr.setResponseType(goog.net.XhrIo.ResponseType.BLOB);
  	goog.events.listen(xhr, goog.net.EventType.SUCCESS, function(e) {
  	  let xhrResponse = /** @type {!goog.net.XhrIo} */ (e.target);
  	  let contentReader = new FileReader();
      contentReader.onload = e => {
      	resolve(e.target.result);
      }
      contentReader.readAsDataURL(xhrResponse.getResponse());
    });
    goog.events.listen(xhr, goog.net.EventType.ERROR, function(e) {
      reject(new Error(
      	  'Unable to open uri ' + uri + ':' + e.target.getLastError()));
    });
    goog.events.listen(xhr, goog.net.EventType.TIMEOUT, function(e) {
      reject(new Error('Timeout for uri ' + uri));
    });
    xhr.send(uri);
  });
};