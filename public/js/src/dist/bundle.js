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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"AnalyticsComponent\": () => (/* binding */ AnalyticsComponent)\n/* harmony export */ });\n/* harmony import */ var _components_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/table */ \"./components/table.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ \"./index.js\");\n\r\n\r\n\r\nclass AnalyticsComponent {\r\n    constructor(data) {\r\n        this.data = data; \r\n        this.container = document.getElementsByClassName('table-body')[0];\r\n    }\r\n\r\n    init() {\r\n        this.loadData();\r\n    }\r\n\r\n    loadData() {\r\n        _index__WEBPACK_IMPORTED_MODULE_1__.http.GET('https://paste.isak-tech.tk/analytics/load/load_all', true)\r\n        .then(res => res.success ? this.render(res.data) : \r\n        console.log(res.message));\r\n    }\r\n\r\n    render(data) {\r\n        data.forEach(row => {\r\n            let div = document.createElement('div');\r\n            div.className = 'table-row';\r\n            div.innerHTML = `\r\n                <span class=\"id\">${row.id}</span>\r\n                <span class=\"href\">${row.href}</span>\r\n                <span class=\"created\">${row.created}</span>\r\n                <span class=\"ip\">${row.ip}</span>\r\n            `\r\n            this.container.appendChild(div);\r\n        })\r\n\r\n        new _components_table__WEBPACK_IMPORTED_MODULE_0__.TableComponent().init();\r\n    }\r\n}\n\n//# sourceURL=webpack://src/./components/analytics.js?");

/***/ }),

