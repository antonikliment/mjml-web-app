import React, { Component } from 'react'

const {  clipboard } = require('../../refactor/electron');

import { connect } from 'react-redux'
import { IconErr } from 'react-icons/io'
import {
  MdContentCopy as IconCopy,
  MdOpenInNew as IconOpen
} from 'react-icons/md'

import { setError } from 'reducers/error'
import { addAlert } from 'reducers/alerts'

import Modal from 'components/Modal'
import Button from 'components/Button'

import './style.scss'

@connect(
  state => ({
    error: state.error,
  }),
  {
    setError,
    addAlert,
  },
)
class ErrorModal extends Component {
  state = {
    // store a reference to error, to provide flash when modal is closing
    error: null,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.error && nextProps.error !== this.state.error) {
      this.setState({ error: nextProps.error })
    }
  }

  handleCopyStack = () => {
    const { error, addAlert } = this.props
    if (!error) {
      return
    }
    clipboard.writeText(error.stack)
    addAlert('Copied!', 'success')
  }

  render() {
    const { error, setError } = this.props

    const { error: errorCopy } = this.state

    const stack = errorCopy ? errorCopy.stack : ''

    return (
      <Modal isOpened={!!error} onClose={() => setError(null)} className="ErrorModal flow-v-20">
        <div className="d-f ai-c jc-c">
          <IconErr size={70} />
          <div>
            <b style={{ fontSize: 20 }}>{'Oops...'}</b>
            <br />
            {'Looks like something gone wrong.'}
          </div>
        </div>
        <div className="r">
          <Button ghost small className="ErrorModal--copy-btn" onClick={this.handleCopyStack}>
            <IconCopy className="mr-5" />
            {'Copy'}
          </Button>
          <pre>{stack}</pre>
        </div>
        <div className="d-f fd-c ai-c jc-c">
          <div className="mb-10">
            {'En error has been thrown in the application code. If you want, you can '}
            {'report it to the source code repository, so we can help you.'}
          </div>
          <Button
            primary
            onClick={() => window.open('https://github.com/mjmlio/mjml-app/issues', '_blank')}
          >
            <IconOpen className="mr-5" />
            {'Open the issues page'}
          </Button>
        </div>
      </Modal>
    )
  }
}

export default ErrorModal
