"use strict";var btn1=document.querySelector(".btn1"),btn2=document.querySelector(".btn2"),btn3=document.querySelector(".btn3"),btn4=document.querySelector(".btn4"),btn5=document.querySelector(".btn5"),btn6=document.querySelector(".btn6");btn1.onclick=function(){var o=this.parentNode.children[0].value;console.log(o),ajax({type:"post",data:o,url:"/api/load",success:function(o){console.log(o)}})},btn2.onclick=function(){var o=this.parentNode.children[0].value;console.log(o),ajax({type:"post",data:o,url:"/api/load",success:function(o){console.log(o)}})},btn3.onclick=function(){var o=this.parentNode.children[0].value;console.log(o),ajax({type:"post",data:o,url:"/api/load",success:function(o){console.log(o)}})},btn4.onclick=function(){var o=this.parentNode.children[0].value;console.log(o),ajax({type:"post",data:o,url:"/api/load",success:function(o){console.log(o)}})},btn5.onclick=function(){var o=this.parentNode.children[0].value;console.log(o),ajax({type:"post",data:o,url:"/api/load",success:function(o){console.log(o)}})},btn6.onclick=function(){var o=this.parentNode.children[0].value;console.log(o),ajax({type:"post",data:o,url:"/api/load",success:function(o){console.log(o)}})};