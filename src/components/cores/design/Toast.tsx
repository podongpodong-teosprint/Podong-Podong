import React, { useState} from 'react';

type TypeMsg = {
    msg: string
}


export default function Toast({msg}: TypeMsg) {
    return (
        <div className="toast toast-middle toast-center z-50">
            <div className="bg-green min-w-[360px] p-4 rounded-2xl">
                <div className='text-center'>{msg}</div>
            </div>
        </div>
    )
}