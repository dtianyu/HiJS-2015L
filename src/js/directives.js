/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


var appDirectives = angular.module('appDirectives', []);

appDirectives.directive("showTab",
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function (e) {
                    e.preventDefault();
                    $(element).tab('show');
                    $(element).addClass("active");
                });
            }
        };
    }).directive("carousel", function () {
        return {
            link: function (scope, element, attrs) {
                alert(attrs.rol);
                //alert(attrs.data-ontent);
                var next = '#help a.carousel-next';
                var prev = '#help a.carousel-prev';
                $(element).parent().carouFredSel({
                    scroll: {
                        items: 1
                    },
                    auto: true,
                    next: {
                        button: next,
                        key: 'right'
                    },
                    prev: {
                        button: prev,
                        key: 'left'
                    }
                });
            }
        }
    }).directive("datepicker", function () {
        return {
            restrict: 'A',
            require: '?ngModel',
            scope: {
                select: '&'
            },
            link: function (scope, element, attrs, ngModel) {

                if (!ngModel)
                    return;

                var optDate = {};

                optDate.dateFormat = 'yy-mm-dd';

                var updateModel = function (dateText) {
                    scope.$apply(function () {
                        ngModel.$setViewValue(dateText);
                    });
                };

                optDate.onSelect = function (dateText, picker) {
                    updateModel(dateText);
                    if (scope.select) {
                        scope.$apply(function () {
                            scope.select({date: dateText});
                        });
                    }
                    ;
                };

                ngModel.$render = function () {
                    element.datepicker('setDate', ngModel.$viewValue || '');
                };

                element.datepicker(optDate);
            }
        };

    });


appDirectives.directive("qrcode",
    function () {
        return {
            link: function (scope, element, attrs) {
                element.qrcode({width: 200, height: 200, text: window.location.href});
            }
        };
    });

