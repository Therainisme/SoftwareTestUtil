class ExcelUtil {
    static uploadFile
    static parse(file) {
        var reader = new FileReader();
        const self = this;
        reader.onload = (e) => {
            var data = e.target.result;
            var wb = XLSX.read(data, { type: "binary" });
            self.uploadFile = wb
        };
        reader.readAsBinaryString(file);
    }

    static getUploadFileObject() {
        const names = this.uploadFile.SheetNames
        const data = this.uploadFile.Sheets[names[0]]
        // 一行一行解析
        // format是几行几列 
        const rowAndcol = data['!ref']
        const row = this.letterToNumber(rowAndcol.split(':')[1])
        const col = rowAndcol.split(':')[1].replace(/[a-zA-Z]/g, '')
        // 开始纠错
        // 是否缺少
        const edge = TableUtil.getTableEdge();
        for (let factor = 1; factor <= row; ++factor) {
            for (let status = 1; status <= edge[factor - 1]; ++status) {
                const the = data[this.numberToletter(~~status + 1) + '' + (factor)];
                if (the === undefined) {
                    WellJulyUI.addMsg('发生错误！ 错误原因：第' + factor + '个因素填写错误。\n点击这条消息以获取帮助。')
                    return null;
                }
            }
        }
        // 是否多余
        let count = [];
        let fileMaxEdge;
        if (col > row) fileMaxEdge = col;
        else fileMaxEdge = row;
        for (let factor = 1; factor <= fileMaxEdge; ++factor) {
            let times = 0;
            for (let status = 2; status <= fileMaxEdge; ++status) {
                const the = data[this.numberToletter(~~status) + '' + (factor)];
                if (the !== undefined) {
                    times ++;
                }
            }
            count.push(times);
        }
        for (let i = 0; i < edge.length; ++i) {
            console.log(count[i] +'|'+ edge[i])
            if (count[i] !== edge[i]) {
                WellJulyUI.addMsg('发生错误！ 错误原因：第' + (~~i + 1) +'个因素长度不符合正交表内容。\n点击这条消息以获取帮助。')
                return null;
            }
        }
        
        // 查错结束
        // 创建结果数组
        WellJulyUI.addMsg('正在生成测试用例......')
        const res = []
        for (let i = 1; i <= row; ++i) {
            const line = []
            for (let j = 1; j <= col; ++j) {
                if (data[this.numberToletter(j) + '' + i] === undefined) {
                    line.push(null)
                } else {
                    line.push(data[this.numberToletter(j) + '' + i].v)
                }
            }
            res.push(line)
        }
        return res
    }

    static downloadData(data, fileName) {
        // console.log(data)
        let sheet = XLSX.utils.aoa_to_sheet(data);
        ExcelUtil.openDownloadDialog(ExcelUtil.sheet2blob(sheet), fileName)
    }

    // 将一个sheet转成最终的excel文件的blob对象，然后利用URL.createObjectURL下载
    static sheet2blob(sheet, sheetName) {
        sheetName = sheetName || 'sheet1';
        var workbook = {
            SheetNames: [sheetName],
            Sheets: {}
        };
        workbook.Sheets[sheetName] = sheet;
        // 生成excel的配置项
        var wopts = {
            bookType: 'xlsx', // 要生成的文件类型
            bookSST: false, // 是否生成Shared String Table，官方解释是，如果开启生成速度会下降，但在低版本IOS设备上有更好的兼容性
            type: 'binary'
        };
        var wbout = XLSX.write(workbook, wopts);
        var blob = new Blob([s2ab(wbout)], { type: "application/octet-stream" });
        // 字符串转ArrayBuffer
        function s2ab(s) {
            var buf = new ArrayBuffer(s.length);
            var view = new Uint8Array(buf);
            for (var i = 0; i != s.length; ++i) view[i] = s.charCodeAt(i) & 0xFF;
            return buf;
        }
        return blob;
    }

    static openDownloadDialog(url, saveName) {
        if (typeof url == 'object' && url instanceof Blob) {
            url = URL.createObjectURL(url); // 创建blob地址
        }
        var aLink = document.createElement('a');
        aLink.href = url;
        aLink.download = saveName || ''; // HTML5新增的属性，指定保存文件名，可以不要后缀，注意，file:///模式下不会生效
        var event;
        if (window.MouseEvent) event = new MouseEvent('click');
        else {
            event = document.createEvent('MouseEvents');
            event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        }
        aLink.dispatchEvent(event);
    }


    //TODO 两个字母的解析
    static letterToNumber(target) {
        return target.charCodeAt() - 65 + 1
    }

    static numberToletter(target) {
        return String.fromCharCode(65 + target - 1)
    }
}