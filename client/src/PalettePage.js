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

    return (
        <div className='palette-page'>
            <h1 className='logo'>PalettePickr</h1>
            <div className='image-palette-container'>
                {props.selectedFile != null && 
                    <img className='palette-image' src={URL.createObjectURL(props.selectedFile)} />
                }
                <div className='palette'>
                    {props.palette.map((color) => (
                        <div className='palette-color' style={{backgroundColor: numberSign.concat(color)}}>{color.toUpperCase()}</div>
                    ))}
                </div>
            </div>
            <ConfigProvider theme={buttonTheme} >
                <Button className='replace-image-button' type="primary" shape="round" size='large' onClick={props.replaceImage}>Replace Image</Button>
            </ConfigProvider>
        </div>
    )
}