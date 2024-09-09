import { Controller } from '@/enums';
import { Collapse, ColorPickerProps, InputNumberProps, SliderSingleProps } from 'antd';
import config from '@/config';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import OptionItem from '../OptionItem';
import { getElementOption } from '@/utils';
import useStore from '@/stores';
import { type Config } from '@/types/config';
import { type Fabric } from '@/types/fabirc';

import style from './index.module.less';
import ColorPicker from '../Controllers/ColorPicker';
import InputNumber from '../Controllers/InputNumber';
import Switch from '../Controllers/Switch';
import Slider from '../Controllers/Slider';

export default memo(function ElementPanel() {
  const { activeElement, activeCanvas } = useStore();

  const info = getElementOption(activeCanvas, activeElement) as Fabric.Object;
  const [elConfig, setElConfig] = useState<Array<Config.Item> | null>(null);

  useEffect(() => {
    if (info) {
      setElConfig((config as any)[`${info.property.type}Config`]);
    }
  }, []);

  const basicInfoPanel = useMemo(
    () => [
      {
        key: '1',
        label: '基本属性',
        children: [
          <div key={1} className={style.infoItem}>
            <div className={style.itemTitle}>宽度</div>
            <div className={style.itemData}>{(info.width * info.scaleX).toFixed(0)} Px</div>
          </div>,
          <div key={2} className={style.infoItem}>
            <div className={style.itemTitle}>高度</div>
            <div className={style.itemData}>{(info.height * info.scaleY).toFixed(0)} Px</div>
          </div>,
          <div key={3} className={style.infoItem}>
            <div className={style.itemTitle}>旋转角度</div>
            <div className={style.itemData}>{info.angle} Deg</div>
          </div>,
          <div key={4} className={style.infoItem}>
            <div className={style.itemTitle}>偏移X</div>
            <div className={style.itemData}>{(info.left - info.width / 2).toFixed(0)} Px</div>
          </div>,
          <div key={5} className={style.infoItem}>
            <div className={style.itemTitle}>偏移Y</div>
            <div className={style.itemData}>{(info.top - info.height / 2).toFixed(0)} Px</div>
          </div>,
        ],
      },
    ],
    [info.width, info.scaleX, info.height, info.scaleY, info.left, info.top]
  );

  const elInfoPanel = useMemo(
    () => [
      <div key={'a'}>
        {info && elConfig ? (
          elConfig.map((item) => (
            <OptionItem className={style.optionItem} key={item.key} title={item.title}>
              {item.type === Controller.colorPicker ? (
                <ColorPicker
                  {...((item.property ? item.property : {}) as ColorPickerProps)}
                  propName={item.key}
                  defaultValue={(info as any)[item.key]}
                />
              ) : item.type === Controller.inputNumber ? (
                <InputNumber
                  {...((item.property ? item.property : {}) as InputNumberProps)}
                  propName={item.key}
                  defaultValue={(info as any)[item.key]}
                />
              ) : item.type === Controller.switch ? (
                <Switch defaultValue={(info as any)[item.key]} propName={item.key} />
              ) : item.type === Controller.slider ? (
                <Slider
                  defaultValue={(info as any)[item.key]}
                  propName={item.key}
                  {...((item.property ? item.property : {}) as SliderSingleProps)}
                />
              ) : (
                <></>
              )}
            </OptionItem>
          ))
        ) : (
          <></>
        )}
      </div>,
    ],
    [info, elConfig]
  );

  return (
    <div>
      <Collapse defaultActiveKey={['1']} ghost items={basicInfoPanel}></Collapse>
      <Collapse
        defaultActiveKey={['1']}
        ghost
        items={[
          {
            key: '1',
            label: '元素属性',
            children: elInfoPanel,
          },
        ]}
      />
    </div>
  );
});
