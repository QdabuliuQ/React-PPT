import { fabric } from 'fabric'

import { getRandomID, initElement } from '@/utils'

import config from './config'

const ICON =
  '<svg t="1726811342320" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4621" width="200" height="200"><path d="M847.657 64.016H175.703c-61.766 0-111.993 50.227-111.993 111.992v671.954c0 61.765 50.226 111.993 111.993 111.993h671.954c61.765 0 111.992-50.228 111.992-111.993V176.01c0-61.765-50.227-111.993-111.992-111.993z m55.995 783.946c0 30.87-25.127 55.997-55.996 55.997H175.703c-30.87 0-55.996-25.127-55.996-55.997V176.01c0-30.87 25.128-55.996 55.996-55.996h671.954c30.87 0 55.996 25.127 55.996 55.996v671.953zM835.19 544.686l-83.995-55.996c-10.444-6.945-23.54-5.688-32.782 1.722l-0.246-0.3-133.184 106.551-197.435-135.752c-0.083-0.055-0.164-0.055-0.218-0.11-2.297-1.53-4.895-2.379-7.52-3.199-0.874-0.273-1.666-0.875-2.57-1.04-2.378-0.492-4.811-0.218-7.273-0.081-1.121 0.082-2.27-0.218-3.363 0-1.23 0.218-2.35 0.984-3.554 1.394-2.27 0.739-4.566 1.367-6.616 2.707-0.083 0.055-0.192 0.055-0.274 0.11L188.17 572.684c-12.878 8.585-16.35 25.946-7.765 38.824 5.386 8.094 14.273 12.47 23.323 12.47 5.332 0 10.718-1.533 15.503-4.704L371.444 517.81 803.8 815.042a27.793 27.793 0 0 0 15.831 4.923c8.913 0 17.663-4.238 23.105-12.14 8.749-12.74 5.523-30.156-7.219-38.934L633.214 629.802l103.956-83.147 66.959 44.621c4.786 3.172 10.171 4.704 15.503 4.704 9.05 0 17.937-4.374 23.323-12.469 8.584-12.877 5.112-30.24-7.766-38.825zM581.674 427.991c69.476 0 125.992-56.516 125.992-125.99 0-69.477-56.516-125.993-125.992-125.993-69.475 0-125.99 56.516-125.99 125.992s56.516 125.991 125.99 125.991z m0-195.985c38.607 0 69.995 31.387 69.995 69.994s-31.388 69.995-69.995 69.995c-38.606 0-69.995-31.39-69.995-69.995 0-38.607 31.39-69.994 69.995-69.994z" p-id="4622"></path></svg>'

function info() {
  return {
    title: '图片',
    icon: ICON
  }
}

function createElement(
  dataUrl: any,
  width: number,
  height: number,
  option: any = {}
) {
  return new Promise((resolve) => {
    const scale =
      width > 800 || height > 500 ? Math.max(width / 800, height / 500) : 1

    fabric.Image.fromURL(dataUrl, (image: any) => {
      image.set({
        top: 0, // 距离画布上边的距离
        left: 0, // 距离画布左侧的距离，单位是像素
        ...option,
        width: width / scale,
        height: height / scale,
        crossOrigin: 'anonymous', // 跨域
        stroke: 'rgba(0,0,0,0)',
        strokeWidth: 0,
        skewX: false,
        skewY: false,
        property: {
          id: getRandomID(10),
          type: 'image'
        }
      })

      initElement(image)

      resolve(image)
    })
  })
}

export default {
  info,
  createElement,
  config
}
