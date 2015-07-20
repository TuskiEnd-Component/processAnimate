
;(function($){
	var processAnimate=function(area){
		//保存当前对象
		var self=this;
		//组件外框
		this.area=area;
		this.setting={
			"autoPlay":true,//是否开启自动播放
			"num":"0",		//数字值
			"speed":10,	//动画速度，毫秒计
			"delay":0,	//动画延迟时间，毫秒
			"growth":1,	//每次增加幅度
			"height":"auto"	//组件高度
		};

		$.extend(this.setting,this.getSetting());
		//过滤非数字
		this.number=(this.setting.num+'').replace(/[^0-9+\-Ee.]/g, '');
		this.number=this.number<=100?this.number:100;
		this.setting.growth=this.setting.growth<=this.number?this.setting.growth:this.number;
		this.setting.growth=this.setting.growth>0?this.setting.growth:1;
		this.setting.speed=(this.setting.speed+'').replace(/[^0-9+\-Ee.]/g, '');
		this.setting.growth=(this.setting.growth+'').replace(/[^0-9+\-Ee.]/g, '');
		
		//执行动画
		if(this.setting.autoPlay===true){
			self.playAnimate();
		}
		else{
			this.playStatic();
		}
	    
	};

	processAnimate.prototype={
		//执行动画
		playAnimate:function(){
			var self=this;
			this.styleInit();
			var i = 0;
			var imgLeft="px";
			var timerOut=setTimeout(function(){
				var timer=setInterval(function () {
		            i=i+parseInt(self.setting.growth);
		            imgLeft = -(i * 44 + (i * 10)) + 'px';
		            if (i > parseInt(self.number)) {
		                i = parseInt(self.number);
		                clearInterval(timer);
		            }
		            else{
		            	self.area.css("backgroundPosition", imgLeft + '\t' + '0px');
		            	self.area.html(i+"%");
		            }
		        }, self.setting.speed);
			},this.setting.delay);
	        
		},
		//只放值不执行动画
		playStatic:function(){
			var self=this;
			this.styleInit();
			self.area.css("backgroundPosition",-(self.number * 44 + (self.number * 10))+'px'+ '\t'+'0px');
			self.area.html(self.number+"%");
		},
		//获取参数
		getSetting:function(){
			var setting=this.area.attr("data-setting");
			if(setting&&setting!=""){
				return $.parseJSON(setting);
			}
			else{
				return {};
			}
		},
		//样式声明
		styleInit:function(){
			var self=this;
			//设置行高
			self.area.css({
				"height":self.setting.height,
				"lineHeight":self.setting.height,
				"textAlign":"center",
				"margin":"0 auto"
			});
		}


	};

	processAnimate.init=function(areas){
		var _this_=this;
		areas.each(function(){
			new _this_($(this));
		});
	};
	//注册进window对象
	window["processAnimate"]=processAnimate;
})(jQuery);