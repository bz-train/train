/**
 * Created by chenlei on 2018/7/12.
 */
import * as React from "react"
import {Component} from "react"
import {Form, Input,Select, Icon, message,Modal,
      Button,Table,Alert,DatePicker, 
} from 'antd'
import './index.scss'

const FormItem = Form.Item;
const Option = Select.Option;


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
      render:(tags:any)=>(
          <span>
              {
                  tags.map( (tag:any) => {
                      if(tag === '正常'){
                          return <Button style={{width:'60px',marginRight:'10px'}}>正常</Button>
                      }
                      else{
                          return  <a href="#"><span style={{color:'blue'}} key={tag}>禁用</span></a>
                      }
                    /* let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                      color = 'volcano';
                    }
                    return <Tag color={color} key={tag}>{tag.toUpperCase()}</Tag>; */
                  })
              }
          </span>
      )
  },{
      title:'操作',
      dataIndex:'operate',
      render:() => {
          return <a href="#" style={{color:'#000000a6'}}>
          <span className="iconfont icon-property"></span>
          </a>
      }
  }];
  const data = [{
    key: '1',
    number: 1,
    username: 'maijie', 
    account:'maojie',
    telnumber:18384125163,
    time:'2019/03/29',
    lastLogintime:'2019/03/27',
    creatTime:'2019/03/27',
    status:['正常', '禁用'],
    operate:'12'
  }, {
    key: '2',
    number: 2,
    username: '后台管理员', 
    account:'admin',
    telnumber:18384125163,
    time:'2019/03/29',
    lastLogintime:'2019/03/27',
    creatTime:'2019/03/27',
    status:['正常', '禁用'],
    operate:'12'
  },];




export default class Content extends Component<any,any> {
    constructor(props:any){
        super(props);
        this.state={
            visible: false,
            check:true,
            confirmLoading: false,
        }
    }
     handleButtonClick(e:any) {
        message.info('Click on left button.');
        console.log('click left button', e);
      }
      //model
      showModal = () => {
        this.setState({
          visible: true,
        });
      }

      handleOk = () => {
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
        console.log('Clicked cancel button');
        this.setState({
          visible: false,
        });
      }
       
     

      checkChange(){
          if(this.refs.psd != this.refs.psd2){
            alert(<Alert message="密码不一致" type="error" />)
              return;
          }
          else{
              console.log('密码相同')
          }

      }
    render() {
      // const { getFieldDecorator } = this.props.form;
      const tailFormItemLayout = {
        labelCol: {
          xs: { span: 6 },
          sm: { span: 6 },
        },
        wrapperCol: {
          xs: {
            span: 16,
            offset: 0,
          },
          sm: {
            span: 16,
            offset: 0,
          },
        },
      };
        return (     
            <div className="o-home-content">
               <div className='top'>  

                  <label htmlFor="username">人员姓名：</label> <Input id='username' className='inputs' size="large" placeholder="请输入人员姓名" /> 
                  <label htmlFor="name">账户名称：</label> <Input id='name' className='inputs' size="large" placeholder="请输入账户名称" /> 
                  <div className='centers'>
                  
                      <label htmlFor="select" className='labels'>账户状态：</label>        
                          <Select id='select' className='selects' defaultValue="全部">
                            <Option value="全部">全部</Option>
                            <Option value="Option1">Option1</Option>
                            <Option value="Option2">Option2</Option>
                          </Select>   
                  </div>    
               </div>
               <div className='right'>

                    <Button className='searchs' type="primary"><Icon type="search" />搜索</Button> 
                    <Button type="primary"  className='addnew' onClick={this.showModal} ghost> 
                        <Icon type="plus" />新增
                    </Button>
                     
                    <Modal
                        title="新增"
                        visible={this.state.visible}
                        confirmLoading={this.state.confirmLoading}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        okText="确认"
                        cancelText="取消"
                        >
                        <Form>
                            <Form.Item label="用户姓名："
                              {...tailFormItemLayout}>
                            {/* getFieldDecorator方法*/}
                              {(
                                <Input placeholder="请输入用户姓名"/>
                              )}
                            </Form.Item>
                            <Form.Item label="账户名称："
                              {...tailFormItemLayout}>
                              {(
                                <Input placeholder="请输入账户名称"/>
                              )}
                            </Form.Item>
                            <Form.Item label="初始密码："
                              {...tailFormItemLayout}>
                              {(
                                <Input.Password placeholder="请输入密码"/>
                              )}
                            </Form.Item>
                            <Form.Item label="再次输入："
                              {...tailFormItemLayout}>
                              {(
                                <Input.Password ref='psd' placeholder="请再次输入密码"/>
                              )}
                            </Form.Item>
                            <Form.Item label="手机号码："
                              {...tailFormItemLayout}>
                              {(
                                <Input placeholder="请输入手机号码"/>
                              )}
                            </Form.Item>
                            <Form.Item label="入职时间："
                              {...tailFormItemLayout}>
                              {(
                                <DatePicker  style={{width:'314px'}} placeholder="请选择入职时间"/>
                              )}
                            </Form.Item>
                        </Form>
                    
                       {/* <div className='divs' style={{marginLeft:'30px'}}>
                            <form>
                              <p>用户姓名：<Input style={{width:'300px'}} size="default" placeholder="请输入用户姓名" /></p>
                              <p>账户名称：<Input style={{width:'300px'}} size="default" placeholder="请输入账户名称" /></p>
                              <p>初始密码：<Input.Password ref='psd' name='firstPasswd' style={{width:'300px'}} size="default" placeholder="请输入密码" /></p>
                              <p>再次输入：<Input.Password ref='psd2' name='lastPasswd' style={{width:'300px'}} size="default" placeholder="请再次输入密码" /></p>
                              <p>手机号码：<Input style={{width:'300px'}} size="default" placeholder="请输入手机号码" /></p>
                              <p>入职时间：<DatePicker style={{width:'300px'}} placeholder="请选择入职时间"/></p>
                            </form>
                       </div>  */}
                    </Modal>
                 </div>
                <div className='clear'></div>
               <div className="down">
                  <Table columns={columns} dataSource={data} />
               </div>
            </div>
        );
    }
}
