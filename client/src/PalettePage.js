import { Button, ConfigProvider, message, Tooltip } from 'antd';
import { exportComponentAsPNG } from "react-component-export-image";
import React, { useRef } from "react";

const numberSign = '#'
const buttonTheme = {
    components: {
        Button: {
            colorPrimaryHover: '#8E8E8E',
            colorTextLightSolid: '#000000'
        },
        },
}
const downloadOptions = {
    fileName: 'Palette',
    html2CanvasOptions: {
        backgroundColor: null,
        scale: 4,
    }
}
const zeroPad = (num, places) => String(num).padStart(places, '0');
const luminance = (color) => {return color.reduce((a, b) => a + b, 0)/3}
function copyTextToClipboard(text) {
    if ('clipboard' in navigator) {
        navigator.clipboard.writeText(text);
        message.success("Color #" + text + " copied to clipboard")
    } else {
        document.execCommand('copy', true, text);
    }
};

const Palette = React.forwardRef((props, ref) => (
    <div ref={ref} className='image-palette-container'>
        {props.selectedFile != null && 
            <img className='palette-image' src={URL.createObjectURL(props.selectedFile)} alt='Inputted file' />
        }
        <div className='palette'>
            {props.palette.map((color) => (
                <div 
                    className= {luminance(color) >= 100 ? 'palette-color palette-color-bright' : 'palette-color palette-color-dark'}
                    style={{backgroundColor: numberSign.concat(color.map(channel => zeroPad(channel.toString(16), 2)).join(''))}}
                    onClick={() => copyTextToClipboard(color.map(channel => zeroPad(channel.toString(16), 2)).join('').toUpperCase())}
                >
                    <Tooltip title="Click to copy" placement="bottom" className='palette-color-text-tooltip'>
                        <div className='palette-color-text'>
                            {color.map(channel => zeroPad(channel.toString(16), 2)).join('').toUpperCase()}
                        </div>
                    </Tooltip>
                </div>
            ))}
        </div>
    </div>
));

export default function PalettePage(props) {

    const componentRef = useRef();

    return (
        <div className='palette-page'>
            <h1 className='logo' onClick={props.replaceImage}>PaletteFinder</h1>
            <Palette ref={componentRef} selectedFile={props.selectedFile} palette={props.palette}/>
            <ConfigProvider theme={buttonTheme} >
                <div className='palette-page-buttons'>
                    <Button className='palette-page-button' type="primary" shape="round" size='large' onClick={() => props.setIsSettingsModalOpen(true)}>Palette Settings</Button>
                    <Button className='palette-page-button' type="primary" shape="round" size='large' onClick={props.replaceImage}>Replace Image</Button>
                    <Button className='palette-page-button download-button' type="primary" shape="round" size='large' onClick={() => exportComponentAsPNG(componentRef, downloadOptions)}>Download Palette</Button>
                </div>
            </ConfigProvider>
        </div>
    )
}