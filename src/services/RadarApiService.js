import * as RadarApi from '../lib/RadarApi'

export const getCapabilities = async (layer, subLayer) => {
  const capabilities = await RadarApi.getCapabilities(layer, subLayer)
  return capabilities
}
