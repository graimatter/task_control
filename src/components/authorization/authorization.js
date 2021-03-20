import React from 'react'
import './authorization.css'

export default class Authorization extends React.Component {

    state = {
        name : '',
        pass: ''
    }

    sendData = () => {

        this.props.authHandler(btoa(`${this.state.name}:${this.state.pass}`))
    }

    inputNameHandler = (e) => {
        this.setState( {name : e.target.value} )
    }

    inputPassHandler = (e) => {
        this.setState( {pass : e.target.value} )
    }

    render() {

        const {name, pass} = this.state

        return (
            <div className='toast show toast__mod' role="alert" aria-live="assertive" aria-atomic="true">
                <div className='toast-header'>
                    <strong className='mr-auto'>Вход</strong>
                    <button type="button" className='ml-2 mb-1 close' data-dismiss="toast" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className='toast-body'>
                    <div className='form-group has-danger form__mod'>
                        <label className='form-control-label' for='inputValid'>Имя пользователя</label>
                        <input type='text' value = {name} className='form-control' id='inputValid' onChange = {this.inputNameHandler}/>
                    </div>
                    <div className='form-group has-danger form__mod'>
                        <label className='form-control-label' for='inputValid'>Пароль</label>
                        <input type='password' value = {pass} className='form-control' id='exampleInputPassword1' onChange = {this.inputPassHandler}/>
                        
                    </div>
                    <div className='but_wrap'>
                    <button type='button' className='btn btn-primary btn-sm enter' onClick = {this.sendData} >Вход</button>
                    </div>
                </div>
            </div>
        )
    }
}