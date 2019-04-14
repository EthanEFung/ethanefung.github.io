import React from 'react';
import Highlighter from 'react-syntax-highlighter'
import tomorrow from 'react-syntax-highlighter/dist/styles/hljs/tomorrow-night'

export default function Code(props) {
  return <Highlighter language='javascript' style={tomorrow}>{props.children}</Highlighter>
}

