import React, { Component } from 'react'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTarget } from 'react-dnd'
import Octicon from './Octicon'

import { convert } from '../api'

const {
  blue: BLUE,
  offwhite,
  black: BLACK,
  transBlack,
  grey,
} = require('../helpers/colors')

const drop = (props, monitor, component) => {
  const { files } = monitor.getItem()
  const filtered = files.filter(file => file.type.includes('image'))

  if (filtered.length) {
    const [ref] = filtered

    // where to place output file
    const outputPath = ref.path.slice(0, ref.path.length - ref.name.length)

    component.setState({
      status: 'CONVERTING'
    })

    convert({
      files: filtered.map(f => f.path),
      outputPath
    }).then(() => {
      component.setState({
        status: 'DONE'
      })
      setTimeout(() => {
        component.setState({
          status: 'IDLE'
        })
      }, 3000)
    }).catch(() => {
      component.setState({
        status: 'FAILED'
      })
      setTimeout(() => {
        component.setState({
          status: 'IDLE'
        })
      }, 3000)
    })
  } else component.setState({ status: 'IDLE' })
}

const style = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: '16px',
    padding: '40px 16px',
    width: 'calc(100% - 30px)',
    height: `calc(${100 / 1}% - 30px)`,
    backgroundColor: offwhite,
    border: `3px dashed ${grey}`,
    borderRadius: '8px'
  }
}