/***/ "./components/api.js":
/*!***************************!*\
  !*** ./components/api.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"APIComponent\": () => (/* binding */ APIComponent)\n/* harmony export */ });\nclass APIComponent {\r\n    constructor() {\r\n        this.apiContainer = document.getElementById('api-container');\r\n        this.APIRoutes = \r\n        [\r\n            { path: \"/api/posts\",                 method:\"GET\",    data: null },\r\n            { path: \"/api/post/:id\",              method:\"GET\",    data: null },\r\n            { path: \"/api/paginate/:page/:limit\", method: \"GET\",   data: null },\r\n            { path: \"/api/delete\",                method:\"DELETE\", data: { id: \"uint64\" }},\r\n            { path: \"/api/new\",                   method: \"POST\",  data: { title: \"string\", body: \"string\", tags: \"[]string\" }},\r\n            { path: \"/api/update\",                method: \"PUT\",   data: { id: \"uint64\", title: \"string\", body: \"string\", tags: \"[]string\" }}\r\n        ];\r\n    }\r\n\r\n    init() {\r\n        this.render();\r\n    }\r\n\r\n    render() {\r\n        this.APIRoutes.forEach(el => {\r\n            let div = document.createElement('div');\r\n            div.classList.add('api-route');\r\n            div.innerHTML = `\r\n                <div>\r\n                    <span>${el.path}</span>\r\n                    <span>${el.method}</span>\r\n                </div>\r\n                <pre>${el.data != undefined ? JSON.stringify(el.data, null, 2) : 'No data required'}</pre>\r\n            `\r\n    \r\n            this.apiContainer.appendChild(div);\r\n        });\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://src/./components/api.js?");

/***/ }),

/***/ "./components/processes.js":
/*!*********************************!*\
  !*** ./components/processes.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ProcessesComponent\": () => (/* binding */ ProcessesComponent)\n/* harmony export */ });\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ \"./utils/utils.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ \"./index.js\");\n\r\n\r\n\r\n\r\nclass ProcessesComponent  {\r\n\r\n    constructor() {\r\n        this.processes = document.getElementById('processes');\r\n        this.placeholders = document.getElementsByClassName('placeholder');\r\n        this.adminLevel = document.getElementById('admin_level').value;\r\n    }\r\n\r\n    init() {\r\n        this.loadData();\r\n\r\n        try {\r\n            document.getElementsByClassName('btn-primary')[0]\r\n            .addEventListener('click', () => this.startProcess());\r\n        } catch(err) {\r\n            console.log('Administration level too low');\r\n        }\r\n    }\r\n\r\n    loadData() {\r\n        return _index__WEBPACK_IMPORTED_MODULE_1__.http.GET('/users/get-processes')\r\n        .then(response => response.success && response.data != null ?\r\n        response.data.map(p => this.render({ Service: p.Service, Config: p.Config })) : console.log('err'));\r\n    }\r\n    \r\n    stopProcess(pid) {              \r\n        if(confirm('Are you sure you wish to terminate process: ' + pid)) {\r\n            return _index__WEBPACK_IMPORTED_MODULE_1__.http.GET('/users/stop/' + pid)\r\n            .then(response => {\r\n                if(response.success) {\r\n                    let processes = document.getElementById('processes');\r\n                    processes.removeChild(document.getElementById('p-' + pid));\r\n                    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.errorHandler)(response.message, false);\r\n                } else {\r\n                    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.errorHandler)(response.message, true);\r\n                }\r\n\r\n                return;\r\n            });\r\n        }\r\n    }\r\n\r\n    startProcess() {\r\n        let site = document.getElementById('server').value;\r\n\r\n        return _index__WEBPACK_IMPORTED_MODULE_1__.http.GET('/users/start/' + site)\r\n        .then(response => {\r\n            if(response.success) {\r\n                this.render(response.data);\r\n                (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.errorHandler)(response.message, false);\r\n            } else {\r\n                (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.errorHandler)(response.message, true);\r\n            }\r\n\r\n            return;\r\n        });\r\n    }\r\n\r\n    render(process) {      \r\n        let div = document.createElement('div');\r\n        div.classList.add('process');\r\n        div.id = 'p-' + process.Service.ProcessID;\r\n        div.innerHTML = `\r\n        <div class=\"process-body\">\r\n            <p><span>Process Label:</span><span>${process.Service.Label}</span></p>\r\n            <p><span>Process ID:</span><span>${process.Service.ProcessID}</span></p>\r\n            <p><span>Server Address:</span><span><a href=\"${process.Config.ServerAddr}\" target=\"_blank\">${process.Config.ServerAddr}</a></span></p>\r\n            <p><span>Domain:</span><span><a href=\"${process.Config.Domain}\" target=\"_blank\">${process.Config.Domain}</a></span></p>\r\n            <p><span>Started:</span><span>${(0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.timeSince)(new Date(process.Service.Started))}</span></p>\r\n        </div>\r\n    \r\n        <div class=\"process-footer\">\r\n            ${this.processFooter({ \r\n                adminLevel: parseInt(this.adminLevel), \r\n                pid: process.Service.ProcessID \r\n            })}\r\n        </div>`;\r\n    \r\n        this.processes.appendChild(div);\r\n\r\n        document.getElementById('btn-' + process.Service.ProcessID)\r\n        .addEventListener('click', () => \r\n        this.stopProcess(process.Service.ProcessID));\r\n\r\n        return null\r\n    }\r\n\r\n    processFooter(config) {    \r\n        return config.adminLevel >= 3 ? `    \r\n        <a class=\"terminate\" href=\"javascript:void(0)\" id=\"btn-${config.pid}\">Terminate</a>\r\n        <a href=\"#\">Restart</a>` : '';\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://src/./components/processes.js?");

/***/ }),

