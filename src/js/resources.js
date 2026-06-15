import { ImageSource, Sound, Resource, Loader, FontSource } from 'excalibur'

const Resources = {}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }