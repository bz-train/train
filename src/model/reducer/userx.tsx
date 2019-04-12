import {ADD_USER} from '../action/content'

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

//reducer
function ContentUser(state:any=tabelData,action:any) {
    switch (action.type) {
        case ADD_USER:
            let newState = JSON.parse(JSON.stringify(state)) //深拷贝一个对象      
            newState.data.push(action.data) // 注意数据
            console.log('newState'+JSON.stringify(action.data))        
            return Object.assign({},state,{
                data:newState.data
            }) 
        default:
           return state;
    }
}
export default ContentUser;