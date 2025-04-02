import html from '@distui/demo1/Demo1Widget/index.html?raw'

const reearth = globalThis.reearth
reearth.ui.show(html)

reearth.extension.on('message', (msg) => {
  if (msg.action === 'flyToTokyo') {
    reearth.camera.flyTo(
      {
        lat: 35.68505398711427,
        lng: 139.75584459383325,
        height: 5000,
      },
      { duration: 1 },
    )
  }
})

const handleMouseMove = (e) => {
  reearth.ui.postMessage({
    action: 'mouseMove',
    payload: e,
  })
}

reearth.viewer.on('mouseMove', handleMouseMove)

reearth.ui.postMessage({
  action: '__init__',
  payload: {
    primaryColor: reearth.extension.widget?.property?.appearance?.primary_color,
  },
})
