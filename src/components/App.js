import React from '../../node_modules/react'
import '../../node_modules/fabric-webpack'

import DesignCanvas from './DesignCanvas'
import Image from './Image'

import '../styles/App.css'

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            width: 1000,
            height: 1000,
            children:[],
            originalDimensions:[],
            showCanvas: false
        }
    }

    test1 = () => {
        this.setState({width:300, height:600});
        this.convert({width:300, height:600});
    }
    test2 = () => {
        this.setState({width:428, height:200});
        this.convert({width:428,height:200});
    }
    test3 = () => {
        this.setState({width:1000, height:1000});
        this.convert({width:1000,height:1000});
    }

    convert = (value) => {
        var newObject = [];
        for(var i=0; i< this.state.originalDimensions.children.length; i++){
            var oldDimension = this.state.originalDimensions.children[i];
            var oldAspectRatio = oldDimension.width / oldDimension.height;
            
            var newDimension = {...oldDimension};
            newDimension.left = (oldDimension.left/this.state.originalDimensions.width) * value.width;
            newDimension.top = (oldDimension.top/this.state.originalDimensions.height) * value.height;
            newDimension.width = (oldDimension.width/ this.state.originalDimensions.width ) * value.width;
            newDimension.height = (oldDimension.height / this.state.originalDimensions.height) * value.height;
           
            var newAspectRatio = newDimension.width / newDimension.height;
            var aspectRatioMatch = (oldAspectRatio === newAspectRatio);
            if(!aspectRatioMatch)
                newDimension = this.adjustAspectRatio(value, newDimension, oldAspectRatio, newAspectRatio);

            newObject.push(newDimension);
        }

        this.setState({children : newObject});
    }

    adjustAspectRatio = (value, newDimension, oldAspectRatio, newAspectRatio) => {
        var dimension = {...newDimension};
        if(newAspectRatio <= 1){
            dimension.height = dimension.width / oldAspectRatio;
            dimension.top = (value.height - dimension.height)/2;
        }            
        else{
            dimension.width = dimension.height * oldAspectRatio;
            dimension.left = (value.width - dimension.width)/2;
        }        
        return dimension;
    }

    readJSON = () =>{
        var json_input = document.getElementById("json_input").value;
        var canvas_details = JSON.parse(json_input);
        this.setState({width: canvas_details.width, height: canvas_details.height});
        canvas_details.children = canvas_details.children.map(child => {
            var temp = {...child};
            temp.left = child.x;
            temp.top = child.y;
            return temp;
        });
        this.setState({children: canvas_details.children});
        this.setState({originalDimensions: canvas_details});
        this.setState({showCanvas: true});
    }

    render(){
        var button = "";
        if (this.state.showCanvas) {
            button = <>
                <DesignCanvas width={this.state.width} height={this.state.height}>
                    {
                        this.state.children.map(child => {
                             return <Image key={child.key} imageD={child}/>
                        })
                    }
                </DesignCanvas>
                <button onClick={this.test1}>300 X 600</button>
                <button onClick={this.test2}>428 X 200</button>
                <button onClick={this.test3}>1000 X 1000</button>
            </>
        } 

        return(
            <div>
                <textarea id="json_input"></textarea>
                <button onClick={this.readJSON}>Design Canvas</button>
                {button}
                <div id="export"></div>
            </div>
        )
    }
}

export default App;

