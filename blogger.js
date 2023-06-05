/*
Unless otherwise indicated, all code below was written by Eric Costello,
and you are free to use, modify and distribute it. Please leave this 
comment block intact so that people can find the original unmodified
version at: http://www.glish.com/css/blogger/

Also see:
http://www.schwa.com
http://www.glish.com
*/

if (document.getElementById) { // kosher

	// get random RGB values so we can change background and link colors
	var r = Math.floor(Math.random()*241);
	var g = Math.floor(Math.random()*241);
	var b = Math.floor(Math.random()*241);
	
	// variables to hold the lighter shade RGB values
	var rp1, gp1, bp1, rp2, gp2, bp2, rp3, gp3, bp3;
	
	//we'll use these values to calculate lighter shades
	var p1 = .1;
	var p2 = .15;
	var p3 = .2;
	
	getLighterRGBShades();
	
	// get random intervals used to calculate the changing RGB values
	var ri = Math.floor(Math.random()*5);
	var gi = Math.floor(Math.random()*5);
	var bi = Math.floor(Math.random()*5);

	// read the cookie to get the proper font family, set to default Verdana if a first timer
	ff = readCookie('fontFamily');
	if (ff=='') ff='Verdana, Arial, Helvetica, sans-serif';

	// read the cookie to get the proper font size, set to default 12 if a first timer
	fs = parseInt(readCookie('fontSize'));
	if (!fs>0) fs=12;

	// set the appropriate font sizes for the relevant HTML elements
	// any other elements that you want to have a changeable font size must be added to this list
	// in the form "element_fs" and then also added to the setSizes and changeType functions
	var body_fs, h1_fs, h2_fs, h3_fs, h4_fs, h5_fs, h6_fs;
	
	setSizes();

	// lets write out styles with the changeable values that we get from the cookies
	// and the random rgb values. This will make the page display
	document.writeln('<style>');
	document.writeln('body{background:rgb('+r+', '+g+', '+b+');}');
	document.writeln('#banner{background:rgb('+rp1+', '+gp1+', '+bp1+');}');
	document.writeln('#centercontent{background:rgb('+rp2+', '+gp2+', '+bp2+');}');
	document.writeln('#rightcontent{background:rgb('+rp3+', '+gp3+', '+bp3+');}');
	document.writeln('body{font-size:'+body_fs+'px;}');
	document.writeln('body{font-family:'+ff+';}');
	document.writeln('h1{font-size:'+h1_fs+'px;}');
	document.writeln('h2{font-size:'+h2_fs+'px;}');
	document.writeln('h3{font-size:'+h3_fs+'px;}');
	document.writeln('h4{font-size:'+h4_fs+'px;}');
	document.writeln('h5{font-size:'+h5_fs+'px;}');
	document.writeln('h6{font-size:'+h6_fs+'px;}');
	document.writeln('a{color:rgb('+r+', '+g+', '+b+');}');
	document.writeln('a:hover{color:rgb('+r+', '+g+', '+b+');}');
	document.writeln('a:visited{color:rgb('+r+', '+g+', '+b+');}');
	document.writeln('input.textSizer{background:rgb('+r+', '+g+', '+b+');}');
	document.writeln('input.textSizer{border:rgb('+r+', '+g+', '+b+') 2px outset;}');
	document.writeln('<\/style>');
	}

// called from body onload
function init() {
	changeLinkColor();
	changeType();
	}
	
// this changes the sizes of the various elements relative to the fs
function setSizes() {
	body_fs = fs
	h1_fs = body_fs+6;
	h2_fs = body_fs+5;
	h3_fs = body_fs+4;
	h4_fs = body_fs+3;
	h5_fs = body_fs+2;
	h6_fs = body_fs+1;
	}

function changeType() {
	if (!document.getElementsByTagName) {return false;} // unclean! unclean!
	// because NS6 seems to freak out on abs. positionined divs
	// when you change a style property of the body, we have to
	// set the fontFamily and fontSize on div elements and not the body
	setStyleByTag('div','fontFamily',ff);
	setStyleByTag('div','fontSize',body_fs+'px');
	setStyleByTag('h1','fontSize',h1_fs+'px');
	setStyleByTag('h2','fontSize',h2_fs+'px');
	setStyleByTag('h3','fontSize',h3_fs+'px');
	setStyleByTag('h4','fontSize',h4_fs+'px');
	setStyleByTag('h5','fontSize',h5_fs+'px');
	setStyleByTag('h6','fontSize',h6_fs+'px');
	
	// store these values in cookies for subsequent page loads
	setCookie('fontSize',fs);
	setCookie('fontFamily',ff);
	}

// this function is called from the A+ button
function increaseSize() {
	fs+=1;
	setSizes();
	changeType();
	}

// this function is called from the A- button
function decreaseSize() {
	if (body_fs>1) {
		fs-=1;
		setSizes();
		changeType();
		}
	}

