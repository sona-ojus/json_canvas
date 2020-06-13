import React from '../../node_modules/react'
import PropTypes from '../../node_modules/prop-types'

const fabric = window.fabric

class Image extends React.Component {
  static propTypes = {
    canvas: PropTypes.object,
    imageD: PropTypes.object.isRequired
  }

  static defaultProps = {
    scale: 1.0,
  }

  componentWillReceiveProps(newProps) {
      const image = new fabric.Image.fromURL(newProps.imageD.exportedAsset, img => {
        this.props.canvas.add(img);
        this.setState({ image })
      }, newProps.imageD);
  }

  render() {
    return null
  }
}

export default Image
