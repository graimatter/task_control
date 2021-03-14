import React from 'react'
import './but.css'

export default class ButPause extends React.Component {


    pause = () => {
        this.props.buttonEvent('pause')
    }

    render() {
        return (
            <button type='button' className='btn btn-outline-warning' onClick = {this.pause} >
                <svg width="32" height="32" fill="currentColor" className='bi bi-pause-btn' viewBox="0 0 16 16">
                    <path d="M6.25 5C5.56 5 5 5.56 5 6.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C7.5 5.56 6.94 5 6.25 5zm3.5 0c-.69 0-1.25.56-1.25 1.25v3.5a1.25 1.25 0 1 0 2.5 0v-3.5C11 5.56 10.44 5 9.75 5z" />
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                </svg>
            </button>
        )
    }

}