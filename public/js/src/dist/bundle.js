/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./components/analytics.js":
/*!*********************************!*\
  !*** ./components/analytics.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AnalyticsComponent\": () => (/* binding */ AnalyticsComponent)\n/* harmony export */ });\n/* harmony import */ var _components_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/table */ \"./components/table.js\");\n/* harmony import */ var _utils_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/http */ \"./utils/http.js\");\n\r\n\r\n\r\nclass AnalyticsComponent {\r\n    constructor(data) {\r\n        this.data = data; \r\n        this.container = document.getElementsByClassName('table-body')[0];\r\n    }\r\n\r\n    init() {\r\n        this.loadData();\r\n    }\r\n\r\n    loadData() {\r\n        (0,_utils_http__WEBPACK_IMPORTED_MODULE_1__.HTTPGetRequest)('https://paste.isak-tech.tk/analytics/load/load_all')\r\n        .then(res => res.success ? this.render(res.data) : \r\n        console.log(res.message));\r\n    }\r\n\r\n    render(data) {\r\n        data.forEach(row => {\r\n            let div = document.createElement('div');\r\n            div.className = 'table-row';\r\n            div.innerHTML = `\r\n                <span class=\"id\">${row.id}</span>\r\n                <span class=\"href\">${row.href}</span>\r\n                <span class=\"created\">${row.created}</span>\r\n                <span class=\"ip\">${row.ip}</span>\r\n            `\r\n            this.container.appendChild(div);\r\n        })\r\n\r\n        new _components_table__WEBPACK_IMPORTED_MODULE_0__.TableComponent().init();\r\n    }\r\n}\n\n//# sourceURL=webpack://src/./components/analytics.js?");

/***/ }),

/***/ "./components/api.js":
/*!***************************!*\
  !*** ./components/api.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"APIComponent\": () => (/* binding */ APIComponent)\n/* harmony export */ });\n/* harmony import */ var _utils_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/http */ \"./utils/http.js\");\n\r\n\r\nclass APIComponent {\r\n    constructor() {\r\n        this.apiContainer = document.getElementById('api-container');\r\n        this.APIRoutes = \r\n        [\r\n            { path: \"/api/posts\",                 method:\"GET\",    data: null },\r\n            { path: \"/api/post/:id\",              method:\"GET\",    data: null },\r\n            { path: \"/api/paginate/:page/:limit\", method: \"GET\",   data: null },\r\n            { path: \"/api/delete\",                method:\"DELETE\", data: { id: \"uint64\" }},\r\n            { path: \"/api/new\",                   method: \"POST\",  data: { title: \"string\", body: \"string\", tags: \"[]string\" }},\r\n            { path: \"/api/update\",                method: \"PUT\",   data: { id: \"uint64\", title: \"string\", body: \"string\", tags: \"[]string\" }}\r\n        ];\r\n    }\r\n\r\n    init() {\r\n        this.render();\r\n    }\r\n\r\n    render() {\r\n        this.APIRoutes.forEach(el => {\r\n            let div = document.createElement('div');\r\n            div.classList.add('api-route');\r\n            div.innerHTML = `\r\n                <div>\r\n                    <span>${el.path}</span>\r\n                    <span>${el.method}</span>\r\n                </div>\r\n                <pre>${el.data != undefined ? JSON.stringify(el.data, null, 2) : 'No data required'}</pre>\r\n            `\r\n    \r\n            this.apiContainer.appendChild(div);\r\n        });\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://src/./components/api.js?");

/***/ }),

