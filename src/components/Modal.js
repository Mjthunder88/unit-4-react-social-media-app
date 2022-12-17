import React from 'react'

const Modal = (props) => {
 
    return (
        <>
        {props.modal && 
        <div className='modal'>
            <div className='overlay' onClick={props.toggleModal}></div>
            <div className='modal-content'>
                <h3>There was an error creating your account</h3>
                <button onClick={props.toggleModal} className='close-modal'>Close</button>
            </div>
        </div>
        }
        </>
    )
}

export default Modal 