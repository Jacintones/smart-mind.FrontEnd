import React from 'react'

const InputTextCadastro = (props) => {
    
    const handleChange = (event) => {
        if (props.onChange) {
          props.onChange(event);
        }
      }

  return (
    <div className='flex flex-col justify-between h-[100px]'>
        <label className='mt-4 text-white text-xl f font-bold '>{props.label}</label>
        <input 
        className='border border-gray-400 rounded-3xl mr-7 px-4 h-[45px]  outline-none focus:border-2 focus:border-blue-500'
        type={props.type ?? 'text'}
        placeholder={props.placeholder}
        onChange={handleChange}
         />
        <span className='text-xs absolute mt-[73px] text-red-600'>{props.menssagemError}</span>
    </div>
  )
}

export default InputTextCadastro
