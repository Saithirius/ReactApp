export const required = value => value ? undefined : 'Обязательное поле';
export const maxLength = max => value => (value && value.length > max) ? `Максимум ${max} символов` : undefined;
export const notEmpty = value => (value && value.trim()) ? undefined : `Пустой текст`;