/***/ "./components/processes.js":
/*!*********************************!*\
  !*** ./components/processes.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ProcessesComponent\": () => (/* binding */ ProcessesComponent)\n/* harmony export */ });\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ \"./utils/utils.js\");\n/* harmony import */ var _utils_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/http */ \"./utils/http.js\");\n/* harmony import */ var _utils_submit__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/submit */ \"./utils/submit.js\");\n\r\n\r\n\r\n\r\nclass ProcessesComponent  {\r\n\r\n    constructor() {\r\n        this.processes = document.getElementById('processes');\r\n        this.placeholders = document.getElementsByClassName('placeholder');\r\n        this.adminLevel = document.getElementById('admin_level').value;\r\n    }\r\n\r\n    init() {\r\n        this.loadData();\r\n\r\n        try {\r\n            document.getElementsByClassName('btn-primary')[0]\r\n            .addEventListener('click', () => (0,_utils_submit__WEBPACK_IMPORTED_MODULE_2__.startProcess)());\r\n        } catch(err) {\r\n            console.log('Administration level too low');\r\n        }\r\n    }\r\n\r\n    hookTerminateBtn() {\r\n        let buttons = document.getElementsByClassName('terminate')\r\n            \r\n        for(let i = 0; i < buttons.length; i++) {\r\n            console.log(buttons[i])\r\n            buttons[i].addEventListener('click', () => (0,_utils_submit__WEBPACK_IMPORTED_MODULE_2__.stopProcess)(buttons[i]));\r\n        }\r\n    }\r\n\r\n    loadData() {\r\n        return (0,_utils_http__WEBPACK_IMPORTED_MODULE_1__.HTTPGetRequest)((0,_utils_http__WEBPACK_IMPORTED_MODULE_1__.getServerAddr)(false) + '/users/get-processes')\r\n        .then(response => response.success && response.data != null ?\r\n        response.data.map(p => this.render({ Service: p.Service, Config: p.Config })) : console.log('err'));\r\n    }\r\n    \r\n    render(process) {      \r\n        console.log(process);\r\n\r\n        let div = document.createElement('div');\r\n        div.classList.add('process');\r\n        div.id = 'p-' + process.Service.ProcessID;\r\n        div.innerHTML = `\r\n        <div class=\"process-body\">\r\n            <p><span>Process Label:</span><span>${process.Service.Label}</span></p>\r\n            <p><span>Process ID:</span><span>${process.Service.ProcessID}</span></p>\r\n            <p><span>Server Address:</span><span><a href=\"${process.Config.ServerAddr}\" target=\"_blank\">${process.Config.ServerAddr}</a></span></p>\r\n            <p><span>Domain:</span><span><a href=\"${process.Config.Domain}\" target=\"_blank\">${process.Config.Domain}</a></span></p>\r\n            <p><span>Started:</span><span>${(0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.timeSince)(new Date(process.Service.Started))}</span></p>\r\n        </div>\r\n    \r\n        <div class=\"process-footer\">\r\n            ${this.processFooter({ \r\n                adminLevel: parseInt(this.adminLevel), \r\n                pid: process.Service.ProcessID \r\n            })}\r\n        </div>`;\r\n    \r\n        this.processes.appendChild(div);\r\n        this.hookTerminateBtn();\r\n        return null\r\n    }\r\n\r\n    processFooter(config) {    \r\n        return config.adminLevel >= 3 ? `    \r\n        <a class=\"terminate\" href=\"javascript:void(0)\" data-pid=\"${config.pid}\">Terminate</a>\r\n        <a href=\"#\">Restart</a>` : '';\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://src/./components/processes.js?");

/***/ }),

