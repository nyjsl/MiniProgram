const app = getApp();

Page({
  data: {
    user: {},
    todos:[]
  },

  onLoad() {
    basement.user.getInfo().then(res => {
      if (res.success) {
        this.setData({ user: res.result });
      }
    }).catch(console.error);
  },

  onShow() {
    this.loadTodoList();
  },

  onTodoChanged(e) {
    if(this.deleting) return;

    const ids = e.detail.value;
    let changeTarget = null;

    for (const todo of this.data.todos) {
      if (todo.completed && !ids.includes(todo._id)) {
        changeTarget = {
          _id: todo._id,
          completed: false,
        }
      }
      if (!todo.completed && ids.includes(todo._id)) {
        changeTarget = {
          _id: todo._id,
          completed: true,
        }
      }
    }

    if (changeTarget) {
      this.changeComplate(changeTarget._id, changeTarget.completed).then(res => {
        if(res.success) {
          this.loadTodoList();
        }
      });
    }
  },

  deleteIcon(e){
    this.deleting = true;
    const id = e.currentTarget.dataset.id;

    this.deleteById(id).then(res => {
      if(res.success) {
        this.loadTodoList();
      }
    });

    setTimeout(()=>{
      this.deleting = false;
    },100);
  },

  addTodo() {
    my.navigateTo({ url: '../add-todo/add-todo' });
  },

  // 获得数据并加载当前用户 todo 列表
  loadTodoList(){
    basement.db.collection('todos').find(
      { userId: this.data.user.userId },
      { sort: { createTime: -1 } },
    ).then(({ result: todos }) => {
      this.setData({ todos });
      //小程序自定义埋点用法，详见 https://docs.alipay.com/mini/api/report
      my.reportAnalytics('miniDemo', {
        demoName: 'todo-basement',
        res: todos
      });
    }).catch(console.error);
  },

  // 删除当前的列表
  deleteById(_id){
    const that = this;
    return new Promise(function (resolve, reject) {
      
      // 确认和删除图片
      my.confirm({
        title: '删除 todo',
        content: '是否确认删除?',
        confirmButtonText: '删除',
        cancelButtonText: '取消',
        success: (result) => {
          if (result.confirm) {
            basement.db.collection('todos').deleteOne({
              _id,
              userId: that.data.user.userId,
            }).then(() => {
              resolve({ success: true });
            }).catch(err => {
              console.error(err);
              reject({ success: false });
            });
          }
        },
      });

    });
  },

  // 根据 id 改变当前 todo 状态
  changeComplate(_id, completed){
    return new Promise(function (resolve, reject) {

      basement.db.collection('todos').updateOne(
        { _id },
        {
          $set: {
            completed,
            completeTime: completed ? new Date() : false,
          }
        }
      ).then(() => {
        resolve({ success: true });
      }).catch(err => {
        console.error(err);
        reject({ success: false });
      });

    });
  }
});
