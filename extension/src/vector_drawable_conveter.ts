import { Promise } from 'es6-promise';

export class VectorDrawableConverter {
    convert(vd: any): Promise<any>  {
        return new Impl().convertVD2SVG(vd);
    }
}

class Impl {
    convertVD2SVG(vd: any): Promise<any> { // promiss will return svg element
        return new Promise((resolve, reject) => {
            resolve(true);
        });
    }
}