/***/ "./components/table.js":
/*!*****************************!*\
  !*** ./components/table.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TableComponent\": () => (/* binding */ TableComponent)\n/* harmony export */ });\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ \"./utils/utils.js\");\n/* harmony import */ var _utils_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/http */ \"./utils/http.js\");\n\r\n\r\n\r\nclass TableComponent {\r\n\r\n    constructor() {\r\n        this.thead = document.getElementById('t-head');\r\n    }\r\n\r\n    fixDates() {\r\n        let dates = document.getElementsByClassName('created');\r\n        for(let i = 0; i < dates.length; i++) {\r\n            dates[i].textContent = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.timeSince)(new Date(dates[i].textContent)) + ' ago'\r\n        }\r\n    }\r\n\r\n    addEventListeners() {\r\n        this.thead.childNodes.forEach(i => {\r\n            i.addEventListener('mouseenter', (e) => {\r\n                let className = e.target.textContent.replace(/\\s/g, '').toLowerCase();\r\n                let elements = document.getElementsByClassName(className);\r\n                \r\n                for(let i = 0; i < elements.length; i++) {\r\n                    elements[i].classList.add('active');\r\n                }\r\n            });\r\n    \r\n            i.addEventListener('mouseleave', (e) => {\r\n                let className = e.target.textContent.replace(/\\s/g, '').toLowerCase();\r\n                let elements = document.getElementsByClassName(className);\r\n                \r\n                for(let i = 0; i < elements.length; i++) {\r\n                    elements[i].classList.remove('active');\r\n                }\r\n            });\r\n        });\r\n    }\r\n\r\n    init() {\r\n        this.addEventListeners();\r\n        this.fixDates();\r\n    }\r\n}\n\n//# sourceURL=webpack://src/./components/table.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _utils_submit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/submit */ \"./utils/submit.js\");\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils/utils */ \"./utils/utils.js\");\n/* harmony import */ var _components_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/table */ \"./components/table.js\");\n/* harmony import */ var _components_api__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/api */ \"./components/api.js\");\n/* harmony import */ var _components_analytics__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/analytics */ \"./components/analytics.js\");\n/* harmony import */ var _components_processes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/processes */ \"./components/processes.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n \r\n\r\nconst main = () => {\r\n    console.log('Application Started..')\r\n    ;(0,_utils_utils__WEBPACK_IMPORTED_MODULE_1__.activeLink)();\r\n    switch(window.location.pathname) {\r\n        case '/users/management': \r\n            return new _components_processes__WEBPACK_IMPORTED_MODULE_5__.ProcessesComponent().init();\r\n        \r\n        case '/site/paste/api': \r\n            return new _components_api__WEBPACK_IMPORTED_MODULE_3__.APIComponent().init();\r\n        \r\n        case '/site/main': \r\n            return new _components_table__WEBPACK_IMPORTED_MODULE_2__.TableComponent().init();\r\n        \r\n        case '/site/portal': \r\n            return new _components_table__WEBPACK_IMPORTED_MODULE_2__.TableComponent().init();\r\n        \r\n        case '/users/analytics': \r\n            return new _components_analytics__WEBPACK_IMPORTED_MODULE_4__.AnalyticsComponent().init();\r\n        \r\n        case '/users/user_accounts': \r\n            return new _components_table__WEBPACK_IMPORTED_MODULE_2__.TableComponent().init();\r\n        \r\n        case '/sign-in':\r\n            return document.getElementsByClassName('btn-primary')[0]\r\n            .addEventListener('click', (e) => (0,_utils_submit__WEBPACK_IMPORTED_MODULE_0__.signInSubmit)());\r\n\r\n        case '/sign-up':\r\n            return document.getElementsByClassName('btn-primary')[0]\r\n            .addEventListener('click', (e) => (0,_utils_submit__WEBPACK_IMPORTED_MODULE_0__.signUpSubmit)());\r\n\r\n        default: return console.log('No match');\r\n    }\r\n}\r\n\r\nwindow.document.onload = main();\r\n\n\n//# sourceURL=webpack://src/./index.js?");

/***/ }),

/***/ "./utils/http.js":
/*!***********************!*\
  !*** ./utils/http.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getServerAddr\": () => (/* binding */ getServerAddr),\n/* harmony export */   \"HTTPPostRequest\": () => (/* binding */ HTTPPostRequest),\n/* harmony export */   \"HTTPGetRequest\": () => (/* binding */ HTTPGetRequest)\n/* harmony export */ });\nconst getServerAddr = (production) => {\r\n    return production ? \r\n    'https://admin.isak-tech.tk' : 'http://localhost:8084';\r\n}\r\n\r\nconst HTTPPostRequest = (url, data) => {\r\n    return fetch(url, {\r\n        method: 'POST',\r\n        headers: { 'Content-Type': 'application/json' },\r\n        body: JSON.stringify(data)\r\n    }).then(response => response.json());\r\n}\r\n\r\nconst HTTPGetRequest = (url) => {\r\n    return fetch(url, {\r\n        method: 'GET',\r\n        headers: { 'Content-Type': 'application/json' }\r\n    }).then(response => response.json());\r\n}\n\n//# sourceURL=webpack://src/./utils/http.js?");

