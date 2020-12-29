class InterfaceUtil {
    static #waitingInput; // 正在等待输入的数据约束
    static #table = null; // 搜索到的正交表

    // 用户搜索信息之后修改界面
    static modifedUIAfterSearch(searchResList) {
        this.#table = searchResList
        const searchRes = document.getElementById('search-res')
        // 第一次的searchRes是隐藏的
        searchRes.style.opacity = "1"
        // 添加搜索结果
        searchRes.innerText = ""
        for (let i = 0; i < searchResList.length; ++i) {
            for (let j = 0; j < searchResList[i].length; ++j) {
                if (j != searchResList[j].length - 1) {
                    searchRes.innerText = searchRes.innerText + searchResList[i][j] + '\xa0'
                }
                if (j == searchResList[j].length - 1) {
                    searchRes.innerText = searchRes.innerText.substring(0, searchRes.innerText.length - 1)
                }
            }
            if (i != searchResList.length - 1) {
                searchRes.innerText = searchRes.innerText + '\n'
            }
        }
        // 添加标题
        const hintSpan = document.createElement('span');
        hintSpan.innerText = InterfaceUtil.getWaitingInput()
        const brAfterSpan = document.createElement('br')
        searchRes.prepend(brAfterSpan)
        searchRes.prepend(hintSpan)
        searchRes.onclick = this.clickFuntionBtn
        // 添加空隙

        const container = document.getElementById('container')
        container.style.height = ~~searchRes.offsetHeight + 500 + 'px'
    }

    // 用户点击按钮上传文件
    static clickFuntionBtn() {
        document.getElementById("uploadFile").click();
    }

    // 处理上传动作
    static handleUpload(obj) {
        ExcelUtil.parse(obj.files[0])
        setTimeout(() => {
            const data = ExcelUtil.getUploadFileObject(InterfaceUtil.getWaitingInput())
            if (data === null) return;
            const res = TableUtil.generateTestCases(this.#table, data, InterfaceUtil.getWaitingInput())
            ExcelUtil.downloadData(res, obj.files[0].name.substring(0, obj.files[0].name.length - 5) + '_TestCases.xlsx')
        }, 2000)
    }


    
    // 点击消息时候出发的事件
    static clickMsgBur() {
        window.open('./static/help.html')
    }

    // 用户点击麦克风
    static clickMicrophone() {
        WellJulyUI.addMsg('非常不好意思这个东西是一个装饰')
    }

    static getWaitingInput() {
        return this.#waitingInput;
    }

    static setWaitingInput(self) {
        this.#waitingInput = self
    }

    static getTable(){
        return this.#table
    }
}
