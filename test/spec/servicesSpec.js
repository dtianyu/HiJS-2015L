/**
 * Created by Kevin on 2015/7/17.
 */

describe('Training Service Test', function () {

    //var Training;
    //beforeEach(angular.module('appServices'));
    //
    //it('Can Training Get JSON Data',function(){
    //    var t = Training.query();
    //    expect(t).eq(0);
    //})

    var Help;
    beforeEach(angular.module('appServices'));

    beforeEach(inject(function(_Help_){
        Help = _Help_;
    }));

    it('Can Help Get JSON Data',function(){
        var t = Help.get('1006');
        expect(t===undefined);
    })

});
