
var result = `
/*
 * 面试官你好，我是来自武汉科技大学的张子靖
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 *
*/
* {
    transition: all 1s;
}
html {
    font-size: 16px;
}
.code-wrapper {
    width: 50%;
    left: 0;
    position: fixed;
    height: 100%;
}
/* 调整一下代码框大小 */
#code {
    border:1px solid transparent;
    padding: 16px;
    overflow: hidden;
}
#code {
    left: 0;
    width: 100%;
    height:100%;
}
/* 让代码呼吸起来 */
#code{
  animation: breathe 1s infinite alternate-reverse;
}
/* 给代码加上一点点高亮 */
.token.comment {
    color: slategray;
}
.token.property {
    color: #f92672;
}
.token.selector {
    color: #a6e22e;
}

/*
* 现在正式开始写 Markdown 啦~
* 准备一张白纸
*/
#paper {
    background-color: #272822;
    position: fixed;
    right: 0;
    width: 50%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-item: center;
    padding: 24px;
    color: black;
}
#paper .content{
    background-color: #fff;
    width: 100%;
    height: 100%;
    overflow: auto;
}
`
var result2 = `
#paper {
}
`
var result3 = `
/* 使用一个库 marked.js 把 markdown 转化成 HTML*/
`
var result4 = `
/* 还差一点点 */
.markdown-body {
    padding: 16px;
    background-color: white;
    overflow: auto;
}

/* Done~ 简历完成啦~ */
`
var md = `
# 简历
个人简历

# 自我介绍
我叫 张子靖

1997年3月14日出生

来自武汉科技大学的应届生

自学前端半年

希望应聘贵公司前端开发实习生岗位

# 技能介绍
熟悉 JavaScript CSS HTML5

# 项目介绍
1. 武汉海绵城市计算程序

2. 动态简历


# 联系方式
- QQ 690072419

- Email 690072419@qq.com

- 手机 18827437802


`
function writeMarkdown(markdown,fn){
    let domMarkdown = document.querySelector('#paper .content')
    let n = 0
    let timer = setInterval(()=>{
        n = n+1
        domMarkdown.innerHTML = markdown.substring(0,n)
        domMarkdown.scrollTop = domMarkdown.scrollHeight
        if(n >= markdown.length){
            window.clearInterval(timer)
            fn.call()
        }
    },20)
}
function writeCode(prefix,code,fn){
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0
    let timer = setInterval(()=>{
        n = n+1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0,n), Prism.languages.css)
        domCode.scrollTop = domCode.scrollHeight
        styleTag.innerHTML = prefix + code.substring(0,n)
        if(n >= code.length){
            window.clearInterval(timer)
            fn.call()
        }
    },20)
}
writeCode('',result,()=>{
    createPaper(()=>{
        writeCode(result,result2,()=>{
            writeMarkdown(md,()=>{
                writeCode(result + result2,result3,()=>{
                    convertMarkdownToHtml(()=>{
                        writeCode(result + result2 + result3,result4,()=>{
                            console.log('Done')
                        })
                    })
                })
            })
        })
    })
})
function createPaper(fn){
    var paper = document.createElement('div')
    paper.id = "paper"
    var content = document.createElement('pre')
    content.className = "content"
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn.call()
}
function convertMarkdownToHtml(fn){
    var div = document.createElement('div')  
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.style = 'background-color:white'
    markdownContainer.replaceWith(div)
    fn && fn.call()
}
