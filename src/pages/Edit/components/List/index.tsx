import { memo, useCallback } from 'react'
import Scrollbars from 'react-custom-scrollbars'

import ContextMenu from '@/components/ContextMenu'
import Icon from '@/components/Icon'
import PreviewCanvas from '@/components/PreviewCanvas'
import useStore from '@/stores'
import { CanvasStore } from '@/stores/canvasStore'
import { Fabric } from '@/types/fabirc'
import { getNewCanvasOption, getRandomID } from '@/utils'

import { useContextMenu } from './useContextMenu'

import style from './index.module.less'

const style1 = {
  height: 'calc(100vh - 85px - 80px)'
}

export default memo(function List() {
  const {
    canvas,
    activeCanvas,
    activeCanvasUpdate,
    canvasPush,
    activeElementUpdate
  } = useStore()

  const previewClickEvent = useCallback(
    (id: string) => {
      activeCanvasUpdate(activeCanvas !== id ? id : '')
      activeElementUpdate('')
    },
    [activeCanvas]
  )

  const addEvent = useCallback(() => {
    canvasPush({
      id: getRandomID(10),
      fabricOption: getNewCanvasOption() as unknown as Fabric.JSON,
      remark: '',
      visible: true
    })
  }, [])

  // 右键菜单
  const { contextMenuEvent, contextMenuData, contextMenuRef, menuClick } =
    useContextMenu()

  return (
    <div className={style.list}>
      {canvas.length ? (
        <Scrollbars autoHide autoHideTimeout={1000} style={style1}>
          <div className={style.scrollContainer}>
            {canvas.map((item: CanvasStore.Canvas, index: number) => (
              <div
                className={`${style.canvasPreviewItem} ${activeCanvas === item.id ? style.activePreviewItem : ''}`}
                key={item.id}
                onContextMenu={(ev: React.MouseEvent<HTMLDivElement>) =>
                  contextMenuEvent(ev, item.id)
                }
              >
                <PreviewCanvas
                  className={style.previewItem}
                  id={item.id}
                  fabricOption={item.fabricOption}
                  clickEvent={previewClickEvent}
                  visible={item.visible}
                />
                <div className={style.canvasIndex}>{index + 1}</div>
              </div>
            ))}
          </div>

          <ContextMenu
            ref={contextMenuRef}
            menuData={contextMenuData}
            menuClick={(title: string, key: string) => menuClick(title, key)}
          />
        </Scrollbars>
      ) : (
        <div className={style.empty}>暂无幻灯片</div>
      )}
      <div onClick={addEvent} className={style.canvasAdd}>
        <Icon icon="i_add" />
      </div>
    </div>
  )
})