/***/ }),

/***/ "./utils/submit.js":
/*!*************************!*\
  !*** ./utils/submit.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"signUpSubmit\": () => (/* binding */ signUpSubmit),\n/* harmony export */   \"signInSubmit\": () => (/* binding */ signInSubmit),\n/* harmony export */   \"updatePostSubmit\": () => (/* binding */ updatePostSubmit),\n/* harmony export */   \"deleteImageSubmit\": () => (/* binding */ deleteImageSubmit),\n/* harmony export */   \"deletePostSubmit\": () => (/* binding */ deletePostSubmit),\n/* harmony export */   \"startProcess\": () => (/* binding */ startProcess),\n/* harmony export */   \"deletePage\": () => (/* binding */ deletePage),\n/* harmony export */   \"stopProcess\": () => (/* binding */ stopProcess)\n/* harmony export */ });\n/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./http */ \"./utils/http.js\");\n/* harmony import */ var _components_processes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/processes */ \"./components/processes.js\");\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/utils */ \"./utils/utils.js\");\n\r\n\r\n\r\n\r\n\r\nconst signUpSubmit = () => {\r\n    let form = document.getElementById('signUp-form');\r\n    let formData = new FormData(form);\r\n    let email = document.getElementById('email').value;\r\n    let username = document.getElementById('username').value;\r\n    let password = document.getElementById('password').value;\r\n\r\n    (0,_http__WEBPACK_IMPORTED_MODULE_0__.HTTPPostRequest)((0,_http__WEBPACK_IMPORTED_MODULE_0__.getServerAddr)(false) + '/validate-form/sign-up', { email, username, password })\r\n    .then(response => {\r\n        console.log(response);\r\n\r\n        if(response.success) {\r\n            formData.append('email', email);\r\n            formData.append('username', username);\r\n            formData.append('password', password);\r\n            return form.submit();\r\n        } else {\r\n            return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_2__.errorHandler)(response.message)\r\n        }\r\n    });\r\n}\r\n\r\nconst signInSubmit = () => {\r\n    let form = document.getElementById('signIn-form');\r\n    let formData = new FormData(form);\r\n    let username = document.getElementById('username').value;\r\n    let password = document.getElementById('password').value;\r\n\r\n    (0,_http__WEBPACK_IMPORTED_MODULE_0__.HTTPPostRequest)((0,_http__WEBPACK_IMPORTED_MODULE_0__.getServerAddr)(false) + '/validate-form/sign-in', { username, password })\r\n    .then(response => {\r\n        if(response.success) {\r\n            formData.append('username', username);\r\n            formData.append('password', password);\r\n            return form.submit();\r\n        } else {\r\n            return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_2__.errorHandler)(response.message)\r\n        }\r\n    });\r\n}\r\n\r\nconst updatePostSubmit = () => {\r\n    let data = {\r\n        ID: parseInt(document.getElementById('post-id').textContent),\r\n        Title: document.getElementById('title').value,\r\n        Post: document.getElementById('body').value,\r\n        Category: document.getElementById('category').value,\r\n        ImageURL: document.getElementById('imageurl').value,\r\n        Archived: document.getElementById('archived').checked ? 1 : 0\r\n    }\r\n\r\n    if(confirm('Confirm Update')) {\r\n        (0,_http__WEBPACK_IMPORTED_MODULE_0__.HTTPPostRequest)((0,_http__WEBPACK_IMPORTED_MODULE_0__.getServerAddr)(false) + '/site/main/post/' + data.ID, data)\r\n        .then(response => {\r\n            if(response.success) {\r\n                return window.location.href = '/site/main' \r\n            } else {\r\n                return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_2__.errorHandler)(response.message)\r\n            }\r\n        });\r\n    }\r\n}\r\n\r\nconst deleteImageSubmit = (element) => {\r\n    let imageID = element.getAttribute('data-id');\r\n    let postID = element.getAttribute('data-postid');\r\n\r\n    if(confirm('Confirm Delete Image: ' + imageID)) {\r\n        return (0,_http__WEBPACK_IMPORTED_MODULE_0__.HTTPGetRequest)((0,_http__WEBPACK_IMPORTED_MODULE_0__.getServerAddr)(false) + '/site/main/post/' + postID + '/' + imageID + '/remove-image')\r\n        .then(response => response.success ? \r\n        window.location.reload() : (0,_utils_utils__WEBPACK_IMPORTED_MODULE_2__.errorHandler)(response.message));\r\n    }\r\n}\r\n\r\nconst deletePostSubmit = (element) => {\r\n    let id = element.getAttribute('data-id');\r\n    \r\n    if(confirm('Confirm Delete Post ' + id)) {\r\n        console.log('Delete Post..')\r\n        return window.location.pathname = '/site/main/post/' + id + '/remove-post'\r\n    }\r\n}\r\n\r\nconst startProcess = () => {\r\n    let site = document.getElementById('server').value;\r\n\r\n    return (0,_http__WEBPACK_IMPORTED_MODULE_0__.HTTPGetRequest)((0,_http__WEBPACK_IMPORTED_MODULE_0__.getServerAddr)(false) + '/users/start/' + site)\r\n    .then(response => {\r\n        return response.success ? \r\n        new _components_processes__WEBPACK_IMPORTED_MODULE_1__.ProcessesComponent().render(response.data) : \r\n        (0,_utils_utils__WEBPACK_IMPORTED_MODULE_2__.errorHandler)(response.message);\r\n    });\r\n}\r\n\r\n\r\nconst deletePage = (element) => { // requires a valid session or it will be rejected\r\n    if(confirm('Confirm Delete Page ' + element.getAttribute('data-id'))) {\r\n        return window.location.pathname = '/site/portal/page/' + \r\n        element.getAttribute('data-id') + '/delete';\r\n    }\r\n}\r\n\r\nconst stopProcess = (el) => {\r\n    console.log(el);\r\n    \r\n    let pid = el.getAttribute('data-pid');\r\n\r\n    if(confirm('Are you sure you wish to terminate process: ' + pid)) {\r\n        return (0,_http__WEBPACK_IMPORTED_MODULE_0__.HTTPGetRequest)((0,_http__WEBPACK_IMPORTED_MODULE_0__.getServerAddr)(false) + '/users/stop/' + pid)\r\n        .then(response => {\r\n            console.log(response);\r\n            if(response.success) {\r\n                let processes = document.getElementById('processes');\r\n                processes.removeChild(document.getElementById('p-' + pid));\r\n            }\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://src/./utils/submit.js?");

