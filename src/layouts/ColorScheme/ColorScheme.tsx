/** @jsxImportSource theme-ui */
import { Radio, RadioChangeEvent } from 'antd';
import React, { FC } from 'react';
import styles from './styles';
import { useColorMode } from 'theme-ui';
//eslint-disable-next-line
const darkMode = require('images/dark-mode.png');
//eslint-disable-next-line
const lightMode = require('images/light-mode.png');

const ColorScheme: FC = () => {
  const [colorMode, setColorMode] = useColorMode();
  const onChange = (e: RadioChangeEvent) => {
    setColorMode(e.target.value);
  };

  return (
    <div sx={styles}>
      <Radio.Group onChange={onChange} value={colorMode}>
        <div className="custom_color_scheme dark_mode">
          <h2 className="dark_mode_text mode_label">Dark Mode</h2>
          <label className="mode_card">
            <img src={darkMode} />
            <Radio value={'dark'} className={'dark_mode_text'}>
              Winter Sky
            </Radio>
          </label>
        </div>
        <div className="custom_color_scheme light_mode">
          <h2 className="light_mode_text mode_label">Light Mode</h2>
          <label className="mode_card">
            <img src={lightMode} />
            <Radio value={'light'} className={'light_mode_text'}>
              Winter Sky
            </Radio>
          </label>
        </div>
      </Radio.Group>
    </div>
  );
};

export default ColorScheme;
