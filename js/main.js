// 2^4 4^1
// 2^3

let tableUtil = new TableUtil();

//监听输入框回车事件
const input = document.getElementById("input");
input.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        WellJulyUI.addMsg('你输入乐：' + input.value)
        // 截取-1的长度是为了过滤最后换行符
        tableUtil.search(input.value.substring(0, input.value.length - 1))
        input.value = ""
    }
});


setTimeout(() => {
    
}, 3000)