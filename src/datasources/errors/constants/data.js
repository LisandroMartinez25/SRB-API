import codes from './codes'

export const catalog = Object.freeze({
  errors:
  {
    data_not_saved: {
      code: codes.object_not_saved,
      message: 'There was a problem storing the information',
      message_es: 'Ha ocurrido un problema al almacenar la información',
      log: 'Data not saved: $MESSAGE'
    },
    id_not_found: {
      code: codes.object_not_found,
      message: 'Object with id $ID not found',
      message_es: 'No se encontró el objeto [$ENTITY] con id $ID',
      log: 'Object not found: entity=$ENTITY, id=$ID'
    },
    index_not_found: {
      code: codes.object_not_found,
      message: 'Object with id $ID not found',
      message_es: 'No se encontró el objeto con id $ID',
      log: 'Object not found: entity=$ENTITY, index=$INDEX'
    },
    property_not_found: {
      code: codes.object_not_found,
      message: 'Object with property $PROPERTY not found',
      message_es: 'No se encontró el objeto con propiedad $PROPERTY',
      log: 'Object not found: entity=$ENTITY, PROPERTY=$PROPERTY'
    }
  }
})
