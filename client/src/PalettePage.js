import { Button, ConfigProvider, message, Tooltip } from 'antd';

export default function PalettePage(props) {
    const numberSign = '#'
    const buttonTheme = {
        components: {
            Button: {
                colorPrimaryHover: '#8E8E8E',
                colorTextLightSolid: '#000000'
            },
          },
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

    return (
        <div className='palette-page'>
            <h1 className='logo' onClick={props.replaceImage}>PaletteFinder</h1>
            <div className='image-palette-container'>
                {props.selectedFile != null && 
                    <img className='palette-image' src={URL.createObjectURL(props.selectedFile)} />
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
            <ConfigProvider theme={buttonTheme} >
                <div className='palette-page-buttons'>
                    <Button className='settings-button' type="primary" shape="round" size='large' onClick={() => props.setIsSettingsModalOpen(true)}>Palette Settings</Button>
                    <Button className='replace-image-button' type="primary" shape="round" size='large' onClick={props.replaceImage}>Replace Image</Button>
                </div>
            </ConfigProvider>
        </div>
    )
}