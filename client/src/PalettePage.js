import { Button, ConfigProvider } from 'antd';

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

    return (
        <div className='palette-page'>
            <h1 className='logo'>PalettePickr</h1>
            <div className='image-palette-container'>
                {props.selectedFile != null && 
                    <img className='palette-image' src={URL.createObjectURL(props.selectedFile)} />
                }
                <div className='palette'>
                    {props.palette.map((color) => (
                        <div 
                            className= {luminance(color) >= 100 ? 'palette-color palette-color-bright' : 'palette-color palette-color-dark'}
                            style={{backgroundColor: numberSign.concat(color.map(channel => zeroPad(channel.toString(16), 2)).join(''))}}
                        >
                            {color.map(channel => zeroPad(channel.toString(16), 2)).join('').toUpperCase()}
                        </div>
                    ))}
                </div>
            </div>
            <ConfigProvider theme={buttonTheme} >
                <Button className='replace-image-button' type="primary" shape="round" size='large' onClick={props.replaceImage}>Replace Image</Button>
            </ConfigProvider>
        </div>
    )
}