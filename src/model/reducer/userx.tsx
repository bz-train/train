import {ADD_USER,REMOVE_USER} from '../action/content'

const tabelData:any = {
    data: [{
        number: 1,
        username: 'maojie', 
        account:'maojie',
        telnumber:18384125163,
        time:'2019/03/27',
        lastLogintime:'2019/03/27',
        creatTime:'2019/03/27',
        status:['正常', '禁用'],
        operate:'12'
      }]
}

//reducer 根据老的state和action,生成新的state
// 为什么要深拷贝一个对象：因为reducer只能接收state,但不能改变state
function ContentUser(state:any=tabelData,action:any) {
    switch (action.type) {
        case ADD_USER:
            let newState = JSON.parse(JSON.stringify(state)) //深拷贝一个对象      
            newState.data.push(action.data) // 添加数据
            console.log('newState'+JSON.stringify(action.data))        
            return Object.assign({},state,{
                data:newState.data
         }) 
        case REMOVE_USER:
            let newStates = JSON.parse(JSON.stringify(state)) //深拷贝一个对象      
            newStates.data.splice(action.index,1) // 删除数据
            for (let i = 0; i < newStates.data.length; i++) {
                newStates.data[i].number = i + 1;
            
            }
            console.log(newStates.data)
            console.log(newStates.data.length)
            return Object.assign({},state,{
                data:newStates.data
         })  
        default:
           return state;
    }
}
export default ContentUser;