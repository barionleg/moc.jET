// メニュー
var url = window.location;
//var path = url.pathname.split('/');
// ↑上記でも同じですが現在ページURLのパス名のみです。？以降の文字列も取得しません。
var path_name = url.href.split('/');
console.log(path_name);
var file_name = path_name.pop();
console.log(file_name);
var file_name = file_name.slice(-4);
console.log(file_name);

// 日英

// サーバ名・パスを取得
var server = location.hostname;
console.log(server);			
var path = location.pathname;
console.log(path);

var href2 = url.href.split('/');
page_path_ary = href2.slice(3);
page_path_ary.pop();
page_path = page_path_ary.join('/');
// page_path = location.protocol + "//" + server + "/" + page_path + "/"
console.log(page_path);

var jp_url = location.protocol + "//www.tel.co.jp/" + page_path + "/"
var en_url = location.protocol + "//www.tel.com/"  + page_path + "/"
console.log(jp_url);
console.log(en_url);

$(function () {
	$('#jp_link').attr('href',jp_url);
	$('#en_link').attr('href',en_url);
});

// SNS
var classVal = $('body').attr('class');
console.log(classVal);
/*
if (classVal && classVal.match(/periodic_en/)) {
// 	var href =location.href;
	var href = location.protocol + "//www.tel.com/"  + page_path + "/";
	var sns_count_http = "http://www.tel.com"  + path;
	var sns_count_https = "https://www.tel.com"  + path;
} else {
*/
	var href = location.protocol + "//www.tel.com/"  + page_path + "/";
	var sns_count_http = "http://www.tel.com/"  + page_path + "/";
	var sns_count_https = "https://www.tel.com/"  + page_path + "/";
// }
console.log("sns: " + href);
var getTitle = $('title').html(); //2.ページのタイトルを取得

//3.URLを取得しエンコードする
var snsUrl = encodeURIComponent(href);
var snsTitle = encodeURIComponent(getTitle);

$(function(){
	$('.sns_link').each(function(){	
		// var sns_obj = $(this).attr('id'); 
		//4.ID名を取得
		var sns_obj = $(this).get(0).className.split(" ")[0];
		var snsCase = sns_obj;
		
		//5.IDを判定してリンク先を出力する
		switch (snsCase){
			/*
			case 'sns_line':
			$(this).attr('href','http://line.me/R/msg/text/?'+ snsTitle +'%20'+ snsUrl);
			break;
			*/
			case 'sns_hatebu':
			$(this).attr('href','http://b.hatena.ne.jp/entry/'+ snsUrl);
			break;
			
			case 'sns_fb':
			$(this).attr('href','http://www.facebook.com/sharer.php?u='+ snsUrl);
			break;
			
			case 'fb-like':
			$(this).attr('data-href', href);
			break;
			
			case 'sns_tw':
			$(this).attr('href','http://twitter.com/share?text='+ snsTitle + '&url='+ snsUrl);
			break;
			
			case 'sns_plus':
			$(this).attr('href','https://plus.google.com/share?url='+ snsUrl);
			break;
		}
	});
});

console.log(sns_count_http)
console.log(sns_count_https)

$.ajax({
	// オプションの指定
	url: '//graph.facebook.com/?id=' + encodeURIComponent(sns_count_https),
	dataType: 'jsonp' ,
	// 取得に成功した時の処理
	success:function( obj ) {
		var count = 0 ;
		//データが存在する場合だけ代入
		if( obj.share ) {
			count = obj.share.share_count ;
		}
		$('.fb_result .count').html( count );
	} ,
	//取得に失敗した時の処理
	error:function() {
		$('.fb_result .count').html(0);
		return false;
	} ,
	//完了した時の処理
	complete:function() {
		return false ;
	}
});

$.ajax({
url: 'https://b.hatena.ne.jp/entry.count?url=' + snsUrl ,
dataType: 'jsonp' ,
// 取得に成功した時の処理
success:function( count )
{
//データが存在しない場合は0扱い
if( typeof( count ) == 'undefined' || !count )
{
count = 0 ;
}
// シェアカウントをhtmlへ書き出す
$('.hb_result .count').html( count );
} ,
//取得に失敗した時の処理
error:function()
{
$('.hb_result .count').html(0);
return false;
} ,
//完了した時の処理
complete:function()
{
return false ;
}
}) ;

$(function() {
	$(".sns_popup").click(function(){
	window.open(this.href,"WindowName","width=600,height=500,resizable=yes,scrollbars=yes");
	return false;
	});
});

