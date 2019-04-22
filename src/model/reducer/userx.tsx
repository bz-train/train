import {ADD_USER,REMOVE_USER,DISABLE_USER,ABLE_USER,SEARCH_USER} from '../action/content';
import { message } from 'antd';

const tabelData:any = {
    data: [{
        number: 1,
        username: 'maojie', 
        account:'maojie',
        telnumber:18384125163,
        time:'2019/03/27',
        lastLogintime:'2019/03/27',
        creatTime:'2019/03/27',
        status:'正常',
        disable: true,
        operate:'12'
      }]
}

//reducer 根据老的state和action,生成新的state
// 为什么要深拷贝一个对象：因为reducer只能接收state,但不能改变state
function ContentUser(state:any=tabelData,action:any) {
    switch (action.type) {
        case ADD_USER:  {
            let newState = JSON.parse(JSON.stringify(state)) //深拷贝一个对象      
            newState.data.push(action.data) // 添加数据
            console.log('newState'+JSON.stringify(action.data))        
            return Object.assign({},state,{
                data:newState.data
          }) 
        }

        case REMOVE_USER: {
            let newStates = JSON.parse(JSON.stringify(state)) //深拷贝一个对象      
            newStates.data.splice(action.index,1) // 删除数据
            for (let i = 0; i < newStates.data.length; i++) {
                newStates.data[i].number = i + 1;          
            }
            return Object.assign({},state,{
                data:newStates.data
          }) 
        }
            
        case DISABLE_USER: {
            let newState = JSON.parse(JSON.stringify(state)) //深拷贝一个对象
            newState.data[action.disable].disable = false;
            console.log(newState.data[action.disable].disable)
            return Object.assign({},state,{
                data:newState.data
          }) 
        }
        
        case ABLE_USER : {
            let newState = JSON.parse(JSON.stringify(state)) //深拷贝一个对象
            newState.data[action.disable].disable = true;
            console.log(newState.data[action.disable].disable)
            return Object.assign({},state,{
                data:newState.data
          }) 
        }

        case SEARCH_USER: {
            let newState = JSON.parse(JSON.stringify(state)) //深拷贝一个对象
            let username = action.username;
            let name = action.name;
            let select = action.select;
            let states = [];
            for(var i=0;i<newState.data.length;i++){
                let usernames = newState.data[i].username.indexOf(username);
                let names = newState.data[i].account.indexOf(name);
                let selects = newState.data[i].status.indexOf(select);
                if(username.trim() !='' && usernames != -1){
                    console.log('搜索成功')
                    states.push(newState.data[i])
                }
                else if(name.trim() != '' && names != -1){
                    console.log('搜索成功')
                    states.push(newState.data[i])
                }
                else if(select.trim() != '' && selects != -1){
                    console.log('搜索成功')
                    states.push(newState.data[i])
                }
                else{
                    console.log('搜索失败')              
                }
            }
           
            return Object.assign({},state,{
                data:states
           }) 
        }
        default:
           return state
    }
}
export default ContentUser;