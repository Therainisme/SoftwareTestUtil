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
            request.open("GET", './js/table.js', true);
            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status == 200 || request.status == 0) {
                        this.#table = request.responseText.split('\n')
                        WellJulyUI.addMsg("成功读取正交表！" + "第一次使用请点击此处浏览文档。")
                    }
                }
            }
            request.send(null);
        } else {
            WellJulyUI.addMsg("读取正交表失败。点击这条消息以获取帮助。")
        }
    }

    // 从正交表中搜索对应的内容
    search(target) {
        // 一行一行遍历
        WellJulyUI.addMsg('你输入了：' + target)
        for (let index = 0; index < this.#table.length; ++index) {
            // 2^3     n=4 <---- 它一般长这个样子，中间有五个空格
            if (target == this.#table[index].split('     ')[0]) {
                const n = this.#table[index].split('=')[1] // 找到n，向下阅读4行
                // 存储结果的List
                const searchResList = []
                for (let i = 1; i <= n; ++i) {
                    searchResList.push(this.#table[index + i])
                }
                // 修改用户界面内容
                InterfaceUtil.setWaitingInput(target)
                InterfaceUtil.modifedUIAfterSearch(searchResList)
                return;
            }
        }
        WellJulyUI.addMsg('没有找到相应的内容，请重新输入。点击这条消息以获取帮助。')
    }

    // 根据正交表和输入生成测试用例
    static generateTestCases(table, data, format) {
        console.log(format)
        // 结果集
        const res = []
        // 添加表头
        const headList = []
        headList.push('序号')
        for (let head = 0; head < data.length; ++head) {
            headList.push(data[head][0])
        }
        res.push(headList)
        // 根据正交表生成测试用例
        for (let row = 0; row < table.length; ++row) {
            const line = []
            line.push(~~row + 1)
            for (let col = 0; col < table[row].length - 1; ++col) {
                line.push(data[col][~~table[row][col] + 1])
            }
            res.push(line)
        }
        return res
    }

    // 正交表每一列的最大值，结果是一个一维数组，记录的是每一个因素的水平值
    static getTableEdge() {
        const table = InterfaceUtil.getTable();
        const res = []
        for (let col = 0; col < table[0].length - 1; ++col) {
            let max = -1;
            for (let row = 0; row < table.length; ++row) {
                let target = table[row][col]
                if (target > max) max = target;
            }
            res.push(~~max + 1)
        }
        return res;
    }

    getTable() {
        return this.#table;
    }
}

//初始化正交表