class Sanitizer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: 'IDLE'
    }

    this.isHover = this.isHover.bind(this)
    this.getIconObject = this.getIconObject.bind(this)
    this.getMessage = this.getMessage.bind(this)
  }

  isHover() {
    return this.props.isOver && this.state.status !== 'CONVERTING'
  }

  getMessage() {
    switch (this.state.status) {
      case 'IDLE': return (
        <div>
          <h1>
            { this.isHover() ? 'Drop' : 'Drag & drop' }
          </h1>
          <p className="detail">your files here to convert</p>
        </div>
      )
      case 'CONVERTING': return (
        <div>
          <h1>
            Converting
          </h1>
          <p className="detail">(this should only take a sec)</p>
        </div>
      )
      case 'DONE': return (
        <div>
          <h1>
            Complete!
          </h1>
          <p className="detail">testFile.pdf created</p>
        </div>
      )
      case 'FAILED': return (
        <div>
          <h1>
            Conversion failed
          </h1>
          <p className="detail">Uh oh, something went wrong 😕</p>
        </div>
      )
      default: return null
    }
  }

  getIconObject() {
    switch (this.state.status) {
      case 'FAILED': return (
        <svg width="59" height="78" viewBox="0 0 59 78" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
                <g fill="#F0F0EC">
                    <path d="M1.5 3.004V74.22c0 .832.672 1.503 1.507 1.503h52.986c.836 0 1.507-.668 1.507-1.49V17.991c0-.438-.318-1.22-.627-1.538L42.953 2.127c-.303-.312-1.049-.627-1.479-.627H3.005c-.838 0-1.505.668-1.505 1.504zm-1.5 0A2.997 2.997 0 0 1 3.005 0h38.469c.83 0 1.967.476 2.556 1.082l13.919 14.327c.58.597 1.051 1.754 1.051 2.583v56.241a2.997 2.997 0 0 1-3.007 2.991H3.007A3.002 3.002 0 0 1 0 74.221V3.004z"/>
                    <path d="M41.478 1.493v.005-.005zM3.005 1.5c-.838 0-1.505.668-1.505 1.504V74.22c0 .832.672 1.503 1.507 1.503h52.986c.836 0 1.507-.668 1.507-1.49V17.991l-12.525-.001a3.502 3.502 0 0 1-3.497-3.506V1.498c0 .002-38.473.002-38.473.002zM0 3.004A2.997 2.997 0 0 1 3.005 0h38.469c.83 0 1.504.667 1.504 1.493v12.992c0 1.108.896 2.006 1.997 2.006h12.518c.832 0 1.507.672 1.507 1.501v56.241a2.997 2.997 0 0 1-3.007 2.991H3.007A3.002 3.002 0 0 1 0 74.221V3.004z"/>
                </g>
                <g fill="#F84B45">
                    <path d="M37.632 31.747L19.247 50.132l2.121 2.121 18.385-18.385z"/>
                    <path d="M19.247 33.868l18.385 18.385 2.121-2.121-18.385-18.385z"/>
                </g>
            </g>
        </svg>
      )
      case 'DONE': return (
        <svg width="140" height="132" viewBox="0 0 140 132" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
                <g transform="rotate(54 71.558 53.327)">
                    <ellipse fill="#F58D24" transform="rotate(178 57.63 36.047)" cx="57.629" cy="36.047" rx="8.442" ry="8.432"/>
                    <ellipse fill="#1D8CF8" opacity=".714" transform="rotate(178 3.95 61.126)" cx="3.951" cy="61.126" rx="3.015" ry="3.011"/>
                    <path d="M114.07 53.52a1.791 1.791 0 1 0 1.225 3.367 1.791 1.791 0 0 0-1.224-3.367zm-4.557-.196a1.791 1.791 0 1 0-1.516 3.246 1.791 1.791 0 0 0 1.516-3.246zm-3.08-3.359a1.791 1.791 0 1 0-3.368 1.224 1.791 1.791 0 0 0 3.367-1.224zm.2-4.553a1.791 1.791 0 1 0-3.246-1.515 1.791 1.791 0 0 0 3.246 1.515zm3.366-3.08a1.791 1.791 0 1 0-1.224-3.367 1.791 1.791 0 0 0 1.224 3.367zm4.558.197a1.791 1.791 0 1 0 1.515-3.247 1.791 1.791 0 0 0-1.515 3.247zm5.376 4.43a1.791 1.791 0 1 0-1.227-3.367 1.791 1.791 0 0 0 1.227 3.367zm-2.497 3.48a1.791 1.791 0 1 0 3.247 1.516 1.791 1.791 0 0 0-3.247-1.515zM111.433 118.434a1.434 1.434 0 1 0 2.696-.982 1.434 1.434 0 0 0-2.696.982zm-4.24-1.282a1.434 1.434 0 1 0 2.6 1.21 1.434 1.434 0 0 0-2.6-1.21zm-.252-3.045a1.434 1.434 0 1 0-2.696.98 1.434 1.434 0 0 0 2.696-.98zm-.552-5.096a1.434 1.434 0 1 0-1.211 2.6 1.434 1.434 0 0 0 1.211-2.6zm3.05-.25a1.434 1.434 0 1 0-.98-2.697 1.434 1.434 0 0 0 .98 2.697zm5.1-.556a1.434 1.434 0 1 0-2.601-1.211 1.434 1.434 0 0 0 2.6 1.211zm.25 3.045a1.434 1.434 0 1 0 2.696-.98 1.434 1.434 0 0 0-2.696.98zm.552 5.095a1.434 1.434 0 1 0 1.212-2.6 1.434 1.434 0 0 0-1.212 2.6z" fill="#F8312A"/>
                    <path fill="#F58D24" d="M135.91 98.7l-5.554.096-.097-5.548 5.554-.097z"/>
                    <path fill="#80C772" d="M49.642 116.271l-4.54 5.811-5.803-4.534 4.54-5.811zM139.277 26.691l-2.655 8.172 8.188 2.66 2.656-8.171-8.189-2.661zm-1.926-3.78l13.895 4.514-4.51 13.879-13.894-4.515 4.51-13.878z"/>
                    <path fill="#BA7CF8" d="M42.123 5.725l4.588 1.491-1.489 4.582-4.587-1.49z"/>
                    <path d="M81.815 109.987a5.834 5.834 0 0 0-5.632 6.03 5.834 5.834 0 0 0 6.039 5.622 5.834 5.834 0 0 0 5.632-6.03 5.834 5.834 0 0 0-6.04-5.622zm-.07-1.999c4.327-.15 7.957 3.23 8.108 7.552.15 4.321-3.235 7.947-7.561 8.098-4.327.151-7.957-3.23-8.108-7.551-.15-4.322 3.234-7.948 7.561-8.099z" fill="#1D8CF8"/>
                    <path d="M15.777 79.843c-4.935.173-8.797 4.309-8.625 9.239.172 4.93 4.313 8.787 9.248 8.615 4.936-.173 8.797-4.309 8.625-9.24-.172-4.93-4.313-8.786-9.248-8.614zm.035 1c4.384-.153 8.06 3.272 8.214 7.65.153 4.378-3.277 8.051-7.66 8.204-4.384.153-8.062-3.272-8.214-7.65-.153-4.378 3.276-8.051 7.66-8.204z" fill="#F8312A"/>
                    <ellipse fill="#FF3" transform="rotate(178 122.837 15.674)" cx="122.837" cy="15.674" rx="2.412" ry="2.409"/>
                    <path d="M28.403 47.173a3.513 3.513 0 0 0 3.635 3.387 3.513 3.513 0 0 0 3.39-3.632 3.513 3.513 0 0 0-3.635-3.387 3.513 3.513 0 0 0-3.39 3.632zm6.026-.21a2.513 2.513 0 0 1-2.425 2.597 2.513 2.513 0 0 1-2.602-2.422 2.513 2.513 0 0 1 2.426-2.598 2.513 2.513 0 0 1 2.601 2.422z" fill="#80C772"/>
                    <path d="M90.256.876c-5.6.196-9.983 4.89-9.788 10.485.196 5.595 4.895 9.972 10.496 9.776 5.601-.195 9.983-4.89 9.788-10.484C100.557 5.058 95.857.68 90.256.876zm.035 1c5.05-.176 9.286 3.769 9.462 8.812.176 5.042-3.775 9.274-8.824 9.45-5.05.176-9.285-3.769-9.461-8.812-.176-5.043 3.774-9.274 8.823-9.45z" fill="#1D8CF8"/>
                    <path d="M140.261 69.085l-2.968 3.077a.958.958 0 0 1-1.356.024.961.961 0 0 1-.024-1.358l2.968-3.078-3.178-3.072a.961.961 0 0 1-.023-1.358.958.958 0 0 1 1.356-.024l3.178 3.073 3.069-3.182a.958.958 0 0 1 1.356-.023.961.961 0 0 1 .024 1.358l-3.069 3.181 3.074 2.972a.961.961 0 0 1 .024 1.358.958.958 0 0 1-1.357.024l-3.074-2.972z" fill="#BA7CF8"/>
                    <path d="M69.296 104.987l-.973-9.207a1.338 1.338 0 0 0-2.66.279l.973 9.207a1.338 1.338 0 0 0 2.66-.28zm-.995.105a.336.336 0 0 1-.299.37.338.338 0 0 1-.371-.301l-.973-9.207a.336.336 0 0 1 .299-.37.338.338 0 0 1 .371.3l.973 9.208zm3.587-6.311l-9.209.962a1.336 1.336 0 1 0 .28 2.66l9.208-.962a1.336 1.336 0 1 0-.28-2.66zm.104.995a.338.338 0 0 1 .37.3.336.336 0 0 1-.298.37l-9.209.962a.338.338 0 0 1-.371-.3.336.336 0 0 1 .3-.37l9.208-.962z" fill="#FF3"/>
                    <path d="M48.62 89.883L42.376 73.64a2.076 2.076 0 0 0-2.68-1.193 2.071 2.071 0 0 0-1.192 2.678l6.246 16.243a2.076 2.076 0 0 0 2.68 1.193 2.071 2.071 0 0 0 1.192-2.678zm-13.995-6.048a2.071 2.071 0 0 0-1.193 2.678 2.076 2.076 0 0 0 2.68 1.193l16.25-6.227a2.071 2.071 0 0 0 1.193-2.678 2.076 2.076 0 0 0-2.68-1.193l-16.25 6.227z" fill="#BA7CF8"/>
                </g>
                <path d="M41 35.004A2.997 2.997 0 0 1 44.005 32h38.469c.83 0 1.967.476 2.556 1.082l13.919 14.327c.58.597 1.051 1.754 1.051 2.583v56.241a2.997 2.997 0 0 1-3.007 2.991H44.007A3.002 3.002 0 0 1 41 106.221V35.004z" fill="#FFF"/>
                <path d="M42.5 35.004v71.217c0 .832.672 1.503 1.507 1.503h52.986c.836 0 1.507-.668 1.507-1.49V49.991c0-.438-.318-1.22-.627-1.538l-13.92-14.327c-.303-.312-1.049-.627-1.479-.627H44.005c-.838 0-1.505.668-1.505 1.504zm-1.5 0A2.997 2.997 0 0 1 44.005 32h38.469c.83 0 1.967.476 2.556 1.082l13.919 14.327c.58.597 1.051 1.754 1.051 2.583v56.241a2.997 2.997 0 0 1-3.007 2.991H44.007A3.002 3.002 0 0 1 41 106.221V35.004z" fill="#F0F0EC"/>
                <path d="M82.478 33.493v.005-.005zm-38.473.007c-.838 0-1.505.668-1.505 1.504v71.217c0 .832.672 1.503 1.507 1.503h52.986c.836 0 1.507-.668 1.507-1.49V49.991l-12.525-.001a3.502 3.502 0 0 1-3.497-3.506V33.498c0 .002-38.473.002-38.473.002zM41 35.004A2.997 2.997 0 0 1 44.005 32h38.469c.83 0 1.504.667 1.504 1.493v12.992c0 1.108.896 2.006 1.997 2.006h12.518c.832 0 1.507.672 1.507 1.501v56.241a2.997 2.997 0 0 1-3.007 2.991H44.007A3.002 3.002 0 0 1 41 106.221V35.004z" fill="#F0F0EC"/>
                <path fill="#80C772" d="M57.963 73.472l-2.084 2.158 9.171 8.857 18.108-18.751L81 63.652 64.976 80.245z"/>
            </g>
        </svg>
      )
      case 'CONVERTING': return (
        <svg width="182" height="86" viewBox="0 0 182 86" xmlns="http://www.w3.org/2000/svg">
            <g fill="none" fillRule="evenodd">
                <path d="M104.636 35.016c-.938-.26-2-.519-3.17-.762-8.734-1.815-18.049-1.815-26.749 1.199l-.654-1.89c9.09-3.15 18.753-3.15 27.81-1.267 1.17.243 2.239.502 3.191.764l-4.346-6.885 1.668-1.037 6.291 9.97-10.432 5.485-.926-1.73 7.317-3.847z" fill="#B8B7B2"/>
                <g fill="#F0F0EC">
                    <path d="M128.018 2.679L114.43 72.588a1.502 1.502 0 0 0 1.192 1.763l52.013 10.11c.82.16 1.606-.368 1.763-1.176l10.732-55.207c.083-.431-.08-1.259-.322-1.63l-10.93-16.72c-.239-.364-.911-.816-1.333-.898l-37.762-7.34a1.497 1.497 0 0 0-1.765 1.189zm-1.472-.286a2.997 2.997 0 0 1 3.523-2.375l37.762 7.34c.816.159 1.84.842 2.302 1.55l10.93 16.72c.456.697.697 1.921.539 2.736L170.871 83.57a2.997 2.997 0 0 1-3.523 2.363l-52.012-10.11a3.002 3.002 0 0 1-2.379-3.523l13.589-69.908z"/>
                    <path d="M167.55 8.824v.006-.006zM129.784 1.49a1.497 1.497 0 0 0-1.765 1.189L114.43 72.588a1.502 1.502 0 0 0 1.192 1.763l52.013 10.11c.82.16 1.606-.368 1.763-1.176l10.732-55.207-12.295-2.392a3.502 3.502 0 0 1-2.764-4.108L167.55 8.83l-37.766-7.34zm-3.237.903a2.997 2.997 0 0 1 3.523-2.375l37.762 7.34c.816.159 1.35.942 1.192 1.752l-2.48 12.754a2.002 2.002 0 0 0 1.578 2.35l12.288 2.388a1.504 1.504 0 0 1 1.193 1.762L170.871 83.57a2.997 2.997 0 0 1-3.523 2.363l-52.012-10.11a3.002 3.002 0 0 1-2.379-3.523l13.589-69.908z"/>
                </g>
                <path d="M137.087 53.394l18.496 3.596 3.57-18.368-18.496-3.595-3.57 18.367zm1.198-21.885l24.386 4.74-4.716 24.258-24.385-4.74 4.715-24.258z" fill="#F58D24"/>
                <g>
                    <g fill="#F0F0EC">
                        <path d="M2.166 13.364l13.589 69.908a1.502 1.502 0 0 0 1.766 1.189l52.013-10.11a1.497 1.497 0 0 0 1.194-1.752L59.997 17.392c-.084-.43-.545-1.137-.909-1.39L42.691 4.594c-.358-.249-1.15-.416-1.573-.334L3.356 11.6c-.823.16-1.35.944-1.19 1.764zm-1.473.286a2.997 2.997 0 0 1 2.377-3.522l37.762-7.34c.816-.159 2.022.092 2.715.574L59.945 14.77c.684.476 1.366 1.521 1.524 2.335l10.732 55.208a2.997 2.997 0 0 1-2.381 3.51l-52.013 10.11a3.002 3.002 0 0 1-3.525-2.375L.693 13.65z"/>
                        <path d="M41.121 4.252l.002.006-.002-.006zM3.356 11.601c-.823.16-1.35.943-1.19 1.763l13.589 69.908a1.502 1.502 0 0 0 1.766 1.189l52.013-10.11a1.497 1.497 0 0 0 1.194-1.752L59.997 17.392 47.702 19.78a3.502 3.502 0 0 1-4.101-2.774L41.123 4.258 3.356 11.601zM.693 13.65a2.997 2.997 0 0 1 2.377-3.522l37.762-7.34a1.498 1.498 0 0 1 1.762 1.178l2.479 12.754a2.002 2.002 0 0 0 2.343 1.588l12.287-2.389a1.504 1.504 0 0 1 1.766 1.186l10.732 55.208a2.997 2.997 0 0 1-2.381 3.51l-52.013 10.11a3.002 3.002 0 0 1-3.525-2.375L.693 13.65z"/>
                    </g>
                    <path d="M39.384 58.093c6.704-1.303 11.09-7.77 9.792-14.445-1.297-6.677-7.786-11.029-14.49-9.726-6.704 1.303-11.09 7.77-9.792 14.446s7.787 11.028 14.49 9.725zm-.572-2.945c-5.08.987-9.992-2.307-10.973-7.353-.981-5.046 2.339-9.94 7.42-10.928 5.08-.987 9.992 2.307 10.973 7.353.98 5.046-2.34 9.94-7.42 10.928z" fill="#B8E5FF"/>
                </g>
            </g>
        </svg>
      )
      default:
        return this.isHover() ?
        (
          <svg width="213" height="109" viewBox="0 0 213 109" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fillRule="evenodd">
                  <g fill="#F0F0EC">
                      <path d="M157.837 23.552l-13.963 71.833c-.16.82.373 1.608 1.192 1.767l53.209 10.343c.82.16 1.607-.372 1.766-1.189l11.023-56.708c.084-.434-.078-1.27-.32-1.64l-11.18-17.194c-.232-.355-.915-.815-1.334-.897l-38.635-7.51a1.5 1.5 0 0 0-1.758 1.195zm-1.472-.287a3 3 0 0 1 3.517-2.38l38.635 7.51c.818.159 1.852.857 2.304 1.552l11.181 17.193c.454.698.693 1.93.534 2.745l-11.023 56.707a3.003 3.003 0 0 1-3.524 2.375l-53.21-10.342a3.004 3.004 0 0 1-2.377-3.527l13.963-71.833z"/>
                      <path d="M157.837 23.552l-13.963 71.833c-.16.82.373 1.608 1.192 1.767l53.209 10.343c.82.16 1.607-.372 1.766-1.189l11.023-56.708c0-.003-12.61-2.46-12.61-2.46a3.509 3.509 0 0 1-2.772-4.11l2.558-13.158c0-.003-38.645-7.513-38.645-7.513a1.5 1.5 0 0 0-1.758 1.195zm-1.472-.287a3 3 0 0 1 3.517-2.38l38.635 7.51a1.5 1.5 0 0 1 1.195 1.761l-2.557 13.158a2.009 2.009 0 0 0 1.585 2.352l12.603 2.45a1.51 1.51 0 0 1 1.193 1.769l-11.023 56.707a3.003 3.003 0 0 1-3.524 2.375l-53.21-10.342a3.004 3.004 0 0 1-2.377-3.527l13.963-71.833z"/>
                  </g>
                  <path d="M166.99 75.683l19 3.693 3.69-18.986-19-3.693-3.69 18.986zm1.318-22.504l24.89 4.838-4.836 24.877-24.89-4.838 4.836-24.877z" fill="#F58D24"/>
                  <g fill="#F0F0EC">
                      <path d="M2.133 34.469l13.963 71.833c.16.82.948 1.351 1.767 1.192l53.209-10.343c.82-.159 1.351-.947 1.192-1.764L61.241 38.68c-.084-.435-.548-1.148-.91-1.402L43.523 25.525c-.347-.242-1.154-.413-1.572-.332l-38.635 7.51a1.5 1.5 0 0 0-1.183 1.766zm-1.472.286A3 3 0 0 1 3.03 31.23l38.635-7.51c.818-.159 2.038.101 2.717.576L61.191 36.05c.682.477 1.364 1.53 1.523 2.345L73.737 95.1a3.003 3.003 0 0 1-2.379 3.523L18.15 108.967a3.004 3.004 0 0 1-3.525-2.38L.66 34.756z"/>
                      <path d="M2.133 34.469l13.963 71.833c.16.82.948 1.351 1.767 1.192l53.209-10.343c.82-.159 1.351-.947 1.192-1.764L61.241 38.68c0-.003-12.613 2.443-12.613 2.443a3.509 3.509 0 0 1-4.11-2.773l-2.557-13.158c0-.003-38.645 7.51-38.645 7.51a1.5 1.5 0 0 0-1.183 1.767zm-1.472.286A3 3 0 0 1 3.03 31.23l38.635-7.51a1.5 1.5 0 0 1 1.768 1.185l2.558 13.158a2.009 2.009 0 0 0 2.351 1.587l12.603-2.45a1.51 1.51 0 0 1 1.769 1.194L73.737 95.1a3.003 3.003 0 0 1-2.379 3.523L18.15 108.967a3.004 3.004 0 0 1-3.525-2.38L.66 34.756z"/>
                  </g>
                  <path d="M40.205 80.391c6.826-1.327 11.286-7.934 9.96-14.758-1.327-6.824-7.937-11.28-14.764-9.953-6.827 1.327-11.286 7.934-9.96 14.759 1.327 6.824 7.937 11.28 14.764 9.952zm-.573-2.944c-5.2 1.01-10.236-2.384-11.246-7.58-1.01-5.198 2.387-10.231 7.588-11.242 5.2-1.011 10.235 2.383 11.245 7.58 1.01 5.198-2.386 10.23-7.587 11.242z" fill="#B8E5FF"/>
                  <g>
                      <g fill="#F0F0EC">
                          <path d="M79.46 3.756v73.178c0 .836.672 1.508 1.507 1.508h54.204c.835 0 1.507-.672 1.507-1.504v-57.77c0-.442-.319-1.23-.626-1.549L121.795 2.875c-.294-.304-1.053-.626-1.48-.626H80.959a1.5 1.5 0 0 0-1.498 1.507zm-1.5 0A3 3 0 0 1 80.958.75h39.358c.834 0 1.981.488 2.557 1.083l14.257 14.744c.58.599 1.048 1.762 1.048 2.593v57.769a3.003 3.003 0 0 1-3.007 3.004H80.967a3.004 3.004 0 0 1-3.007-3.008V3.756z"/>
                          <path d="M79.46 3.756v73.178c0 .836.672 1.508 1.507 1.508h54.204c.835 0 1.507-.672 1.507-1.504v-57.77c0-.003-12.847-.008-12.847-.008a3.509 3.509 0 0 1-3.505-3.506V2.25c0-.003-39.368-.001-39.368-.001a1.5 1.5 0 0 0-1.498 1.507zm-1.5 0A3 3 0 0 1 80.958.75h39.358a1.5 1.5 0 0 1 1.51 1.5v13.405c0 1.108.902 2.006 2.005 2.006h12.838c.834 0 1.51.678 1.51 1.509v57.769a3.003 3.003 0 0 1-3.008 3.004H80.967a3.004 3.004 0 0 1-3.007-3.008V3.756z"/>
                      </g>
                      <path d="M117.835 51.576h-18.17l9.085-14.711 9.085 14.711zm5.379 3L108.75 31.155 94.287 54.576h28.927z" fill="#80C772"/>
                  </g>
              </g>
          </svg>
        ) : (
          <svg width="166" height="87" viewBox="0 0 166 87" xmlns="http://www.w3.org/2000/svg">
              <g fill="none" fill-rule="evenodd">
                  <g fill="#F0F0EC">
                      <path d="M112.018 3.679L98.43 73.588a1.502 1.502 0 0 0 1.192 1.763l52.013 10.11c.82.16 1.606-.368 1.763-1.176l10.732-55.207c.083-.431-.08-1.259-.322-1.63l-10.93-16.72c-.239-.364-.911-.816-1.333-.898l-37.762-7.34a1.497 1.497 0 0 0-1.765 1.189zm-1.472-.286a2.997 2.997 0 0 1 3.523-2.375l37.762 7.34c.816.159 1.84.842 2.302 1.55l10.93 16.72c.456.697.697 1.921.539 2.736L154.871 84.57a2.997 2.997 0 0 1-3.523 2.363l-52.012-10.11a3.002 3.002 0 0 1-2.379-3.523l13.589-69.908z"/>
                      <path d="M113.783 2.49a1.497 1.497 0 0 0-1.765 1.189L98.43 73.588a1.502 1.502 0 0 0 1.192 1.763l52.013 10.11c.82.16 1.606-.368 1.763-1.176l10.732-55.207-12.295-2.392a3.502 3.502 0 0 1-2.764-4.108L151.55 9.83l-37.766-7.34zm-3.237.903a2.997 2.997 0 0 1 3.523-2.375l37.762 7.34c.816.159 1.35.942 1.192 1.752l-2.48 12.754a2.002 2.002 0 0 0 1.578 2.35l12.288 2.388a1.504 1.504 0 0 1 1.193 1.762L154.871 84.57a2.997 2.997 0 0 1-3.523 2.363l-52.012-10.11a3.002 3.002 0 0 1-2.379-3.523l13.589-69.908z"/>
                  </g>
                  <path d="M142.528 58.562l-3.518 2.373.573-2.945 2.945.572zm-21.441-4.168l18.496 3.596 3.57-18.368-18.496-3.595-3.57 18.367zm1.198-21.885l24.386 4.74-4.716 24.258-24.385-4.74 4.715-24.258z" fill="#F58D24"/>
                  <g fill="#F0F0EC">
                      <path d="M2.166 14.364l13.589 69.908a1.502 1.502 0 0 0 1.766 1.189l52.013-10.11a1.497 1.497 0 0 0 1.194-1.752L59.997 18.392c-.084-.43-.545-1.137-.909-1.39L42.691 5.594c-.358-.249-1.15-.416-1.573-.334L3.356 12.6c-.823.16-1.35.944-1.19 1.764zm-1.473.286a2.997 2.997 0 0 1 2.377-3.522l37.762-7.34c.816-.159 2.022.092 2.715.574L59.945 15.77c.684.476 1.366 1.521 1.524 2.335l10.732 55.208a2.997 2.997 0 0 1-2.381 3.51l-52.013 10.11a3.002 3.002 0 0 1-3.525-2.375L.693 14.65z"/>
                      <path d="M41.121 5.252l.002.006-.002-.006zM3.356 12.601c-.823.16-1.35.943-1.19 1.763l13.589 69.908a1.502 1.502 0 0 0 1.766 1.189l52.013-10.11a1.497 1.497 0 0 0 1.194-1.752L59.997 18.392 47.702 20.78a3.502 3.502 0 0 1-4.101-2.774L41.123 5.258 3.356 12.601zM.693 14.65a2.997 2.997 0 0 1 2.377-3.522l37.762-7.34a1.498 1.498 0 0 1 1.762 1.178l2.479 12.754a2.002 2.002 0 0 0 2.343 1.588l12.287-2.389a1.504 1.504 0 0 1 1.766 1.186l10.732 55.208a2.997 2.997 0 0 1-2.381 3.51l-52.013 10.11a3.002 3.002 0 0 1-3.525-2.375L.693 14.65z"/>
                  </g>
                  <path d="M39.384 59.093c6.704-1.303 11.09-7.77 9.792-14.445-1.297-6.677-7.786-11.029-14.49-9.726-6.704 1.303-11.09 7.77-9.792 14.446s7.787 11.028 14.49 9.725zm-.572-2.945c-5.08.987-9.992-2.307-10.973-7.353-.981-5.046 2.339-9.94 7.42-10.928 5.08-.987 9.992 2.307 10.973 7.353.98 5.046-2.34 9.94-7.42 10.928z" fill="#B8E5FF"/>
                  <g>
                      <path d="M55.078 3.734A2.997 2.997 0 0 1 58.083.73h38.469c.83 0 1.966.476 2.555 1.082l13.92 14.327c.58.598 1.05 1.754 1.05 2.583v56.241a2.997 2.997 0 0 1-3.006 2.991H58.085a3.002 3.002 0 0 1-3.007-3.003V3.734z" fill="#FFF"/>
                      <path d="M56.578 3.734V74.95c0 .832.672 1.503 1.507 1.503h52.986c.836 0 1.507-.668 1.507-1.49V18.721c0-.438-.318-1.22-.627-1.538L98.03 2.857c-.303-.312-1.05-.627-1.48-.627H58.084c-.839 0-1.505.668-1.505 1.504zm-1.5 0A2.997 2.997 0 0 1 58.083.73h38.469c.83 0 1.966.476 2.555 1.082l13.92 14.327c.58.598 1.05 1.754 1.05 2.583v56.241a2.997 2.997 0 0 1-3.006 2.991H58.085a3.002 3.002 0 0 1-3.007-3.003V3.734z" fill="#F0F0EC"/>
                      <path d="M96.556 2.223v.006-.006zm-38.473.007c-.839 0-1.505.668-1.505 1.504V74.95c0 .832.672 1.503 1.507 1.503h52.986c.836 0 1.507-.668 1.507-1.49V18.721l-12.525-.001a3.502 3.502 0 0 1-3.497-3.506V2.23l-38.473.001zm-3.005 1.504A2.997 2.997 0 0 1 58.083.73h38.469c.83 0 1.504.667 1.504 1.493v12.992c0 1.108.896 2.006 1.997 2.006h12.517c.833 0 1.508.672 1.508 1.501v56.241a2.997 2.997 0 0 1-3.007 2.991H58.085a3.002 3.002 0 0 1-3.007-3.003V3.734z" fill="#F0F0EC"/>
                      <path d="M94.085 50.257h-17.68l8.84-14.248 8.84 14.248zm5.392 3L85.245 30.319 71.013 53.257h28.464z" fill="#80C772"/>
                  </g>
              </g>
          </svg>
      )
    }
  }

  render() {
    const { connectDropTarget, isOver } = this.props
    return connectDropTarget(
      <div
        style={
          Object.assign({}, style.container, this.isHover() ? {
            borderStyle: 'solid'
          } : {
            borderStyle: 'dashed'
          })
        }
      >
        {this.getIconObject()}
        {this.getMessage()}
      </div>
    )
  }
}

// {!isOver && !canDrop && <div dangerouslySetInnerHTML={{ __html: octicons['file-pdf'].toSVG({ width: 100 }) }} />}
// {!isOver && canDrop && }
// {isOver && }

// { drop } since other functions can be passed here
export default DropTarget(NativeTypes.FILE, { drop }, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  itemType: monitor.getItemType(),
  item: monitor.getItem()
}))(Sanitizer)
