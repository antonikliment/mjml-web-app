import React, { Component } from 'react'
import pathModule from 'path'

import {
    deleteFile,
    readFile,
    writeFile,
    fileDialog,
    saveDialog,
    fsWriteFile
} from 'helpers/fs';

import { connect } from 'react-redux'
import { FaCog,FaFolderOpen } from 'react-icons/fa'
import {
  MdContentCopy as IconCopy,
  MdCode as IconCode,
  MdCameraalt as IconCamera,
  MdEmail as IconEmail,
  MdNoteAdd as IconAdd,
  MdAutorenew as IconBeautify
} from 'react-icons/md'

const { clipboard } = require('../../refactor/electron');

import beautifyJS from 'js-beautify'

import defaultMJML from 'data/defaultMJML'

import { openModal } from 'reducers/modals'
import { addAlert } from 'reducers/alerts'
import { setPreview } from 'actions/preview'



import Button from 'components/Button'
import ButtonDropdown from 'components/Button/ButtonDropdown'
import FilesList from 'components/FilesList'

import BackButton from './BackButton'
import SendModal from './SendModal'
import AddFileModal from './AddFileModal'
import RemoveFileModal from './RemoveFileModal'

import { takeScreenshot, cleanUp } from 'helpers/takeScreenshot'

@connect(
  state => ({
    preview: state.preview,
    previewSize: state.settings.get('previewSize'),
    beautifyOutput: state.settings.getIn(['mjml', 'beautify']),
  }),
  {
    openModal,
    addAlert,
    setPreview,
  },
)
class ProjectPage extends Component {
  state = {
    path: this.props.location.query.path,
    activeFile: null,
  }

  componentDidMount() {
    this._page.focus()
  }

  componentWillUnmount() {
    this.props.setPreview(null)
  }

  handleBeautify = () => this._editor.beautify()

  handlePathChange = path => this.setState({ path, activeFile: null })

  handleClickImport = () => {
    const p = fileDialog({
      defaultPath: this.props.location.query.path,
      properties: ['openFile'],
      filters: [{ name: 'All Files', extensions: ['mjml'] }],
    })

    if (!p) {
      return
    }
    // TODO
    readFile(p, { encoding: 'utf8' }, (err, res) => {
      if (err) {
        return
      }
      this._content = res
    })
  }

  handleAddFile = async fileName => {
    // Add req
    // try {
    //   await saveOnServer(fileName, defaultMJML);
    // } catch(err) {
    //   this.props.addAlert('Error creating file', 'error')
    //   throw new Error(err)
    // } finally {
    //
    //   this._filelist.refresh()
    // }

    writeFile(fileName, defaultMJML, err => {
      if (err) {
        this.props.addAlert('Error creating file', 'error')
        throw new Error(err)
      }
      this._filelist.refresh()
    })
  }

  handleRemoveFile = async fileName => {
    try {
      // if ((await trash(fileName)) === undefined) {
      //   throw new Error('No file was deleted')
      // }
      await deleteFile(fileName);
      this.props.addAlert('File successfully removed', 'success')
    } catch (e) {
      this.props.addAlert('Could not delete file', 'error')
      throw new Error(e)
    }

    this._filelist.refresh()
    this.setState({ activeFile: null })
  }

  handleOpenInBrowser = () => {
    console.warn("@TODO handleOpenInBrowser")
  }

  handleActiveFileChange = activeFile => this.setState({ activeFile })

  handleCopyHTML = () => {
    const htmlContent = this.getHTMLOutput()
    clipboard.writeText(htmlContent)
    this.props.addAlert('Copied!', 'success')
  }

  handleExportToHTML = async () => {
    const p = saveDialog({
      title: 'Export to HTML file',
      defaultPath: this.state.path,
      filters: [{ name: 'All Files', extensions: ['html'] }],
    })
    if (!p) {
      return
    }

    const { addAlert } = this.props

    const htmlContent = this.getHTMLOutput()

    await fsWriteFile(p, htmlContent)
    addAlert('Successfully exported HTML', 'success')
    this._filelist.refresh()
  }

