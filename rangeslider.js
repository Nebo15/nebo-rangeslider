'use strict';

angular.module('rangeslider', []).directive('rangeslider', function ($timeout) {

  return {
    restrict: 'A',
    require: '?ngModel',
    link: function (scope, el, attrs, ngModelCtrl) {

      var slider = angular.element(el).rangeslider({
        polyfill: false
      });

      //var wasFormatted = false;
      if (ngModelCtrl) {
        ngModelCtrl.$parsers.push(function (viewValue) {
          return parseInt(viewValue);
        });
        ngModelCtrl.$formatters.push(function (viewValue) {
          setTimeout(function () {
            setValue(viewValue);
          });
          return viewValue;
        });
      }

      attrs.$observe('min', update);
      attrs.$observe('max', update);
      attrs.$observe('step', update);

      function setValue(value) {
        if (value) {
          slider.val(value).change();
        }
      }

      function update() {
        angular.element(el).rangeslider('update', true);
      }

      scope.$on('$destroy', function () {
        angular.element(el).rangeslider('destroy');
      });
    }
  }
});