/***/ }),

/***/ "./utils/utils.js":
/*!************************!*\
  !*** ./utils/utils.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"navigate\": () => (/* binding */ navigate),\n/* harmony export */   \"errorHandler\": () => (/* binding */ errorHandler),\n/* harmony export */   \"formatDate\": () => (/* binding */ formatDate),\n/* harmony export */   \"formGroupFocusIn\": () => (/* binding */ formGroupFocusIn),\n/* harmony export */   \"formGroupFocusOut\": () => (/* binding */ formGroupFocusOut),\n/* harmony export */   \"toggleSidenav\": () => (/* binding */ toggleSidenav),\n/* harmony export */   \"toggleElement\": () => (/* binding */ toggleElement),\n/* harmony export */   \"timeSince\": () => (/* binding */ timeSince),\n/* harmony export */   \"activeLink\": () => (/* binding */ activeLink)\n/* harmony export */ });\nconst navigate = (element) => \r\n    window.location.pathname = '/site/portal/page/' + \r\n    parseInt(element.getAttribute('data-id'));\r\n\r\nconst errorHandler = (error) => alert(error);\r\n\r\nconst formatDate = (date) => moment(date).fromNow();\r\n\r\nconst formGroupFocusIn = (e) => \r\n    e.path[0].value.length >= 1 ? e.path[1].classList.add('focused') : '';\r\n\r\nconst formGroupFocusOut = (e) => \r\n    e.path[0].value.length <= 0 ? true : false;\r\n\r\nconst toggleSidenav = () => {\r\n    toggleElement('sidenav');\r\n    toggleElement('navbar-btn');\r\n    toggleElement('content-main');\r\n    return null;\r\n}\r\n\r\nconst toggleElement = (id) => {\r\n    let element = document.getElementById(id);\r\n\r\n    return element.classList.contains('open') ?\r\n    element.classList.remove('open') :\r\n    element.classList.add('open');\r\n}\r\n\r\nconst timeSince = (date) => {\r\n\r\n    var seconds = Math.floor((new Date() - date) / 1000);\r\n  \r\n    var interval = seconds / 31536000;\r\n  \r\n    if (interval > 1) {\r\n      return Math.floor(interval) + \" years\";\r\n    }\r\n    interval = seconds / 2592000;\r\n    if (interval > 1) {\r\n      return Math.floor(interval) + \" months\";\r\n    }\r\n    interval = seconds / 86400;\r\n    if (interval > 1) {\r\n      return Math.floor(interval) + \" days\";\r\n    }\r\n    interval = seconds / 3600;\r\n    if (interval > 1) {\r\n      return Math.floor(interval) + \" hours\";\r\n    }\r\n    interval = seconds / 60;\r\n    if (interval > 1) {\r\n      return Math.floor(interval) + \" minutes\";\r\n    }\r\n    return Math.floor(seconds) + \" seconds\";\r\n}\r\n\r\nconst activeLink = () => {\r\n    let navLinks = document.getElementsByClassName('nav-link');\r\n    \r\n    for(let i = 0; i < navLinks.length; i++) {\r\n        let isActive = navLinks[i].href === window.location.href;\r\n        if(isActive) return navLinks[i].classList.add('active');\r\n    }\r\n}\r\n\r\n(function() {\r\n    try {\r\n        return document.getElementById('archived').checked = \r\n        parseInt(document.getElementById('archived-hidden').textContent) === 1 \r\n        ? true : false;\r\n\r\n    } catch(err) {\r\n        return;\r\n    }\r\n    \r\n})();\r\n\r\n(function() {\r\n    try {\r\n        let category = document.getElementById('post-category').textContent;\r\n        let options = document.getElementsByTagName('option');\r\n    \r\n        for(let i = 0; i < options.length; i++) {\r\n            if(options[i].value === category) \r\n            return options[i].selected = true;\r\n        }\r\n\r\n    } catch(err) {\r\n        return;\r\n    }\r\n})();\r\n\r\n(function() {\r\n    try {\r\n        let alerts = document.getElementsByClassName('alert');\r\n        \r\n        for(let i = 0; i < alerts.length; i++) {\r\n            alerts[i].addEventListener('click', () => {\r\n                alerts[i].style.display = 'none';\r\n            });\r\n        }\r\n\r\n        return null\r\n\r\n    } catch(err) {\r\n        return null\r\n    }\r\n})();\r\n\r\n\r\n(function() {\r\n    let formGroups = document.getElementsByClassName('form-group');\r\n    for(let i = 0; i < formGroups.length; i++) {\r\n\r\n        formGroups[i].childNodes.forEach(el => {\r\n            let isFormElement = \r\n            el.tagName === \"INPUT\" || \r\n            el.tagName === \"SELECT\" || \r\n            el.tagName === \"TEXTAREA\";\r\n\r\n            if(isFormElement && el.value.length > 0) {\r\n                formGroups[i].classList.add('focused');\r\n            }\r\n        });\r\n\r\n        formGroups[i].addEventListener('focusin', (e) =>  e.path[1].classList.add('focused'));\r\n        formGroups[i].addEventListener('focusout', (e) => formGroupFocusOut(e) ? e.path[1].classList.remove('focused') : '');\r\n    }\r\n})();\r\n\n\n//# sourceURL=webpack://src/./utils/utils.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;