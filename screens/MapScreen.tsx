import React from 'react'
import {  } from 'react-native'
import PDFReader from 'rn-pdf-reader-js'


export default class MapScreen extends React.Component {


  
  render() {
    return (
    <PDFReader
      source={{
        uri: 'https://www.clickdimensions.com/links/TestPDFfile.pdf',
      }}
    />
    )
  }
}
