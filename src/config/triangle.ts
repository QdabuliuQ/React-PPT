import { Controller } from '@/enums'
import { Config } from '@/types/config'

import common from './common'

export default function config(): Array<Config.Item> {
  return [
    ...(common() as unknown as Array<Config.Item>),
    {
      type: Controller.colorPicker,
      title: '颜色',
      key: 'fill'
    }
  ]
}
