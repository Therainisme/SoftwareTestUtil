const self = this
let status = 0 // 0 是初始状态， 1是搜索状态，2是输入状态
let searchResList = []

class TableUtil {
    #table;

    constructor() {
        var request = null;
        if (window.XMLHttpRequest) {
            request = new XMLHttpRequest();
        } else if (window.ActiveXObject) {
            request = new ActiveXObject("Microsoft.XMLHTTP");
        }
        if (request) {
            request.open("GET", '/js/table.js', true);
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status == 200 || request.status == 0) {
                        this.#table = request.responseText.split('\n')
                        WellJulyUI.addMsg("成功读取正交表！")
                    }
                }
            }
            request.send(null);
        } else {
            WellJulyUI.addMsg("读取正交表失败")
        }
    }

    // 从正交表中搜索对应的内容
    search(target) {
        // 一行一行遍历
        for (let index = 0; index < this.#table.length; ++index) {
            // 2^3     n=4 <---- 它一般长这个样子，中间有五个空格
            if (target == this.#table[index].split('     ')[0]) {
                const n = this.#table[index].split('=')[1] // 找到n，向下阅读4行
                // 存储结果的List
                searchResList = []
                for (let i = 1; i <= n; ++i) {
                    searchResList.push(this.#table[index + i])
                }
                // 修改用户界面内容
                InterfaceUtil.setWaitingInput(target)
                InterfaceUtil.modifedUIAfterSearch(searchResList)    
                return;
            }
        }
        WellJulyUI.addMsg('没有找到相应的内容，请重新输入')
    }

    getTable() {
        return this.#table;
    }
}

//初始化正交表