/***/ "./components/table.js":
/*!*****************************!*\
  !*** ./components/table.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TableComponent\": () => (/* binding */ TableComponent)\n/* harmony export */ });\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ \"./utils/utils.js\");\n\r\n\r\nclass TableComponent {\r\n    constructor() {\r\n        this.thead = document.getElementById('t-head');\r\n    }\r\n\r\n    init() {\r\n        this.addEventListeners();\r\n        this.fixDates();\r\n    }\r\n    \r\n    fixDates() {\r\n        let dates = document.getElementsByClassName('created');\r\n        for(let i = 0; i < dates.length; i++) {\r\n            dates[i].textContent = (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.timeSince)(new Date(dates[i].textContent));\r\n        }\r\n    }\r\n\r\n    addEventListeners() {\r\n        this.thead.childNodes.forEach(i => {\r\n            i.addEventListener('mouseenter', (e) => {\r\n                let className = e.target.textContent.replace(/\\s/g, '').toLowerCase();\r\n                let elements = document.getElementsByClassName(className);\r\n                \r\n                for(let i = 0; i < elements.length; i++) {\r\n                    elements[i].classList.add('active');\r\n                }\r\n            });\r\n    \r\n            i.addEventListener('mouseleave', (e) => {\r\n                let className = e.target.textContent.replace(/\\s/g, '').toLowerCase();\r\n                let elements = document.getElementsByClassName(className);\r\n                \r\n                for(let i = 0; i < elements.length; i++) {\r\n                    elements[i].classList.remove('active');\r\n                }\r\n            });\r\n        });\r\n    }\r\n}\n\n//# sourceURL=webpack://src/./components/table.js?");

/***/ }),

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"http\": () => (/* binding */ http)\n/* harmony export */ });\n/* harmony import */ var _utils_http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/http */ \"./utils/http.js\");\n/* harmony import */ var _components_api__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/api */ \"./components/api.js\");\n/* harmony import */ var _components_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/table */ \"./components/table.js\");\n/* harmony import */ var _components_analytics__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./components/analytics */ \"./components/analytics.js\");\n/* harmony import */ var _components_processes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./components/processes */ \"./components/processes.js\");\n/* harmony import */ var _utils_submit__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/submit */ \"./utils/submit.js\");\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/utils */ \"./utils/utils.js\");\n\r\n\r\n\r\n\r\n \r\n\r\n\r\n\r\n\r\nconst http = new _utils_http__WEBPACK_IMPORTED_MODULE_0__.HTTP(false); // create new http instance that can be used by components/utils\r\n\r\nconst init = () => {\r\n    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_6__.activeLink)(); // set active class on nav list item\r\n    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_6__.initSidenav)(); // add event listeners to the open/close btn on sidenav\r\n    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_6__.adminLevelInitial)(); // change the admin level input value based on what the server has sent\r\n    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_6__.closeAlertEvent)(); // add an event listener to errors so then can be closed\r\n    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_6__.optionInital)(); // when editing an existing post, select the old value\r\n    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_6__.archivedInitial)(); // when editing an existing post, set archived to the old value\r\n    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_6__.galleryItemInital)(); // add event listener to gallery items so they can be removed\r\n    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_6__.editPostInitial)(); // add event listeners to delete/update buttons\r\n    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_6__.deletePageInitial)(); // add event listeners to the delete buttons\r\n}\r\n\r\nconst main = () => {\r\n    init();\r\n\r\n    switch(window.location.pathname) {\r\n        case '/users/management': return new _components_processes__WEBPACK_IMPORTED_MODULE_4__.ProcessesComponent().init();\r\n        case '/site/paste/api': return new _components_api__WEBPACK_IMPORTED_MODULE_1__.APIComponent().init();\r\n        case '/site/main': return new _components_table__WEBPACK_IMPORTED_MODULE_2__.TableComponent().init();\r\n        case '/users/user_accounts': return new _components_table__WEBPACK_IMPORTED_MODULE_2__.TableComponent().init();\r\n        case '/site/portal': return new _components_table__WEBPACK_IMPORTED_MODULE_2__.TableComponent().init();\r\n        case '/users/analytics': return new _components_analytics__WEBPACK_IMPORTED_MODULE_3__.AnalyticsComponent().init();\r\n        \r\n        case '/sign-in':\r\n            return document.getElementsByClassName('btn-primary')[0]\r\n            .addEventListener('click', () => (0,_utils_submit__WEBPACK_IMPORTED_MODULE_5__.signInSubmit)());\r\n    \r\n        case '/sign-up':\r\n            return document.getElementsByClassName('btn-primary')[0]\r\n            .addEventListener('click', () => (0,_utils_submit__WEBPACK_IMPORTED_MODULE_5__.signUpSubmit)());\r\n\r\n        default: return;\r\n    }\r\n}\r\n\r\nwindow.document.onload = main();\r\n\n\n//# sourceURL=webpack://src/./index.js?");

