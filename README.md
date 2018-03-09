# EchoDrag By Echonessy

> this is my project

 
# 用法


``` bash
Html :

<!--格式如下-->
    <ul class="LeftBox" id="LeftBox">
        <li data-type="0" draggable="true" class="Bac24">输入框</li>
        <li data-type="1" draggable="true" class="BacA8">div</li>
        <li data-type="2" draggable="true" class="BacC0">图片</li>
        <li data-type="3" draggable="true" class="Bac28">按钮</li>
    </ul>
    <ul class="RightBox" id="RightBox"></ul>

Js:

<script>
    var Drag =  new EchoDrag();
    Drag.Config({
        OrgEle:'#LeftBox', // 左侧元素
        TargetEle:'#RightBox' //右侧目标
    });
</script>
```
## 效果图

![image](https://github.com/Echonessy/EchoSnake/blob/master/read/1.png)
![image](https://github.com/Echonessy/EchoSnake/blob/master/read/2.png)

#可定义右侧模板
``` bash
TypeEle:function (type) {
            var node = null;
            var that = this;
            switch (type) {
                case '0' :
                    node = document.createElement("li");
                    node.setAttribute('class','NewEle')
                    node.setAttribute('draggable',true)
                    var nodeIn=document.createElement("input");
                    nodeIn.value = '这是输入框元素'
                    node.setAttribute('data-type',type);
                    node.appendChild(nodeIn);
                    that.TargetEle.appendChild(node);
                    break;
                case '1' :
                    node = document.createElement("li");
                    node.setAttribute('class','NewEle')
                    node.setAttribute('draggable',true)
                    var nodeIn=document.createElement("div");
                    nodeIn.innerHTML = '这是div元素';
                    node.setAttribute('data-type',type);
                    node.appendChild(nodeIn);
                    that.TargetEle.appendChild(node);
                    break;
                case '2' :
                    node = document.createElement("li");
                    node.setAttribute('class','NewEle')
                    node.setAttribute('draggable',true)
                    var nodeIn=document.createElement("img");
                    nodeIn.setAttribute('alt','这是图片元素');
                    nodeIn.setAttribute('src','img/1.png');
                    node.setAttribute('data-type',type);
                    node.appendChild(nodeIn);
                    that.TargetEle.appendChild(node);
                    break;
                case '3' :
                    node = document.createElement("li");
                    node.setAttribute('draggable',true)
                    node.setAttribute('class','NewEle')
                    var nodeIn=document.createElement("button");
                    nodeIn.innerHTML = '这是按钮元素';
                    node.setAttribute('data-type',type);
                    node.appendChild(nodeIn);
                    that.TargetEle.appendChild(node);
                    break;
            }
            return false;
        }
```
