(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["Vue2Crumbs"] = factory();
	else
		root["Vue2Crumbs"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var utils = {
  isObject: function isObject(checkMe) {
    return (typeof checkMe === 'undefined' ? 'undefined' : _typeof(checkMe)) === 'object' && !Array.isArray(checkMe) && checkMe !== null;
  }
};

exports.default = {
  name: 'app-breadcrumbs',
  template: '\n    <ul\n      class="breadcrumbs-container"\n      :is="container"\n      v-if="$router"\n    >\n      <template v-if="parentRoutes.length">\n        <template v-for="route in parentRoutes">\n          <slot :to="route.to" :label="route.label" :utils="route.utils">\n            <li class="parent-breadcrumb">\n              <router-link\n                :to="route.to"\n                exact\n              >\n                {{route.label}}\n              </router-link>\n              <i v-if="delimiter" class="delimiter"></i>\n            </li>\n          </slot>\n        </template>\n      </template>\n\n      <li v-if="!isInitialEmptyRoute" class="current-breadcrumb">\n        <slot name="current" :label="getRouteLabel(currentRoute)">\n          <a>\n            {{getRouteLabel(currentRoute)}}\n          </a>\n        </slot>\n      </li>\n    </ul>\n  ',
  props: {
    container: {
      type: String,
      default: 'ul'
    },
    delimiter: {
      type: Boolean,
      default: false
    }
  },
  data: function data() {
    return {
      parentsDynamicRoutes: [],
      parentHelper: ''
    };
  },

  computed: {
    isInitialEmptyRoute: function isInitialEmptyRoute() {
      return this.$route.fullPath === '/' && !this.$route.matched.length;
    },
    currentRoute: function currentRoute() {
      // This check is just to make sure that '$forceUpdate' would work
      if (!this.isInitialEmptyRoute && (this.parentHelper || !this.parentHelper)) {
        return this.$route;
      }
    },
    parentRoutes: function parentRoutes() {
      if (!this.isInitialEmptyRoute) {
        return this.parentsDynamicRoutes.length ? this.parentsDynamicRoutes : this.getAncestorsRoutesArray(this.currentRoute);
      }
      return [];
    }
  },
  // TODO: Write docs for each method
  methods: {
    // Function returns resolved page's breadcrumb property
    getBreadcrumb: function getBreadcrumb(route) {
      var breadcrumb = route.meta.breadcrumb;
      var matchedRouteRecord = route.matched[route.matched.length - 1];
      var matchedComponent = matchedRouteRecord.components.default;
      var componentBreadcrumb = matchedComponent.breadcrumb;

      if (componentBreadcrumb && typeof componentBreadcrumb !== 'function') {
        if (breadcrumb && (typeof breadcrumb === 'undefined' ? 'undefined' : _typeof(breadcrumb)) == 'object') {
          breadcrumb = Object.assign(breadcrumb, componentBreadcrumb);
        } else {
          breadcrumb = componentBreadcrumb;
        }
      }

      return breadcrumb;
    },


    // Function return label from any breadcrumb property
    getBreadcrumbLabel: function getBreadcrumbLabel(breadcrumb) {
      if ((typeof breadcrumb === 'undefined' ? 'undefined' : _typeof(breadcrumb)) === 'object') {
        return breadcrumb.label;
      }
      if (typeof breadcrumb === 'string') {
        return breadcrumb;
      }
    },


    // Function resolves a label of the provided route
    getRouteLabel: function getRouteLabel(route) {
      var routeLabel = route.name;
      var breadcrumb = this.getBreadcrumb(route);
      var breadcrumbLabel = this.getBreadcrumbLabel(breadcrumb);

      if (breadcrumbLabel) {
        routeLabel = breadcrumbLabel;
      }

      return routeLabel;
    },


    // Function resolves a utils object of the provided route
    getRouteUtils: function getRouteUtils(route) {
      var breadcrumb = this.getBreadcrumb(route);
      if (breadcrumb && breadcrumb.utils) {
        return breadcrumb.utils;
      }
    },
    resolveRootParentRoute: function resolveRootParentRoute(parentRouteRecord) {
      var parentRoutePath = parentRouteRecord.path || '/';

      return this.$router.resolve({ path: parentRoutePath }).route;
    },
    getRootParentRoute: function getRootParentRoute(route) {
      var rootParentRoute = void 0;
      var matchedRoutes = route.matched;

      // If second matched route is not the same with current route, return it as next parent
      rootParentRoute = this.resolveRootParentRoute(matchedRoutes[matchedRoutes.length - 2]);

      // If second matched route is the same with current route, return route after next as parent
      if (route.path === rootParentRoute.path) {
        rootParentRoute = this.resolveRootParentRoute(matchedRoutes[matchedRoutes.length - 3]);
      }

      return rootParentRoute;
    },
    getDirectParentRoute: function getDirectParentRoute(route) {
      var breadcrumb = this.getBreadcrumb(route);

      if (breadcrumb && breadcrumb.parent) {
        var breadcrumbParent = breadcrumb.parent;
        var routeResolveObject = void 0;

        if (breadcrumbParent && breadcrumb.parentsList) {
          console.warn('Vue-2-Crumbs Warning: You have both \'parent\' and \'parentsList\' properties for route \'' + route.name + '\'!\nPlease, use just one of these per route. By default Vue-2-Crumbs plugin use \'parent\' property.');
        }

        if (typeof breadcrumbParent === 'string') {
          routeResolveObject = { name: breadcrumbParent };
        } else if (utils.isObject(breadcrumbParent)) {
          routeResolveObject = breadcrumbParent;
        } else {
          console.error('Vue-2-Crumbs Error: \'parent\' property in breadcrumb object for \'' + route.name + '\' route has wrong type. Only string or object is allowed');
        }

        return this.$router.resolve(routeResolveObject).route;
      }
    },


    // Function resolve a parent route if such exist
    getParentRoute: function getParentRoute(route) {
      var parentRoute = void 0;
      var directParentRoute = this.getDirectParentRoute(route);

      // Check if component has breadcrumb object
      if (directParentRoute) {
        parentRoute = directParentRoute;
      } else if (route.matched && route.matched.length > 1) {
        // Get Default Route Parent (if sub-routing uses)
        parentRoute = this.getRootParentRoute(route);
      }

      return parentRoute;
    },


    // Function returns array of parents routes
    getAncestorsRoutesArray: function getAncestorsRoutesArray(route) {
      var parentRoutesArray = [];
      var parentRoute = this.getParentRoute(route);

      if (parentRoute) {
        var path = parentRoute.path,
            name = parentRoute.name,
            params = parentRoute.params,
            query = parentRoute.query,
            hash = parentRoute.hash;

        var routeObjectToAdd = {
          to: { path: path, name: name, params: params, query: query, hash: hash },
          label: this.getRouteLabel(parentRoute),
          utils: this.getRouteUtils(parentRoute)
        };

        parentRoutesArray = [].concat(_toConsumableArray(this.getAncestorsRoutesArray(parentRoute)), [routeObjectToAdd]);
      }

      return parentRoutesArray;
    }
  },
  watch: {
    '$route': function $route() {
      // Set empty component's 'parentsDynamicRoutes' property on each route change
      this.parentsDynamicRoutes = [];
    }
  },
  created: function created() {
    var _this = this;

    // Listen to the change of route breadcrumb object
    this.$_vue2Crumbs_eventBUS.$on('breadcrumbChanged', function () {
      var metaBreadcrumb = _this.$route.meta.breadcrumb;

      if (metaBreadcrumb.parentsList) {
        _this.parentsDynamicRoutes = [].concat(_toConsumableArray(metaBreadcrumb.parentsList)).reverse();
      }
      if (metaBreadcrumb.parent) {
        _this.parentHelper = metaBreadcrumb.parent;
      }
      _this.$forceUpdate();
    });
  }
};

/***/ })
/******/ ]);
});