/**
 * Created by Echonessy on 2018/3/5.
 */
window.EchoDrag = (function () {
    var InitDrag = function () {};
    InitDrag.prototype={
        //参数
        Config:function (params) {
            this.OrgEle = document.querySelector(params.OrgEle); // 绑定元素
            this.OrgEleLi = this.OrgEle.getElementsByTagName('li');
            this.TargetEle = document.querySelector(params.TargetEle); // 绑定元素
            this.TargetEleLi = this.TargetEle.getElementsByTagName('li');
            this.EleType = null;
            this.DragEle = null;
            this.Init();
        },
        // 初始化
        Init:function () {
            this.LeftDragEvt();
            this.DragOverEvt();
        },
//            左侧拖拽
        LeftDragEvt:function () {
            var that = this;
            var OrgEleLiLen = this.OrgEleLi.length;
            if (OrgEleLiLen == 0) {
                return false;
            }
            for (var i=0;i<OrgEleLiLen;i++) {
                this.OrgEleLi[i].addEventListener('dragstart',function (e) {
                    that.EleType = this.getAttribute('data-type');
                    that.stopBubble(e)
                })
                this.OrgEleLi[i].addEventListener('dragend',function (e) {
                    that.stopBubble(e)
                    that.EleType = null;
                })
            }
        },
//            目标元素进入之后
        DragOverEvt:function () {
            var that = this
            this.TargetEle.addEventListener('dragover', function(e) {
                //阻止浏览器默认行为
                e.preventDefault();
                e.stopPropagation();
                that.stopBubble(e)
                //设置鼠标样式
                e.dataTransfer.dropEffect = 'move';
                that.ChangeSite(e)
                return false;
            });
            this.TargetEle.addEventListener('drop', function(e) {
                //阻止默认行为
                e.preventDefault();
                e.stopPropagation();
                that.stopBubble(e)
                that.TypeEle(that.EleType);
                that.AddDragEvt();
            });
        },
//            绑定内嵌元素拖拽
        AddDragEvt:function () {
            var that = this;
            var TargetEleLiLen = this.TargetEleLi.length;
            if (TargetEleLiLen == 0) {
                return false;
            }
            for (var i=0;i<TargetEleLiLen;i++) {
                this.TargetEleLi[i].addEventListener('dragstart',function (e) {
                    that.stopBubble(e);
                    that.DragEle = this;
                })
                this.TargetEleLi[i].addEventListener('dragend',function (e) {
                    that.DragEle = null;
                })
            }
        },
//            内嵌元素拖拽改变位置
        ChangeSite:function (e) {
            if(this.DragEle) {
                var MouseY = e.clientY - this.TargetEle.offsetTop;
                var ThisEleTop = this.DragEle.offsetTop+(this.DragEle.offsetHeight/2);
                var TargetEleLiLen = this.TargetEleLi.length;
                var IsUp = MouseY-ThisEleTop<=0? true:false; //上为true，下为false；
                var UpArr = [];
                var DownArr = [];
                var End = 0;
                console.log(' ')
                for(var j=0;j<TargetEleLiLen;j++) {
                    var SibTop = this.TargetEleLi[j].offsetTop+(this.TargetEleLi[j].offsetHeight/2);
                    var End = 0;
                    var IsInDown = MouseY-SibTop>=0?true:false;
                    if (IsInDown) {
                        DownArr.push(j);
                        console.log('在第'+(j+1)+'之后↓')
                    } else {
                        UpArr.push(j);
                        console.log('在第'+(j+1)+'之前↑↑')
                    }
                }

                if(UpArr.length == TargetEleLiLen) {
                    End = 0;
                } else if(DownArr.length == TargetEleLiLen) {
                    End = TargetEleLiLen-1;
                } else {
                    End = UpArr[0];
                }

                console.log('应该放在第'+(End+1)+'个位置')
                console.log(' ');
                if(End == TargetEleLiLen-1) {
                    this.TargetEle.appendChild(this.DragEle)
                } else {
                    if(TargetEleLiLen>2) {
                        if(MouseY>=ThisEleTop) {
                            this.TargetEle.insertBefore(this.DragEle,this.TargetEleLi[End+1]);
                        } else {
                            this.TargetEle.insertBefore(this.DragEle,this.TargetEleLi[End]);
                        }
//
                    } else {
                        this.TargetEle.insertBefore(this.DragEle,this.TargetEleLi[End]);
                    }
//
                }
            }
        },
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
        },
        stopBubble:function(evt) {
            var evt = evt||window.event;
            if (evt.stopPropagation) {
                evt.stopPropagation();
            }
            else {
                window.event.cancelBubble = true;
            }
        }
    };
    return InitDrag;
})();