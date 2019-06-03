import React, { Component } from 'react'
import { connect } from 'react-redux'

import { openProject, removeProject, renameProject, duplicateProject } from 'actions/projects'

import { toggleSelectProject } from 'reducers/selectedProjects'

// import CheckBox from 'components/CheckBox'
import ConfirmModal from 'components/Modal/ConfirmModal'

import RenameModal from './RenameModal'
import ProjectItem from './ProjectItem'

import './style.scss'

const HOME_DIR = '/ '

@connect(
  state => ({
    projects: state.projects || [],
    selectedProjects: state.selectedProjects,
    search: state.search,
  }),
  {
    openProject,
    removeProject,
    renameProject,
    toggleSelectProject,
    duplicateProject,
  },
)
class ProjectsList extends Component {
  state = {
    activePath: null,
    isDeleteModalOpened: false,
    isRenameModalOpened: false,
    shouldDeleteFolder: true,
  }

  componentWillUnmount() {
    this._isUnmounted = true
  }

  handleRemoveProject = path => e => {
    e.preventDefault()
    e.stopPropagation()
    this.safeSetState({
      activePath: path,
      isDeleteModalOpened: true,
    })
  }

  handleEditProjectName = path => e => {
    e.preventDefault()
    e.stopPropagation()
    this.safeSetState({
      activePath: path,
      isRenameModalOpened: true,
    })
  }

  handleConfirmRemove = () => {
    const { activePath, shouldDeleteFolder } = this.state
    const { removeProject } = this.props
    const isHome = activePath === HOME_DIR
    removeProject(activePath, isHome ? false : shouldDeleteFolder)
    this.handleCloseDeleteModal()
  }

  handleCloseDeleteModal = () =>
    this.safeSetState({
      activePath: null,
      isDeleteModalOpened: false,
    })

  handleChangeShouldDelete = shouldDeleteFolder => this.setState({ shouldDeleteFolder })

  handleCloseRenameModal = () =>
    this.safeSetState({
      activePath: null,
      isRenameModalOpened: false,
    })

  handleRename = newPath => {
    this.props.renameProject(this.state.activePath, newPath)
    this.handleCloseRenameModal()
  }

  safeSetState = (...args) => {
    if (this._isUnmounted) {
      return
    }
    this.setState(...args)
  }

  render() {
    const {
      openProject,
      projects,
      selectedProjects,
      toggleSelectProject,
      duplicateProject,
      search,
    } = this.props

    const { isDeleteModalOpened, isRenameModalOpened,  activePath } = this.state

    // const isHome = activePath === HOME_DIR

    const { text, results } = search
    const filteredProjects = text
      ? projects.reverse().filter(p => results.has(p.get('path')))
      : projects.reverse()

    return (
      <div className="ProjectsList abs o-n">
        {filteredProjects.map(p => {
          const projectPath = p.get('path')
          return (
            <ProjectItem
              key={p}
              p={p}
              isSelected={selectedProjects.indexOf(projectPath) > -1}
              onToggleSelect={() => toggleSelectProject(projectPath)}
              onRemove={this.handleRemoveProject(projectPath)}
              onOpen={() => openProject(projectPath)}
              onDuplicate={() => duplicateProject(projectPath)}
              onEditName={this.handleEditProjectName(projectPath)}
            />
          )
        })}
        {!!text &&
          !results.size && (
            <div className="pl-10">{`No projects matched the word \`${text}\``}</div>
          )}
        <ConfirmModal
          isOpened={isDeleteModalOpened}
          yepCTA={'Delete project'}
          nopCTA="Cancel"
          onCancel={this.handleCloseDeleteModal}
          onConfirm={this.handleConfirmRemove}
        >
          <h2 className="mb-20">{'Delete project folder?'}</h2>
        </ConfirmModal>
        <RenameModal
          isOpened={isRenameModalOpened}
          path={activePath}
          onCancel={this.handleCloseRenameModal}
          onConfirm={this.handleRename}
        />
      </div>
    )
  }
}

export default ProjectsList
