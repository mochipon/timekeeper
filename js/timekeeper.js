$(function(){
	$('#time1').val('15:00');
	$('#time2').val('20:00');
	$('#time3').val('25:00');

	$('#info').html("定時進行にご協力ください")
	var audio_chime1,audio_chime2,audio_chime3;
	audio_chime1 = new Audio("./wav/chime1.wav");
	audio_chime2 = new Audio("./wav/chime2.wav");
	audio_chime3 = new Audio("./wav/chime3.wav");
	
	$('.nav #standby').click(function (){
		$('.nav li').removeClass('active');
		$('.nav li#standby').addClass('active');		
		$('#state').html('STANDBY');
		time_inner=(new Date('2011/1/1 00:00:00'));
		show_time();
	});
	
	var start_time=new Date();
	var last_time;
	$('.nav #start').click(function (){
		if($('.nav li#start').hasClass('active')){
			return;
		}
		$('.nav li').removeClass('active');
		$('.nav li#start').addClass('active');		
		$('#state').html('');
		start_time = new Date((new Date()).getTime() - (time_inner-(new Date('2011/1/1 00:00:00'))));
		last_time = null;
	});

	$('.nav #pause').click(function (){
		if($('.nav li#standby').hasClass('active')){
			return;
		}

		$('.nav li').removeClass('active');
		$('.nav li#pause').addClass('active');
		update_time();
		$('#state').html('PAUSED');
	});

	function resize_display() {
		var height=$('body').height();
		var width=$('body').width();
		var theight=Math.min(height*3/5,width*2/5);
		$('#time').css('top',theight/2+(height-theight)/2);
		$('#time').css('font-size',theight+'px');
		var sheight=theight/6;
		$('#state').css('top',height/2-theight/2-sheight/4);
		$('#state').css('font-size',sheight+'px');
		$('#state').css('line-height',sheight+'px');
		var iheight=sheight;
		$('#info').css('top',height/2+theight/2);
		$('#info').css('font-size',iheight+'px');
		$('#info').css('line-height',iheight+'px');
	}
	$(window).bind("resize", resize_display);

	$('#soundcheck').click(function (){
		audio_chime1.currentTime = 0;
		audio_chime1.play();
	});
	
	function show_time(){
		var time_str= ('00' +  time_inner.getMinutes()   ).slice(-2) + ':'
					+ ('00' +  time_inner.getSeconds() ).slice(-2);
		$('#time').html(time_str);
	}

	var time_inner = new Date('2011/1/1 00:00:00');
	function update_time(){
		var cur_time= new Date();
		var e=new Date((new Date('2011/1/1 00:00:00')).getTime()+(cur_time-start_time));
		time_inner=e;
		show_time();
	}
	
	$.timer(100,function(timer){
			resize_display();
			if($('.nav li#start').hasClass('active')){
				update_time();
				
				var cur_time= new Date();				
				if(last_time != null){
					var time1 = new Date(start_time.getTime()+((new Date('2011/1/1 00:'+$('#time1').val()))-(new Date('2011/1/1 00:00:00'))));
					var time2 = new Date(start_time.getTime()+((new Date('2011/1/1 00:'+$('#time2').val()))-(new Date('2011/1/1 00:00:00'))));
					var time3 = new Date(start_time.getTime()+((new Date('2011/1/1 00:'+$('#time3').val()))-(new Date('2011/1/1 00:00:00'))));
					
					if((last_time < time1 && time1 <= cur_time) || (last_time==time1 && cur_time==time1)){
						$('#info').html("残り７光年！");
						audio_chime1.play();
					}

					if((last_time < time2 && time2 <= cur_time) || (last_time==time2 && cur_time==time2)){
						$('#info').html("残り５光年！");
						audio_chime2.play();
					}
					
					if((last_time < time3 && time3 <= cur_time) || (last_time==time3 && cur_time==time3)){
						$('#info').html("ブラックホールに突入！<br>残り時間不明");
						audio_chime3.play();
					}

				}
				last_time=cur_time;
			}
	})
});
