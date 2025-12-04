import React from 'react';

export const Message = () => {
    // show is use only in to show the message for some time 
    return (
        <>
      <h3 className='text-center text-green-400 text-4xl'>You are connected to database</h3>
    </>
    )
}
export const ErrorMessage = ({isVissible}) => {
    return (
    <>
      <h3 className='text-center text-red-400 text-4xl'>Sorry! Unable to connect to the database</h3>
    </>
    )
}

