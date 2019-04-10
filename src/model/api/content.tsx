import axios from '../../utils/axios';

export function getContentList(action:any) {
    const param = {
        ...action.param
    }
    return axios.post('/home/content',param)
    .then(function (result:any) {
        action.callback && action.callback(result.data)
        return result.data
    },function(error:any) {
        action.callback && action.callback([
            {
                title:'a',
                content:'aaaa'
            },
            {
                title:'b',
                content:'bbbbb'
            }
        ]);
    })
}
