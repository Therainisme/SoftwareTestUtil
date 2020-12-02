class InterfaceUtil {
    // 0 -> 默认
    // 1 -> 浏览目标正交表
    static #status = 0;
    static #waitingInput; // 正在等待输入的数据约束

    // 用户搜索信息之后修改界面
    static modifedUIAfterSearch(searchResList) {
        const searchRes = document.getElementById('search-res')
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
        //添加按钮
        const button = document.createElement('div');
        button.id = 'button'
        button.className = 'box'
        button.onclick = this.clickFuntionBtn
        button.innerHTML = "上传"
        searchRes.appendChild(button)
        // 修改用户状态
        InterfaceUtil.setStatus(1);
    }

    // 用户点击按钮
    static clickFuntionBtn() {
        
    }

    // 用户点击麦克风
    static clickMicrophone() {
        WellJulyUI.addMsg('非常不好意思这个东西是一个装饰')
    }

    static getStatus() {
        return this.#status;
    }

    static setStatus(self) {
        this.#status = self
    }

    static getWaitingInput() {
        return this.#waitingInput;
    }

    static setWaitingInput(self) {
        this.#waitingInput = self
    }
}


