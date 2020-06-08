import React from 'react';
import s from './Form.module.css'

export const Input = ({ input, meta, ...props }) => {

  let hasError = undefined;
  switch (meta.error) {
    case 'Обязательное поле':
      hasError = meta.touched ? <span>{meta.error}</span> : null;
      break;

    default:
      hasError = meta.error ? <span>{meta.error}</span> : null;
      break
  }

  return (
    <div className={s.field}>
      <input {...props} {...input}></input>
      {hasError}
    </div>
  )
}

export const Textarea = ({ input, meta, ...props }) => {

  let hasError = undefined;
  switch (meta.error) {
    case 'Пустой текст':
      break;

    default:
      hasError = meta.error ? <span>{meta.error}</span> : null;
      break
  }

  return (
    <div className={s.field}>
      <textarea {...props} {...input}></textarea>
      {hasError}
    </div>
  )
}