/**
 * Created by zjf on 2016/11/12.
 */
var app = angular.module("myApp",[]);
app.controller('cartController',function($scope){
    //模拟数据源
    $scope.data = [
        {"id":"00001",'name':'苹果7','price':'6999','status':'已发货','date':'2016-11-11' },
        {"id":"00002",'name':'华为P9','price':'3999','status':'已发货','date':'2016-11-11' },
        {"id":"00003",'name':'三星S7','price':'4999','status':'已发货','date':'2016-11-11' },
        {"id":"00004",'name':'苹果7Plus','price':'7999','status':'已接单','date':'2016-11-12' },
        {"id":"00005",'name':'小米','price':'1999','status':'处理中','date':'2016-11-12' },
        {"id":"00006",'name':'sonyZ5','price':'4399','status':'已发货','date':'2016-11-11' },
        {"id":"00007",'name':'Ipad4','price':'2299','status':'已发货','date':'2016-11-15' }
    ];
    $scope.delete2 = function(index){
        console.log(index);
        $scope.data.splice(index,1);
    }
    //删除某一条列表
    $scope.delete = function(id){
        var _index = -1;
    	angular.forEach($scope.data,function(item,index){//遍历找出对应id的索引
    		if(item.id == id){
                _index = index;
            }
    	})
    	if(_index != -1){
    		$scope.data.splice(_index,1);
    	}
        
    }
    /*
     * 排序
     */
    $scope.orderType = "id";
    $scope.order = '-';//默认降序
    $scope.changeOrder = function(type){
        $scope.orderType = type;
        if($scope.order == ''){
            $scope.order = "-";
        }
        else {
            $scope.order = "";
        }
    }
});