import axios from 'axios'

interface ServiceHelperConfig {
  serviceRegistryUrl: string
  serviceVersion: string
}

interface ServiceInfo {
  ip: string
  port: number
}

class ServiceHelper {
  private serviceRegistryUrl: string
  private serviceVersion: string
  private cache: Record<string, any>

  constructor({ serviceRegistryUrl, serviceVersion }: ServiceHelperConfig) {
    this.serviceRegistryUrl = serviceRegistryUrl
    this.serviceVersion = serviceVersion
    this.cache = {}
  }

  async getServiceInfo(serviceName: string): Promise<ServiceInfo> {
    const { ip, port } = await this.getService(serviceName)
    return { ip, port }
  }

  private async getService(serviceName: string) {
    const res = await axios.get(
      `${this.serviceRegistryUrl}/find/${serviceName}/${this.serviceVersion}`
    )
    return res.data
  }
}

export default ServiceHelper