  handleScreenshot = async () => {
    const { preview, previewSize, addAlert, location } = this.props

    const filename = pathModule.basename(this.state.activeFile.name, '.mjml')

    const [mobileWidth, desktopWidth] = [previewSize.get('mobile'), previewSize.get('desktop')]

    const [mobileScreenshot, desktopScreenshot] = await Promise.all([
      takeScreenshot(preview.content, mobileWidth, this.state.path),
      takeScreenshot(preview.content, desktopWidth, this.state.path),
    ])

    await cleanUp(this.state.path)

    await Promise.all([
      fsWriteFile(pathModule.join(location.query.path, `${filename}-mobile.png`), mobileScreenshot),
      fsWriteFile(
        pathModule.join(location.query.path, `${filename}-desktop.png`),
        desktopScreenshot,
      ),
    ])

    addAlert('Successfully saved mobile and desktop screenshots', 'success')
    this._filelist.refresh()
  }

  openSettingsModal = () => this.props.openModal('settings')
  openSendModal = () => this.props.openModal('send')
  openAddFileModal = () => this.props.openModal('addFile')

  getHTMLOutput() {
    const { preview, beautifyOutput } = this.props
    return beautifyOutput
      ? beautifyJS.html(preview.content, {
          indent_size: 2, // eslint-disable-line camelcase
          wrap_attributes_indent_size: 2, // eslint-disable-line camelcase
          max_preserve_newline: 0, // eslint-disable-line camelcase
          preserve_newlines: false, // eslint-disable-line camelcase
        })
      : preview.content
  }

  render() {
    const { preview } = this.props
    const { path, activeFile } = this.state

    const rootPath = this.props.location.query.path
    const projectName = pathModule.basename(rootPath)
    const isMJMLFile = activeFile && activeFile.name.endsWith('.mjml')

    return (
      <div className="fg-1 d-f fd-c o-n" tabIndex={0} ref={n => (this._page = n)}>
        <div className="d-f p-10 r" style={{ zIndex: 2 }}>
          <div className="fg-1 flow-h-10">
            <BackButton projectName={projectName} />
            <Button ghost onClick={this.openAddFileModal}>
              <IconAdd className="mr-5" />
              {'New file'}
            </Button>
          </div>
          <div className="d-f flow-h-10">
            {isMJMLFile && [
              <Button key="beautify" transparent onClick={this.handleBeautify}>
                <IconBeautify style={{ marginRight: 5 }} />
                {'Beautify'}
              </Button>,
            ]}
            <Button style={{display: 'none'}} transparent onClick={this.handleOpenInBrowser}>
              <FaFolderOpen style={{ marginRight: 5 }} />
              {'Open'}
            </Button>
            {preview &&
              preview.type === 'html' && [
                <Button key={'send'} transparent onClick={this.openSendModal}>
                  <IconEmail style={{ marginRight: 5 }} />
                  {'Send'}
                </Button>,
                <ButtonDropdown
                  ghost
                  key={'export'}
                  dropdownWidth={300}
                  actions={[
                    {
                      icon: <IconCopy />,
                      label: 'Copy HTML',
                      desc: 'Copy the result HTML to clipboard',
                      onClick: this.handleCopyHTML,
                    },
                    {
                      icon: <IconCode />,
                      label: 'Export to HTML file',
                      desc: 'Save the result HTML file to disk',
                      onClick: this.handleExportToHTML,
                    },
                    {
                      icon: <IconCamera />,
                      label: 'Screenshot',
                      desc: 'Save a screenshot of mobile & desktop result',
                      onClick: this.handleScreenshot,
                    },
                  ]}
                />,
              ]}
          </div>
          <Button
            className="ml-10"
            ghost
            onClick={this.openSettingsModal}
            ref={n => (this._btnSettings = n)}
          >
            <FaCog />
          </Button>
        </div>

        <div className="fg-1 d-f fd-c r" style={{ zIndex: 1 }}>
          <FilesList
            onRef={n => (this._filelist = n)}
            onEditorRef={n => (this._editor = n)}
            withPreview
            withHome
            rootPath={rootPath}
            path={path}
            activeFile={activeFile}
            onActiveFileChange={this.handleActiveFileChange}
            onPathChange={this.handlePathChange}
            onAddClick={this.openAddModal}
            onAddFile={this.handleAddFile}
            onRemoveFile={this.handleRemoveFile}
            focusHome
          />
        </div>

        <SendModal />
        <AddFileModal rootPath={path} onAdd={this.handleAddFile} />
        <RemoveFileModal rootPath={path} onRemove={this.handleRemoveFile} />
      </div>
    )
  }
}

export default ProjectPage
