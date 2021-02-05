import codes from './codes'

export const catalog = Object.freeze({
  errors:
  {
    input_missing_value: {
      code: codes.user_input,
      message: 'Value of field $FIELD is missing',
      message_es: 'El valor del campo $FIELD no se encuentra',
      log: 'Missing value: field=$FIELD'
    },
    input_invalid_value: {
      code: codes.user_input,
      message: 'Value of field $FIELD is not valid',
      message_es: 'El valor del campo $FIELD no es válido',
      log: 'Invalid value: field=$FIELD, value=$VALUE'
    },
    input_invalid_values: {
      code: codes.user_input,
      message: 'Value of fields $FIELDS are invalid',
      message_es: 'El valor de los campos $FIELDS no es válido',
      log: 'Invalid values: $VALUES'
    },
    input_positive_number: {
      code: codes.user_input,
      message: 'Value of field $FIELD needs to be a positive number',
      message_es: 'El valor del campo $FIELD debe ser un número positivo',
      log: 'Invalid value (positive number): field=$FIELD value=$VALUE'
    },
    input_invalid_date: {
      code: codes.user_input,
      message: 'Value of field $FIELD needs to be a valid date',
      message_es: 'El valor del campo $FIELD debe ser una fecha válida',
      log: 'Invalid date: field=$FIELD, value=$VALUE'
    },
    input_out_of_range: {
      code: codes.user_input,
      message: 'Value of field $FIELD is out of range ($MIN - $MAX)',
      message_es: 'El valor del campo $FIELD está fuera de rango ($MIN - $MAX)',
      log: 'Out of range: field=$FIELD, min=$MIN, max=$MAX'
    },
    input_greater_or_equal_than_field: {
      code: codes.user_input,
      message: 'Value of field $FIELD1 cannot be greater or equal than value of field $FIELD2',
      message_es: 'El valor del campo $FIELD1 no puede ser mayor al valor del campo $FIELD2',
      log: 'Greater or equal than field: field1=$FIELD1, field2=$FIELD2'
    },
    after_day: {
      code: codes.user_input,
      message: 'The date cannot be greater than the current one',
      message_es: 'La fecha no puede ser mayor que la actual',
      log: 'Invalid date: today=$TODAY date=$DATE'
    },
    before_day: {
      code: codes.user_input,
      message: 'The date cannot be greater than the current one',
      message_es: 'La fecha no puede ser menor que la fecha de inicio del crédito',
      log: 'Invalid date: startDateCredit=$STARTDATECREDIT date=$DATE'
    },
    input_only_one_allowed: {
      code: codes.user_input,
      message: 'Only one field from the ones inserted($FIELDS) is allowed, remove the one you are not going to use',
      message_es: 'Solamemte se permite usar uno de los campos ingresados($FIELDS), retire el valor que no usará',
      log: 'Only one field is allowed form fields=$FIELDS'
    }
  }
})
