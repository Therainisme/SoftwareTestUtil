class WellJulyUI{
    static addMsg(text) {
        const box = document.createElement('div')
        box.className = 'AmeUI-bur box'
        const fisrtLine = document.createElement('p')
        fisrtLine.className = 'AmeUI-text AmeUI-text-title'
        const secondeLine = document.createElement('p')
        secondeLine.className = "AmeUI-text AmeUI-text-p"
        const avatar = document.createElement('img')
        avatar.src = "http://therainisme.com:1225/Therainisme/img/avatar.jpg"
        avatar.className = "AmeUI-img"
        const timeTag = document.createElement('span')
        timeTag.className = "AmeUI-text-end"
        //创建然后加入container中
        fisrtLine.innerText = "\xa0 Therainisme"
        fisrtLine.prepend(avatar)
        fisrtLine.appendChild(timeTag)
        timeTag.innerText = "现在"
        secondeLine.innerText = text
        box.appendChild(fisrtLine)
        box.appendChild(secondeLine)
        document.getElementById('container').appendChild(box)
        setTimeout(() => {
            box.style.top = '10px'
            setTimeout(() => {
                box.style.top = '-150px'
                setTimeout(() => {
                    // document.getElementById('container').remove(box)
                }, 1000)
            }, 5000)
        }, 50)
    }
}