/***/ }),

/***/ "./utils/http.js":
/*!***********************!*\
  !*** ./utils/http.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"HTTP\": () => (/* binding */ HTTP)\n/* harmony export */ });\nclass HTTP {\r\n    \r\n    constructor(production) {\r\n        this.serverAddr = this.getServerAddr(production);\r\n        this.headers = { 'Content-Type': 'application/json' };\r\n\r\n        console.log(this.serverAddr);\r\n    }\r\n\r\n    getServerAddr(production) {\r\n        return production ? \r\n        'https://admin.isak-tech.tk' : 'http://localhost:8084';\r\n    }\r\n\r\n    // string, boolean\r\n    GET(url, customUrl) {\r\n        if(customUrl) {\r\n            return fetch(url, {\r\n                method: 'GET',\r\n                headers: this.headers\r\n            }).then(response => response.json());\r\n\r\n        } else {\r\n            return fetch(this.serverAddr + url, {\r\n                method: 'GET',\r\n                headers: this.headers\r\n            }).then(response => response.json());\r\n        }\r\n    }\r\n\r\n    POST(url, data) {\r\n        return fetch(this.serverAddr + url, {\r\n            method: 'POST',\r\n            headers: this.headers,\r\n            body: JSON.stringify(data)\r\n        }).then(response => response.json());\r\n    }\r\n}\n\n//# sourceURL=webpack://src/./utils/http.js?");

/***/ }),

/***/ "./utils/submit.js":
/*!*************************!*\
  !*** ./utils/submit.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"signUpSubmit\": () => (/* binding */ signUpSubmit),\n/* harmony export */   \"signInSubmit\": () => (/* binding */ signInSubmit),\n/* harmony export */   \"updatePostSubmit\": () => (/* binding */ updatePostSubmit),\n/* harmony export */   \"deleteImageSubmit\": () => (/* binding */ deleteImageSubmit),\n/* harmony export */   \"deletePostSubmit\": () => (/* binding */ deletePostSubmit),\n/* harmony export */   \"deletePageSubmit\": () => (/* binding */ deletePageSubmit)\n/* harmony export */ });\n/* harmony import */ var _utils_utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/utils */ \"./utils/utils.js\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ \"./index.js\");\n\r\n\r\n\r\nconst signUpSubmit = () => {\r\n    let form = document.getElementById('signUp-form');\r\n    let formData = new FormData(form);\r\n    let email = document.getElementById('email').value;\r\n    let username = document.getElementById('username').value;\r\n    let password = document.getElementById('password').value;\r\n\r\n    _index__WEBPACK_IMPORTED_MODULE_1__.http.POST('/validate-form/sign-up', { email, username, password })\r\n    .then(response => {\r\n        console.log(response);\r\n\r\n        if(response.success) {\r\n            formData.append('email', email);\r\n            formData.append('username', username);\r\n            formData.append('password', password);\r\n            return form.submit();\r\n        } else {\r\n            return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.errorHandler)(response.message, true)\r\n        }\r\n    });\r\n}\r\n\r\nconst signInSubmit = () => {\r\n    let form = document.getElementById('signIn-form');\r\n    let formData = new FormData(form);\r\n    let username = document.getElementById('username').value;\r\n    let password = document.getElementById('password').value;\r\n\r\n    _index__WEBPACK_IMPORTED_MODULE_1__.http.POST('/validate-form/sign-in', { username, password })\r\n    .then(response => {\r\n        if(response.success) {\r\n            formData.append('username', username);\r\n            formData.append('password', password);\r\n            return form.submit();\r\n        } else {\r\n            return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.errorHandler)(response.message, true)\r\n        }\r\n    });\r\n}\r\n\r\nconst updatePostSubmit = () => {\r\n    let data = {\r\n        ID: parseInt(document.getElementById('post-id').textContent),\r\n        Title: document.getElementById('title').value,\r\n        Post: document.getElementById('body').value,\r\n        Category: document.getElementById('category').value || 'Articles',\r\n        Thumbnail: document.getElementById('thumbnail').value,\r\n        Archived: document.getElementById('archived').checked ? 1 : 0\r\n    }\r\n\r\n    if(confirm('Confirm Update')) {\r\n        _index__WEBPACK_IMPORTED_MODULE_1__.http.POST('/site/main/post/' + data.ID, data)\r\n        .then(response => {\r\n            if(response.success) {\r\n                return window.location.href = '/site/main?s=post has been updated'; \r\n            } else {\r\n                return (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.errorHandler)(response.message, true);\r\n            }\r\n        });\r\n    }\r\n}\r\n\r\nconst deleteImageSubmit = (config) => {\r\n    try {\r\n        if(confirm('Confirm Delete Image: ' + config.id)) {\r\n            return _index__WEBPACK_IMPORTED_MODULE_1__.http.GET('/site/main/post/' + config.postid + '/' + config.id + '/remove-image')\r\n            .then(response => {\r\n                if(response.success) {\r\n                    (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.errorHandler)(response.message, false);\r\n                    let img = document.querySelector(`[data-id='${config.id}']`)\r\n                    img.parentElement.removeChild(img);\r\n                    return;\r\n                }\r\n\r\n                (0,_utils_utils__WEBPACK_IMPORTED_MODULE_0__.errorHandler)(response.message, true);\r\n                return;\r\n            });\r\n        }\r\n\r\n    } catch(err) {\r\n        return;\r\n    }\r\n} \r\n\r\nconst deletePostSubmit = (id) => {\r\n    if(confirm('Confirm Delete Post ' + id)) {\r\n        return window.location.pathname = '/site/main/post/' + id + '/remove-post'\r\n    }\r\n}\r\n\r\nconst deletePageSubmit = (id) => { // requires a valid session or it will be rejected\r\n    if(confirm('Confirm Delete Page ' + id)) {\r\n        return window.location.pathname = '/site/portal/page/' + \r\n        id + '/delete';\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://src/./utils/submit.js?");

