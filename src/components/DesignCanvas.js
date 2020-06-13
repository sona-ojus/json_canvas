import React, { Fragment } from '../../node_modules/react'
import PropTypes from '../../node_modules/prop-types'

const fabric = window.fabric

class DesignCanvas extends React.Component {
  static propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
  }

  static defaultProps = {
    width: 0,
    height: 0,
  }

  state = {
    canvas: null,
  }

  componentDidMount() {
    const canvas = new fabric.Canvas(this.c);
    this.setState({ canvas })
  }

  componentWillReceiveProps(newProps){
    this.state.canvas.clear();
    this.state.canvas.setHeight(newProps.height);
    this.state.canvas.setWidth(newProps.width);
  }

  render() {

    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        canvas: this.state.canvas,
      })
    })

    const { width, height } = this.props
    return (
      <Fragment>
        <canvas ref={c => (this.c = c)} width={width} height={height} />
        {this.state.canvas && children}
        <button onClick={e => {
          e.preventDefault();
          document.getElementById('export').innerHTML =JSON.stringify(this.state.canvas.toJSON());
        }}>To JSON</button>
        
      </Fragment>
    )
  }
}

export default DesignCanvas
