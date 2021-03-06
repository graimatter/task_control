import React from 'react'
import './but.css'

export default class ButPlay extends React.Component {

    play = (e) => {
        this.props.buttonEvent('play')
    }

    render() {
        return (
            <button type='button' className='btn btn-outline-success' onClick = {this.play}>
                <svg width='32' height='32' fill='currentColor' className='bi bi-play-btn' viewBox='0 0 16 16'>
                    <path d='M6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z' />
                    <path d='M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z' />
                </svg>
            </button>
        )
    }

}