import React, { ChangeEvent } from 'react'

type PropsType = {
  status: string
  updateUserStatus: (status: string) => void
}
type StateType = {
  editMode: boolean
  status: string
}

class ProfileStatusCC extends React.Component<PropsType, StateType> {
  state = {
    editMode: false,
    status: this.props.status,
  }
  activateEditMode = () => {
    this.setState({
      editMode: true,
    })
  }
  deactivateEditMode = () => {
    this.setState({
      editMode: false,
    })
    this.props.updateUserStatus(this.state.status)
  }

  onStatusChange = (text: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      status: text.currentTarget.value,
    })
  }

  componentDidUpdate(pervProps: PropsType) {
    if (pervProps.status !== this.props.status) {
      this.setState({
        status: this.props.status,
      })
    }
  }

  render() {
    return (
      <div>
        <div>
          {!this.state.editMode && (
            <span onDoubleClick={this.activateEditMode}>
              {this.props.status || '----------------'}
            </span>
          )}
        </div>
        <div>
          {this.state.editMode && (
            <input
              onChange={this.onStatusChange}
              autoFocus={true}
              onBlur={this.deactivateEditMode}
              value={this.state.status}
            ></input>
          )}
        </div>
      </div>
    )
  }
}

export default ProfileStatusCC
