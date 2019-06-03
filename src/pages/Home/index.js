import React, { Component } from 'react'
import cx from 'classnames'
import {
  MdCreateNewFolder as IconCreate,
  MdFileDownload as IconOpen
} from 'react-icons/md'
import { FaCog } from 'react-icons/fa'
import { connect } from 'react-redux'

import { addProject } from 'actions/projects'
import { openModal } from 'reducers/modals'

import Button from 'components/Button'
import MassActions from 'components/MassActions'
import ProjectsList from 'components/ProjectsList'
import GlobalSearch from 'components/GlobalSearch'

import './style.scss'

@connect(
  state => {
    return {
      projects: state.settings ? state.settings.get('projects') : [],
    }
  },
  {
    addProject,
    openModal,
  },
)
class HomePage extends Component {
  componentDidMount() {
    if (this.props.projects.size === 0) {
      this._newProjectBTN.focus()
    }
  }

  handleExportSelected = () => {
    this.props.exportSelectedProjectsToHTML()
    this.props.unselectAllProjects()
  }

  focusNew = () => this._newProjectBTN.focus()

  render() {
    const { addProject, openModal, projects } = this.props

    const hasProjects = !!projects.size

    return (
      <div
        className={cx({
          'fg-1 d-f fd-c p-10': hasProjects,
          'fg-1 z': !hasProjects,
        })}
      >
        <div className="flow-h-10 d-f ai-c">
          {hasProjects && <GlobalSearch className="fg-1" />}
          <Button
            ref={n => (this._newProjectBTN = n)}
            primary
            onClick={() => openModal('newProject')}
          >
            <IconCreate size={20} className="mr-5" />
            {'New project'}
          </Button>
          <Button style={{display: 'none'}}ghost onClick={() => addProject()}>
            <IconOpen size={20} className="mr-5" />
            {'Open project'}
          </Button>
          <Button ghost onClick={() => openModal('settings')}>
            <FaCog />
          </Button>
        </div>

        {hasProjects && (
          <div className="fg-1 d-f fd-c anim-enter-fade">
            <MassActions />
            <div className="fg-1 r mt-20">
              <ProjectsList />
            </div>
          </div>
        )}
      </div>
    )
  }
}

export default HomePage
