export async function makeXML (serviceName, xsi, xsd, soap, xmlns, headers, values) {
  let params = ''

  Object.keys(values).forEach(param => {
    params += `<${param}>${values[param]}</${param}>`
  })

  let xml = `<?xml version="1.0" encoding="utf-8"?>

  <soap12:Envelope xmlns:xsi="${xsi}" xmlns:xsd="${xsd}" xmlns:soap12="${soap}">
  `
  if (headers) {
    let headersXML = ''

    Object.keys(headers).forEach(header => {
      headersXML += `<${header}>${headers[header]}</${header}>`
    })
    xml += `
    <soap12:Header>
      <SecurityEntity xmlns="${xmlns}">
          ${headersXML}
      </SecurityEntity>
    </soap12:Header>
    `
  }

  xml += `
      <soap12:Body>
          <${serviceName} xmlns="${xmlns}">
              ${params}
          </${serviceName}>
      </soap12:Body>
  </soap12:Envelope>
  `

  return xml
}
