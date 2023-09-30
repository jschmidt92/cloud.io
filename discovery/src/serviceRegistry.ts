import semver from 'semver'

interface Service {
  timestamp: number
  ip: string
  port: string
  name: string
  version: string
}

interface Logger {
  debug(message: string): void
}

class ServiceRegistry {
  private log: Logger
  private services: Record<string, Service>
  private readonly timeout: number

  constructor(log: Logger) {
    this.log = log
    this.services = {}
    this.timeout = 30
  }

  get(name: string, version: string, port: string): Service | undefined {
    this.cleanup()
    const candidates = this.filterServices(name, version, port)
    return candidates.sort((a, b) => b.timestamp - a.timestamp)[0]
  }

  gracefulShutdown(signal: string): void {
    console.log(`Received ${signal}. Shutting down gracefully...`)
    this.cleanup()
    this.removeAllServices()
  }

  setupGracefulShutdown(): void {
    process.on('SIGINT', () => this.gracefulShutdown('SIGINT'))
    process.on('SIGTERM', () => this.gracefulShutdown('SIGTERM'))
  }

  find(name: string, version: string): Service | undefined {
    this.cleanup()
    const candidates = this.filterServices(name, version)
    return candidates.sort((a, b) => semver.rcompare(a.version, b.version))[0]
  }

  register(name: string, version: string, ip: string, port: string): string {
    this.cleanup()
    const key = this.generateKey(name, version, ip, port)

    if (!this.services[key]) {
      this.services[key] = this.createService(name, version, ip, port)
      this.log.debug(
        `Added services ${name}, version ${version} at ${ip}:${port}`
      )
      return key
    }

    this.services[key].timestamp = Math.floor(Date.now() / 1000)
    this.log.debug(
      `Updated services ${name}, version ${version} at ${ip}:${port}`
    )
    return key
  }

  unregister(name: string, version: string, ip: string, port: string): string {
    const key = this.generateKey(name, version, ip, port)
    delete this.services[key]
    this.log.debug(
      `Unregistered services ${name}, version ${version} at ${ip}:${port}`
    )
    return key
  }

  private cleanup(): void {
    const now = Math.floor(Date.now() / 1000)
    Object.keys(this.services).forEach((key) => {
      if (this.services[key].timestamp + this.timeout < now) {
        delete this.services[key]
        this.log.debug(`Removed service ${key}`)
      }
    })
  }

  private removeAllServices(): void {
    Object.keys(this.services).forEach((key) => {
      delete this.services[key]
      this.log.debug(`Removed service ${key}`)
    })
  }

  private filterServices(
    name: string,
    version: string,
    port?: string
  ): Service[] {
    return Object.values(this.services).filter(
      (service) =>
        service.name === name &&
        semver.satisfies(service.version, version) &&
        (!port || service.port === port)
    )
  }

  private generateKey(
    name: string,
    version: string,
    ip: string,
    port: string
  ): string {
    return `${name}${version}${ip}${port}`
  }

  private createService(
    name: string,
    version: string,
    ip: string,
    port: string
  ): Service {
    return {
      timestamp: Math.floor(Date.now() / 1000),
      ip: ip,
      port: port,
      name: name,
      version: version
    }
  }
}

export default ServiceRegistry
