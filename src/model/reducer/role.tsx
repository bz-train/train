import { add } from '../action/content'

const titles = {
    title:'Role组件'
}

//添加到role组件里
function ContentRole(state=titles,action:any){
    switch (action.type) {
        case add:
            return Object.assign({},state,{
                title:action.title
            })
        default:
            return state;
    }
}


export default ContentRole;
