import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ProductVideoData } from './component/productvideo/productvideo.metadata';
import { Productdocumentcleint } from './clientcomponent/productdocument/productdocumentcleint';
import { isTemplateExpression } from 'typescript';


@Pipe({
  name: 'myproductpipe',
  pure: false
})
export class MyProductpipePipe implements PipeTransform {

  transform(value: Productdocumentcleint[], filter: any): any {

    if (!value || !filter) {
      return value;
    }
    return value.filter((item: Productdocumentcleint) => item.documentCatName.indexOf(filter) !== -1);
  }

}

@Pipe({
  name: 'myvideofilter',
  pure: false
})
export class MyVideoFilter implements PipeTransform {

  transform(value: ProductVideoData[], filter: any): any {

    if (!value || !filter) {
      return value;
    }
    return value.filter((item: ProductVideoData) => item.videoType.indexOf(filter) !== -1);
  }

}

@Pipe({ name: 'safe' })
export class SafePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: any) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
@Pipe({ name: 'safeVideo' })
export class SafeVideoPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) { }
  transform(url: any) {
    debugger
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}


