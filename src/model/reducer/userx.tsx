import {adduser} from '../action/content'

/* const states = {
    account:'123',
    confirm:'11',
    telnumber:'1',
    time:'2019-3-21'
} */
const tabelData:any = []

// const statess = [1,2]

//reducer
function ContentUser(state:any=tabelData,action:any) {
    switch (action.type) {
        case adduser:
            let data = state.push(action.data)
            return Object.assign({},state,{
                data:data
            }) 
            /* const newState = JSON.parse(JSON.stringify(state))
            console.log('newState'+newState)
            newState.push({account:action.account,
            confirm:action.confirm,
            telnumber:action.telnumber,
            time:action.time})
            console.log(newState);
            console.log(state,action)
            return state */
        default:
           return state;
    }
}
export default ContentUser;