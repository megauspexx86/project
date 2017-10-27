import React from 'react';
import ReactDOM       from 'react-dom';

class ImageViewer extends React.Component {

    constructor(props) {
        super(props);
        this.__keyUpEvent = this._onKeyUp.bind(this);
    }

    componentDidMount() {
        document.addEventListener("keyup", this.__keyUpEvent, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keyup", this.__keyUpEvent, false);
    }

    _onKeyUp(e) {
        e.preventDefault();
        if(e.which == 27) {
            this._close();
        }
    }

    _clickOutside(e) {
        if(e.target.className == 'banner-popup') {
            this._close();
        }
    }

    render() {

        return(
            <div className="banner-popup" onClick={((e) => {this._clickOutside(e)}).bind(this)}>
                <div className="banner-popup__wrapper">
                    <img src={this.props.image_url} alt="баннер" className="banner-popup__img" />
                        <span className="banner-popup__close" onClick={this._close.bind(this)}></span>
                </div>
            </div>
        )
    }

    _close() {
        setTimeout((() => {
            ReactDOM.unmountComponentAtNode(document.getElementById('image_viewer'));
        }).bind(this), 0.00001);
    }

}

export default ImageViewer;