// This changes the links and body background color
function changeLinkColor() {
	if (!document.getElementsByTagName) {return false;} // unclean! unclean!
	if (r>239||r<1) ri=ri*-1;
	if (g>239||g<1) gi=gi*-1;
	if (b>239||b<1) bi=bi*-1;
	r+=ri;
	g+=gi;
	b+=bi;
	setStyleByTag('a','color','rgb('+r+', '+g+', '+b+')');
	setStyleById('body','background','rgb('+r+', '+g+', '+b+')');
	setStyleById('textUp','border','rgb('+r+', '+g+', '+b+') 2px outset');
	setStyleById('textUp','background','rgb('+r+', '+g+', '+b+')');
	setStyleById('textDown','border','rgb('+r+', '+g+', '+b+') 2px outset');
	setStyleById('textDown','background','rgb('+r+', '+g+', '+b+')');
	
	// now lets figure lighter shades and chaneg the background style property
	// of our banner, centercontent, and rightcontent divs. If you'd rather they
	//  stayed white, just get rid of the next block of code.
	getLighterRGBShades();
	setStyleById('banner','background','rgb('+rp1+', '+gp1+', '+bp1+')');
	setStyleById('centercontent','background','rgb('+rp2+', '+gp2+', '+bp2+')');
	setStyleById('rightcontent','background','rgb('+rp3+', '+gp3+', '+bp3+')');
	
	setTimeout('changeLinkColor()',400);
	}

function getLighterRGBShades() {
	rp1=parseInt((r*p1)+(255-(255*p1)));
	gp1=parseInt((g*p1)+(255-(255*p1)));
	bp1=parseInt((b*p1)+(255-(255*p1)));
	rp2=parseInt((r*p2)+(255-(255*p2)));
	gp2=parseInt((g*p2)+(255-(255*p2)));
	bp2=parseInt((b*p2)+(255-(255*p2)));
	rp3=parseInt((r*p3)+(255-(255*p3)));
	gp3=parseInt((g*p3)+(255-(255*p3)));
	bp3=parseInt((b*p3)+(255-(255*p3)));
	}

function writeControls() {	
	if (document.getElementsByTagName) { // kosher
		document.writeln('<h2>Customize\<\/h2>')
		document.writeln('<div class="padded">')
		document.writeln('<form action="" name="targeter" onsubmit="return false;">')
		document.writeln('<input type="button" id="textDown" class="textSizer" onclick="decreaseSize()" value="A-" \/> ')
		document.writeln('<input type="button" id="textUp" class="textSizer" onclick="increaseSize()" value="A+" \/>')
		document.writeln('<br \/><br \/>')
		document.writeln('<select onchange="if(this.selectedIndex>0) {ff=this.options[this.selectedIndex].value;changeType()}">')
		document.writeln('<option value="">change font:<\/option>')
		document.writeln('<option value="Arial, Helvetica">Arial<\/option>')
		document.writeln('<option value="Verdana, Arial, Helvetica, sans-serif">Verdana<\/option>')
		document.writeln('<option value="Georgia, Times Roman, serif">Georgia<\/option>')
		document.writeln('<option value="Lucida console, Monaco, monospace">Lucida<\/option>')
		document.writeln('<\/select><br \/><br \/>')
		document.writeln('<input type="checkbox" name="targetbox" id="targetbox" onclick="targetLinks(this.checked);" \/>')
		document.writeln('<label for="targetbox">links open windows<\/label>')
		document.writeln('<\/form><\/div>')
		}
	}

// cookie functions modified from code found at Alexei Kourbatov's javascripter.net/faq/
function setCookie(cookieName,cookieValue) {
	var today = new Date();
	var expire = new Date();
	expire.setTime(today.getTime() + 3600000*24*3000);
	document.cookie = cookieName+"="+escape(cookieValue) + ";expires="+expire.toGMTString();
	}
	
function readCookie(cookieName) {
	var theCookie=""+document.cookie;
	var ind=theCookie.indexOf(cookieName);
	if (ind==-1 || cookieName=="") return ""; 
	var ind1=theCookie.indexOf(';',ind);
	if (ind1==-1) ind1=theCookie.length; 
	return unescape(theCookie.substring(ind+cookieName.length+1,ind1));
	}

// thanks to randomwalks.com for this code
function targetLinks(boNew) {
	if (boNew) 
		where = "_blank";
	else
		where = "_self";
	for (var i=0; i<=(document.links.length-1); i++) {
		document.links[i].target = where;
		}
	}

// These 2 setstyle functions were modified from code by Steven Champeon found at
// http://developer.apple.com/internet/_javascript/styles.html

// setStyleByTag: given an element type, style property and value
// args:
//  e - element type or id
//  p - property
//  v - value
function setStyleByTag(e, p, v) {
	var elements = document.getElementsByTagName(e);
	for(var i = 0; i < elements.length; i++) {
		elements.item(i).style[p] = v;
		}
	}

// setStyleById: given an element id, style property and 
// value, apply the style.
// args:
//  i - element id
//  p - property
//  v - value
// 
function setStyleById(i, p, v) {
	var n = document.getElementById(i);
	n.style[p] = v;
}