import codes from './codes'

export const catalog = Object.freeze({
  errors: {
    document_not_saved: {
      code: codes.file_not_saved,
      message: 'File was not saved',
      message_es: 'Tu archivo no se guardó',
      log: 'File was not saved reason = $REASON'
    }
  }
})
