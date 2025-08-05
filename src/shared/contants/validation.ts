export const shortFieldLengthMin = 3;
export const shortFieldLengthMax = 50;
export const longFieldLengthMax = 500;
export const imageSizeLimit = 2048 * 1024;
export const eMessageFieldMustBeNotEmpty = 'Поле не должно быть пустым';
export const eMessageFieldMustBeShort = `Поле должно содержать от ${shortFieldLengthMin} до ${shortFieldLengthMax} символов`;
export const eMessageFieldMustBeLong = `Поле должно содержать до ${longFieldLengthMax} символов`;
export const eMessageImageMustBeSmall = `Размер изображения не должен превышать ${imageSizeLimit / 1024 / 1024} Мб`;
