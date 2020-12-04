let tableUtil = new TableUtil();

const search = document.getElementsByClassName('AmeUI-search')[0]
const input = document.getElementsByClassName('AmeUI-input')[0]

//监听输入框回车事件
input.addEventListener("keyup", function (event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        const inputStr = input.value.substring(0, input.value.length - 1)
        // 截取-1的长度是为了过滤最后换行符
        tableUtil.search(inputStr)
        input.value = ""
    }
});

// 输入框聚焦事件
input.onfocus = ()=>{
    search.style.boxShadow = '0px 0px 50px 20px rgb(231, 227, 227)'
}
input.onblur = ()=>{
    search.style.boxShadow = '0px 0px 50px 20px rgb(181,181,181)'
}

document.getElementsByClassName('AmeUI-search-icon')[0].onclick = InterfaceUtil.clickMsgBur