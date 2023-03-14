//status bar style block
let bgcolor={
    paid:"rgba(51,214,159,0.08)",
    pending:"rgb(255, 143, 0,0.08)",
    draft:"rgb(151, 151, 151,0.08)"
}
let color={
    paid:"rgba(51,214,159)",
    pending:"rgb(255, 143, 0)",
    draft:"rgb(55, 59, 83)"
}
let theme="light";
window.addEventListener("load", (event) => {
    if(localStorage.getItem("theme")=="dark") sunchange(); else moonchange()
  });
document.querySelectorAll(".status").forEach(a=>
    {
        a.style.background=bgcolor[a.lastChild.textContent];
        a.style.color=color[a.lastChild.textContent];
    }
    )
    //////////////////////////////////////////////////////////
    //theme change function
    function sunchange()
    {
        localStorage.setItem("theme","dark");
        theme='dark'
        document.getElementById("themeicon").lastChild.src="assets/icon-sun.svg";
        document.getElementById("themeicon").setAttribute("onclick","moonchange()");
        document.querySelector(".whole_container").style.backgroundColor="#141625";
        $(".smallDiv,.statusEditDiv,.detailsDiv").css("background-color","#1E2139");
        $("h1,h3,.personId,.clientName,.totalStyle,#filterPara").css("color","white");
        $("count,.dueDate,.color1").css("color","#DFE3FA");
        $(".newInvoiceDivText1").css("color","#7C5DFA");
        $(".edit,#newInvoiceDiv,#newInvoiceDiv1").css({"background-color":"#252945","color":"#DFE3FA"});
        $(".filterBox,.addItem").css({"background-color":"#1E2139","color":"white"});
        $(".inputDiv1,#paymentTerm").addClass("darkMood");
        $(".amountDue").css({"background-color":"#0C0E16","color":"white"});
        document.querySelectorAll(".status").forEach(a=>
            {
                if(a.lastChild.textContent=="draft") a.style.color="#DFE3FA";
            }
            )
    }
    function moonchange()
    {
        localStorage.setItem("theme","light");
        theme="light";
        document.getElementById("themeicon").lastChild.src="assets/icon-moon.svg";
        document.getElementById("themeicon").setAttribute("onclick","sunchange()");
        document.querySelector(".whole_container").style.backgroundColor="#ffffff";
        $(".smallDiv,.statusEditDiv,.detailsDiv,#newInvoiceDiv,#newInvoiceDiv1").css("background-color","#FFFFFF");
        $("h1,h3,.personId,.totalStyle,#filterPara").css("color","0C0E16");
        $("count").css("color","#888EB0");
        $(".dueDate,.color1").css("color","7E88C3");
        $(".clientName").css("color","858BB2");
        $(".filterBox,.addItem").css({"background-color":"#FFFFFF","color":"black"});
        $(".inputDiv1,#paymentTerm").removeClass("darkMood");
        $(".amountDue").css({"background-color":"#373B53","color":"white"});
        document.querySelectorAll(".status").forEach(a=>
            {
                if(a.lastChild.textContent=="draft") a.style.color="#373B53";
            }
            )
    }
    
        ///////////////////////////////////////////////////
    //filter function
   function filterbarShow()
   {
    $("#filter").children("i").toggleClass("fa-chevron-down");
    $("#filter").children("i").toggleClass("fa-chevron-up");
    $(".filterBox").toggleClass("displayclass");
}
   function filtering(e)
   {
    let arr=[];
    if(document.getElementById("check1").checked==true)
    {
        arr.push("draft");
    }
    if(document.getElementById("check2").checked==true)
    {
        arr.push("pending");
    }
    if(document.getElementById("check3").checked==true)
    {
        arr.push("paid");
    }
    if((document.getElementById("check1").checked==false)&&(document.getElementById("check2").checked==false)&&(document.getElementById("check3").checked==false))
    {
        console.log((document.getElementById("check1").checked==false)&&(document.getElementById("check2").checked==false)&&(document.getElementById("check3").checked==false))
        document.querySelectorAll(".smalldiv").forEach(a=>
            {
                a.style.display="grid"
            })
    }
    else{
    document.querySelectorAll(".smalldiv").forEach(a=>
        {
            a.style.display="none";
            if(arr.includes(a.children[4].lastChild.textContent))
            {
                a.style.display="grid";
            }
        })
    }
   }
   $(document).ready(function(){
    $("#newInvoice,.Discard").click(function(){
        $(".darkshadow").toggleClass("dislplayclass");
        $("#newInvoiceDiv").animate({
            width: "toggle",
            display:"grid"
        });
})
$("#delete").click(function(){
    $(".darkshadow").removeClass("dislplayclass");
    $(".alertDiv").css("display","flex");
})
$("#cancel").click(function(){
    $(".darkshadow").addClass("dislplayclass");
    $(".alertDiv").css("display","none");
})
$(".additem").click(function(){
    document.querySelector(".itemListWholeDiv").innerHTML+='<div class="grid_itemDiv"><input type="text" class="inputDiv1 "name="name" required/><input type="number" class="inputDiv1" name="quantity" required onchange="gettotal(this)"/><input type="number" class="inputDiv1" name="price" required min="0" onchange="gettotal1(this)"/><div class="inputDiv1 total"></div><i class="fa-solid fa-trash trash" onclick="trash(this)"></i></div>'
    if(theme=="dark")
    {
        $(".inputDiv1,#paymentTerm").addClass("darkMood");
    }
});
});
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const product = urlParams.get('id')
$(document).ready(function(){
    $("#edit,.Cancel").click(function(){
        $(".darkshadow").toggleClass("dislplayclass");
        $("#newInvoiceDiv1").animate({
            width: "toggle",
            display:"grid"
        });
    });
     $(".fa-trash").click(function(){
        console.log(this);
     })
});
function trash(s)
{
    s.parentElement.remove();
}
function gettotal(z)
{
    z.parentElement.children[3].textContent=z.value*z.parentElement.children[2].value;
}
function gettotal1(z)
{
    z.parentElement.children[3].textContent=z.value*z.parentElement.children[1].value;
}
function goback()
{
    window.history.back();
}
function alertDivshow(){
    setTimeout(() => {
        document.location.reload();
        console.log("ghjk");
      }, 3000); 
}
console.log("hjk");
