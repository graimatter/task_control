import React from 'react'
import './authorization.css'

export default class Authorization extends React.Component {

    state = {
        name: '',
        pass: '',
        fio: '',
        pass1: '',
        login: true,
        isFIOCorrect: true,
        isNameCorrect: true,
        isPassCorrect: true
    }

    checkData = () => {
        const { fio, name, pass, pass1 } = this.state
        let correct = true
        if (fio.trim().length < 8) {
            correct = false
            this.setState({ isFIOCorrect: false })
        }

        if (name.trim().length < 5) {
            correct = false
            this.setState({ isNameCorrect: false })
        }

        if (pass.trim().length < 8 || pass !== pass1) {
            correct = false
            this.setState({ isPassCorrect: false })
        }

        if (correct) {
            this.setState(
                {
                    isFIOCorrect: true,
                    isNameCorrect: true,
                    isPassCorrect: true
                }
            )
        }

        return correct
    }

    registration = () => {
        if (this.checkData()) {
            let pair = ''
            try {
                pair = btoa(`${this.state.name}:${this.state.pass}`)
            }
            catch {
                this.setState(
                    {
                        isNameCorrect: false,
                        isPassCorrect: false
                    }
                )
                return
            }
            if (this.props.regHandler({ fio: this.state.fio, userpass: pair })) {
                this.setState({
                    name: '',
                    pass: '',
                    fio: '',
                    pass1: '',
                    login: true,
                })
            }
        }
    }

    closeHandler = () => {
        this.props.closeMessage()
        if (!this.state.login) this.setState({
            isFIOCorrect: true,
            isNameCorrect: true,
            isPassCorrect: true,
            login: true,
            name: '',
            pass: '',
            fio: '',
            pass1: '',
        })
    }

    login = () => {
        let pair = ''
            try {
                pair = btoa(`${this.state.name}:${this.state.pass}`)
            }
            catch {
                this.setState(
                    {
                        isNameCorrect: false,
                        isPassCorrect: false
                    }
                )
                return
            }
        this.props.authHandler(pair)
    }

    turnReg = () => {
        this.setState({
            name: '',
            pass: '',
            fio: '',
            pass1: '',
            login: false
        })
    }

    inputNameHandler = (e) => {
        //const reg = /^\w+$/i
        //if (reg.test(e.target.value))
            this.setState({ name: e.target.value })
    }

    inputFIOHandler = (e) => {
        this.setState({ fio: e.target.value })
    }

    inputPassHandler = (e) => {
        //const reg = /^\w+$/i
        //if (reg.test(e.target.value))
            this.setState({ pass: e.target.value })
    }

    confirmPassHandler = (e) => {
        this.setState({ pass1: e.target.value })
    }

    render() {

        const { name, pass, login, fio, pass1, isFIOCorrect, isPassCorrect, isNameCorrect } = this.state
        const { registrationOk, authResult } = this.props

        let fioStyle = 'form-control'
        if (!isFIOCorrect) fioStyle = 'form-control is-invalid'
        let nameStyle = 'form-control'
        if (!isNameCorrect) nameStyle = 'form-control is-invalid'
        let passStyle = 'form-control'
        if (!isPassCorrect) passStyle = 'form-control is-invalid'
        return (

            <div className='toast show toast__mod' role="alert" aria-live="assertive" aria-atomic="true">
                <div className='toast-header'>
                    <strong className='mr-auto'>Вход\регистрация</strong>
                    <button type="button" className='ml-2 mb-1 close' data-dismiss="toast" aria-label="Close" onClick={this.closeHandler}>
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className='toast-body'>
                    {!login && !registrationOk &&
                        <div className='form-group has-danger form__mod'>
                            <input type='text' value={fio} className={fioStyle} id='inputValid' onChange={this.inputFIOHandler} autoComplete='off' placeholder='ФИО' />
                        </div>
                    }
                    {!registrationOk &&
                        <div className='form-group has-danger form__mod'>
                            <input type='text' value={name} className={nameStyle} id='inputValid' onChange={this.inputNameHandler} autoComplete='off' placeholder='Имя пользователя' />
                        </div>
                    }
                    {!registrationOk &&
                        <div className='form-group has-danger form__mod'>
                            <input type='password' value={pass} className={passStyle} id='exampleInputPassword1' onChange={this.inputPassHandler} autoComplete='off' placeholder='Пароль' />

                        </div>
                    }
                    {!login && !registrationOk &&
                        <div className='form-group has-danger form__mod'>
                            <input type='password' value={pass1} className={passStyle} id='exampleInputPassword1' onChange={this.confirmPassHandler} autoComplete='off' placeholder='Пароль еще раз' />

                        </div>
                    }
                    {login && !registrationOk &&
                        <div className='but_wrap'>

                            <button type='button' className='btn btn-primary btn-sm enter' onClick={this.login} >Вход</button>
                            <button type='button' className='btn btn-primary btn-sm reg' onClick={this.turnReg} >Регистрация</button>
                        </div>
                    }
                    {!login && !registrationOk &&
                        <div className='but_wrap'>

                            <button type='button' className='btn btn-primary btn-sm enter' onClick={this.registration} >Отправить</button>

                        </div>
                    }
                    {
                        !authResult && login &&
                        <div className="alert alert-dismissible alert-danger message__mod">

                            <strong>Неверный логин или пароль</strong>
                        </div>
                    }
                    {
                        registrationOk &&
                        <div className="alert alert-dismissible alert-success message__mod">

                            <strong>Регистрация выполнена!</strong> Сообщите администартору ваше ФИО для активации.
                        </div>
                    }
                </div>
            </div>

        )
    }
}