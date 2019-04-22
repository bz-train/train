/**
 * Created by chenlei on 2018/7/12.
 */
import * as React from "react"
import {Component} from "react"
import {Form, Input,Select, Icon, message,Modal,
      Button,Table,Alert,DatePicker,Menu, Dropdown 
} from 'antd'
import FormNow from './form'
import './user.scss'
import {connect} from 'react-redux'
import * as addToUser from "../../model/action/content"
import {bindActionCreators} from 'redux'


const FormItem = Form.Item;
const Option = Select.Option;


class User extends Component<any,any> {
    constructor(props:any){
        super(props);
        console.log('state'+this.props.state)
        this.state={
            visible: false,
            check:true,
            confirmLoading: false,       
            formTime:'', 
            username:'',
            name:'',
            select:'',
        }
    }
     
    //子组件向父组件传值
    fn = (data:any) => {
      this.setState({
         //formTime属性改为从子组件传过来的值
         formTime:data  
      },() => {
        console.log('this.state.formTime'+this.state.formTime)
       })
      
    }

      //model
      showModal = () => {
        this.setState({
          visible: true,
        });
      }

      //model点击确认按钮
      handleOk = () => {
            console.log('modal 点击了ok事件')
            this.setState({
              visible:false
            })
            let forms = this.refs.getFormValue
            forms.validateFields((err:any, values:any) => {

              console.log('this.state.formTime'+this.state.formTime)
              if(!err){ 
                console.log(values);//这里可以拿到数据
                let data = values; 
                data.time = '2019/03/23'  //入职时间
                data.lastLogintime = '2019/3/27' //最后登录时间
                data.creatTime = this.state.formTime; //创建时间
                data.number = this.props.state.length+1 //序号
                data.status = '正常' //状态
                data.disable = true
                // this.props.actions()调用的是action里的函数 addToUser(data:any) 里面只有一个data参数
                this.props.actions.addToUser(    
                  data   
                  // type:'add_user',
                )
              }
            })
            this.setState({
              ModalText: 'The modal will be closed after two seconds',
              confirmLoading: true,
            });
            setTimeout(() => {
              this.setState({
                visible: false,
                confirmLoading: false,
              });
            }, 2000);
          
          }

      handleCancel = () => {
        this.setState({
          visible: false,
        });
      }
/* 
      checkChange(){
          if(this.refs.psd != this.refs.psd2){
            alert(<Alert message="密码不一致" type="error" />)
              return;
          }
          else{
              console.log('密码相同')
          }

      } */

      //删除数据
      removeData = (key:any) => {
        console.log('key'+key)
        this.props.actions.removeUser(key-1)
      }

      //表格禁用功能
      disAbleTable = (index: any) => {      
        this.props.actions.disableUser(index)
      }

      //表格不禁用功能
      ableTable = (index:any) => {
        this.props.actions.ableUser(index)
      }

      //设置表格行的className
      className = (record:any) => {
          console.log(record.disable)
          return record.disable === false ? 'table':''
      }

      //获取input框username的值
      UserValue = (e:any) => {
        console.log('e'+e.target.value)
        this.setState({
          username:e.target.value
        })
      }

      //获取input框name的值
      NameValue = (e:any) => {
        console.log('e'+e.target.value)
        this.setState({
          name:e.target.value
        })
      }

       //获取select框的值
       SelectValue = (e:any) => {
        console.log('e'+e)
        this.setState({
          select:e
        })
      }
      //搜索功能
      Search = () => {    
        //提交到redux里
        this.props.actions.searchUser(this.state.username,this.state.name,this.state.select)
      }

    render() {

        //定义表格
        const columns = [{
          title: '序号',
          dataIndex: 'number',
        }, {
          title: '用户名',
          dataIndex: 'username',
        }, {
          title: '账户名称',
          dataIndex: 'account',
        },{
            title:'手机号',
            dataIndex:'telnumber'
        },{
            title:'入职时间',
            dataIndex:'time'
        },{
            title:'最后登录时间',
            dataIndex:'lastLogintime'
        },{
            title:'创建时间',
            dataIndex:'creatTime'
        },{
            title:'状态',
            dataIndex:'status',
            render:(tags:any,record:any,index:any)=>(
                <span>
                  <Button onClick = {this.ableTable.bind(this,index)} style={{width:'60px',marginRight:'10px'}}>正常</Button>
                  <a href="#" onClick = {this.disAbleTable.bind(this,index)}><span style={{color:'blue'}}>禁用</span></a>
                </span>
            )
          },{
            title:'操作',
            dataIndex:'operate',
            render:(text:any,record:any) => {
              return <Dropdown key={record.number} overlay={menu(record.number)} style={{color:'#000000a6'}} placement="bottomLeft">
                        <span className="iconfont icon-property"></span>
                    </Dropdown>
             }
         }];
      
         const menu = (number:any) => (
            <Menu>
                <Menu.Item>
                   <a target="#" rel="noopener noreferrer" onClick={this.removeData.bind(this,number)}>删 除</a>
                </Menu.Item>
            </Menu>
         )

     return (     
        <div className="o-home-content">
            <div className='top'>  
                <label htmlFor="username">人员姓名：</label> <Input onChange={(e:any) => {this.UserValue(e)}} id='username' className='inputs' size="large" placeholder="请输入人员姓名" /> 
                <label htmlFor="name">账户名称：</label> <Input onChange={(e:any) => {this.NameValue(e)}} ref='name' id='name' className='inputs' size="large" placeholder="请输入账户名称" /> 
                <div className='centers'>
                    <label htmlFor="select"  className='labels'>账户状态：</label>        
                    <Select onChange={this.SelectValue} id='select' className='selects' ref='select' defaultValue="全部">
                      <Option value="全部">全部</Option>
                      <Option value="正常">正常</Option>
                      <Option value="禁用">禁用</Option>
                    </Select>   
                </div>    
            </div>
            <div className='right'>
                <Button className='searchs' type="primary" onClick = {this.Search.bind(this)}><Icon type="search"/>搜索</Button> 
                <Button type="primary"  className='addnew' onClick={this.showModal} ghost> 
                    <Icon type="plus" />新增
                </Button>
                {
                  this.state.visible? 
                  <Modal
                    title="新增"
                    visible={this.state.visible}
                    confirmLoading={this.state.confirmLoading}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确认"
                    cancelText="取消"
                    >
                    <FormNow ref="getFormValue" getTime={this.fn.bind(this)}/>
                  </Modal> : ''
                }         
                
              </div>
            <div className='clear'></div>
            <div className="down">
              <Table ref='table' rowKey = {record => record.number} columns={columns} rowClassName={this.className} dataSource={this.props.state} />
            </div>
        </div>
      );
    }
}
function mapStateToProps(state:any) {
    return {
      state: state.userx.data
    }
}

function mapDispatchToProps(dispatch:any,) {
  return {actions:bindActionCreators(addToUser,dispatch)} 
}


export default connect(mapStateToProps, mapDispatchToProps)(User)