/***/ }),

/***/ "./utils/utils.js":
/*!************************!*\
  !*** ./utils/utils.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"navigate\": () => (/* binding */ navigate),\n/* harmony export */   \"errorHandler\": () => (/* binding */ errorHandler),\n/* harmony export */   \"formatDate\": () => (/* binding */ formatDate),\n/* harmony export */   \"formGroupFocusIn\": () => (/* binding */ formGroupFocusIn),\n/* harmony export */   \"formGroupFocusOut\": () => (/* binding */ formGroupFocusOut),\n/* harmony export */   \"toggleSidenav\": () => (/* binding */ toggleSidenav),\n/* harmony export */   \"initSidenav\": () => (/* binding */ initSidenav),\n/* harmony export */   \"toggleElement\": () => (/* binding */ toggleElement),\n/* harmony export */   \"timeSince\": () => (/* binding */ timeSince),\n/* harmony export */   \"activeLink\": () => (/* binding */ activeLink),\n/* harmony export */   \"closeAlertEvent\": () => (/* binding */ closeAlertEvent),\n/* harmony export */   \"archivedInitial\": () => (/* binding */ archivedInitial),\n/* harmony export */   \"adminLevelInitial\": () => (/* binding */ adminLevelInitial),\n/* harmony export */   \"optionInital\": () => (/* binding */ optionInital),\n/* harmony export */   \"galleryItemInital\": () => (/* binding */ galleryItemInital),\n/* harmony export */   \"editPostInitial\": () => (/* binding */ editPostInitial),\n/* harmony export */   \"deletePageInitial\": () => (/* binding */ deletePageInitial)\n/* harmony export */ });\n/* harmony import */ var _submit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./submit */ \"./utils/submit.js\");\n\r\n\r\nconst navigate = (element) => \r\n    window.location.pathname = '/site/portal/page/' + \r\n    parseInt(element.getAttribute('data-id'));\r\n\r\nconst errorHandler = (message, isErr) => {\r\n    \r\n    try {\r\n        let alertsContainer = document.getElementsByClassName('alerts-container')[0];\r\n        alertsContainer.parentElement.removeChild(alertsContainer);\r\n    } catch(err) {\r\n        console.log('Zero errors found');\r\n    }\r\n\r\n    let div = document.createElement('div');\r\n    div.classList.add('alert-container');\r\n    div.innerHTML = `\r\n        <div class=\"${ isErr ? 'alert-error' : 'alert-success' }\">\r\n            <p>${message}</p>\r\n        </div>\r\n    `\r\n    document.body.appendChild(div)\r\n    closeAlertEvent();\r\n    //setTimeout(() => document.body.removeChild(div), 5000);\r\n};\r\n\r\nconst formatDate = (date) => moment(date).fromNow();\r\n\r\nconst formGroupFocusIn = (e) => \r\n    e.path[0].value.length >= 1 ? e.path[1].classList.add('focused') : '';\r\n\r\nconst formGroupFocusOut = (e) => \r\n    e.path[0].value.length <= 0 ? true : false;\r\n\r\nconst toggleSidenav = () => {\r\n    toggleElement('sidenav');\r\n    toggleElement('navbar-btn');\r\n    toggleElement('content-main');\r\n    return;\r\n}\r\n\r\nconst initSidenav = () => {\r\n    document.getElementById('navbar-btn')\r\n    .addEventListener('click', () => toggleSidenav());\r\n}\r\n\r\nconst toggleElement = (id) => {\r\n    let element = document.getElementById(id);\r\n\r\n    return element.classList.contains('open') ?\r\n    element.classList.remove('open') :\r\n    element.classList.add('open');\r\n}\r\n\r\nconst timeSince = (time) => {\r\n    switch (typeof time) {\r\n        case 'number':\r\n          break;\r\n        case 'string':\r\n          time = +new Date(time);\r\n          break;\r\n        case 'object':\r\n          if (time.constructor === Date) time = time.getTime();\r\n          break;\r\n        default:\r\n          time = +new Date();\r\n      }\r\n\r\n      var time_formats = [\r\n        [60, 'seconds', 1], // 60\r\n        [120, '1 minute ago', '1 minute from now'], // 60*2\r\n        [3600, 'minutes', 60], // 60*60, 60\r\n        [7200, '1 hour ago', '1 hour from now'], // 60*60*2\r\n        [86400, 'hours', 3600], // 60*60*24, 60*60\r\n        [172800, 'Yesterday', 'Tomorrow'], // 60*60*24*2\r\n        [604800, 'days', 86400], // 60*60*24*7, 60*60*24\r\n        [1209600, 'Last week', 'Next week'], // 60*60*24*7*4*2\r\n        [2419200, 'weeks', 604800], // 60*60*24*7*4, 60*60*24*7\r\n        [4838400, 'Last month', 'Next month'], // 60*60*24*7*4*2\r\n        [29030400, 'months', 2419200], // 60*60*24*7*4*12, 60*60*24*7*4\r\n        [58060800, 'Last year', 'Next year'], // 60*60*24*7*4*12*2\r\n        [2903040000, 'years', 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12\r\n        [5806080000, 'Last century', 'Next century'], // 60*60*24*7*4*12*100*2\r\n        [58060800000, 'centuries', 2903040000] // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100\r\n      ];\r\n\r\n      var seconds = (+new Date() - time) / 1000,\r\n        token = 'ago',\r\n        list_choice = 1;\r\n    \r\n      if (seconds == 0) {\r\n        return 'Just now'\r\n      }\r\n\r\n      if (seconds < 0) {\r\n        seconds = Math.abs(seconds);\r\n        token = 'from now';\r\n        list_choice = 2;\r\n      }\r\n\r\n      var i = 0, format;\r\n\r\n      while (format = time_formats[i++])\r\n        if (seconds < format[0]) {\r\n          if (typeof format[2] == 'string')\r\n            return format[list_choice];\r\n          else\r\n            return Math.floor(seconds / format[2]) + ' ' + format[1] + ' ' + token;\r\n        }\r\n\r\n      return time;\r\n}\r\n\r\nconst activeLink = () => {\r\n    let navLinks = document.getElementsByClassName('nav-link');\r\n    \r\n    for(let i = 0; i < navLinks.length; i++) {\r\n        let isActive = navLinks[i].href === window.location.href;\r\n        if(isActive) return navLinks[i].classList.add('active');\r\n    }\r\n}\r\n\r\nconst closeAlertEvent = () => {\r\n    try {\r\n        let alerts = document.getElementsByClassName('alert-container');\r\n        \r\n        for(let i = 0; i < alerts.length; i++) {\r\n            alerts[i].addEventListener('click', () => {\r\n                alerts[i].style.display = 'none';\r\n            });\r\n        }\r\n\r\n        window.history.replaceState(null, null, window.location.pathname);\r\n        return;\r\n    } catch(err) {\r\n        return;\r\n    }\r\n}\r\n\r\nconst archivedInitial = () => {\r\n    try {\r\n        return document.getElementById('archived').checked = \r\n        parseInt(document.getElementById('archived-hidden').textContent) === 1 \r\n        ? true : false;\r\n    \r\n    } catch(err) {\r\n        return;\r\n    }\r\n}\r\n\r\nconst adminLevelInitial = () => {\r\n    try {\r\n        let adminLevel = document.getElementById('adminLevel').value;\r\n        let select = document.getElementById('admin');\r\n    \r\n        for(let i = 0; i < select.length; i++) {\r\n            if(select[i].value === adminLevel) {\r\n                select[i].selected = true;\r\n            }\r\n        }\r\n    } catch(err) {\r\n        return;\r\n    }\r\n}\r\n\r\nconst optionInital = () => {\r\n    try {\r\n        let category = document.getElementById('post-category').textContent;\r\n        let options = document.getElementsByTagName('option');\r\n    \r\n        for(let i = 0; i < options.length; i++) {\r\n            if(options[i].value === category) \r\n            return options[i].selected = true;\r\n        }\r\n\r\n    } catch(err) {\r\n        return;\r\n    }\r\n}\r\n\r\nconst galleryItemInital = () => {\r\n    try {\r\n        let galleryItems = document.getElementsByClassName('gallery-item');\r\n        \r\n        for(let i = 0; i < galleryItems.length; i++) {\r\n            galleryItems[i].addEventListener('click', () => \r\n            (0,_submit__WEBPACK_IMPORTED_MODULE_0__.deleteImageSubmit)({\r\n                id: galleryItems[i].getAttribute('data-id'),\r\n                postid: galleryItems[i].getAttribute('data-postid')\r\n            }))\r\n        }\r\n\r\n    } catch(err) {\r\n        return;\r\n    }\r\n}\r\n\r\nconst editPostInitial = () => {\r\n    try {\r\n        let deleteBtn = document.getElementById('delete');\r\n        let saveBtn = document.getElementById('save');\r\n    \r\n        deleteBtn.addEventListener('click', () => \r\n        (0,_submit__WEBPACK_IMPORTED_MODULE_0__.deletePostSubmit)(deleteBtn.getAttribute('data-id')));\r\n    \r\n        saveBtn.addEventListener('click', () => \r\n        (0,_submit__WEBPACK_IMPORTED_MODULE_0__.updatePostSubmit)())\r\n\r\n    } catch(err) {\r\n        return;\r\n    }\r\n}\r\n\r\nconst deletePageInitial = () => {\r\n    try {\r\n        let deleteBtns = document.getElementsByClassName('delete_page');\r\n        \r\n        for(let i = 0; i < deleteBtns.length; i++) {\r\n            deleteBtns[i].addEventListener('click', () => \r\n            (0,_submit__WEBPACK_IMPORTED_MODULE_0__.deletePageSubmit)(deleteBtns[i].getAttribute('data-id')));\r\n        }\r\n\r\n    } catch(err) {\r\n        return;\r\n    }\r\n}\n\n//# sourceURL=webpack://src/./utils/utils.js?");

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
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./index.js");
/******/ 	
/******/ })()
;