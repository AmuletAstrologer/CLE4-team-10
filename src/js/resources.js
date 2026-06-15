import { ImageSource, Sound, Resource, Loader } from 'excalibur'

const Resources = {
    Trash: new ImageSource('images/trash.jpg')
}

const ResourceLoader = new Loader()
for (let res of Object.values(Resources)) {
    ResourceLoader.addResource(res)
}

export { Resources, ResourceLoader }